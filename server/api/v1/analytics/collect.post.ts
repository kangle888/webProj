/**
 * 示例采集接收端（仅用于模板演示）
 *
 * 协议：POST /api/v1/analytics/collect
 * 生产环境请删除本文件，并把 site.track.serverUrl 指向真实采集服务。
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => null)
  const events = Array.isArray(body?.events) ? body.events : []

  return {
    code: 0,
    success: true,
    msg: 'ok',
    data: {
      accepted: events.length,
      dropped: 0
    }
  }
})
