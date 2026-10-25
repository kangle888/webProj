import type { Tracker } from '@reglow/track'
import { getActiveTracker } from '~/utils/tracker'

/**
 * 获取埋点实例。
 * 仅在客户端插件 app/plugins/track.client.ts 执行后可用，SSR 阶段返回 null。
 */
export function useTracker(): Tracker | null {
  return getActiveTracker()
}
