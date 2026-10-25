<script setup lang="ts">
import { useI18n } from '@reglow/reui'
import type {
  FeatureItem,
  ScenarioItem,
  StatItem,
  StepItem
} from '~/i18n/messages'
import { site } from '~/utils/site'

const { t, tm } = useI18n()
const localePath = useLocalePath()

/** 组件演示 Tab */
const activeDemo = ref('buttons')

/** 表单演示状态 */
const projectName = ref('')
const notify = ref(true)

const stats = computed(() => tm<StatItem[]>('app.home.hero.stats') ?? [])
const scenarios = computed(
  () => tm<ScenarioItem[]>('app.home.scenarios.items') ?? []
)
const features = computed(
  () => tm<FeatureItem[]>('app.home.features.items') ?? []
)
const steps = computed(() => tm<StepItem[]>('app.home.quickStart.steps') ?? [])
const tabs = computed(
  () => tm<{ value: string, label: string }[]>('app.home.showcase.tabs') ?? []
)
const points = computed(() => tm<string[]>('app.home.showcase.points') ?? [])
const variants = computed(
  () => tm<string[]>('app.home.showcase.variants') ?? []
)
const panelRows = computed(
  () =>
    tm<{ short: string, name: string, status: string }[]>(
      'app.home.panel.rows'
    ) ?? []
)

const demoVariants = [
  'default',
  'secondary',
  'outline',
  'ghost',
  'destructive',
  'link'
] as const

const bars = [42, 66, 50, 82, 58, 92, 72]

const quickStartCode = `# install dependencies
npm install

# start the dev server (http://localhost:3000)
npm run dev

# production build
npm run build`
</script>

<template>
  <div class="overflow-x-clip">
    <!-- Hero -->
    <section class="relative isolate overflow-hidden border-b border-border/70">
      <div
        class="grid-bg absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        class="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style="
          background: radial-gradient(
            60% 50% at 20% 0%,
            color-mix(in oklch, var(--primary) 8%, transparent),
            transparent 70%
          );
        "
      />

      <div
        class="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-24"
      >
        <div>
          <p
            class="hero-rise eyebrow"
            style="--d: 0ms"
          >
            {{ t("app.home.hero.eyebrow") }}
          </p>

          <h1
            class="hero-rise heading-display mt-5"
            style="--d: 80ms"
          >
            {{ t("app.home.hero.line1") }}
            <br class="hidden sm:block">
            {{ t("app.home.hero.line2") }}
          </h1>

          <p
            class="hero-rise text-lead mt-6 max-w-xl"
            style="--d: 160ms"
          >
            {{ t("app.home.hero.description") }}
          </p>

          <div
            class="hero-rise mt-8 flex flex-wrap items-center gap-3"
            style="--d: 240ms"
          >
            <Button
              size="lg"
              as-child
            >
              <NuxtLink to="#quick-start">
                {{ t("app.home.hero.primary") }}
              </NuxtLink>
            </Button>
            <Button
              size="lg"
              variant="outline"
              as-child
            >
              <NuxtLink :to="localePath('/tracking')">
                {{ t("app.home.hero.secondary") }}
              </NuxtLink>
            </Button>
          </div>

          <dl
            class="hero-rise mt-10 grid max-w-md grid-cols-3 divide-x divide-border/70 border-t border-border/70 pt-6"
            style="--d: 320ms"
          >
            <div
              v-for="(stat, index) in stats"
              :key="stat.label"
              :class="index === 0 ? 'pr-6' : 'px-6'"
            >
              <dd class="text-2xl font-semibold tracking-tight">
                {{ stat.value }}
              </dd>
              <dt class="mt-1 text-[13px] text-muted-foreground">
                {{ stat.label }}
              </dt>
            </div>
          </dl>
        </div>

        <!-- 产品面板 -->
        <div
          class="hero-rise relative"
          style="--d: 200ms"
        >
          <div
            class="overflow-hidden rounded-xl border border-border/80 bg-card"
          >
            <div
              class="flex items-center gap-2 border-b border-border/70 px-4 py-3"
            >
              <span class="size-2 rounded-full bg-muted-foreground/25" />
              <span class="size-2 rounded-full bg-muted-foreground/20" />
              <span class="size-2 rounded-full bg-muted-foreground/15" />
              <span class="ml-2 font-mono text-[10px] text-muted-foreground">
                {{ t("app.home.panel.window") }}
              </span>
              <Tag
                color="blue"
                variant="outlined"
                class="ml-auto"
              >
                {{ t("app.home.panel.demo") }}
              </Tag>
            </div>

            <div class="p-5">
              <div class="flex items-end justify-between">
                <div>
                  <p class="text-xs text-muted-foreground">
                    {{ t("app.home.panel.componentsLabel") }}
                  </p>
                  <p class="mt-1 text-3xl font-semibold tracking-tight">
                    208
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-muted-foreground">
                    {{ t("app.home.panel.scenesLabel") }}
                  </p>
                  <p class="mt-1 text-sm font-medium">
                    {{ t("app.home.panel.scenesValue") }}
                  </p>
                </div>
              </div>

              <div class="mt-5 rounded-lg border border-border/70 p-3">
                <div class="flex items-center justify-between">
                  <p class="text-xs text-muted-foreground">
                    {{ t("app.home.panel.chartTitle") }}
                  </p>
                  <span class="font-mono text-[10px] text-primary">
                    {{ t("app.home.panel.chartDelta") }}
                  </span>
                </div>
                <div class="mt-3 flex h-24 items-end gap-2">
                  <div
                    v-for="(height, index) in bars"
                    :key="index"
                    class="flex-1 rounded-sm bg-primary/25"
                    :style="{ height: `${height}%` }"
                  />
                </div>
              </div>

              <div class="mt-4 divide-y divide-border/60">
                <div
                  v-for="row in panelRows"
                  :key="row.name"
                  class="flex items-center justify-between py-2"
                >
                  <div class="flex items-center gap-2.5">
                    <span
                      class="flex size-6 items-center justify-center rounded border border-border/70 font-mono text-[9px] text-muted-foreground"
                    >
                      {{ row.short }}
                    </span>
                    <span class="text-xs text-foreground">{{ row.name }}</span>
                  </div>
                  <span
                    class="flex items-center gap-1.5 text-[11px] text-muted-foreground"
                  >
                    <span class="size-1 rounded-full bg-primary/70" />
                    {{ row.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p
            class="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
          >
            {{ t("app.home.panel.designNote") }}
          </p>
        </div>
      </div>
    </section>

    <!-- 埋点提示条 -->
    <section class="border-b border-border/70 bg-card/40">
      <div
        class="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span class="flex items-center gap-2 font-medium">
            <Icon
              name="activity"
              size="0.95rem"
              class="text-primary"
            />
            {{ t("app.home.trackBand.title") }}
          </span>
          <span class="text-foreground/70">
            {{ t("app.home.trackBand.description") }}
          </span>
        </div>
        <NuxtLink
          :to="localePath('/tracking')"
          class="inline-flex items-center gap-1 text-[14px] text-primary transition-colors hover:text-primary/80"
        >
          {{ t("app.home.trackBand.cta") }}
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </section>

    <!-- 适用场景 -->
    <section
      id="scenarios"
      class="border-b border-border/70"
    >
      <div class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div
          v-reveal
          class="reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div class="max-w-2xl">
            <p class="eyebrow">
              {{ t("app.home.scenarios.eyebrow") }}
            </p>
            <h2 class="heading-section mt-3">
              {{ t("app.home.scenarios.title") }}
            </h2>
          </div>
          <p class="text-body max-w-sm">
            {{ t("app.home.scenarios.description") }}
          </p>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(scenario, index) in scenarios"
            :key="scenario.title"
            v-reveal="{ delay: index * 60 }"
            class="reveal lift group rounded-xl border border-border/70 bg-card/60 p-6"
          >
            <div class="flex items-start justify-between">
              <span
                class="lift-icon flex size-10 items-center justify-center rounded-lg border border-border/70 bg-background text-foreground"
              >
                <Icon
                  :name="scenario.icon"
                  size="1.05rem"
                />
              </span>
              <span
                class="font-mono text-[10px] tracking-[0.14em] text-muted-foreground/70"
              >
                {{ String(index + 1).padStart(2, "0") }}
              </span>
            </div>

            <h3 class="heading-card mt-5">
              {{ scenario.title }}
            </h3>
            <p class="text-small mt-2">
              {{ scenario.description }}
            </p>

            <div class="mt-5 flex flex-wrap gap-1.5">
              <span
                v-for="tag in scenario.tags"
                :key="tag"
                class="rounded border border-border/70 bg-background/60 px-1.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 能力 -->
    <section
      id="features"
      class="border-b border-border/70"
    >
      <div class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div
          v-reveal
          class="reveal max-w-2xl"
        >
          <p class="eyebrow">
            {{ t("app.home.features.eyebrow") }}
          </p>
          <h2 class="heading-section mt-3">
            {{ t("app.home.features.title") }}
          </h2>
          <p class="text-body mt-3">
            {{ t("app.home.features.description") }}
          </p>
        </div>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            v-reveal="{ delay: index * 60 }"
            class="reveal lift group rounded-xl border border-border/70 bg-card/60 p-6"
          >
            <span
              class="lift-icon flex size-10 items-center justify-center rounded-lg border border-border/70 bg-background text-foreground"
            >
              <Icon
                :name="feature.icon"
                size="1.05rem"
              />
            </span>
            <h3 class="heading-card mt-5">
              {{ feature.title }}
            </h3>
            <p class="text-small mt-2">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 组件示例 -->
    <section
      id="showcase"
      class="border-b border-border/70 bg-card/30"
    >
      <div
        class="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center md:py-24"
      >
        <div
          v-reveal
          class="reveal"
        >
          <p class="eyebrow">
            {{ t("app.home.showcase.eyebrow") }}
          </p>
          <h2 class="heading-section mt-3">
            {{ t("app.home.showcase.title") }}
          </h2>
          <p class="text-body mt-4">
            {{ t("app.home.showcase.description") }}
          </p>

          <ul class="mt-6 space-y-3">
            <li
              v-for="point in points"
              :key="point"
              class="flex items-start gap-2.5 text-small"
            >
              <span
                class="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
              >
                <Icon
                  name="check"
                  size="0.6rem"
                />
              </span>
              {{ point }}
            </li>
          </ul>

          <Button
            variant="link"
            class="mt-6 px-0"
            as-child
          >
            <a
              :href="site.docs"
              target="_blank"
              rel="noreferrer"
            >
              {{ t("app.home.showcase.docsCta") }} →
            </a>
          </Button>
        </div>

        <div
          v-reveal="{ delay: 100 }"
          class="reveal"
        >
          <div
            class="overflow-hidden rounded-xl border border-border/80 bg-card"
          >
            <div
              class="flex items-center gap-2 border-b border-border/70 px-4 py-3"
            >
              <span class="size-2 rounded-full bg-muted-foreground/25" />
              <span class="size-2 rounded-full bg-muted-foreground/20" />
              <span class="size-2 rounded-full bg-muted-foreground/15" />
              <span class="ml-2 font-mono text-[10px] text-muted-foreground">
                {{ t("app.home.showcase.panelTitle") }}
              </span>
            </div>

            <div class="p-5">
              <Tabs
                v-model:active-key="activeDemo"
                type="segmented"
              >
                <TabsList>
                  <TabsTrigger
                    v-for="tab in tabs"
                    :key="tab.value"
                    :value="tab.value"
                  >
                    {{ tab.label }}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="buttons">
                  <div class="flex flex-col gap-6 pt-5">
                    <div class="flex flex-wrap gap-2">
                      <Button
                        v-for="(label, index) in variants"
                        :key="label"
                        :variant="demoVariants[index]"
                      >
                        {{ label }}
                      </Button>
                    </div>
                    <div class="flex flex-wrap items-center gap-2">
                      <Button size="sm">
                        {{ t("app.home.showcase.sizes.small") }}
                      </Button>
                      <Button>
                        {{ t("app.home.showcase.sizes.default") }}
                      </Button>
                      <Button size="lg">
                        {{ t("app.home.showcase.sizes.large") }}
                      </Button>
                      <Button
                        size="icon"
                        :aria-label="t('app.home.showcase.searchLabel')"
                      >
                        <Icon
                          name="search"
                          size="1rem"
                        />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="form">
                  <div class="grid max-w-md gap-5 pt-5">
                    <div class="grid gap-2">
                      <Label for="demo-project">
                        {{ t("app.home.showcase.form.label") }}
                      </Label>
                      <Input
                        id="demo-project"
                        v-model="projectName"
                        :placeholder="t('app.home.showcase.form.placeholder')"
                        allow-clear
                      />
                    </div>

                    <div class="flex items-center gap-2">
                      <Switch
                        id="demo-notify"
                        v-model="notify"
                      />
                      <Label for="demo-notify">
                        {{ t("app.home.showcase.form.switchLabel") }}
                      </Label>
                    </div>

                    <Alert
                      v-if="projectName"
                      :title="
                        t('app.home.showcase.form.created', {
                          name: projectName
                        })
                      "
                      type="success"
                      closable
                    />
                  </div>
                </TabsContent>

                <TabsContent value="feedback">
                  <div class="grid gap-3 pt-5">
                    <Alert
                      :title="t('app.home.showcase.feedback.success')"
                      type="success"
                    />
                    <Alert
                      :title="t('app.home.showcase.feedback.info')"
                      type="info"
                      variant="filled"
                    />
                    <Alert
                      :title="t('app.home.showcase.feedback.warning')"
                      type="warning"
                    />
                    <div class="flex flex-wrap items-center gap-4 pt-1">
                      <Badge
                        status="success"
                        :text="t('app.home.showcase.feedback.running')"
                      />
                      <Badge
                        status="processing"
                        :text="t('app.home.showcase.feedback.deploying')"
                      />
                      <Badge
                        status="error"
                        :text="t('app.home.showcase.feedback.stopped')"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section
      id="quick-start"
      class="border-b border-border/70"
    >
      <div class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div
          v-reveal
          class="reveal max-w-2xl"
        >
          <p class="eyebrow">
            {{ t("app.home.quickStart.eyebrow") }}
          </p>
          <h2 class="heading-section mt-3">
            {{ t("app.home.quickStart.title") }}
          </h2>
          <p class="text-body mt-3">
            {{ t("app.home.quickStart.description") }}
          </p>
        </div>

        <div class="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ol class="relative">
            <li
              v-for="(step, index) in steps"
              :key="step.title"
              v-reveal="{ delay: index * 80 }"
              class="reveal flex gap-4 pb-8 last:pb-0"
            >
              <div class="flex flex-col items-center">
                <span
                  class="flex size-7 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background font-mono text-[11px] text-foreground"
                >
                  {{ index + 1 }}
                </span>
                <span
                  v-if="index < steps.length - 1"
                  class="mt-2 w-px flex-1 bg-border/70"
                />
              </div>
              <div class="pt-0.5">
                <h3 class="heading-card">
                  {{ step.title }}
                </h3>
                <p class="text-small mt-1.5">
                  {{ step.description }}
                </p>
              </div>
            </li>
          </ol>

          <div
            v-reveal="{ delay: 120 }"
            class="reveal"
          >
            <CodeBlock
              :code="quickStartCode"
              lang="bash"
              :filename="t('app.home.quickStart.filename')"
            />

            <p
              class="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground"
            >
              <Icon
                name="info"
                size="0.75rem"
              />
              {{ t("app.home.quickStart.hint") }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto w-full max-w-6xl px-4 pt-16 sm:px-6 md:pt-24">
      <div
        v-reveal
        class="reveal cta-panel rounded-xl px-6 py-14 sm:px-12"
      >
        <div class="relative max-w-2xl">
          <p class="eyebrow">
            {{ t("app.home.cta.eyebrow") }}
          </p>
          <h2 class="heading-section mt-3">
            {{ t("app.home.cta.title") }}
          </h2>
          <p class="text-body mt-3">
            {{ t("app.home.cta.description") }}
          </p>
          <div class="mt-7 flex flex-wrap items-center gap-3">
            <Button as-child>
              <NuxtLink to="#quick-start">
                {{ t("app.home.cta.primary") }}
              </NuxtLink>
            </Button>
            <Button
              variant="outline"
              as-child
            >
              <a
                :href="site.gitee"
                target="_blank"
                rel="noreferrer"
              >
                {{ t("app.home.cta.secondary") }}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
