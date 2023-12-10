<script setup>
import colors from 'tailwindcss/colors'

const props = defineProps(['options', 'series', 'height', 'width'])
const chart = ref(null)
const colorMode = useColorMode()
const defaultOpt = ref({
  theme: {
    mode: colorMode.value,
  },
  chart: {
    background: 'rgba(0,0,0,0)',
    foreColor: colorMode.value === 'dark' ? colors.white : colors.slate[950],
    height: 350,
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  colors: [colors.red[500], colors.green[500], colors.blue[500]],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth',
  },
  markers: {
    size: 1,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    title: {
      text: 'Month',
    },
  },
  yaxis: {
    title: {
      text: 'Temperature',
    },
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'right',
  },
  ...props.options,
})

watch(colorMode, (newColorMode) => {
  chart.value.updateOptions({
    theme: {
      mode: newColorMode.value,
    },
    chart: {
      foreColor: newColorMode.value === 'dark' ? colors.white : colors.slate[950],
    },
  })
})
</script>

<template>
  <ClientOnly>
    <apexchart ref="chart" :key="props.series" :height="height || '400'" :width="width || '100%'" :options="defaultOpt" :series="props.series" />
  </ClientOnly>
</template>
