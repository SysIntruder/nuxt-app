<script setup>
import colors from 'tailwindcss/colors'

useHead({
  title: 'Dashboard',
})

const colorMode = useColorMode()

const dateRangeFilter = ref({
  start: new Date(),
  end: new Date(),
})
const dateRangeFilterLabel = computed(() => {
  const start = dateRangeFilter.value.start.toLocaleDateString(
    'en-us',
    {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  )
  const end = dateRangeFilter.value.end.toLocaleDateString(
    'en-us',
    {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  )

  return `${start} - ${end}`
})
function selectThisYear() {
  const now = new Date()
  dateRangeFilter.value = {
    start: new Date(now.getFullYear(), 0, 1),
    end: new Date(now.getFullYear(), 11, 31),
  }
}
function selectThisMonth() {
  const now = new Date()
  dateRangeFilter.value = {
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(now.getFullYear(), now.getMonth() + 1, 0),
  }
}
function selectThisWeek() {
  const now = new Date()
  const first = now.getDate() - now.getDay()
  const last = first + 6
  dateRangeFilter.value = {
    start: new Date(now.setDate(first)),
    end: new Date(now.setDate(last)),
  }
}
function selectLastNDays(num) {
  const now = new Date()
  const first = now.getDate() - (num - 1)
  dateRangeFilter.value = {
    start: new Date(now.setDate(first)),
    end: new Date(),
  }
}

const productFilter = ref([])
const productOptions = [
  'Great Club',
  'Longsword',
  'Claymore',
  'Uchigatana',
  'Bandit Knife',
  'Mace',
  'Winged Spear',
  'Black Knight Sword',
  'Silver Knight Sword',
  'Black Knight Shield',
  'Silver Knight Shield',
]

const typeFilter = ref([])
const typeOptions = [
  'Straight Sword',
  'Great Sword',
  'Ultra Great Sword',
  'Curved Sword',
  'Great Curved Sword',
  'Hammer',
  'Great Hammer',
  'Ultra Great Hammer',
  'Katana',
  'Daggers',
  'Spear',
  'Bow',
  'Crossbow',
  'Shield',
]

const vendorFilter = ref([])
const vendorOptions = [
  'Blacksmith Andre',
  'Giant Blacksmith',
  'Blacksmith Vamos',
  'Blacksmith Rickert of Vinheim',
  'Others',
]

const customerFilter = ref([])
const customerOptions = [
  'Solaire of Astora',
  'Knight Lautrec of Carim',
  'Siegmeyer of Catarina',
  'Others',
]

const cards = ref([])
async function loadCards() {
  const { data: { value } } = await useFetch('/api/dashboard-card')
  cards.value = value
}

const profitCharts = ref([])
const profitChartOpt = {
  dataLabels: {
    enabled: true,
    formatter(val) {
      return val ? `$${formatDotNumber(val)} M` : ''
    },
    background: {
      padding: 6,
      foreColor: colorMode.value === 'dark' ? colors.white : colors.slate[950],
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
async function loadProfitCharts() {
  const { data: { value } } = await useFetch('/api/dashboard-profit-chart')
  profitCharts.value = value
}

const productsCategories = ref([])
const productsSeries = ref([])
const productsChartOpt = {
  dataLabels: {
    enabled: true,
    offsetX: 45,
    formatter(val) {
      return val ? `$${formatDotNumber(val)} M` : ''
    },
    background: {
      foreColor: colorMode.value === 'dark' ? colors.slate[950] : colors.white,
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
async function loadProductsChart() {
  const { data: { value: { categories, series } } } = await useFetch('/api/dashboard-products-chart')
  productsCategories.value = categories
  productsSeries.value = series
}

const incomeStatementCharts = ref([])
const incomeStatementChartOpt = {
  dataLabels: {
    enabled: true,
    formatter(_, { config: { series }, dataPointIndex }) {
      const curData = series[0].data[dataPointIndex].y
      const val = Number.parseFloat(curData[1] - curData[0]).toFixed(1)

      return val ? `$${formatDotNumber(val)} M` : ''
    },
    background: {
      foreColor: colorMode.value === 'dark' ? colors.slate[950] : colors.white,
    },
  },
  colors: [
    function ({ dataPointIndex }) {
      if ([0, 1].includes(dataPointIndex))
        return colorMode.value === 'dark' ? colors.green[400] : colors.green[500]
      else if ([3, 9, 11].includes(dataPointIndex))
        return colorMode.value === 'dark' ? colors.blue[400] : colors.blue[500]
      else
        return colorMode.value === 'dark' ? colors.red[400] : colors.red[500]
    },
  ],
  xaxis: {
    style: {
      fontWeight: 700,
    },
    group: {
      style: {
        fontSize: '10px',
        fontWeight: 700,
      },
      groups: [
        { title: 'Revenue', cols: 4 },
        { title: 'Expenses', cols: 5 },
        { title: 'Income', cols: 3 },
      ],
    },
  },
}
async function loadIncomeStatementCharts() {
  const { data: { value } } = await useFetch('/api/dashboard-income-statement-chart')
  incomeStatementCharts.value = value
}

const recentActivities = ref([])
async function loadRecentActivities() {
  const { data: { value } } = await useFetch('/api/dashboard-recent-activities')
  recentActivities.value = value
}

await loadCards()
await loadProfitCharts()
await loadProductsChart()
await loadIncomeStatementCharts()
await loadRecentActivities()
</script>

<template>
  <div class="sticky top-0 z-20 mb-8">
    <UCard>
      <div class="flex flex-col lg:flex-row items-center">
        <div class="w-full lg:w-[18vw] my-4 lg:my-0">
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UFormGroup label="Time period" class="lg:mr-2 w-full">
              <UInput readonly :value="dateRangeFilterLabel" icon="i-heroicons-calendar" />
            </UFormGroup>

            <template #panel="{ close }">
              <div class="flex">
                <div class="flex flex-col py-2 px-2 pr-3 w-[125px]">
                  <UButton color="gray" label="This year" class="my-1" @click="selectThisYear" />
                  <UButton color="gray" label="This month" class="my-1" @click="selectThisMonth" />
                  <UButton color="gray" label="This week" class="my-1" @click="selectThisWeek" />
                  <UButton color="gray" label="Last 7 days" class="my-1" @click="selectLastNDays(7)" />
                  <UButton color="gray" label="Last 30 days" class="my-1" @click="selectLastNDays(30)" />
                </div>
                <FormDatePicker v-model.range="dateRangeFilter" shortcut @close="close" />
              </div>
            </template>
          </UPopover>
        </div>

        <div class="flex flex-col md:flex-row justify-center lg:justify-start items-center w-full lg:w-[auto] my-4 lg:my-0">
          <UFormGroup label="Products Filter" class="w-full md:w-auto my-2 md:my-0 md:mr-2">
            <USelectMenu
              v-model="productFilter"
              :options="productOptions"
              multiple
              placeholder="Select products"
              class="md:w-[17vw] lg:w-[15vw]"
              :popper="{ strategy: 'fixed' }"
              :ui-menu="{ width: 'max-w-[75vw] md:w-[17vw] lg:w-[15vw]', height: 'max-h-[20vh]' }"
            />
          </UFormGroup>

          <UFormGroup label="Type Filter" class="w-full md:w-auto my-2 md:my-0 md:mx-2">
            <USelectMenu
              v-model="typeFilter"
              :options="typeOptions"
              multiple
              placeholder="Select types"
              class="md:w-[17vw] lg:w-[15vw]"
              :popper="{ strategy: 'fixed' }"
              :ui-menu="{ width: 'max-w-[75vw] md:w-[17vw] lg:w-[15vw]', height: 'max-h-[20vh]' }"
            />
          </UFormGroup>

          <UFormGroup label="Vendor Filter" class="w-full md:w-auto my-2 md:my-0 md:mx-2">
            <USelectMenu
              v-model="vendorFilter"
              :options="vendorOptions"
              multiple
              placeholder="Select vendors"
              class="md:w-[17vw] lg:w-[15vw]"
              :popper="{ strategy: 'fixed' }"
              :ui-menu="{ width: 'max-w-[75vw] md:w-[17vw] lg:w-[15vw]', height: 'max-h-[20vh]' }"
            />
          </UFormGroup>

          <UFormGroup label="Customer Filter" class="w-full md:w-auto my-2 md:my-0 md:ml-2">
            <USelectMenu
              v-model="customerFilter"
              :options="customerOptions"
              multiple
              placeholder="Select customers"
              class="md:w-[17vw] lg:w-[15vw]"
              :popper="{ strategy: 'fixed' }"
              :ui-menu="{ width: 'max-w-[75vw] md:w-[17vw] lg:w-[15vw]', height: 'max-h-[20vh]' }"
            />
          </UFormGroup>
        </div>
      </div>
    </UCard>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-4 my-4">
    <template v-for="(card, cardId) in cards" :key="cardId">
      <StatisticsCard
        :title="card.title"
        :status="card.status"
        :diff="card.diff"
        :percentage="card.percentage"
        :total="formatDotNumber(card.total)"
        :currency="card.currency"
      />
    </template>
  </div>

  <div class="grid grid-cols-6 gap-4 my-4">
    <UCard class="col-span-6 lg:col-span-3 2xl:col-span-4" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <div class="flex justify-between">
          <span class="text-lg truncate opacity-75">Revenues, Expenses, & Profits</span>
          <UTooltip text="Refresh" :popper="{ placement: 'left' }">
            <UButton color="gray" icon="i-heroicons-arrow-path" @click="loadProfitCharts" />
          </UTooltip>
        </div>
      </template>

      <LazyStatisticsLineChart :options="profitChartOpt" :series="toRaw(profitCharts)" :height="400" />
    </UCard>

    <UCard class="col-span-6 lg:col-span-3 2xl:col-span-2" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <div class="flex justify-between">
          <span class="text-lg truncate opacity-75">Monthly Products Sales</span>
          <UTooltip text="Refresh" :popper="{ placement: 'left' }">
            <UButton color="gray" icon="i-heroicons-arrow-path" @click="loadProductsChart" />
          </UTooltip>
        </div>
      </template>

      <LazyStatisticsBarChart :options="productsChartOpt" :series="toRaw(productsSeries)" :height="400" />
    </UCard>
  </div>

  <div class="grid grid-cols-6 gap-4 my-4">
    <UCard class="col-span-6 lg:col-span-3 2xl:col-span-4" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <div class="flex justify-between">
          <span class="text-lg truncate opacity-75">Income Statement</span>
          <UTooltip text="Refresh" :popper="{ placement: 'left' }">
            <UButton color="gray" icon="i-heroicons-arrow-path" @click="loadIncomeStatementCharts" />
          </UTooltip>
        </div>
      </template>

      <LazyStatisticsRangeBarChart :options="incomeStatementChartOpt" :series="toRaw(incomeStatementCharts)" :height="400" />
    </UCard>

    <UCard class="col-span-6 lg:col-span-3 2xl:col-span-2" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
      <template #header>
        <div class="flex justify-between">
          <span class="text-lg truncate opacity-75">Recent Activities</span>
          <UTooltip text="Refresh" :popper="{ placement: 'left' }">
            <UButton color="gray" icon="i-heroicons-arrow-path" @click="loadRecentActivities" />
          </UTooltip>
        </div>
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
