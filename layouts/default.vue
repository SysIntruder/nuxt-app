<script setup>
const sidenavCollapsed = ref(false)
const search = ref(null)

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

const { data: { value: navLinks } } = await useFetch('/api/menu')
const profileItems = [
  [{
    label: 'Logged In User',
    sublabel: 'user\'s role',
    avatar: 'https://avatars.githubusercontent.com/u/80736513?v=4',
    slot: 'account',
    disabled: true,
  }],
  [
    { label: 'Your Profile', icon: 'i-heroicons-user-circle', to: '' },
    { label: 'Add Account', icon: 'i-heroicons-user-plus', to: '' },
  ],
  [{ label: 'Try Enterprise', icon: 'i-heroicons-globe-alt', to: '', slot: 'special' }],
  [{ label: 'Logout', to: '/auth/login' }],
]
</script>

<template>
  <div class="flex py-4 px-2 h-[100vh] bg-gray-200 dark:bg-gray-950">
    <div
      class="py-2 px-4 mr-4 rounded-lg bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 shadow transition-all"
      :class="{
        'min-w-[12vw]': !sidenavCollapsed,
        'transition-expand-sidenav': !sidenavCollapsed,
        'min-w-[72px]': sidenavCollapsed,
        'transition-collapse-sidenav': sidenavCollapsed,
      }"
    >
      <div class="flex flex-col justify-between h-full">
        <div>
          <div :class="`flex ${sidenavCollapsed ? 'justify-center' : 'justify-between'} items-center my-4`">
            <CommonLogo />
            <span v-if="!sidenavCollapsed" class="text-xs opacity-75">v1.0.0</span>
          </div>

          <div v-for="(link, linkId) in navLinks" :key="`nav-${linkId}`">
            <UDivider class="my-2" />
            <UVerticalNavigation v-if="!sidenavCollapsed" :links="link">
              <template #icon="{ link: l }">
                <IconCSS :name="l.icon" class="!h-4 !w-4" />
              </template>
            </UVerticalNavigation>
            <div v-else class="flex flex-col">
              <UTooltip
                v-for="(l, lId) in link"
                :key="`nav-${linkId}-${lId}`"
                :text="l.label"
                :popper="{ placement: 'right' }"
                class="text-md"
              >
                <UButton
                  :to="l.to"
                  class="px-3 py-2 my-1 text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-50 dark:bg-gray-900 hover:bg-gray-200/50 dark:hover:bg-gray-800/50"

                  :active-class="[
                    'text-primary-500 dark:text-primary-400',
                    'hover:!text-primary-500 dark:hover:!text-primary-400',
                    'bg-primary-300/50 dark:bg-primary-800/50',
                    'hover:!bg-primary-300/50 dark:hover:!bg-primary-800/50',
                  ]"
                  variant="ghost"
                >
                  <template #leading>
                    <IconCSS :name="l.icon" class="!h-4 !w-4" />
                  </template>
                </UButton>
              </UTooltip>
            </div>
          </div>
        </div>
        <div class="text-xs text-center opacity-75">
          <span v-if="!sidenavCollapsed">
            &copy; 2023 NuxtApp.
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-full h-full">
      <div class="flex items-center justify-between py-2 px-4 rounded-lg bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 shadow">
        <div class="flex items-center gap-2">
          <UButton
            icon="i-heroicons-bars-3"
            color="gray"
            padded variant="link"
            :ui="{ rounded: 'rounded-full' }"
            @click="sidenavCollapsed = !sidenavCollapsed"
          />
          <CommonLogoText />
        </div>
        <div class="flex items-center gap-2">
          <UInput v-model="search" icon="i-heroicons-magnifying-glass" placeholder="Search..." />
          <UButton icon="i-heroicons-bell" color="gray" variant="link" :ui="{ rounded: 'rounded-full' }" />
          <UTooltip
            :text="`Switch to ${isDark ? 'Light' : 'Dark'} Mode`"
            class="text-md"
          >
            <UButton
              :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
              color="gray"
              variant="link"
              :ui="{ rounded: 'rounded-full' }"
              @click="isDark = !isDark"
            />
          </UTooltip>
          <UButton icon="i-heroicons-language" color="gray" variant="link" :ui="{ rounded: 'rounded-full' }" />
          <UDropdown
            :items="profileItems"
            :ui="{ container: 'z-30 group', item: { disabled: 'cursor-text select-text opacity-1' } }"
            :popper="{ placement: 'bottom-start' }"
          >
            <UButton color="gray" trailing-icon="i-heroicons-chevron-down" variant="ghost">
              <template #leading>
                <UAvatar src="https://avatars.githubusercontent.com/u/80736513?v=4" size="sm" />
              </template>
            </UButton>
            <template #account="{ item }">
              <div class="flex justify-between items-center text-sm text-left font-semibold">
                <UAvatar :src="item.avatar" class="mr-2" />
                <div class="flex flex-col">
                  <p class="truncate font-medium text-gray-900 dark:text-white">
                    {{ item.label }}
                  </p>
                  <span class="text-xs font-normal opacity-75">{{ item.sublabel }}</span>
                </div>
              </div>
            </template>
            <template #special="{ item }">
              <div class="flex justify-between items-center w-full">
                <div class="flex items-center gap-2">
                  <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4" />
                  <span class="truncate">{{ item.label }}</span>
                </div>
                <UIcon name="i-heroicons-sparkles-solid" class="h-5 w-5 text-yellow-400 dark:text-yellow-300" />
              </div>
            </template>
          </UDropdown>
        </div>
      </div>

      <div class="relative py-4 overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes expandSidenav {
    from {
        min-width: 72px;
    }

    to {
        min-width: 12vw;
    }
}

@keyframes collapseSidenav {
    from {
        min-width: 12vw;
    }

    to {
        min-width: 72px;
    }
}

.transition-expand-sidenav {
    animation: expandSidenav 0.3s ease-out;
}

.transition-collapse-sidenav {
    animation: collapseSidenav 0.3s ease-out;
}
</style>
