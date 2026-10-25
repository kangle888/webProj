import { createTrack } from '@reglow/track'
import { site } from '~/utils/site'
import { setActiveTracker } from '~/utils/tracker'

/**
 * 埋点初始化（仅客户端）
 *
 * - 自动采集：点击（data-track-id / v-track）、元素曝光、滚动深度
 * - 页面浏览：Nuxt 路由切换后手动上报（关闭 SDK 自带的路由绑定，避免与 Nuxt 路由时序冲突）
 * - 生产环境请把 site.track.serverUrl 换成真实采集服务
 */
export default defineNuxtPlugin((nuxtApp) => {
  const tracker = createTrack({
    appId: site.track.appId,
    appVersion: site.track.appVersion,
    serverUrl: site.track.serverUrl,
    autoPageView: false,
    autoTrack: {
      click: true,
      exposure: true,
      scroll: true
    }
  })

  // 注册 $track 全局属性与 v-track 指令
  nuxtApp.vueApp.use(tracker)
  setActiveTracker(tracker)

  const router = useRouter()
  tracker.pageView(router.currentRoute.value.fullPath)
  router.afterEach((to) => {
    tracker.pageView(to.fullPath)
  })
})
