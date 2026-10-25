import tailwindcss from '@tailwindcss/vite'

// @reglow/reui/nuxt 的模块声明暂未包含 injectStyles（模块实现支持该选项），
// 这里补充类型声明，避免 nuxt.config 类型检查报错
declare module '@reglow/reui/nuxt' {
  interface ReuiNuxtOptions {
    /** 是否注入完整 style.css；false 时仅注入 components.css */
    injectStyles?: boolean
  }
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // 路由级国际化：语言前缀、hreflang、语言检测
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    // ReUI Nuxt 模块：自动注册全部组件、注入组件样式、处理语言/主题运行时
    '@reglow/reui/nuxt'
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-06-30',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // @reglow/reui 内部以 "dayjs/locale/zh-cn.js"（带后缀）引用语言包，
        // 该写法命中不到 Vite 预打包条目，会把 UMD 文件按原样下发给浏览器并报
        // "Cannot read properties of undefined (reading 'locale')"。
        // 统一指向无后缀的形式，走预打包产物。
        'dayjs/locale/zh-cn.js': 'dayjs/locale/zh-cn'
      },
      // 使用 npm link / file: 本地联调 @reglow/reui 时避免 vue 双实例
      dedupe: ['vue']
    },
    optimizeDeps: {
      // @reglow/reui 内部以裸导入引用若干纯 CJS 包，dev 下需预打包，
      // 否则浏览器会报 "does not provide an export named 'default'"
      include: [
        'dayjs',
        'dayjs/plugin/customParseFormat.js',
        'dayjs/plugin/weekOfYear.js',
        'dayjs/locale/zh-cn',
        'qrcode',
        'vuedraggable',
        'sortablejs',
        '@unovis/vue',
        '@unovis/ts'
      ]
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    defaultLocale: 'zh-CN',
    // 默认语言无前缀：/、/tracking；其他语言带前缀：/en、/zh-TW
    strategy: 'prefix_except_default',
    // hreflang 与 canonical 需要绝对地址；部署时用 NUXT_PUBLIC_SITE_URL 覆盖
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    locales: [
      { code: 'zh-CN', language: 'zh-CN', name: '简体中文' },
      { code: 'zh-TW', language: 'zh-TW', name: '繁體中文' },
      // 代码用 en（URL 更短），页面语言为 en-US，ReUI 会自动归一化
      { code: 'en', language: 'en-US', name: 'English' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'zh-CN'
    }
  },

  reui: {
    // 宿主已有 Tailwind CSS 4：只注入 components.css（组件 scoped 样式），
    // 不注入 style.css，避免库内 reset / 主题变量与宿主冲突
    injectStyles: false,
    // 组件不做前缀：直接使用 <Button /> <Card /> <Tabs /> 等
    prefix: '',
    // 语言由 app/plugins/i18n.ts 统一初始化（cookie + ReUI i18n）
    locale: ''
  }
})
