<script setup lang="ts">
import { useI18n } from '@reglow/reui'
import { highlightCode, type CodeLanguage } from '~/utils/highlight'

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    /** 原始代码 */
    code: string
    /** 语言：bash / typescript / vue */
    lang?: CodeLanguage
    /** 头部文件名（也用于纯文本场景的标题） */
    filename?: string
  }>(),
  {
    lang: 'typescript',
    filename: ''
  }
)

const highlighted = computed(() => highlightCode(props.code, props.lang))

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copied.value = false
    }, 1600)
  } catch {
    copied.value = false
  }
}

onBeforeUnmount(() => clearTimeout(copyTimer))
</script>

<template>
  <div
    class="code-block overflow-hidden rounded-lg border border-border/80 bg-card"
  >
    <div
      class="flex items-center justify-between gap-3 border-b border-border/70 bg-muted/40 px-3.5 py-2"
    >
      <span class="truncate font-mono text-[11px] text-muted-foreground">
        {{ filename }}
      </span>
      <Button
        variant="ghost"
        size="sm"
        class="h-7 shrink-0 gap-1.5 px-2 text-[11px]"
        @click="copyCode"
      >
        <Icon
          :name="copied ? 'check' : 'copy'"
          size="0.75rem"
        />
        {{ copied ? t("app.common.copied") : t("app.common.copy") }}
      </Button>
    </div>

    <!-- eslint-disable vue/no-v-html -- 内容由本地 highlight.js 生成并转义，非用户输入 -->
    <pre><code
      class="hljs"
      v-html="highlighted"
    /></pre>
    <!-- eslint-enable vue/no-v-html -->
  </div>
</template>
