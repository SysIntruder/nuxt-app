<script setup>
</script>

<template>
    <div class="grid grid-cols-12 p-12 lg:p-24 h-[100vh] bg-slate-50 dark:bg-slate-950">
        <div class="col-span-12 sm:col-start-3 sm:col-span-8 md:col-start-4 md:col-span-6 xl:col-start-5 xl:col-span-4">
            <slot />
        </div>
    </div>
</template>