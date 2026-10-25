import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('vue', xml)

export type CodeLanguage = 'bash' | 'typescript' | 'vue'

/**
 * 同步代码高亮。
 * 服务端与客户端使用同一实现，渲染结果一致，避免水合差异。
 */
export function highlightCode(
  code: string,
  lang: CodeLanguage = 'typescript'
): string {
  return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value
}
