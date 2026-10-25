<script setup lang="ts">
import {
  setLocale as setReuiLocale,
  useI18n as useReuiI18n
} from '@reglow/reui'
import { site } from '~/utils/site'

// URL 是语言真源（@nuxtjs/i18n），这里读取路由 locale
const { locale: routeLocale } = useI18n()
const { locale: reuiLocale, t } = useReuiI18n()

// 把路由语言同步给 ReUI：组件文案、app.* 文案与 <html lang> 都由 ReUI 输出
watch(routeLocale, value => setReuiLocale(value), { immediate: true })

// hreflang / canonical / og:locale 等 SEO 信息由 @nuxtjs/i18n 统一输出
const localeHead = useLocaleHead({ seo: true })

useHead(() => ({
  title: t('app.meta.title'),
  htmlAttrs: {
    lang: reuiLocale.value || site.locale
  },
  meta: [
    ...(localeHead.value.meta ?? []),
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: t('app.meta.description') },
    { property: 'og:title', content: t('app.meta.title') },
    { property: 'og:description', content: t('app.meta.description') },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    ...(localeHead.value.link ?? [])
  ],
  script: [
    {
      // 在 JS 框架加载前恢复深色模式，并标记 js 可用（滚动揭示依赖该标记）
      key: 'reglow-theme-init',
      innerHTML: `(function(){var r=document.documentElement;r.classList.add('js');try{var t=JSON.parse(localStorage.getItem('reui_theme_config')||'{}');var m=t.mode||'light';var d=m==='dark'||(m==='auto'&&window.matchMedia('(prefers-color-scheme: dark)').matches);r.classList.toggle('dark',d);}catch(e){}})();`
    }
  ]
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
