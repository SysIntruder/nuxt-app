<script setup>
</script>

<template>
    <div class="grid grid-cols-12 p-8 md:p-12 lg:p-16 h-[100vh] bg-slate-950">
        <div class="col-span-12 sm:col-start-3 sm:col-span-8 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4">
            <slot />
        </div>
    </div>
</template>