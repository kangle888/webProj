/**
 * 视觉动效指令（客户端生效，服务端仅注册以避免 SSR 解析告警）
 *
 * - v-reveal：元素进入视口时添加 .is-visible，触发 CSS 过渡
 *   用法：`<div v-reveal>` 或 `<div v-reveal="{ delay: 120 }">`
 * - v-spotlight：跟随指针位置更新 --spot-x / --spot-y，配合 .spotlight 做卡片聚光
 */
const observers = new WeakMap<HTMLElement, IntersectionObserver>()
const detachMap = new WeakMap<HTMLElement, () => void>()

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      const { delay = 0 } = (binding.value ?? {}) as { delay?: number }
      el.style.setProperty('--reveal-delay', `${delay}ms`)

      if (typeof window === 'undefined') return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('is-visible')
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            el.classList.add('is-visible')
            observer.disconnect()
            observers.delete(el)
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
      )

      observer.observe(el)
      observers.set(el, observer)
    },
    unmounted(el: HTMLElement) {
      observers.get(el)?.disconnect()
      observers.delete(el)
    }
  })

  nuxtApp.vueApp.directive('spotlight', {
    mounted(el: HTMLElement) {
      if (typeof window === 'undefined') return

      const move = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
        el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
      }
      const enter = () => el.classList.add('spot-active')
      const leave = () => el.classList.remove('spot-active')

      el.addEventListener('pointermove', move, { passive: true })
      el.addEventListener('pointerenter', enter)
      el.addEventListener('pointerleave', leave)

      detachMap.set(el, () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerenter', enter)
        el.removeEventListener('pointerleave', leave)
        el.classList.remove('spot-active')
      })
    },
    unmounted(el: HTMLElement) {
      detachMap.get(el)?.()
      detachMap.delete(el)
    }
  })
})
