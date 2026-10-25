import { applyTheme, DEFAULT_THEME, type ThemeConfig } from '@reglow/reui'
import { site } from '~/utils/site'

/** localStorage 主题缓存 key（与 @reglow/reui 主题引擎保持一致） */
const THEME_CACHE_KEY = 'reui_theme_config'

/**
 * 客户端恢复主题：
 * 默认值取 app/utils/site.ts，若本地有缓存则优先恢复缓存，避免刷新后回到默认主题。
 * 语言由 app/plugins/i18n.ts 统一处理（cookie + ReUI i18n）。
 */
export default defineNuxtPlugin(() => {
  const theme = useState<ThemeConfig>('reglow-theme', () => ({
    ...DEFAULT_THEME,
    ...site.theme
  }))

  try {
    const cached = localStorage.getItem(THEME_CACHE_KEY)
    if (cached) {
      theme.value = { ...theme.value, ...JSON.parse(cached) }
    }
  } catch {
    // 缓存损坏时忽略，回退默认主题
  }

  applyTheme(theme.value)
})
