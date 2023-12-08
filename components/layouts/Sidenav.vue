<script setup>
const props = defineProps(['links', 'collapsed'])
</script>

<template>
    <div v-for="(link, linkId) in links" :key="`nav-${linkId}`">
        <UDivider class="my-2" />
        <UVerticalNavigation v-if="!collapsed" :links="link">
            <template #icon="{link: l}">
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
                    class="px-3 py-2 my-1"
                    :class="[
                        'text-gray-500 dark:text-gray-500',
                        'hover:text-gray-900 dark:hover:text-white',
                        'bg-gray-50 dark:bg-gray-900',
                        'hover:bg-gray-200/50 dark:hover:bg-gray-800/50',
                    ]"
                    :active-class="[
                        'text-primary-500 dark:text-primary-400',
                        'hover:!text-primary-500 dark:hover:!text-primary-400',
                        'bg-primary-300/50 dark:bg-primary-800/50',
                        'hover:!bg-primary-300/50 dark:hover:!bg-primary-800/50',
                    ]"
                    variant="ghost"
                >
                    <template #leading>
                        <UIcon :name="l.icon" class="h-4 w-4" />
                    </template>
                </UButton>
            </UTooltip>
        </div>
    </div>
</template>