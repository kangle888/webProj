import type { Tracker } from '@reglow/track'

/** 当前埋点实例（仅客户端可用） */
let activeTracker: Tracker | null = null

export function setActiveTracker(tracker: Tracker | null) {
  activeTracker = tracker
}

export function getActiveTracker(): Tracker | null {
  return activeTracker
}
