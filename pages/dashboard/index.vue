<script setup>
useHead({
  title: 'Dashboard',
})

const { data: { value: dashboardCard } } = await useFetch('/api/dashboard-card')

function formatDotNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
</script>

<template>
  <div class="grid grid-cols-4">
    <template v-for="(card, index) in dashboardCard" :key="index">
      <DashboardInfoCard
        :title="card.title"
        :status="card.status"
        :diff="card.diff"
        :percentage="card.percentage"
        :total="formatDotNumber(card.total)"
        :currency="card.currency"
      />
    </template>
  </div>
</template>
