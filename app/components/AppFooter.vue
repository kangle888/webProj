<script setup lang="ts">
import { useI18n } from '@reglow/reui'
import { site } from '~/utils/site'

const { t } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()

interface FooterLink {
  label: string
  to: string
  external?: boolean
}

interface FooterGroup {
  title: string
  links: FooterLink[]
}

const groups = computed<FooterGroup[]>(() => [
  {
    title: t('app.footer.product'),
    links: [
      { label: t('app.footer.links.home'), to: localePath('/') },
      { label: t('app.footer.links.tracking'), to: localePath('/tracking') },
      {
        label: t('app.footer.links.showcase'),
        to: `${localePath('/')}#showcase`
      }
    ]
  },
  {
    title: t('app.footer.resources'),
    links: [
      { label: t('app.footer.links.docs'), to: site.docs, external: true },
      {
        label: t('app.footer.links.nuxtDocs'),
        to: 'https://nuxt.com/docs',
        external: true
      },
      { label: t('app.footer.links.gitee'), to: site.gitee, external: true }
    ]
  }
])
</script>

<template>
  <footer class="mt-16 border-t border-border">
    <div class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div class="grid gap-10 md:grid-cols-[1.8fr_1fr_1fr]">
        <div>
          <div class="flex items-center gap-2.5">
            <AppLogo class="size-7" />
            <span class="text-sm font-semibold tracking-tight">{{
              site.name
            }}</span>
          </div>
          <p class="text-small mt-4 max-w-sm">
            {{ t("app.footer.tagline") }}
          </p>
          <p
            class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            <span>Nuxt 4</span>
            <span aria-hidden="true">·</span>
            <span>ReUI 0.6</span>
            <span aria-hidden="true">·</span>
            <span>Tailwind 4</span>
            <span aria-hidden="true">·</span>
            <span>@reglow/track 0.1</span>
          </p>
        </div>

        <div
          v-for="group in groups"
          :key="group.title"
        >
          <p
            class="font-mono text-[11.5px] uppercase tracking-[0.16em] text-muted-foreground"
          >
            {{ group.title }}
          </p>
          <ul class="mt-4 space-y-2.5">
            <li
              v-for="link in group.links"
              :key="link.to"
            >
              <a
                v-if="link.external"
                :href="link.to"
                target="_blank"
                rel="noreferrer"
                class="text-small transition-colors hover:text-foreground"
              >
                {{ link.label }}
              </a>
              <NuxtLink
                v-else
                :to="link.to"
                class="text-small transition-colors hover:text-foreground"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-[12.5px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
      >
        <p>{{ t("app.footer.copyright", { year }) }}</p>
        <p class="font-mono uppercase tracking-[0.14em]">
          {{ t("app.footer.builtFor") }}
        </p>
      </div>
    </div>
  </footer>
</template>
