import { addLocale } from '@reglow/reui'
import { appMessages } from '~/i18n/messages'

/**
 * 应用文案注册
 *
 * 语言的真源是 URL（@nuxtjs/i18n），这里只负责把 app.* 文案注入 ReUI 语言包；
 * 两者的同步由 app/app.vue 中的 bridge 完成。
 */
export default defineNuxtPlugin(() => {
  Object.entries(appMessages).forEach(([locale, message]) => {
    addLocale(locale, message)
  })
})
