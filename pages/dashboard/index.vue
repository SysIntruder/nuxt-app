<script setup>
useHead({
  title: 'Dashboard',
})

const { data: { value: cards } } = await useFetch('/api/dashboard-card')
const { data: { value: topStores } } = await useFetch('/api/dashboard-top-stores')
const headerTopStores = [{
  key: 'pos',
  label: '#',
}, {
  key: 'name',
  label: 'Store name',
}, {
  key: 'revenue',
  label: 'Revenue',
  sortable: true,
  direction: 'desc',
}]

function formatDotNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
</script>

<template>
  <div class="grid grid-cols-4">
    <template v-for="(card, cardId) in cards" :key="cardId">
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

  <div class="grid grid-cols-4">
    <UCard class="col-span-3 m-2" />
    <UCard class="m-2" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <span class="text-lg truncate opacity-75">Top Stores</span>
      </template>
      <UTable :rows="topStores" :columns="headerTopStores">
        <template #revenue-data="{ row }">
          <span>{{ `Rp ${formatDotNumber(row.revenue)}` }}</span>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
