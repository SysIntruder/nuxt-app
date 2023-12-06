<script setup>
const navLinks = [
    [
        { label: 'Dashboard', icon: 'i-heroicons-squares-2x2', to: '/dashboard' },
        { label: 'Statistics', icon: 'i-heroicons-chart-bar', to: '' },
        { label: 'Reports', icon: 'i-heroicons-clipboard-document-list', to: '' },
        { label: 'Maps', icon: 'i-heroicons-map', to: '' },
        { label: 'Events', icon: 'i-heroicons-calendar', to: '' },
    ], [
        { label: 'Products', icon: 'i-heroicons-cube', to: '' },
        { label: 'Stores', icon: 'i-heroicons-building-storefront', to: '' },
        { label: 'Discounts', icon: 'i-heroicons-banknotes', to: '' },
    ], [
        { label: 'Log Activities', icon: 'i-heroicons-clock', to: '' },
        { label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: '' },
        { label: 'Help', icon: 'i-heroicons-lifebuoy', to: '' },
    ]
]
const profileLinks = [
    [
        { label: 'Your Profile', icon: 'i-heroicons-user-circle', to: '' },
    ], [
        { label: 'Dark Mode', icon: 'i-heroicons-moon', to: '' },
        { label: 'Language', icon: 'i-heroicons-language', to: '' },
    ], [
        { label: 'Logout', to: '' },
    ]
]

const sidenavCollapsed = ref(false)
const search = ref(null)

</script>

<template>
    <div class="flex p-2 h-[100vh] bg-slate-50 dark:bg-slate-950">
        <div
            class="py-2 px-4 mr-2 rounded-sm bg-slate-50 dark:bg-slate-900 transition-all"
            :class="{
                'min-w-[12vw]': !sidenavCollapsed,
                'transition-expand-sidenav': !sidenavCollapsed,
                'min-w-[72px]': sidenavCollapsed,
                'transition-collapse-sidenav': sidenavCollapsed
            }"
        >
            <div class="flex flex-col justify-between h-full">
                <div>
                    <div :class="`flex ${sidenavCollapsed ? 'justify-center' : 'justify-between'} items-center my-4`">
                        <FallbackLogo />
                        <span v-if="!sidenavCollapsed" class="text-xs opacity-75">v1.0.0</span>
                    </div>
                    <LayoutsSidenav :links="navLinks" :collapsed="sidenavCollapsed" />
                </div>
                <div class="text-xs text-center opacity-75">
                    <span v-if="!sidenavCollapsed">
                        &copy; 2023 NuxtApp.
                    </span>
                </div>
            </div>
        </div>

        <div class="flex flex-col w-full">
            <div class="flex items-center justify-between py-2 px-4 rounded-sm bg-slate-50 dark:bg-slate-900">
                <div class="flex items-center gap-2">
                    <UButton
                        icon="i-heroicons-bars-3"
                        color="gray"
                        padded variant="link"
                        :ui="{ rounded: 'rounded-full' }"
                        @click="sidenavCollapsed = !sidenavCollapsed"
                    />
                    <FallbackLogoText />
                </div>
                <div class="flex items-center gap-2">
                    <UInput v-model="search" icon="i-heroicons-magnifying-glass" placeholder="Search..." />
                    <UButton icon="i-heroicons-bell" color="gray" variant="link" :ui="{ rounded: 'rounded-full' }" />
                    <UPopover>
                        <UButton color="gray" trailing-icon="i-heroicons-chevron-down" variant="link">
                            <template #leading>
                                <UAvatar src="https://avatars.githubusercontent.com/u/80736513?v=4" size="sm" />
                            </template>
                        </UButton>
                        <template #panel>
                            <div class="p-2">
                                <div class="flex justify-between items-center text-sm font-semibold py-2 pr-12">
                                    <UAvatar src="https://avatars.githubusercontent.com/u/80736513?v=4" class="mr-2" />
                                    <div class="flex flex-col">
                                        Logged In User
                                        <span class="text-xs font-normal opacity-75">user's role</span>
                                    </div>
                                </div>
                                <LayoutsProfilenav :links="profileLinks" />
                            </div>
                        </template>
                    </UPopover>
                </div>
            </div>
            <div class="p-4">
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