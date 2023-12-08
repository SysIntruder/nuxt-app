<script setup>
import colors from 'tailwindcss/colors'

useHead({
  title: 'Dashboard',
})

const colorMode = useColorMode()
const chart = ref(null)
const options = ref({
  chart: {
    height: 350,
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  colors: [colors.green[500], colors.red[500]],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth',
  },
  title: {
    text: 'Average High & Low Temperature',
    align: 'left',
  },
  markers: {
    size: 1,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    title: {
      text: 'Month',
    },
  },
  yaxis: {
    title: {
      text: 'Temperature',
    },
    min: 5,
    max: 40,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
})
const series = ref([
  {
    name: 'High - 2013',
    data: [28, 29, 33, 36, 32, 32, 33],
  },
  {
    name: 'Low - 2013',
    data: [12, 11, 14, 18, 17, 13, 13],
  },
])

watch(colorMode, (newColorMode) => {
  chart.value.updateOptions({
    chart: {
      foreColor: newColorMode.value === 'dark' ? colors.white : colors.slate[950],
    },
    theme: {
      mode: newColorMode.value,
    },
  })
})
</script>

<template>
  <div>
    <ClientOnly>
      <apexchart ref="chart" :key="series" height="350" width="50%" :options="options" :series="series" />
    </ClientOnly>
  </div>
</template>
