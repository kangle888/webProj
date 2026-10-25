# 内容国际化方案

> 适用范围：`reglow-nuxt-starter`（Nuxt 4）+ `reglow-python`（FastAPI + SQLAlchemy）
>
> 状态：**前端路由级国际化已落地**；**后端内容翻译为实施方案**，按本文档分阶段接入。

---

## 1. 目标与边界

国际化分两类，治理方式不同：

| 类型    | 例子                           | 存放位置                        | 维护方式                                       |
| ------- | ------------------------------ | ------------------------------- | ---------------------------------------------- |
| UI 文案 | 导航、按钮、错误提示、空状态   | 代码仓库 `app/i18n/messages.ts` | 人工维护三种语言（量小、要求精确）             |
| 内容    | 文章、帮助中心、公告、商品详情 | 数据库                          | **只写一份源文**，翻译结果落库缓存，可人工校对 |

结论：**不需要每次编辑两份语言**。UI 文案继续人工维护；内容采用「源文 + 翻译表 + AI 翻译 + 缓存」。

---

## 2. 前端国际化（已实现）

### 2.1 URL 结构

采用 `@nuxtjs/i18n` 的 `prefix_except_default`：

| 语言             | 首页     | 埋点页            |
| ---------------- | -------- | ----------------- |
| 简体中文（默认） | `/`      | `/tracking`       |
| 繁體中文         | `/zh-TW` | `/zh-TW/tracking` |
| English          | `/en`    | `/en/tracking`    |

- `i18n.locales` 中英文 `code` 用 `en`（URL 更短），`language` 为 `en-US`（hreflang / `html lang`）。
- 浏览器语言与 `i18n_redirected` cookie 由 `detectBrowserLanguage` 处理，仅在根路径重定向。
- 爬虫不带 cookie，`/` 稳定输出默认简体。

### 2.2 分工

| 职责                                | 实现                                                                       |
| ----------------------------------- | -------------------------------------------------------------------------- |
| 路由、语言检测、hreflang、canonical | `nuxt.config.ts` → `i18n`                                                  |
| 应用文案                            | `app/i18n/messages.ts`（`app.*` 命名空间，`AppMessages` 接口约束三语结构） |
| 文案注册                            | `app/plugins/i18n.ts` → `addLocale`                                        |
| ReUI 组件文案同步                   | `app/app.vue` → `watch(routeLocale → setReuiLocale)`                       |
| 内部链接                            | `useLocalePath()`（Header / Footer / 页面）                                |
| 语言切换                            | `LocaleSwitcher.vue` → Nuxt i18n `setLocale()`                             |
| SEO                                 | `useLocaleHead({ seo: true })` + `useHead`                                 |

### 2.3 关键约束

1. `t()` / `tm()` 不能写在模块顶层或 `withDefaults` 默认值里。
2. 内部链接必须使用 `localePath()`，否则切换语言后丢失前缀。
3. 新语言需要同时补：`i18n.locales`、`AppMessages`、`LocaleSwitcher.options`。
4. 部署时设置 `NUXT_PUBLIC_SITE_URL`，作为 `i18n.baseUrl`，否则 canonical / hreflang 指向 localhost。

---

## 3. 内容国际化总体策略

不是所有内容都用同一策略，按是否依赖搜索收录区分：

| 内容类型                               | 策略                                    | 原因                             |
| -------------------------------------- | --------------------------------------- | -------------------------------- |
| 首页、产品页、帮助中心、需要收录的文章 | **发布时异步预翻译**（可选人工校对）    | 保证目标语言页面首屏可收录       |
| 长尾文章、历史归档                     | **首次访问时服务端惰性翻译 + 落库缓存** | 节省成本；首次稍慢，之后命中缓存 |
| 登录后 UGC / 社区内容                  | 客户端按需翻译                          | 不依赖 SEO，不必全量入库         |
| 邮件、站内通知                         | 后端消息模板 i18n                       | 属于 UI 文案，不走文章翻译       |

**核心原则：需要被搜索收录的页面，翻译必须发生在服务端首屏，不能等用户点击后再在浏览器里翻译。**

---

## 4. 数据模型（reglow-python）

### 4.1 源文表扩展

`cms_article` 保持单份源文，新增两个字段：

```sql
ALTER TABLE cms_article
  ADD COLUMN source_locale VARCHAR(16) NOT NULL DEFAULT 'zh-CN'
    COMMENT '源文语言',
  ADD COLUMN content_hash CHAR(64) NULL
    COMMENT '源文哈希（title/summary/content 归一化后计算），用于判断译文过期';
```

`content_hash` 由后端在保存文章时计算，例如：

```python
import hashlib

def compute_content_hash(article) -> str:
    raw = "\n".join([
        article.title or "",
        article.summary or "",
        article.content or "",
    ])
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()
```

### 4.2 翻译表

```sql
CREATE TABLE cms_article_translation (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  article_id BIGINT NOT NULL,
  locale VARCHAR(16) NOT NULL,
  title VARCHAR(200),
  summary TEXT,
  content MEDIUMTEXT,
  seo_title VARCHAR(200),
  seo_description VARCHAR(300),
  status TINYINT NOT NULL DEFAULT 0
    COMMENT '0 排队中 1 机器翻译 2 人工校对',
  provider VARCHAR(32),
  model VARCHAR(64),
  prompt_version VARCHAR(32),
  glossary_version VARCHAR(32),
  source_hash CHAR(64) NOT NULL,
  translated_at DATETIME,
  reviewed_by BIGINT,
  reviewed_at DATETIME,
  created_at DATETIME,
  updated_at DATETIME,
  UNIQUE KEY uk_article_locale (article_id, locale),
  KEY idx_locale_status (locale, status)
);
```

说明：

- `source_hash` 与文章当前哈希不一致 → 视为过期，读时重翻。
- `status = 2` 的行是人工校对结果，AI 不得覆盖；只有源文变化时才标记为过期。
- 如启用 SaaS 多租户，翻译表需带 `tenant_id`，唯一键改为 `(tenant_id, article_id, locale)`。

### 4.3 术语表（可选但强烈建议）

```sql
CREATE TABLE cms_translation_glossary (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  term VARCHAR(100) NOT NULL COMMENT '源语言词条',
  locale VARCHAR(16) NOT NULL,
  translation VARCHAR(200) COMMENT '空表示不翻译',
  do_not_translate TINYINT NOT NULL DEFAULT 0,
  updated_at DATETIME,
  UNIQUE KEY uk_term_locale (term, locale)
);
```

用于统一品牌名、产品名、组件名（如 ReUI、Nuxt、PageTable）的译法。

---

## 5. API 契约

### 5.1 公共读接口

```
GET /api/v1/client/articles/{id}?locale=en
```

响应 `data` 关键字段：

```json
{
  "id": 42,
  "locale": "en",
  "source_locale": "zh-CN",
  "translation_status": "machine",
  "machine_translated": true,
  "title": "Getting started with Reglow",
  "summary": "...",
  "content": "...",
  "seo_title": "...",
  "seo_description": "...",
  "updated_at": "2026-10-25T10:00:00"
}
```

`translation_status` 取值：`source`（同源语言）/ `machine` / `reviewed` / `pending`（正在翻译，当前回退源文）。

列表接口只翻译/返回 `title` 与 `summary`，不要触发布局级正文翻译。

### 5.2 管理端接口

| 方法     | 路径                                         | 说明                      |
| -------- | -------------------------------------------- | ------------------------- |
| `GET`    | `/admin/articles/{id}/translations`          | 查看各语言状态与成本      |
| `POST`   | `/admin/articles/{id}/translations/{locale}` | 立即翻译（覆盖机器译文）  |
| `PUT`    | `/admin/articles/{id}/translations/{locale}` | 人工编辑并置为 `reviewed` |
| `DELETE` | `/admin/articles/{id}/translations/{locale}` | 删除译文，等待重新生成    |
| `POST`   | `/admin/articles/translations/batch`         | 按分类 / 时间范围批量回填 |

---

## 6. 读路径：read-through 缓存（惰性翻译）

```
GET /en/articles/42
  ├─ locale == source_locale            → 直接返回源文
  ├─ 命中译文 && source_hash 一致       → 返回译文
  └─ 未命中 / 已过期
       ├─ 抢 Redis 锁 i18n:article:42:en（SETNX，TTL 60s）
       │    ├─ 抢到 → 调 AI 分段翻译 → upsert 译文 → 返回
       │    └─ 未抢到 → 返回源文 + translation_status=pending
       └─ 翻译超时（建议 6–8s）→ 返回源文，后台继续
```

参考实现：

```python
async def get_article_localized(article_id: int, locale: str):
    article = await repo.find_article_by_id(article_id)

    if locale == article.source_locale:
        return article, None

    tr = await repo.find_translation(article_id, locale)
    if tr and tr.source_hash == article.content_hash and tr.status >= 1:
        return article, tr

    lock_key = f"i18n:article:{article_id}:{locale}"
    if not await cache.set(lock_key, 1, nx=True, ex=60):
        return article, None  # 其他请求正在翻译，本次回退源文

    try:
        result = await translator.translate_article(article, locale)
        await repo.upsert_translation(
            article_id=article_id,
            locale=locale,
            payload=result,
            source_hash=article.content_hash,
            status=1,
        )
        return article, result
    finally:
        await cache.delete(lock_key)
```

注意：

- 不要无限等待 AI，SSR 超时后必须有回退路径。
- 回退源文时前端要加 `noindex`（见第 10 节），避免错误语言被收录。
- 并发去重依赖锁，避免同一篇文章被重复计费。

---

## 7. 写路径：发布预翻译

在 `ArticleService.publish_article()` 成功之后排队：

```python
async def publish_article(self, article_id: int):
    article = await self.repo.update_article(...)

    for locale in enabled_content_locales():
        if locale == article.source_locale:
            continue
        await translation_queue.enqueue(article_id, locale)

    return await self.build_article_response(article)
```

- 复用 `reglow.modules.ai.gateway` 调用模型，`ai_usage` 记录 token 与费用。
- 任务状态写入 `cms_article_translation.status`（`0 排队中`），失败可重试。
- 历史内容通过管理端批量回填。
- 无独立 worker 时可先用 FastAPI `BackgroundTasks`，但需接受进程重启丢任务；生产建议独立队列进程。

---

## 8. AI 翻译规范

1. **结构化翻译**：按 Markdown 标题分块；保护代码块、行内代码、链接、图片、HTML 标签、URL，只翻自然语言。
2. **上下文提示**：传入内容类型（产品文档 / 博客 / 公告）、目标读者、语气，以及术语表。
3. **固定版本**：`prompt_version` + `glossary_version` + `model` 写入译文行，便于回溯与批量重译。
4. **分块与限长**：超长文章按章节切分，逐段翻译后拼接；记录每段 token。
5. **人工校对优先**：管理端可编辑任意译文，保存后 `status = 2` 并锁定。
6. **成本控制**：翻译前估算 token；只对字段级 hash 变化的段落重翻；记录每条译文成本。
7. **不翻译内容**：代码、命令行、URL、邮箱、品牌名（术语表标记 `do_not_translate`）。

提示词骨架（供实现参考）：

```text
你是专业的技术文档译者。将下面的 Markdown 内容从 {source_locale} 翻译为 {target_locale}。

要求：
1. 保留 Markdown 结构、标题层级、列表与表格；
2. 代码块、行内代码、URL、图片地址、HTML 标签一律不翻译；
3. 使用术语表中的固定译法，标记为不翻译的词保持原文；
4. 语气与 {content_type} 一致，不增删信息，不做总结；
5. 只输出译文，不要解释。

术语表：
{glossary}

原文：
{markdown}
```

---

## 9. 前端内容页接入（Nuxt）

文章页按 `[locale, id]` 作为缓存键，SSR 输出目标语言内容：

```vue
<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();
const config = useRuntimeConfig();

const { data: article } = await useAsyncData(
  () => `article:${route.params.id}:${locale.value}`,
  () =>
    $fetch(`/api/v1/client/articles/${route.params.id}`, {
      query: { locale: locale.value },
    }),
  { watch: [locale] },
);

const isFallback = computed(
  () => article.value?.translation_status === "pending",
);

useHead(() => ({
  title: article.value?.seo_title || article.value?.title,
  meta: [
    { name: "description", content: article.value?.seo_description },
    { name: "robots", content: isFallback.value ? "noindex" : "index,follow" },
  ],
}));
</script>

<template>
  <article>
    <Alert
      v-if="isFallback"
      type="info"
      title="该语言版本正在生成，当前展示原文"
    />
    <Tag v-else-if="article?.machine_translated" variant="outlined">
      机器翻译
    </Tag>
    <h1>{{ article?.title }}</h1>
    <div class="prose" v-html="article?.content" />
  </article>
</template>
```

配套要求：

- 语言切换使用 `switchLocalePath()`，保留文章 ID。
- 译文更新后按 URL 或 tag 主动失效 CDN 缓存。
- 列表页不触发正文翻译，只展示已存在的标题/摘要译文。
- 埋点 `page_key` 已带语言前缀（`/en/articles/42`），报表天然按语言拆分。

---

## 10. SEO 规则

| 场景                               | 处理                                                                |
| ---------------------------------- | ------------------------------------------------------------------- |
| 译文存在（`machine` / `reviewed`） | `index,follow`；输出 hreflang；canonical 自指                       |
| 译文缺失或为空                     | 不输出该语言的 hreflang；页面 `noindex`；提示「该语言版本尚未提供」 |
| 正在翻译（`pending`）              | 按缺失处理，避免收录源文                                            |
| 源文更新                           | 旧译文标记过期；重新翻译前按缺失处理                                |

`useLocaleHead({ seo: true })` 已自动生成 canonical / hreflang / og:locale；只需保证翻译存在时页面可被索引。

---

## 11. 迁移步骤与验收

### 11.1 迁移顺序

1. 后端：`cms_article` 加 `source_locale` / `content_hash`，新建翻译表与术语表。
2. 后端：公共文章接口支持 `locale`，实现 read-through 与回退标记。
3. 管理端：翻译状态列表、立即翻译、人工编辑、批量回填。
4. 发布钩子：发布后异步预翻译；历史内容批量回填。
5. 质量：术语表、提示词版本、成本统计、人工校对流程。
6. 前端：文章页接入、机器翻译标记、回退 `noindex`、CDN 失效。
7. 验收：三语页面 SSR 内容正确、hreflang 正确、回退页面 noindex、切换语言保留文章、埋点按语言区分。

### 11.2 验收清单

- [ ] `/en/articles/42` 首屏为英文（或明确回退提示 + noindex），无水合错误。
- [ ] 同一文章并发请求只触发一次 AI 翻译。
- [ ] 源文修改后，旧译文不再被返回。
- [ ] 人工校对后的译文不会被 AI 覆盖。
- [ ] hreflang 只覆盖存在译文的语言。
- [ ] 翻译成本可查询（按文章 / 语言 / 模型）。
- [ ] `zh-TW` 请求不会被归一化成 `zh-CN`。

---

## 12. 已知问题与注意事项

1. **后端语言归一化**
   `reglow/common/i18n.py` 目前 `SUPPORTED_LOCALES = {"zh-CN", "en-US"}`，`zh-TW` 会被归一化为 `zh-CN`。前端已支持 `/zh-TW`，需同步修改：

   ```python
   SUPPORTED_LOCALES = {"zh-CN", "zh-TW", "en-US"}

   # normalize_locale 内：
   if lower.startswith("zh"):
       if any(k in lower for k in ("tw", "hk", "hant", "mo")):
           return "zh-TW"
       return "zh-CN"
   ```

2. **Slug 与 URL**
   当前 `cms_article` 没有 slug，公共页按 ID 访问。若需要 SEO 友好的 URL，建议加 `slug`，并决定各语言是否使用同一 slug（初期建议同一 slug + 语言前缀）。

3. **图片与素材**
   正文图片、封面说明文字若包含语言文字，也需要纳入翻译范围（alt / caption），不要只翻正文。

4. **机器翻译标识**
   建议对机器译文显示标识并提供「查看原文」，符合用户预期，也便于校对。

5. **列表批量翻译**
   列表页批量翻译标题/摘要会放大成本，建议只对进入详情或已发布内容预翻译。

6. **缓存与更新**
   译文更新后要主动失效 CDN / 页面缓存，否则用户长时间看到旧译文。

---

## 13. 相关文件

- 前端路由与 SEO：[nuxt.config.ts](../nuxt.config.ts)、[app/app.vue](../app/app.vue)
- 应用文案：[app/i18n/messages.ts](../app/i18n/messages.ts)
- 文案注册：[app/plugins/i18n.ts](../app/plugins/i18n.ts)
- 语言切换：[app/components/LocaleSwitcher.vue](../app/components/LocaleSwitcher.vue)
- 后端文章模块：`reglow-library/reglow-python/reglow/modules/article/`
- 后端语言工具：`reglow-library/reglow-python/reglow/common/i18n.py`
- 后端 AI 网关：`reglow-library/reglow-python/reglow/modules/ai/gateway.py`
