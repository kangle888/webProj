/** 应用文案：与 ReUI 语言包共用一套 locale，通过 addLocale 注入 app.* 命名空间 */

export interface ScenarioItem {
  icon: string
  title: string
  description: string
  tags: string[]
}

export interface FeatureItem {
  icon: string
  title: string
  description: string
}

export interface StepItem {
  title: string
  description: string
}

export interface StatItem {
  value: string
  label: string
}

export interface CapabilityItem {
  icon: string
  title: string
  description: string
}

export interface EventRow {
  code: string
  trigger: string
  fields: string
}

export interface DemoActionItem {
  id: 'cart' | 'search' | 'favorite' | 'rate'
  icon: string
  label: string
  desc: string
}

export interface AppMessages {
  app: {
    meta: {
      title: string
      description: string
      trackingTitle: string
      trackingDescription: string
    }
    nav: {
      home: string
      tracking: string
      docs: string
    }
    common: {
      copy: string
      copied: string
      switchTheme: string
      switchLanguage: string
      openMenu: string
      viewRepo: string
    }
    footer: {
      tagline: string
      product: string
      resources: string
      links: {
        home: string
        tracking: string
        showcase: string
        docs: string
        nuxtDocs: string
        gitee: string
      }
      copyright: string
      builtFor: string
    }
    home: {
      hero: {
        eyebrow: string
        line1: string
        line2: string
        description: string
        primary: string
        secondary: string
        stats: StatItem[]
      }
      panel: {
        window: string
        demo: string
        componentsLabel: string
        scenesLabel: string
        scenesValue: string
        chartTitle: string
        chartDelta: string
        designNote: string
        rows: { short: string, name: string, status: string }[]
        themeLabel: string
        themeValue: string
        localeLabel: string
        localeValue: string
      }
      trackBand: {
        title: string
        description: string
        cta: string
      }
      scenarios: {
        eyebrow: string
        title: string
        description: string
        items: ScenarioItem[]
      }
      features: {
        eyebrow: string
        title: string
        description: string
        items: FeatureItem[]
      }
      showcase: {
        eyebrow: string
        title: string
        description: string
        points: string[]
        docsCta: string
        panelTitle: string
        tabs: { value: string, label: string }[]
        variants: string[]
        sizes: { small: string, default: string, large: string }
        searchLabel: string
        form: {
          label: string
          placeholder: string
          switchLabel: string
          created: string
        }
        feedback: {
          success: string
          info: string
          warning: string
          running: string
          deploying: string
          stopped: string
        }
      }
      quickStart: {
        eyebrow: string
        title: string
        description: string
        steps: StepItem[]
        filename: string
        hint: string
      }
      cta: {
        eyebrow: string
        title: string
        description: string
        primary: string
        secondary: string
      }
    }
    tracking: {
      breadcrumb: {
        home: string
        current: string
      }
      hero: {
        eyebrow: string
        title: string
        description: string
        badges: string[]
        primary: string
        secondary: string
        installTitle: string
        installNotes: string[]
      }
      pipeline: {
        steps: StepItem[]
      }
      capabilities: {
        eyebrow: string
        title: string
        description: string
        items: CapabilityItem[]
      }
      events: {
        eyebrow: string
        title: string
        description: string
        columns: { code: string, trigger: string, fields: string }
        rows: EventRow[]
      }
      demo: {
        eyebrow: string
        title: string
        description: string
        run: string
        actions: DemoActionItem[]
        note: string
        logTitle: string
        logRecent: string
        logEmpty: string
      }
      integrate: {
        eyebrow: string
        title: string
        description: string
        filenames: {
          plugin: string
          page: string
          custom: string
        }
      }
      guidelines: {
        eyebrow: string
        title: string
        description: string
        items: string[]
      }
    }
  }
}

const zhCN: AppMessages = {
  app: {
    meta: {
      title: 'Reglow Nuxt Starter — 企业级 Nuxt 前端模板',
      description:
        '基于 Nuxt 4、ReUI 与 Tailwind CSS 4 的前端模板，适用于官网、品牌站、工具网站、电子商务与社区。',
      trackingTitle: '数据埋点 — Reglow Nuxt Starter',
      trackingDescription:
        '基于 @reglow/track 的前端埋点方案：自动采集页面浏览、点击、曝光与滚动深度，支持业务事件与远程圈选规则。'
    },
    nav: {
      home: '首页',
      tracking: '数据埋点',
      docs: '组件文档'
    },
    common: {
      copy: '复制',
      copied: '已复制',
      switchTheme: '切换主题',
      switchLanguage: '切换语言',
      openMenu: '打开菜单',
      viewRepo: '查看仓库'
    },
    footer: {
      tagline:
        '面向官网、品牌站、工具站、电商与社区的前端模板：Nuxt 4 + ReUI + Tailwind CSS 4，内置主题、国际化与埋点。',
      product: '产品',
      resources: '资源',
      links: {
        home: '首页',
        tracking: '数据埋点',
        showcase: '组件示例',
        docs: '组件文档',
        nuxtDocs: 'Nuxt 文档',
        gitee: 'Gitee'
      },
      copyright:
        '© {year} Reglow Nuxt Starter · 基于 Nuxt 与 @reglow/reui 构建',
      builtFor: 'built for reglow'
    },
    home: {
      hero: {
        eyebrow: 'Nuxt 4 · ReUI · Tailwind CSS 4',
        line1: '面向企业与品牌官网的',
        line2: 'Nuxt 前端模板',
        description:
          '基于 Nuxt 4、ReUI 组件库与 Tailwind CSS 4 的前端开发模板，内置主题切换、国际化与埋点。适用于官网、品牌站、工具网站、电子商务与社区，兼顾信息层级、可访问性与长期维护成本。',
        primary: '开始构建',
        secondary: '数据埋点方案',
        stats: [
          { value: '200+', label: '组件' },
          { value: '3', label: '语言' },
          { value: '0', label: '额外配置' }
        ]
      },
      panel: {
        window: 'workspace / overview',
        demo: 'demo',
        componentsLabel: '可用组件',
        scenesLabel: '覆盖业务场景',
        scenesValue: '6 类',
        chartTitle: '近 7 天组件调用',
        chartDelta: '+18%',
        designNote: 'design tokens · 语义变量驱动',
        rows: [
          { short: 'BT', name: 'Button', status: 'ready' },
          { short: 'TB', name: 'Table', status: 'ready' },
          { short: 'DP', name: 'DatePicker', status: 'ready' }
        ],
        themeLabel: '主题',
        themeValue: 'zinc · blue',
        localeLabel: '语言',
        localeValue: 'zh-CN'
      },
      trackBand: {
        title: '已接入 @reglow/track',
        description:
          '页面浏览、点击、曝光与滚动深度自动采集，支持自定义业务事件。',
        cta: '查看埋点方案'
      },
      scenarios: {
        eyebrow: '01 / scenarios',
        title: '为内容型站点提供稳定底座',
        description:
          '从信息架构到交互细节，模板优先保证可读性与可维护性，而不是追求短期的视觉刺激。',
        items: [
          {
            icon: 'home',
            title: '企业官网',
            description:
              '清晰的信息层级、稳定的首屏表现，适合产品介绍、解决方案与联系我们等页面。',
            tags: ['SSR / SSG', 'SEO']
          },
          {
            icon: 'star',
            title: '品牌站',
            description:
              '克制的视觉表达与统一的排版系统，多语言与主题切换不破坏品牌调性。',
            tags: ['多语言', '主题']
          },
          {
            icon: 'grid',
            title: '工具网站',
            description:
              '表单、表格、上传、日期选择等高频交互组件开箱可用，减少基础建设时间。',
            tags: ['表单', '数据表格']
          },
          {
            icon: 'shopping-cart',
            title: '电子商务',
            description:
              '商品列表、详情、订单与结算链路可直接复用，并内置点击、曝光等埋点能力。',
            tags: ['转化漏斗', '埋点']
          },
          {
            icon: 'users',
            title: '社区',
            description:
              '内容流、用户中心与消息页面的常见结构，支持暗色模式与响应式布局。',
            tags: ['内容流', '用户中心']
          },
          {
            icon: 'file',
            title: '内容与文档',
            description:
              '长文排版、代码块与侧边目录的基础样式已就绪，便于扩展帮助中心与文档站点。',
            tags: ['长文', '代码块']
          }
        ]
      },
      features: {
        eyebrow: '02 / capabilities',
        title: '开箱可用，也便于长期演进',
        description:
          '只保留必要基础设施，业务样式与组件解耦；需要裁剪时，删掉对应目录即可。',
        items: [
          {
            icon: 'grid',
            title: '组件自动注册',
            description:
              'Nuxt 模块扫描 @reglow/reui 全部导出，页面里直接写组件标签，无需逐个 import。'
          },
          {
            icon: 'star',
            title: '主题系统',
            description:
              '明暗模式、主色、中性色、圆角与字体全部由 CSS 变量驱动，切换即时生效。'
          },
          {
            icon: 'globe',
            title: '国际化',
            description:
              '内置简中、繁中、英文，组件文案与 html lang 同步切换，并支持扩展语言包。'
          },
          {
            icon: 'shield',
            title: '服务端渲染',
            description:
              'SSR / SSG 默认可用，主题与语言初始化处理了水合与首屏闪白。'
          },
          {
            icon: 'activity',
            title: '数据埋点',
            description:
              '@reglow/track 已接入：页面浏览、点击、曝光与滚动深度自动采集，支持自定义事件。'
          },
          {
            icon: 'settings',
            title: '工程规范',
            description:
              'TypeScript、ESLint 与构建脚本已配置完成，目录结构按页面、组件、配置分层。'
          }
        ]
      },
      showcase: {
        eyebrow: '03 / components',
        title: '真实组件，直接可用',
        description:
          '这里的按钮、表单与提示都直接来自 @reglow/reui，没有二次封装；切换主题或语言可以立即看到变化。',
        points: [
          '组件未做二次封装，API 与文档保持一致',
          '主题、语言、尺寸都由统一上下文驱动',
          '语义 token 保证暗色模式自动适配'
        ],
        docsCta: '查看全部组件',
        panelTitle: 'reui playground',
        tabs: [
          { value: 'buttons', label: '按钮' },
          { value: 'form', label: '表单' },
          { value: 'feedback', label: '反馈' }
        ],
        variants: [
          '主要按钮',
          '次要按钮',
          '描边按钮',
          '幽灵按钮',
          '危险操作',
          '链接按钮'
        ],
        sizes: { small: '小号', default: '默认', large: '大号' },
        searchLabel: '搜索',
        form: {
          label: '项目名称',
          placeholder: '例如：reglow-admin',
          switchLabel: '接收构建通知',
          created: '已创建项目：{name}'
        },
        feedback: {
          success: '构建成功，产物已生成',
          info: '当前展示的是示例数据',
          warning: '上线前请完成主题与权限配置',
          running: '运行中',
          deploying: '部署中',
          stopped: '已停止'
        }
      },
      quickStart: {
        eyebrow: '04 / quick start',
        title: '三步开始',
        description: '默认使用 npm，也可以替换为 pnpm / yarn / bun。',
        steps: [
          {
            title: '安装依赖',
            description: '执行 npm install，postinstall 会自动生成 Nuxt 类型。'
          },
          {
            title: '修改站点配置',
            description:
              '在 app/utils/site.ts 中调整站点名称、导航、默认主题与语言。'
          },
          {
            title: '开始写页面',
            description:
              '在 app/pages 下新增 .vue 文件即可获得路由，组件自动按需引入。'
          }
        ],
        filename: 'terminal',
        hint: 'node >= 20.19 · 首次安装后自动生成类型'
      },
      cta: {
        eyebrow: '05 / get started',
        title: '从稳定的底座开始',
        description:
          '把 app/utils/site.ts 换成你的项目信息，然后在 app/pages 下创建第一个页面。',
        primary: '立即开始',
        secondary: '查看仓库'
      }
    },
    tracking: {
      breadcrumb: {
        home: '首页',
        current: '数据埋点'
      },
      hero: {
        eyebrow: '@reglow/track · v0.1',
        title: '数据埋点，从第一行代码开始',
        description:
          '模板已接入 @reglow/track：零运行时依赖，自动采集页面浏览、点击、曝光与滚动深度，同时支持搜索、收藏、评分等业务事件。上报链路可替换为你自己的采集服务。',
        badges: ['零运行时依赖', 'SSR 安全', '隐私友好', '批量上报'],
        primary: '查看接入方式',
        secondary: '在线演示',
        installTitle: '安装',
        installNotes: [
          '通过 app/plugins/track.client.ts 初始化，仅在客户端执行。',
          '示例接收端位于 server/api/v1/analytics/collect.post.ts。',
          '生产环境请把 serverUrl 指向真实采集服务。'
        ]
      },
      pipeline: {
        steps: [
          {
            title: '采集',
            description: '自动监听 + 显式调用 track()，生成标准事件体。'
          },
          {
            title: '排队与重试',
            description: '批量入队，失败按指数退避重试，离线时保留。'
          },
          {
            title: '上报与聚合',
            description: 'POST 到采集服务，服务端按事件码生成报表。'
          }
        ]
      },
      capabilities: {
        eyebrow: '01 / capabilities',
        title: '采集能力',
        description:
          '默认开启自动采集，业务侧只需要声明元素标识；其余能力按需开启。',
        items: [
          {
            icon: 'activity',
            title: '自动行为采集',
            description:
              '点击、曝光与滚动深度默认可用，业务代码只需要补 data-track-id。'
          },
          {
            icon: 'package',
            title: '批量上报与重试',
            description:
              '队列批量上报，失败按指数退避重试，离线时保留数据，恢复网络后补发。'
          },
          {
            icon: 'users',
            title: '会话与用户',
            description:
              '默认 30 分钟无事件换新会话；登录后 identify 绑定用户，后续事件自动携带。'
          },
          {
            icon: 'shield',
            title: '隐私友好',
            description:
              '不采集输入框内容，提供 optOut / optIn，支持采样率控制自定义事件。'
          },
          {
            icon: 'globe',
            title: 'SSR 安全',
            description:
              '服务端没有 window 时自动降级为内存适配器，导入与初始化都不会报错。'
          },
          {
            icon: 'settings',
            title: '远程规则',
            description:
              '支持后端下发可视化圈选规则，命中元素自动埋点，无需逐个改代码。'
          }
        ]
      },
      events: {
        eyebrow: '02 / events',
        title: '事件模型',
        description:
          '标准事件由 SDK 自动上报，业务事件通过 track / trackSearch / trackPreference 发送。',
        columns: {
          code: '事件码',
          trigger: '触发时机',
          fields: '关键字段'
        },
        rows: [
          {
            code: '$page_view',
            trigger: '进入页面 / 路由切换',
            fields: 'page_key · page_version'
          },
          {
            code: '$click',
            trigger: '点击带 data-track-id 的元素',
            fields: 'elem_id · elem_type · text · x / y'
          },
          {
            code: '$exposure',
            trigger: '元素可见 ≥ 50% 且持续 ≥ 500ms',
            fields: 'elem_id · ratio · visible_ms'
          },
          {
            code: '$scroll',
            trigger: '滚动深度每增加 10%',
            fields: 'depth · depth_px · page_version'
          },
          {
            code: 'biz.search',
            trigger: '搜索提交与结果点击',
            fields: 'query · is_zero_result · clicked_rank · converted'
          },
          {
            code: 'biz.favorite',
            trigger: '收藏 / 点赞 / 分享 / 评分',
            fields: 'target_type · target_id · score'
          }
        ]
      },
      demo: {
        eyebrow: '03 / demo',
        title: '在线演示',
        description:
          '点击左侧按钮会真实调用 SDK 方法；右侧展示本次演示上报的自定义事件。',
        run: '触发',
        actions: [
          {
            id: 'cart',
            icon: 'shopping-cart',
            label: '加入购物车',
            desc: 'track(add_to_cart)'
          },
          {
            id: 'search',
            icon: 'search',
            label: '搜索结果点击',
            desc: 'trackSearch()'
          },
          {
            id: 'favorite',
            icon: 'star',
            label: '收藏商品',
            desc: 'trackPreference(favorite)'
          },
          {
            id: 'rate',
            icon: 'success',
            label: '提交评分',
            desc: 'trackPreference(rate, 5)'
          }
        ],
        note: '自动采集的 $page_view / $click / $exposure / $scroll 可在浏览器 Network 中查看 /api/v1/analytics/collect 请求。',
        logTitle: 'event log',
        logRecent: '最近 4 条',
        logEmpty: '暂无事件，点击左侧按钮开始。'
      },
      integrate: {
        eyebrow: '04 / integrate',
        title: '接入方式',
        description: '模板已完成初始化；新建项目时按下面三步接入即可。',
        filenames: {
          plugin: 'app/plugins/track.client.ts',
          page: 'app/pages/example.vue',
          custom: '业务事件调用'
        }
      },
      guidelines: {
        eyebrow: '05 / guidelines',
        title: '埋点规范建议',
        description:
          '埋点是长期资产。统一命名与口径，比一次性的全量采集更重要。',
        items: [
          'elem_id 使用「模块_动作」命名，如 detail_add_cart，避免直接使用用户可见文案。',
          '关键转化单独定义事件与属性，不要把多个业务含义塞进同一个事件。',
          '曝光阈值按内容类型调整：列表卡片可降低，重要横幅可提高。',
          '页面改版后 page_version 会变化，历史热点图不应与新版本混算。',
          '上线前确认采样率与上报地址，避免把测试流量写入生产报表。'
        ]
      }
    }
  }
}

const zhTW: AppMessages = {
  app: {
    meta: {
      title: 'Reglow Nuxt Starter — 企業級 Nuxt 前端範本',
      description:
        '基於 Nuxt 4、ReUI 與 Tailwind CSS 4 的前端範本，適用於官網、品牌站、工具網站、電子商務與社群。',
      trackingTitle: '資料埋點 — Reglow Nuxt Starter',
      trackingDescription:
        '基於 @reglow/track 的前端埋點方案：自動採集頁面瀏覽、點擊、曝光與滾動深度，支援業務事件與遠端圈選規則。'
    },
    nav: {
      home: '首頁',
      tracking: '資料埋點',
      docs: '元件文件'
    },
    common: {
      copy: '複製',
      copied: '已複製',
      switchTheme: '切換主題',
      switchLanguage: '切換語言',
      openMenu: '開啟選單',
      viewRepo: '檢視儲存庫'
    },
    footer: {
      tagline:
        '面向官網、品牌站、工具站、電商與社群的前端範本：Nuxt 4 + ReUI + Tailwind CSS 4，內建主題、國際化與埋點。',
      product: '產品',
      resources: '資源',
      links: {
        home: '首頁',
        tracking: '資料埋點',
        showcase: '元件範例',
        docs: '元件文件',
        nuxtDocs: 'Nuxt 文件',
        gitee: 'Gitee'
      },
      copyright:
        '© {year} Reglow Nuxt Starter · 基於 Nuxt 與 @reglow/reui 建置',
      builtFor: 'built for reglow'
    },
    home: {
      hero: {
        eyebrow: 'Nuxt 4 · ReUI · Tailwind CSS 4',
        line1: '面向企業與品牌官網的',
        line2: 'Nuxt 前端範本',
        description:
          '基於 Nuxt 4、ReUI 元件庫與 Tailwind CSS 4 的前端開發範本，內建主題切換、國際化與埋點。適用於官網、品牌站、工具網站、電子商務與社群，兼顧資訊層級、可及性與長期維護成本。',
        primary: '開始建置',
        secondary: '資料埋點方案',
        stats: [
          { value: '200+', label: '元件' },
          { value: '3', label: '語言' },
          { value: '0', label: '額外設定' }
        ]
      },
      panel: {
        window: 'workspace / overview',
        demo: 'demo',
        componentsLabel: '可用元件',
        scenesLabel: '覆蓋業務場景',
        scenesValue: '6 類',
        chartTitle: '近 7 天元件呼叫',
        chartDelta: '+18%',
        designNote: 'design tokens · 語意變數驅動',
        rows: [
          { short: 'BT', name: 'Button', status: 'ready' },
          { short: 'TB', name: 'Table', status: 'ready' },
          { short: 'DP', name: 'DatePicker', status: 'ready' }
        ],
        themeLabel: '主題',
        themeValue: 'zinc · blue',
        localeLabel: '語言',
        localeValue: 'zh-TW'
      },
      trackBand: {
        title: '已接入 @reglow/track',
        description:
          '頁面瀏覽、點擊、曝光與滾動深度自動採集，支援自訂業務事件。',
        cta: '查看埋點方案'
      },
      scenarios: {
        eyebrow: '01 / scenarios',
        title: '為內容型網站提供穩定底座',
        description:
          '從資訊架構到互動細節，範本優先確保可讀性與可維護性，而不是追求短期的視覺刺激。',
        items: [
          {
            icon: 'home',
            title: '企業官網',
            description:
              '清晰的資訊層級、穩定的首屏表現，適合產品介紹、解決方案與聯絡我們等頁面。',
            tags: ['SSR / SSG', 'SEO']
          },
          {
            icon: 'star',
            title: '品牌站',
            description:
              '克制的視覺表達與統一的排版系統，多語言與主題切換不破壞品牌調性。',
            tags: ['多語言', '主題']
          },
          {
            icon: 'grid',
            title: '工具網站',
            description:
              '表單、表格、上傳、日期選擇等高頻互動元件開箱可用，減少基礎建設時間。',
            tags: ['表單', '資料表格']
          },
          {
            icon: 'shopping-cart',
            title: '電子商務',
            description:
              '商品列表、詳情、訂單與結帳流程可直接重用，並內建點擊、曝光等埋點能力。',
            tags: ['轉換漏斗', '埋點']
          },
          {
            icon: 'users',
            title: '社群',
            description:
              '內容流、會員中心與訊息頁面的常見結構，支援暗色模式與響應式版面。',
            tags: ['內容流', '會員中心']
          },
          {
            icon: 'file',
            title: '內容與文件',
            description:
              '長文排版、程式碼區塊與側邊目錄的基礎樣式已就緒，便於擴充說明中心與文件網站。',
            tags: ['長文', '程式碼區塊']
          }
        ]
      },
      features: {
        eyebrow: '02 / capabilities',
        title: '開箱可用，也便於長期演進',
        description:
          '只保留必要基礎設施，業務樣式與元件解耦；需要裁剪時，刪掉對應目錄即可。',
        items: [
          {
            icon: 'grid',
            title: '元件自動註冊',
            description:
              'Nuxt 模組掃描 @reglow/reui 全部匯出，頁面裡直接寫元件標籤，無需逐一 import。'
          },
          {
            icon: 'star',
            title: '主題系統',
            description:
              '明暗模式、主色、中性色、圓角與字型全部由 CSS 變數驅動，切換即時生效。'
          },
          {
            icon: 'globe',
            title: '國際化',
            description:
              '內建簡中、繁中、英文，元件文案與 html lang 同步切換，並支援擴充語言包。'
          },
          {
            icon: 'shield',
            title: '伺服器渲染',
            description:
              'SSR / SSG 預設可用，主題與語言初始化處理了水合與首屏閃白。'
          },
          {
            icon: 'activity',
            title: '資料埋點',
            description:
              '@reglow/track 已接入：頁面瀏覽、點擊、曝光與滾動深度自動採集，支援自訂事件。'
          },
          {
            icon: 'settings',
            title: '工程規範',
            description:
              'TypeScript、ESLint 與建置腳本已設定完成，目錄結構依頁面、元件、設定分層。'
          }
        ]
      },
      showcase: {
        eyebrow: '03 / components',
        title: '真實元件，直接可用',
        description:
          '這裡的按鈕、表單與提示都直接來自 @reglow/reui，沒有二次封裝；切換主題或語言可以立即看到變化。',
        points: [
          '元件未做二次封裝，API 與文件保持一致',
          '主題、語言、尺寸都由統一上下文驅動',
          '語意 token 確保暗色模式自動適配'
        ],
        docsCta: '查看全部元件',
        panelTitle: 'reui playground',
        tabs: [
          { value: 'buttons', label: '按鈕' },
          { value: 'form', label: '表單' },
          { value: 'feedback', label: '回饋' }
        ],
        variants: [
          '主要按鈕',
          '次要按鈕',
          '描邊按鈕',
          '幽靈按鈕',
          '危險操作',
          '連結按鈕'
        ],
        sizes: { small: '小號', default: '預設', large: '大號' },
        searchLabel: '搜尋',
        form: {
          label: '專案名稱',
          placeholder: '例如：reglow-admin',
          switchLabel: '接收建置通知',
          created: '已建立專案：{name}'
        },
        feedback: {
          success: '建置成功，產物已產生',
          info: '目前顯示的是範例資料',
          warning: '上線前請完成主題與權限設定',
          running: '運行中',
          deploying: '部署中',
          stopped: '已停止'
        }
      },
      quickStart: {
        eyebrow: '04 / quick start',
        title: '三步開始',
        description: '預設使用 npm，也可以替換為 pnpm / yarn / bun。',
        steps: [
          {
            title: '安裝依賴',
            description: '執行 npm install，postinstall 會自動產生 Nuxt 型別。'
          },
          {
            title: '修改站點設定',
            description:
              '在 app/utils/site.ts 中調整站點名稱、導覽、預設主題與語言。'
          },
          {
            title: '開始寫頁面',
            description:
              '在 app/pages 下新增 .vue 檔案即可取得路由，元件自動按需引入。'
          }
        ],
        filename: 'terminal',
        hint: 'node >= 20.19 · 首次安裝後自動產生型別'
      },
      cta: {
        eyebrow: '05 / get started',
        title: '從穩定的底座開始',
        description:
          '把 app/utils/site.ts 換成你的專案資訊，然後在 app/pages 下建立第一個頁面。',
        primary: '立即開始',
        secondary: '查看儲存庫'
      }
    },
    tracking: {
      breadcrumb: {
        home: '首頁',
        current: '資料埋點'
      },
      hero: {
        eyebrow: '@reglow/track · v0.1',
        title: '資料埋點，從第一行程式碼開始',
        description:
          '範本已接入 @reglow/track：零執行時依賴，自動採集頁面瀏覽、點擊、曝光與滾動深度，同時支援搜尋、收藏、評分等業務事件。上報鏈路可替換為你自己的採集服務。',
        badges: ['零執行時依賴', 'SSR 安全', '隱私友善', '批次上報'],
        primary: '查看接入方式',
        secondary: '線上示範',
        installTitle: '安裝',
        installNotes: [
          '透過 app/plugins/track.client.ts 初始化，僅在客戶端執行。',
          '範例接收端位於 server/api/v1/analytics/collect.post.ts。',
          '生產環境請把 serverUrl 指向真實採集服務。'
        ]
      },
      pipeline: {
        steps: [
          {
            title: '採集',
            description: '自動監聽 + 顯式呼叫 track()，產生標準事件體。'
          },
          {
            title: '排隊與重試',
            description: '批次入列，失敗依指數退避重試，離線時保留。'
          },
          {
            title: '上報與聚合',
            description: 'POST 到採集服務，伺服器依事件碼產生報表。'
          }
        ]
      },
      capabilities: {
        eyebrow: '01 / capabilities',
        title: '採集能力',
        description:
          '預設開啟自動採集，業務端只需要宣告元素識別；其餘能力按需開啟。',
        items: [
          {
            icon: 'activity',
            title: '自動行為採集',
            description:
              '點擊、曝光與滾動深度預設可用，業務程式碼只需要補 data-track-id。'
          },
          {
            icon: 'package',
            title: '批次上報與重試',
            description:
              '佇列批次上報，失敗依指數退避重試，離線時保留資料，恢復網路後補送。'
          },
          {
            icon: 'users',
            title: '工作階段與使用者',
            description:
              '預設 30 分鐘無事件換新工作階段；登入後 identify 綁定使用者，後續事件自動攜帶。'
          },
          {
            icon: 'shield',
            title: '隱私友善',
            description:
              '不採集輸入框內容，提供 optOut / optIn，支援取樣率控制自訂事件。'
          },
          {
            icon: 'globe',
            title: 'SSR 安全',
            description:
              '伺服器沒有 window 時自動降級為記憶體適配器，匯入與初始化都不會報錯。'
          },
          {
            icon: 'settings',
            title: '遠端規則',
            description:
              '支援後端下發視覺化圈選規則，命中元素自動埋點，無需逐一改程式碼。'
          }
        ]
      },
      events: {
        eyebrow: '02 / events',
        title: '事件模型',
        description:
          '標準事件由 SDK 自動上報，業務事件透過 track / trackSearch / trackPreference 發送。',
        columns: {
          code: '事件碼',
          trigger: '觸發時機',
          fields: '關鍵欄位'
        },
        rows: [
          {
            code: '$page_view',
            trigger: '進入頁面 / 路由切換',
            fields: 'page_key · page_version'
          },
          {
            code: '$click',
            trigger: '點擊帶 data-track-id 的元素',
            fields: 'elem_id · elem_type · text · x / y'
          },
          {
            code: '$exposure',
            trigger: '元素可見 ≥ 50% 且持續 ≥ 500ms',
            fields: 'elem_id · ratio · visible_ms'
          },
          {
            code: '$scroll',
            trigger: '滾動深度每增加 10%',
            fields: 'depth · depth_px · page_version'
          },
          {
            code: 'biz.search',
            trigger: '搜尋提交與結果點擊',
            fields: 'query · is_zero_result · clicked_rank · converted'
          },
          {
            code: 'biz.favorite',
            trigger: '收藏 / 按讚 / 分享 / 評分',
            fields: 'target_type · target_id · score'
          }
        ]
      },
      demo: {
        eyebrow: '03 / demo',
        title: '線上示範',
        description:
          '點擊左側按鈕會實際呼叫 SDK 方法；右側顯示本次示範上報的自訂事件。',
        run: '觸發',
        actions: [
          {
            id: 'cart',
            icon: 'shopping-cart',
            label: '加入購物車',
            desc: 'track(add_to_cart)'
          },
          {
            id: 'search',
            icon: 'search',
            label: '搜尋結果點擊',
            desc: 'trackSearch()'
          },
          {
            id: 'favorite',
            icon: 'star',
            label: '收藏商品',
            desc: 'trackPreference(favorite)'
          },
          {
            id: 'rate',
            icon: 'success',
            label: '提交評分',
            desc: 'trackPreference(rate, 5)'
          }
        ],
        note: '自動採集的 $page_view / $click / $exposure / $scroll 可在瀏覽器 Network 中查看 /api/v1/analytics/collect 請求。',
        logTitle: 'event log',
        logRecent: '最近 4 筆',
        logEmpty: '尚無事件，點擊左側按鈕開始。'
      },
      integrate: {
        eyebrow: '04 / integrate',
        title: '接入方式',
        description: '範本已完成初始化；新建專案時依下面三步接入即可。',
        filenames: {
          plugin: 'app/plugins/track.client.ts',
          page: 'app/pages/example.vue',
          custom: '業務事件呼叫'
        }
      },
      guidelines: {
        eyebrow: '05 / guidelines',
        title: '埋點規範建議',
        description:
          '埋點是長期資產。統一命名與口徑，比一次性的全量採集更重要。',
        items: [
          'elem_id 使用「模組_動作」命名，如 detail_add_cart，避免直接使用使用者可見文案。',
          '關鍵轉換單獨定義事件與屬性，不要把多個業務含義塞進同一個事件。',
          '曝光閾值依內容類型調整：列表卡片可降低，重要橫幅可提高。',
          '頁面改版後 page_version 會變化，歷史熱點圖不應與新版本混算。',
          '上線前確認取樣率與上報位址，避免把測試流量寫入生產報表。'
        ]
      }
    }
  }
}

const enUS: AppMessages = {
  app: {
    meta: {
      title: 'Reglow Nuxt Starter — Enterprise Nuxt Frontend Template',
      description:
        'A production-ready Nuxt 4 template with ReUI and Tailwind CSS 4 for corporate sites, brand sites, tools, e-commerce and communities.',
      trackingTitle: 'Analytics — Reglow Nuxt Starter',
      trackingDescription:
        'Event tracking with @reglow/track: automatic page views, clicks, exposures and scroll depth, plus business events and remote rules.'
    },
    nav: {
      home: 'Home',
      tracking: 'Analytics',
      docs: 'Components'
    },
    common: {
      copy: 'Copy',
      copied: 'Copied',
      switchTheme: 'Toggle theme',
      switchLanguage: 'Switch language',
      openMenu: 'Open menu',
      viewRepo: 'View repository'
    },
    footer: {
      tagline:
        'A Nuxt 4 + ReUI + Tailwind CSS 4 starter for corporate sites, brands, tools, e-commerce and communities — with theming, i18n and analytics built in.',
      product: 'Product',
      resources: 'Resources',
      links: {
        home: 'Home',
        tracking: 'Analytics',
        showcase: 'Components',
        docs: 'Component docs',
        nuxtDocs: 'Nuxt docs',
        gitee: 'Gitee'
      },
      copyright:
        '© {year} Reglow Nuxt Starter · Built with Nuxt and @reglow/reui',
      builtFor: 'built for reglow'
    },
    home: {
      hero: {
        eyebrow: 'Nuxt 4 · ReUI · Tailwind CSS 4',
        line1: 'A Nuxt starter built for',
        line2: 'corporate and brand sites',
        description:
          'A frontend template built on Nuxt 4, ReUI and Tailwind CSS 4, with theming, i18n and analytics included. Suitable for corporate sites, brand sites, web tools, e-commerce and communities — designed for readability, accessibility and long-term maintenance.',
        primary: 'Start building',
        secondary: 'Analytics setup',
        stats: [
          { value: '200+', label: 'Components' },
          { value: '3', label: 'Locales' },
          { value: '0', label: 'Extra config' }
        ]
      },
      panel: {
        window: 'workspace / overview',
        demo: 'demo',
        componentsLabel: 'Components',
        scenesLabel: 'Use cases',
        scenesValue: '6 types',
        chartTitle: 'Component calls · last 7 days',
        chartDelta: '+18%',
        designNote: 'design tokens · CSS variables',
        rows: [
          { short: 'BT', name: 'Button', status: 'ready' },
          { short: 'TB', name: 'Table', status: 'ready' },
          { short: 'DP', name: 'DatePicker', status: 'ready' }
        ],
        themeLabel: 'Theme',
        themeValue: 'zinc · blue',
        localeLabel: 'Locale',
        localeValue: 'en-US'
      },
      trackBand: {
        title: 'Powered by @reglow/track',
        description:
          'Page views, clicks, exposures and scroll depth are captured automatically, with custom business events on top.',
        cta: 'Explore analytics'
      },
      scenarios: {
        eyebrow: '01 / scenarios',
        title: 'A stable foundation for content sites',
        description:
          'Readability and maintainability come first — from information architecture down to interaction details.',
        items: [
          {
            icon: 'home',
            title: 'Corporate sites',
            description:
              'A clear hierarchy and stable first paint for product, solution and contact pages.',
            tags: ['SSR / SSG', 'SEO']
          },
          {
            icon: 'star',
            title: 'Brand sites',
            description:
              'A restrained visual language and consistent type system that survives locale and theme changes.',
            tags: ['i18n', 'Theming']
          },
          {
            icon: 'grid',
            title: 'Web tools',
            description:
              'Forms, tables, uploads and date pickers are ready to use, cutting foundation work.',
            tags: ['Forms', 'Data tables']
          },
          {
            icon: 'shopping-cart',
            title: 'E-commerce',
            description:
              'Product, order and checkout flows can be reused, with click and exposure tracking built in.',
            tags: ['Funnels', 'Analytics']
          },
          {
            icon: 'users',
            title: 'Communities',
            description:
              'Feeds, member centers and message pages, with dark mode and responsive layouts.',
            tags: ['Feeds', 'Member center']
          },
          {
            icon: 'file',
            title: 'Content & docs',
            description:
              'Long-form typography, code blocks and side navigation are ready for help centers and documentation.',
            tags: ['Long-form', 'Code blocks']
          }
        ]
      },
      features: {
        eyebrow: '02 / capabilities',
        title: 'Ready out of the box, built to evolve',
        description:
          'Only the essentials, with styles decoupled from components. Remove whatever you do not need.',
        items: [
          {
            icon: 'grid',
            title: 'Auto-registered components',
            description:
              'The Nuxt module registers every ReUI export, so you can use component tags without imports.'
          },
          {
            icon: 'star',
            title: 'Theme system',
            description:
              'Light and dark mode, primary and neutral colors, radius and fonts are driven by CSS variables.'
          },
          {
            icon: 'globe',
            title: 'Internationalization',
            description:
              'Simplified Chinese, Traditional Chinese and English, with html lang kept in sync and room to extend.'
          },
          {
            icon: 'shield',
            title: 'Server rendering',
            description:
              'SSR and SSG work by default, with hydration and first-paint theming handled for you.'
          },
          {
            icon: 'activity',
            title: 'Analytics',
            description:
              '@reglow/track captures page views, clicks, exposures and scroll depth, plus custom events.'
          },
          {
            icon: 'settings',
            title: 'Engineering conventions',
            description:
              'TypeScript, ESLint and build scripts are configured, with pages, components and config separated.'
          }
        ]
      },
      showcase: {
        eyebrow: '03 / components',
        title: 'Real components, ready to use',
        description:
          'Buttons, forms and alerts come straight from @reglow/reui with no wrappers. Switch theme or locale and see them update.',
        points: [
          'No wrappers — APIs match the documentation',
          'Theme, locale and size share one context',
          'Semantic tokens keep dark mode consistent'
        ],
        docsCta: 'Browse all components',
        panelTitle: 'reui playground',
        tabs: [
          { value: 'buttons', label: 'Buttons' },
          { value: 'form', label: 'Form' },
          { value: 'feedback', label: 'Feedback' }
        ],
        variants: [
          'Primary',
          'Secondary',
          'Outline',
          'Ghost',
          'Destructive',
          'Link'
        ],
        sizes: { small: 'Small', default: 'Default', large: 'Large' },
        searchLabel: 'Search',
        form: {
          label: 'Project name',
          placeholder: 'e.g. reglow-admin',
          switchLabel: 'Build notifications',
          created: 'Project created: {name}'
        },
        feedback: {
          success: 'Build finished — artifacts are ready',
          info: 'Showing sample data',
          warning: 'Finish theme and permission setup before launch',
          running: 'Running',
          deploying: 'Deploying',
          stopped: 'Stopped'
        }
      },
      quickStart: {
        eyebrow: '04 / quick start',
        title: 'Three steps to start',
        description: 'Uses npm by default; pnpm, yarn or bun work too.',
        steps: [
          {
            title: 'Install dependencies',
            description:
              'Run npm install — postinstall generates Nuxt types for you.'
          },
          {
            title: 'Configure the site',
            description:
              'Adjust the site name, navigation, default theme and locale in app/utils/site.ts.'
          },
          {
            title: 'Build your first page',
            description:
              'Create a .vue file under app/pages to get a route; components are imported on demand.'
          }
        ],
        filename: 'terminal',
        hint: 'node >= 20.19 · types are generated after install'
      },
      cta: {
        eyebrow: '05 / get started',
        title: 'Start from a stable foundation',
        description:
          'Replace the site info in app/utils/site.ts, then create your first page under app/pages.',
        primary: 'Get started',
        secondary: 'View repository'
      }
    },
    tracking: {
      breadcrumb: {
        home: 'Home',
        current: 'Analytics'
      },
      hero: {
        eyebrow: '@reglow/track · v0.1',
        title: 'Analytics, from the first line of code',
        description:
          'This template ships with @reglow/track: zero runtime dependencies, automatic page views, clicks, exposures and scroll depth, plus search, favorites and ratings. Point it at your own collector when going live.',
        badges: [
          'Zero dependencies',
          'SSR-safe',
          'Privacy-friendly',
          'Batched'
        ],
        primary: 'Read the integration guide',
        secondary: 'Live demo',
        installTitle: 'Install',
        installNotes: [
          'Initialized in app/plugins/track.client.ts (client only).',
          'A sample collector lives at server/api/v1/analytics/collect.post.ts.',
          'Point serverUrl at your real collector in production.'
        ]
      },
      pipeline: {
        steps: [
          {
            title: 'Capture',
            description:
              'Automatic listeners plus explicit track() calls produce standard events.'
          },
          {
            title: 'Queue & retry',
            description:
              'Batched queues with exponential backoff; data survives offline periods.'
          },
          {
            title: 'Deliver & aggregate',
            description:
              'POST to the collector; reports are built server-side from event codes.'
          }
        ]
      },
      capabilities: {
        eyebrow: '01 / capabilities',
        title: 'Collection capabilities',
        description:
          'Automatic tracking is on by default — declare element IDs and you are done.',
        items: [
          {
            icon: 'activity',
            title: 'Automatic behavior tracking',
            description:
              'Clicks, exposures and scroll depth work out of the box; add data-track-id where needed.'
          },
          {
            icon: 'package',
            title: 'Batched delivery & retries',
            description:
              'Queue-based batching with exponential backoff and offline persistence.'
          },
          {
            icon: 'users',
            title: 'Sessions & users',
            description:
              '30-minute sessions by default; identify() binds users to subsequent events.'
          },
          {
            icon: 'shield',
            title: 'Privacy-friendly',
            description:
              'Input values are never collected; optOut / optIn and sampling are supported.'
          },
          {
            icon: 'globe',
            title: 'SSR-safe',
            description:
              'Without window, the SDK falls back to an in-memory adapter — imports never throw.'
          },
          {
            icon: 'settings',
            title: 'Remote rules',
            description:
              'Visual selection rules can be delivered by your backend, with no code changes.'
          }
        ]
      },
      events: {
        eyebrow: '02 / events',
        title: 'Event model',
        description:
          'Standard events are sent by the SDK; business events go through track / trackSearch / trackPreference.',
        columns: {
          code: 'Event',
          trigger: 'Trigger',
          fields: 'Key fields'
        },
        rows: [
          {
            code: '$page_view',
            trigger: 'Route enter',
            fields: 'page_key · page_version'
          },
          {
            code: '$click',
            trigger: 'Click on an element with data-track-id',
            fields: 'elem_id · elem_type · text · x / y'
          },
          {
            code: '$exposure',
            trigger: 'Visible ≥ 50% for ≥ 500ms',
            fields: 'elem_id · ratio · visible_ms'
          },
          {
            code: '$scroll',
            trigger: 'Every +10% of scroll depth',
            fields: 'depth · depth_px · page_version'
          },
          {
            code: 'biz.search',
            trigger: 'Search submit or result click',
            fields: 'query · is_zero_result · clicked_rank · converted'
          },
          {
            code: 'biz.favorite',
            trigger: 'Favorite / like / share / rate',
            fields: 'target_type · target_id · score'
          }
        ]
      },
      demo: {
        eyebrow: '03 / demo',
        title: 'Live demo',
        description:
          'Each button calls the SDK; the panel shows the custom events sent in this session.',
        run: 'Run',
        actions: [
          {
            id: 'cart',
            icon: 'shopping-cart',
            label: 'Add to cart',
            desc: 'track(add_to_cart)'
          },
          {
            id: 'search',
            icon: 'search',
            label: 'Click a search result',
            desc: 'trackSearch()'
          },
          {
            id: 'favorite',
            icon: 'star',
            label: 'Favorite product',
            desc: 'trackPreference(favorite)'
          },
          {
            id: 'rate',
            icon: 'success',
            label: 'Submit rating',
            desc: 'trackPreference(rate, 5)'
          }
        ],
        note: 'Automatic $page_view / $click / $exposure / $scroll events are visible in the Network panel under /api/v1/analytics/collect.',
        logTitle: 'event log',
        logRecent: 'Latest 4',
        logEmpty: 'No events yet — trigger one on the left.'
      },
      integrate: {
        eyebrow: '04 / integrate',
        title: 'Integration',
        description:
          'The template is already wired up; follow these three steps for a new project.',
        filenames: {
          plugin: 'app/plugins/track.client.ts',
          page: 'app/pages/example.vue',
          custom: 'Business events'
        }
      },
      guidelines: {
        eyebrow: '05 / guidelines',
        title: 'Naming guidelines',
        description:
          'Tracking is a long-lived asset. Consistent naming matters more than collecting everything at once.',
        items: [
          'Name elem_id as module_action, e.g. detail_add_cart — never reuse user-facing copy.',
          'Define dedicated events and properties for key conversions instead of overloading one event.',
          'Tune the exposure threshold by content type: lower for list cards, higher for hero banners.',
          'page_version changes after a redesign; do not mix heatmaps across versions.',
          'Confirm sampling and the collector URL before launch so test traffic never reaches production reports.'
        ]
      }
    }
  }
}

export const appMessages: Record<string, AppMessages> = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en-US': enUS
}
