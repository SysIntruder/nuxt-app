<script setup>
const props = defineProps(['links'])
</script>

<template>
    <div v-for="(link, linkId) in links" :key="`nav-${linkId}`">
        <UDivider class="my-2" />
        <UVerticalNavigation :links="link" />
    </div>
</template>