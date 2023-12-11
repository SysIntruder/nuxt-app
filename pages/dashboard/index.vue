<script setup>
import colors from 'tailwindcss/colors'

useHead({
  title: 'Dashboard',
})

const colorMode = useColorMode()
const { data: { value: cards } } = await useFetch('/api/dashboard-card')
const { data: { value: { categories: productsCategories, series: productsSeries } } } = await useFetch('/api/dashboard-products-chart')
const productsChartOpt = {
  dataLabels: {
    enabled: true,
    offsetX: 45,
    formatter(val) {
      return val ? `$${formatDotNumber(val)} M` : ''
    },
    style: {
      colors: [colorMode.value === 'dark' ? colors.white : colors.slate[950]],
    },
  },
  xaxis: {
    categories: productsCategories,
    title: {
      text: 'Sold',
    },
    labels: {
      formatter(val) {
        return val ? `$${formatDotNumber(val)} M` : ''
      },
    },
  },
  yaxis: {
    title: {
      text: 'Products',
    },
    labels: {
      formatter(val) {
        return val
          ? Number.isFinite(val) ? `$${formatDotNumber(val)} M` : val
          : ''
      },
    },
  },
}

const { data: { value: profitCharts } } = await useFetch('/api/dashboard-profit-chart')
const profitChartOpt = {
  dataLabels: {
    enabled: true,
    formatter(val) {
      return val ? `$${formatDotNumber(val)} M` : ''
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
      text: undefined,
    },
    labels: {
      formatter(val) {
        return val ? `$${formatDotNumber(val)} M` : ''
      },
    },
  },
}

const { data: { value: recentActivities } } = await useFetch('/api/dashboard-recent-activities')

function formatDotNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
</script>

<template>
  <div class="grid grid-cols-5">
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

  <div class="grid grid-cols-5">
    <UCard class="col-span-3 m-2" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <span class="text-lg truncate opacity-75">Revenues, Expenses, & Profits</span>
      </template>
      <LazyStatisticsLineChart :options="profitChartOpt" :series="profitCharts" :height="500" />
    </UCard>
    <UCard class="col-span-2 m-2" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <span class="text-lg truncate opacity-75">Monthly Products Sales</span>
      </template>
      <LazyStatisticsBarChart :options="productsChartOpt" :series="productsSeries" :height="500" />
    </UCard>
  </div>

  <div class="grid grid-cols-6">
    <UCard class="col-span-2 m-2" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <span class="text-lg truncate opacity-75">Top Partners</span>
      </template>
    </UCard>
    <UCard class="col-span-2 m-2" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <span class="text-lg truncate opacity-75">Warehouse Status</span>
      </template>
    </UCard>
    <UCard class="col-span-2 m-2" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <span class="text-lg truncate opacity-75">Recent Activities</span>
      </template>

      <UVerticalNavigation
        :links="recentActivities"
        class="w-full"
        :ui="{ label: 'truncate relative text-gray-900 dark:text-white flex-initial w-16 text-left' }"
      >
        <template #icon="{ link: l }">
          <IconCSS :name="l.icon" class="!h-4 !w-4" />
        </template>
        <template #badge="{ link: l }">
          <div class="flex-1 flex justify-between relative truncate">
            <div class="truncate">
              <span class="text-primary font-medium">{{ l.user }}</span>&nbsp;{{ l.badge }}
            </div>
            <div>{{ l.time }}</div>
          </div>
        </template>
      </UVerticalNavigation>
    </UCard>
  </div>
</template>
