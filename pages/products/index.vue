<script setup>
useHead({
  title: 'Products',
})

const breakpoint = useBreakpoint()
</script>

<template>
  <Teleport v-if="breakpoint.gte('sm')" to="#page-title">
    <span class="text-lg font-medium mr-4">Products</span>
  </Teleport>
  {{ breakpoint.is }}
  Products
</template>
