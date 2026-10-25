import { DEFAULT_THEME, saveTheme, type ThemeConfig } from '@reglow/reui'
import { site } from '~/utils/site'

/**
 * 全局主题状态。
 * - 状态放在 useState 中，便于任意组件共享
 * - 修改后通过 saveTheme 写入 localStorage 并立即应用到 <html>
 * 注意：仅能在客户端事件回调中调用 setTheme / toggleMode
 */
export function useReglowTheme() {
  const theme = useState<ThemeConfig>('reglow-theme', () => ({
    ...DEFAULT_THEME,
    ...site.theme
  }))

  const isDark = computed(() => theme.value.mode === 'dark')

  /** 局部更新主题并持久化 */
  function setTheme(patch: Partial<ThemeConfig>) {
    theme.value = { ...theme.value, ...patch }
    saveTheme(theme.value)
  }

  /** 在浅色 / 深色之间切换 */
  function toggleMode() {
    setTheme({ mode: isDark.value ? 'light' : 'dark' })
  }

  return { theme, isDark, setTheme, toggleMode }
}
