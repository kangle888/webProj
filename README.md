# Reglow Nuxt Starter

基于 **Nuxt 4 + [@reglow/reui](https://reglow.huoli.tech) + Tailwind CSS 4** 的前端开发模板，面向官网、品牌站、工具网站、电子商务与社区等偏内容与品牌表达的站点。

> 当前版本：**Nuxt 4 + @reglow/reui 0.6.10**（0.6.9：Calendar 统一 grid 列轨道 + sticky 表头、Gauge/Radar 默认色改 `--chart-1`、Checkbox `color`；0.6.10：PageTable 表头「左操作、右筛选」）

开箱包含：克制的企业级视觉与轻动效、布局与导航、主题切换（明暗 + 主色）、多语言切换、组件示例、数据埋点（`@reglow/track`）、ESLint、TypeScript、SSR/SSG 构建。

## 技术栈

| 能力     | 方案                                                               |
| -------- | ------------------------------------------------------------------ |
| 框架     | Nuxt 4（Vue 3 + Nitro）                                            |
| 组件库   | `@reglow/reui`（通过 `@reglow/reui/nuxt` 模块自动注册）            |
| 样式     | Tailwind CSS 4（`@tailwindcss/vite`），语义 token                  |
| 主题     | ReUI 主题引擎 `applyTheme` / `saveTheme`（明暗、主色、圆角、字体） |
| 国际化   | `@nuxtjs/i18n`（路由前缀 / hreflang）+ ReUI 文案                   |
| 数据埋点 | `@reglow/track`（自动采集 + 自定义事件 + 示例接收端）              |
| 代码高亮 | `highlight.js`（SSR / 客户端同步高亮，明暗两套配色）               |
| 代码质量 | ESLint（`@nuxt/eslint`）+ `vue-tsc`                                |

## 快速开始

```bash
# 安装依赖（postinstall 会自动执行 nuxt prepare）
npm install

# 开发调试，默认 http://localhost:3000
npm run dev

# 生产构建 / 本地预览
npm run build
npm run preview
```

也可使用 pnpm / yarn / bun，命令一致。

## 目录结构

```
reglow-nuxt-starter/
├── app/
│   ├── app.vue                    # 根组件：SEO、<html lang>、首屏主题脚本
│   ├── assets/css/main.css        # Tailwind 入口 + 主题 token + 视觉/动效层
│   ├── components/
│   │   ├── AppHeader.vue          # 顶栏（导航 / 语言 / 主题 / Gitee）
│   │   ├── AppFooter.vue
│   │   ├── AppLogo.vue
│   │   ├── CodeBlock.vue          # 代码块（highlight.js 高亮 + 复制）
│   │   ├── LocaleSwitcher.vue     # 基于 ReUI DropdownMenu 的语言切换
│   │   └── ThemeToggle.vue
│   ├── composables/
│   │   ├── useReglowTheme.ts      # 主题状态 + 持久化
│   │   └── useTracker.ts          # 获取埋点实例
│   ├── i18n/
│   │   └── messages.ts            # 应用文案（zh-CN / zh-TW / en-US）
│   ├── layouts/
│   │   └── default.vue            # Header + Main + Footer
│   ├── pages/
│   │   ├── index.vue              # 首页（场景 / 能力 / 组件示例 / 快速开始）
│   │   └── tracking.vue           # 数据埋点介绍页（事件模型 / 在线演示 / 接入方式）
│   ├── plugins/
│   │   ├── i18n.ts                # 注册 app.* 文案（语言由 URL 决定）
│   │   ├── reglow.client.ts       # 客户端恢复主题（localStorage）
│   │   ├── reveal.ts              # v-reveal 滚动揭示指令
│   │   └── track.client.ts        # 初始化 @reglow/track 与路由埋点
│   └── utils/
│       ├── site.ts                # 站点配置单一来源（名称、导航、主题、埋点）
│       ├── tracker.ts             # 埋点实例单例
│       └── highlight.ts           # highlight.js 同步高亮
├── server/api/v1/analytics/
│   └── collect.post.ts            # 示例采集接收端（仅演示，生产请替换）
├── public/favicon.ico
├── nuxt.config.ts
└── package.json
```

## 配置说明

### 站点信息与默认主题

修改 [app/utils/site.ts](app/utils/site.ts)：

```ts
export const site = {
  name: "Reglow Nuxt Starter",
  locale: "zh-CN",
  theme: {
    mode: "light",
    baseColor: "zinc",
    primaryColor: "blue",
    radius: "0.5",
  },
  nav: [
    /* ... */
  ],
};
```

主题可选值来自 ReUI：

- `mode`：`light` / `dark` / `auto`
- `baseColor`：`neutral` / `stone` / `zinc` / `mauve` / `olive` / `mist` / `taupe`
- `primaryColor`：`blue` / `emerald` / `violet` / `orange` / `red` 等 17 种
- `radius`：`"0"` / `"0.3"` / `"0.5"` / `"0.75"` / `"1.0"`

用户切换后的主题会写入 `localStorage("reui_theme_config")`，刷新时由 `app/plugins/reglow.client.ts` 恢复。

### ReUI 模块（nuxt.config.ts）

```ts
modules: ['@reglow/reui/nuxt'],
reui: {
  injectStyles: false, // 宿主已有 Tailwind：只注入 components.css
  prefix: '',          // 组件无前缀，直接写 <Button />
  locale: '',          // 由客户端插件统一初始化
  theme: null
}
```

- 想避免组件重名可设置 `prefix: 'R'`，之后使用 `<RButton />`。
- 未引入 Tailwind 的项目可改为 `injectStyles: true`，由模块注入完整 `style.css`。

### Tailwind 与 ReUI 的关系

[app/assets/css/main.css](app/assets/css/main.css) 中有两处关键配置，删除会导致组件样式缺失：

```css
/* 暗色模式跟随 <html class="dark">，而不是系统偏好 */
@custom-variant dark (&:where(.dark, .dark *));

/* 扫描 ReUI 产物，生成组件内部动态拼装的工具类 */
@source "../../../node_modules/@reglow/reui/dist/components";
```

页面样式统一使用语义 token（`bg-background`、`text-muted-foreground`、`border-border`、`bg-primary` 等），不要写死颜色，否则切换主题不会跟随。

### 排版与代码高亮

`app/assets/css/main.css` 内置了一套排版类，保证标题与正文字号、行高、文字色一致：

| 类名              | 用途                       |
| ----------------- | -------------------------- |
| `heading-display` | 页面主标题（clamp 自适应） |
| `heading-section` | 区块标题                   |
| `heading-card`    | 卡片 / 步骤标题            |
| `text-lead`       | 首屏引导文案（18px / 1.8） |
| `text-body`       | 正文（16px / 1.8）         |
| `text-small`      | 辅助说明（14px / 1.7）     |

代码块统一使用 `<CodeBlock>`（`app/components/CodeBlock.vue`），内部由 highlight.js 同步高亮，服务端与客户端结果一致：

```vue
<CodeBlock
  :code="snippet"
  lang="typescript"
  filename="app/plugins/track.client.ts"
/>
```

- 支持语言：`typescript` / `vue` / `bash`
- 语法配色定义在 `main.css` 的 `--code-*` 变量，明暗主题各一套
- 头部自带文件名与复制按钮

## 新增页面

在 `app/pages` 下创建文件即可，路由按文件名生成：

```
app/pages/index.vue      -> /
app/pages/settings.vue   -> /settings
app/pages/users/[id].vue -> /users/:id
```

ReUI 组件已全局自动注册，页面里直接使用：

```vue
<template>
  <div class="space-y-4">
    <Button>保存</Button>
    <Card title="用户信息">
      <p>卡片内容</p>
    </Card>
  </div>
</template>
```

也可以显式导入（便于类型提示与 tree-shaking）：

```ts
import { Button, Card, PageTable } from "@reglow/reui";
```

## 数据埋点（@reglow/track）

模板已接入 `@reglow/track`，介绍页见 `/tracking`。

```bash
npm install @reglow/track
```

初始化位置 [app/plugins/track.client.ts](app/plugins/track.client.ts)：

```ts
import { createTrack } from "@reglow/track";

export default defineNuxtPlugin((nuxtApp) => {
  const tracker = createTrack({
    appId: "reglow-nuxt-starter",
    autoPageView: false,
    autoTrack: { click: true, exposure: true, scroll: true },
  });

  nuxtApp.vueApp.use(tracker); // 注册 $track 与 v-track
  const router = useRouter();
  tracker.pageView(router.currentRoute.value.fullPath);
  router.afterEach((to) => tracker.pageView(to.fullPath));
});
```

页面埋点两种写法：

```vue
<button data-track-id="buy_btn" data-track-type="button">立即购买</button>
<button v-track="{ id: 'submit_btn', type: 'button' }">提交订单</button>
```

自定义事件：

```ts
const track = useTracker();
track?.track("add_to_cart", { sku: "RG-2026", price: 299 });
track?.trackSearch("再生面料", { clickedRank: 1 });
track?.trackPreference("favorite", { targetType: "product", targetId: 1001 });
```

说明：

- 上报地址配置在 [app/utils/site.ts](app/utils/site.ts) 的 `track.serverUrl`，默认 `/api/v1/analytics/collect`。
- [server/api/v1/analytics/collect.post.ts](server/api/v1/analytics/collect.post.ts) 是仅用于本地演示的接收端，生产环境请删除并换成真实采集服务。
- 自动采集事件可在浏览器 Network 中查看；自定义事件可在 `/tracking` 页面点击按钮观察。
- 隐私：SDK 不采集 `input` / `textarea` / `select` 的文本，并提供 `optOut()` / `optIn()`。

## 国际化说明（路由级）

语言的真源是 **URL**，由 `@nuxtjs/i18n` 负责；文案与组件 locale 复用 ReUI。

| 语言             | URL                         |
| ---------------- | --------------------------- |
| 简体中文（默认） | `/`、`/tracking`            |
| 繁體中文         | `/zh-TW`、`/zh-TW/tracking` |
| English          | `/en`、`/en/tracking`       |

分工：

- 路由 / SEO / 语言检测：[nuxt.config.ts](nuxt.config.ts) 的 `i18n` 配置（`prefix_except_default`、cookie 检测）。
- 应用文案：[app/i18n/messages.ts](app/i18n/messages.ts)，挂在 `app.*`，三语言结构由 `AppMessages` 接口约束。
- 文案注册：[app/plugins/i18n.ts](app/plugins/i18n.ts) 只做 `addLocale`。
- 语言桥接：[app.vue](app/app.vue) 中 `watch(routeLocale → setReuiLocale)`，让 ReUI 组件文案、`t/tm` 与 `<html lang>` 跟随 URL。
- SEO：`useLocaleHead({ seo: true })` 输出 canonical、hreflang 与 og:locale，`i18n.baseUrl` 决定绝对地址。

内部链接必须用 `useLocalePath()`（或 `<NuxtLinkLocale>`），否则切换语言后会丢失前缀：

```vue
const localePath = useLocalePath()

<NuxtLink :to="localePath('/tracking')">Analytics</NuxtLink>
```

> 来自 `reglow-python` 的文章/内容如何翻译与缓存，见 [docs/i18n-content.md](docs/i18n-content.md)（源文 + 翻译表 + AI + 按需缓存）。

新增一种语言：

1. `nuxt.config.ts` 的 `i18n.locales` 增加一项（`code` 决定 URL 前缀）；
2. 在 [messages.ts](app/i18n/messages.ts) 增加一份完整 `AppMessages`；
3. LocaleSwitcher 的 `options` 增加对应项；
4. 需要 ReUI 组件文案时，在 ReUI 语言包补齐。

部署与生成：

- 设置 `NUXT_PUBLIC_SITE_URL`（如 `https://example.com`）为 `i18n.baseUrl`，否则 canonical/hreflang 会指向 localhost。
- `npm run build` 为 SSR；`npm run generate` 会为三种语言生成静态页，可部署到 CDN。
- 如需 sitemap，可加 `@nuxtjs/sitemap`，它会读取 i18n 配置生成多语言 alternates。

注意：

- `t() / tm()` 不能写在模块顶层或 `withDefaults` 默认值里，否则切换语言不会更新。
- 语言切换后 `page_key` 会带前缀（如 `/en/tracking`），埋点报表天然按语言拆分。

## 依赖处理说明

模板在 `package.json` / `nuxt.config.ts` 中做了两处兼容处理，升级依赖时请保留：

| 位置                                    | 配置                                           | 原因                                                                                                                      |
| --------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `package.json` → `overrides`            | `@tanstack/vue-table: 8.21.3`                  | `@reglow/reui` 基于 v8 构建，误装 v9 会报 `Missing export "useVueTable"`                                                  |
| `nuxt.config.ts` → `vite.resolve.alias` | `dayjs/locale/zh-cn.js` → `dayjs/locale/zh-cn` | ReUI 内部带 `.js` 后缀引用语言包，dev 下命中不到预打包条目，会报 `Cannot read properties of undefined (reading 'locale')` |

## 常用命令

| 命令                | 说明                      |
| ------------------- | ------------------------- |
| `npm run dev`       | 启动开发服务器            |
| `npm run build`     | 生产构建（SSR）           |
| `npm run generate`  | 静态站点生成（预渲染）    |
| `npm run preview`   | 预览构建产物              |
| `npm run lint`      | ESLint 检查               |
| `npm run typecheck` | TypeScript / Vue 类型检查 |

## 本地联调 @reglow/reui

想在当前项目里调试组件库源码时，可临时把依赖指向本地目录：

```bash
npm link D:\Huolidev\reglow_project\reui
```

`nuxt.config.ts` 已配置 `vite.resolve.dedupe: ['vue']`，避免软链导致 Vue 双实例。

## 部署

- Node 环境：`npm run build` 后执行 `node .output/server/index.mjs`
- 静态托管：`npm run generate`，产物在 `.output/public`

## License

MIT
