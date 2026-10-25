<script setup lang="ts">
import { useI18n } from '@reglow/reui'

const { isDark, toggleMode } = useReglowTheme()
const { t } = useI18n()
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    :aria-label="t('app.common.switchTheme')"
    class="group"
    @click="toggleMode"
  >
    <ClientOnly>
      <span
        :key="isDark ? 'sun' : 'moon'"
        class="icon-pop inline-flex"
      >
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-[1.05rem] transition-transform duration-500 group-hover:rotate-45"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="4"
          />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-[1.05rem] transition-transform duration-500 group-hover:-rotate-12"
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </span>
      <template #fallback>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-[1.05rem]"
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </template>
    </ClientOnly>
  </Button>
</template>
