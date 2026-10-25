<script setup lang="ts">
import { useI18n } from '@reglow/reui'
import type {
  CapabilityItem,
  DemoActionItem,
  EventRow,
  StepItem
} from '~/i18n/messages'

const { t, tm, locale } = useI18n()
const localePath = useLocalePath()

const installCommand = 'npm install @reglow/track'

const pluginSnippet = `// app/plugins/track.client.ts
import { createTrack } from '@reglow/track'

export default defineNuxtPlugin((nuxtApp) => {
  const tracker = createTrack({
    appId: 'reglow-nuxt-starter',
    autoPageView: false,
    autoTrack: { click: true, exposure: true, scroll: true }
  })

  nuxtApp.vueApp.use(tracker)

  const router = useRouter()
  tracker.pageView(router.currentRoute.value.fullPath)
  router.afterEach(to => tracker.pageView(to.fullPath))
})`

const markupSnippet = `<!-- Declarative: auto click tracking reads data-track-id -->
<button data-track-id="buy_btn" data-track-type="button">
  Buy now
</button>

<!-- Directive: writes data-track-* then hands off to auto tracking -->
<button v-track="{ id: 'submit_btn', type: 'button' }">
  Submit order
</button>`

const customSnippet = `const track = useTracker()

track?.track('add_to_cart', { sku: 'RG-2026', price: 299 })

track?.trackSearch('recycled fabric', {
  clickedRank: 1,
  converted: false
})

track?.trackPreference('favorite', {
  targetType: 'product',
  targetId: 1001
})`

const capabilities = computed(
  () => tm<CapabilityItem[]>('app.tracking.capabilities.items') ?? []
)
const events = computed(() => tm<EventRow[]>('app.tracking.events.rows') ?? [])
const pipeline = computed(
  () => tm<StepItem[]>('app.tracking.pipeline.steps') ?? []
)
const guidelines = computed(
  () => tm<string[]>('app.tracking.guidelines.items') ?? []
)
const badges = computed(() => tm<string[]>('app.tracking.hero.badges') ?? [])
const installNotes = computed(
  () => tm<string[]>('app.tracking.hero.installNotes') ?? []
)

interface LogItem {
  id: number
  code: string
  props: Record<string, string | number | boolean>
  time: string
}

const logs = ref<LogItem[]>([])
let logSeq = 0

function pushLog(
  code: string,
  props: Record<string, string | number | boolean>
) {
  logSeq += 1
  logs.value = [
    {
      id: logSeq,
      code,
      props,
      time: new Date().toLocaleTimeString(locale.value, { hour12: false })
    },
    ...logs.value
  ].slice(0, 4)
}

function addToCart() {
  useTracker()?.track('add_to_cart', { sku: 'RG-2026', price: 299 })
  pushLog('add_to_cart', { sku: 'RG-2026', price: 299 })
}

function search() {
  useTracker()?.trackSearch('recycled fabric', {
    clickedRank: 1,
    converted: false
  })
  pushLog('biz.search', { query: 'recycled fabric', clicked_rank: 1 })
}

function favorite() {
  useTracker()?.trackPreference('favorite', {
    targetType: 'product',
    targetId: 1001
  })
  pushLog('biz.favorite', { target_type: 'product', target_id: 1001 })
}

function rate() {
  useTracker()?.trackPreference('rate', {
    targetType: 'product',
    targetId: 1001,
    score: 5
  })
  pushLog('biz.rate', { target_type: 'product', score: 5 })
}

const actionHandlers: Record<DemoActionItem['id'], () => void> = {
  cart: addToCart,
  search,
  favorite,
  rate
}

const demoActions = computed(() =>
  (tm<DemoActionItem[]>('app.tracking.demo.actions') ?? []).map(action => ({
    ...action,
    handler: actionHandlers[action.id]
  }))
)

const copiedKey = ref('')
let copyTimer: ReturnType<typeof setTimeout> | undefined

async function copy(key: string, text: string) {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copiedKey.value = ''
    }, 1800)
  } catch {
    copiedKey.value = ''
  }
}

onBeforeUnmount(() => clearTimeout(copyTimer))

useHead(() => ({
  title: t('app.meta.trackingTitle'),
  meta: [{ name: 'description', content: t('app.meta.trackingDescription') }]
}))
</script>

<template>
  <div>
    <!-- 页头 -->
    <section class="relative isolate overflow-hidden border-b border-border/70">
      <div
        class="grid-bg absolute inset-0 -z-10"
        aria-hidden="true"
      />

      <div class="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <nav
          class="flex items-center gap-2 text-[13px] text-muted-foreground"
          aria-label="breadcrumb"
        >
          <NuxtLink
            :to="localePath('/')"
            class="transition-colors hover:text-foreground"
          >
            {{ t("app.tracking.breadcrumb.home") }}
          </NuxtLink>
          <span aria-hidden="true">/</span>
          <span class="text-foreground">{{
            t("app.tracking.breadcrumb.current")
          }}</span>
        </nav>

        <div
          class="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start"
        >
          <div>
            <p class="eyebrow">
              {{ t("app.tracking.hero.eyebrow") }}
            </p>
            <h1 class="heading-page mt-3">
              {{ t("app.tracking.hero.title") }}
            </h1>
            <p class="text-lead mt-4 max-w-2xl">
              {{ t("app.tracking.hero.description") }}
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-2">
              <span
                v-for="item in badges"
                :key="item"
                class="rounded border border-border/70 bg-card/60 px-2 py-1 text-[11px] text-muted-foreground"
              >
                {{ item }}
              </span>
            </div>

            <div class="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                as-child
              >
                <NuxtLink to="#integrate">
                  {{ t("app.tracking.hero.primary") }}
                </NuxtLink>
              </Button>
              <Button
                size="lg"
                variant="outline"
                as-child
              >
                <NuxtLink to="#demo">
                  {{ t("app.tracking.hero.secondary") }}
                </NuxtLink>
              </Button>
            </div>
          </div>

          <div class="rounded-xl border border-border/80 bg-card p-5">
            <p class="text-[13px] font-medium text-foreground">
              {{ t("app.tracking.hero.installTitle") }}
            </p>
            <div
              class="mt-3 flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-background/60 px-3 py-2.5"
            >
              <code class="font-mono text-[12px] text-foreground">
                {{ installCommand }}
              </code>
              <Button
                variant="ghost"
                size="sm"
                class="h-7 px-2 text-[11px]"
                @click="copy('install', installCommand)"
              >
                <Icon
                  :name="copiedKey === 'install' ? 'check' : 'copy'"
                  size="0.75rem"
                />
                {{
                  copiedKey === "install"
                    ? t("app.common.copied")
                    : t("app.common.copy")
                }}
              </Button>
            </div>

            <div
              class="mt-5 space-y-3 border-t border-border/70 pt-4 text-small"
            >
              <p
                v-for="note in installNotes"
                :key="note"
                class="flex items-start gap-2"
              >
                <span class="mt-2 size-1 shrink-0 rounded-full bg-primary/70" />
                {{ note }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 上报链路 -->
    <section class="border-b border-border/70 bg-card/30">
      <div class="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
        <ol class="grid gap-4 sm:grid-cols-3">
          <li
            v-for="(step, index) in pipeline"
            :key="step.title"
            class="flex gap-3"
          >
            <span class="font-mono text-[11px] text-muted-foreground">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
            <div>
              <p class="text-[15px] font-medium">
                {{ step.title }}
              </p>
              <p class="text-small mt-1">
                {{ step.description }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- 能力 -->
    <section class="border-b border-border/70">
      <div class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div
          v-reveal
          class="reveal max-w-2xl"
        >
          <p class="eyebrow">
            {{ t("app.tracking.capabilities.eyebrow") }}
          </p>
          <h2 class="heading-section mt-3">
            {{ t("app.tracking.capabilities.title") }}
          </h2>
          <p class="text-body mt-3">
            {{ t("app.tracking.capabilities.description") }}
          </p>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, index) in capabilities"
            :key="item.title"
            v-reveal="{ delay: index * 60 }"
            class="reveal lift group rounded-xl border border-border/70 bg-card/60 p-6"
          >
            <span
              class="lift-icon flex size-10 items-center justify-center rounded-lg border border-border/70 bg-background text-foreground"
            >
              <Icon
                :name="item.icon"
                size="1.05rem"
              />
            </span>
            <h3 class="heading-card mt-5">
              {{ item.title }}
            </h3>
            <p class="text-small mt-2">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 事件模型 -->
    <section class="border-b border-border/70 bg-card/30">
      <div class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div
          v-reveal
          class="reveal max-w-2xl"
        >
          <p class="eyebrow">
            {{ t("app.tracking.events.eyebrow") }}
          </p>
          <h2 class="heading-section mt-3">
            {{ t("app.tracking.events.title") }}
          </h2>
          <p class="text-body mt-3">
            {{ t("app.tracking.events.description") }}
          </p>
        </div>

        <div class="mt-8 overflow-x-auto rounded-xl border border-border/70">
          <table class="w-full min-w-[42rem] border-collapse text-left text-sm">
            <thead>
              <tr
                class="border-b border-border/70 bg-muted/40 text-xs text-muted-foreground"
              >
                <th class="px-4 py-3 font-medium">
                  {{ t("app.tracking.events.columns.code") }}
                </th>
                <th class="px-4 py-3 font-medium">
                  {{ t("app.tracking.events.columns.trigger") }}
                </th>
                <th class="px-4 py-3 font-medium">
                  {{ t("app.tracking.events.columns.fields") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="event in events"
                :key="event.code"
                class="border-b border-border/60 last:border-0"
              >
                <td
                  class="whitespace-nowrap px-4 py-3 font-mono text-[12px] text-primary"
                >
                  {{ event.code }}
                </td>
                <td class="px-4 py-3 text-foreground/75">
                  {{ event.trigger }}
                </td>
                <td
                  class="px-4 py-3 font-mono text-[11.5px] text-foreground/60"
                >
                  {{ event.fields }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 在线演示 -->
    <section
      id="demo"
      class="border-b border-border/70"
    >
      <div class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div
          v-reveal
          class="reveal max-w-2xl"
        >
          <p class="eyebrow">
            {{ t("app.tracking.demo.eyebrow") }}
          </p>
          <h2 class="heading-section mt-3">
            {{ t("app.tracking.demo.title") }}
          </h2>
          <p class="text-body mt-3">
            {{ t("app.tracking.demo.description") }}
          </p>
        </div>

        <div class="mt-8 grid gap-4 lg:grid-cols-2">
          <div
            v-reveal
            class="reveal rounded-xl border border-border/70 bg-card/60 p-6"
          >
            <div class="space-y-3">
              <div
                v-for="action in demoActions"
                :key="action.id"
                class="flex items-center justify-between gap-3 rounded-lg border border-border/70 bg-background/50 px-4 py-3"
              >
                <div class="flex items-center gap-3">
                  <span
                    class="flex size-8 items-center justify-center rounded-md border border-border/70 text-muted-foreground"
                  >
                    <Icon
                      :name="action.icon"
                      size="0.95rem"
                    />
                  </span>
                  <div>
                    <p class="text-[15px] font-medium">
                      {{ action.label }}
                    </p>
                    <p class="font-mono text-[11.5px] text-muted-foreground/80">
                      {{ action.desc }}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  @click="action.handler"
                >
                  {{ t("app.tracking.demo.run") }}
                </Button>
              </div>
            </div>

            <p class="text-small mt-4">
              {{ t("app.tracking.demo.note") }}
            </p>
          </div>

          <div
            v-reveal="{ delay: 100 }"
            class="reveal flex flex-col rounded-xl border border-border/80 bg-card"
          >
            <div
              class="flex items-center justify-between border-b border-border/70 px-4 py-3"
            >
              <span
                class="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
              >
                {{ t("app.tracking.demo.logTitle") }}
              </span>
              <span class="text-[11px] text-muted-foreground">
                {{ t("app.tracking.demo.logRecent") }}
              </span>
            </div>

            <div class="code-surface flex-1 p-4 text-[12px] leading-6">
              <template v-if="logs.length === 0">
                <p class="text-muted-foreground">
                  {{ t("app.tracking.demo.logEmpty") }}
                </p>
              </template>
              <template v-else>
                <div
                  v-for="log in logs"
                  :key="log.id"
                  class="border-b border-border/50 py-2 last:border-0"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-primary">{{ log.code }}</span>
                    <span class="text-muted-foreground/60">{{ log.time }}</span>
                  </div>
                  <p class="text-muted-foreground">
                    {{ JSON.stringify(log.props) }}
                  </p>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 接入方式 -->
    <section
      id="integrate"
      class="border-b border-border/70 bg-card/30"
    >
      <div class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div
          v-reveal
          class="reveal max-w-2xl"
        >
          <p class="eyebrow">
            {{ t("app.tracking.integrate.eyebrow") }}
          </p>
          <h2 class="heading-section mt-3">
            {{ t("app.tracking.integrate.title") }}
          </h2>
          <p class="text-body mt-3">
            {{ t("app.tracking.integrate.description") }}
          </p>
        </div>

        <div class="mt-8 grid gap-4 lg:grid-cols-2">
          <CodeBlock
            :code="pluginSnippet"
            lang="typescript"
            :filename="t('app.tracking.integrate.filenames.plugin')"
          />

          <CodeBlock
            :code="markupSnippet"
            lang="vue"
            :filename="t('app.tracking.integrate.filenames.page')"
          />

          <div class="lg:col-span-2">
            <CodeBlock
              :code="customSnippet"
              lang="typescript"
              :filename="t('app.tracking.integrate.filenames.custom')"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 规范建议 -->
    <section>
      <div
        class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] md:py-20"
      >
        <div
          v-reveal
          class="reveal"
        >
          <p class="eyebrow">
            {{ t("app.tracking.guidelines.eyebrow") }}
          </p>
          <h2 class="heading-section mt-3">
            {{ t("app.tracking.guidelines.title") }}
          </h2>
          <p class="text-body mt-4">
            {{ t("app.tracking.guidelines.description") }}
          </p>
        </div>

        <ul
          v-reveal="{ delay: 100 }"
          class="reveal space-y-4"
        >
          <li
            v-for="(item, index) in guidelines"
            :key="item"
            class="flex gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0"
          >
            <span class="font-mono text-[11px] text-muted-foreground">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
            <p class="text-body">
              {{ item }}
            </p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
