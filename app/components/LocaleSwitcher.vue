<script setup lang="ts">
import { useI18n as useReuiI18n } from '@reglow/reui'

// Nuxt i18n：语言由 URL 决定，切换会跳转到对应语言前缀
const { locale, setLocale } = useI18n()
const { t } = useReuiI18n()

const options = [
  { value: 'zh-CN', label: '简体中文', short: '中' },
  { value: 'zh-TW', label: '繁體中文', short: '繁' },
  { value: 'en', label: 'English', short: 'EN' }
] as const

type LocaleCode = (typeof options)[number]['value']

const current = computed(
  () => options.find(option => option.value === locale.value) ?? options[0]
)

async function switchLocale(value: LocaleCode) {
  if (value === locale.value) return
  await setLocale(value)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        size="sm"
        :aria-label="t('app.common.switchLanguage')"
      >
        <Icon
          name="globe"
          size="0.95rem"
        />
        <span class="text-xs font-medium">{{ current?.short }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="option in options"
        :key="option.value"
        @select="switchLocale(option.value)"
      >
        {{ option.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
