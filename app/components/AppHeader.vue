<script setup lang="ts">
import { useI18n } from '@reglow/reui'
import { site, type NavItem } from '~/utils/site'

const { t } = useI18n()
const localePath = useLocalePath()
const scrolled = ref(false)
const router = useRouter()

const navItems = computed(() =>
  site.nav.map(item => ({
    ...item,
    to: item.external ? item.to : localePath(item.to),
    label: t(item.labelKey)
  }))
)

function updateScroll() {
  scrolled.value = window.scrollY > 4
}

function go(item: NavItem) {
  if (item.external) {
    window.open(item.to, '_blank', 'noopener')
    return
  }
  router.push(item.to)
}

onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-colors duration-300"
    :class="
      scrolled
        ? 'border-border/80 bg-background/85 backdrop-blur'
        : 'border-transparent bg-background/60 backdrop-blur-sm'
    "
  >
    <div
      class="mx-auto flex h-16 w-full max-w-6xl items-center gap-6 px-4 sm:px-6"
    >
      <NuxtLink
        :to="localePath('/')"
        class="flex items-center gap-2.5"
      >
        <AppLogo class="size-7" />
        <span class="flex items-baseline gap-2">
          <span class="text-[15px] font-semibold tracking-tight">
            {{ site.name }}
          </span>
          <span
            class="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground sm:inline"
          >
            v0.1
          </span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center md:flex">
        <template
          v-for="item in navItems"
          :key="item.to"
        >
          <a
            v-if="item.external"
            :href="item.to"
            target="_blank"
            rel="noreferrer"
            class="px-3 py-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
          >
            {{ item.label }}
          </a>
          <NuxtLink
            v-else
            :to="item.to"
            class="group relative px-3 py-2 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
            active-class="text-foreground [&>span]:opacity-100"
          >
            {{ item.label }}
            <span
              class="absolute inset-x-3 bottom-0 h-px bg-primary opacity-0 transition-opacity duration-300"
            />
          </NuxtLink>
        </template>
      </nav>

      <div class="ml-auto flex items-center gap-1">
        <LocaleSwitcher />
        <ThemeToggle />

        <span class="mx-2 hidden h-4 w-px bg-border sm:block" />

        <Button
          variant="outline"
          size="sm"
          class="hidden sm:inline-flex"
          as-child
        >
          <a
            :href="site.gitee"
            target="_blank"
            rel="noreferrer"
          >
            <Icon
              name="external-link"
              size="0.9rem"
            />
            Gitee
          </a>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="ghost"
              size="icon"
              class="md:hidden"
              :aria-label="t('app.common.openMenu')"
            >
              <Icon
                name="menu"
                size="1.05rem"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            class="w-44"
          >
            <DropdownMenuItem
              v-for="item in navItems"
              :key="item.to"
              @select="go(item)"
            >
              {{ item.label }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
