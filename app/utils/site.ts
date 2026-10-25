import type { ThemeConfig } from '@reglow/reui'

/** 顶部导航项：labelKey 指向 app.i18n 中的文案，渲染时翻译 */
export interface NavItem {
  labelKey: string
  to: string
  /** 是否站外链接（渲染为 target="_blank"） */
  external?: boolean
}

/** ReUI 组件库文档站 */
const DOCS_URL = 'https://reglow.huoli.tech'

/**
 * 站点级配置单一来源。
 * 主题默认值、默认语言、导航与仓库地址都在这里改；页面文案见 app/i18n/messages.ts。
 */
export const site = {
  name: 'Reglow Nuxt Starter',
  /** ReUI 组件库文档站 */
  docs: DOCS_URL,
  /** Gitee 组织/仓库地址：替换为自己的项目地址 */
  gitee: 'https://gitee.com/reglow-ai',
  /** 默认语言（无 cookie 时使用）：zh-CN / zh-TW / en-US */
  locale: 'zh-CN',
  /** 默认主题（可被本地 localStorage 缓存覆盖） */
  theme: {
    mode: 'light',
    baseColor: 'zinc',
    primaryColor: 'blue',
    radius: '0.5'
  } as ThemeConfig,
  nav: [
    { labelKey: 'app.nav.home', to: '/' },
    { labelKey: 'app.nav.tracking', to: '/tracking' },
    { labelKey: 'app.nav.docs', to: DOCS_URL, external: true }
  ] satisfies NavItem[],
  /** 埋点 SDK 配置（@reglow/track） */
  track: {
    appId: 'reglow-nuxt-starter',
    appVersion: '0.1.0',
    /** 示例接收端地址；接入真实采集服务时替换 */
    serverUrl: '/api/v1/analytics/collect'
  }
}
