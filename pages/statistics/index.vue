<script setup>
useHead({
  title: 'Statistics',
})

const breakpoint = useBreakpoint()
</script>

<template>
  <Teleport v-if="breakpoint.gte('md')" to="#page-title">
    <span class="text-lg font-medium mr-4">Dashboard</span>
  </Teleport>
  {{ breakpoint.is }}
  Statistics
</template>
