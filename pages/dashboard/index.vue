<script setup>
import colors from 'tailwindcss/colors'

useHead({
  title: 'Dashboard',
})

const colorMode = useColorMode()
const { data: { value: cards } } = await useFetch('/api/dashboard-card')
const { data: { value: { categories: topProductsCategories, series: topProductsSeries } } } = await useFetch('/api/dashboard-top-product-chart')
const topProductChartOpt = {
  dataLabels: {
    enabled: true,
    offsetX: 35,
    formatter(val) {
      return val ? `${formatDotNumber(val)}` : ''
    },
    style: {
      colors: [colorMode.value === 'dark' ? colors.white : colors.slate[950]],
    },
  },
  xaxis: {
    categories: topProductsCategories,
    title: {
      text: 'Sold',
    },
    labels: {
      formatter(val) {
        return val ? `${formatDotNumber(val)}` : ''
      },
    },
  },
  yaxis: {
    title: {
      text: 'Products',
    },
    labels: {
      formatter(val) {
        return val ? `${formatDotNumber(val)}` : ''
      },
    },
  },
}

const { data: { value: revenueCharts } } = await useFetch('/api/dashboard-revenue-chart')
const revenueChartOpt = {
  dataLabels: {
    enabled: true,
    formatter(val) {
      return val ? `Rp ${formatDotNumber(val)}` : ''
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    title: {
      text: 'Month',
    },
  },
  yaxis: {
    title: {
      text: 'Revenue',
    },
    labels: {
      formatter(val) {
        return val ? `Rp ${formatDotNumber(val)}` : ''
      },
    },
  },
}

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
    <UCard class="col-span-3 m-2" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <span class="text-lg truncate opacity-75">Previous & Current Year Revenue</span>
      </template>
      <LazyStatisticsLineChart :options="revenueChartOpt" :series="revenueCharts" :height="500" />
    </UCard>
    <UCard class="m-2" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <span class="text-lg truncate opacity-75">Previous & Current Year Top Products</span>
      </template>
      <LazyStatisticsBarChart :options="topProductChartOpt" :series="topProductsSeries" :height="500" />
    </UCard>
  </div>
</template>
