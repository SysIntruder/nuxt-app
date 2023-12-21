<script setup>
useHead({
  title: 'Statistics',
})

const breakpoint = useBreakpoint()
</script>

<template>
  <Teleport v-if="breakpoint.gte('sm')" to="#page-title">
    <span class="text-lg font-medium mr-4">Statistics</span>
  </Teleport>
  {{ breakpoint.is }}
  Statistics
</template>
