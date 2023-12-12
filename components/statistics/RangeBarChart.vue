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
    background: colorMode.value === 'dark' ? colors.slate[900] : colors.slate[50],
    foreColor: colorMode.value === 'dark' ? colors.white : colors.slate[950],
    height: 350,
    type: 'rangeBar',
    toolbar: {
      show: true,
      offsetY: -10,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
    },
  },
  colors: colorMode.value === 'dark'
    ? [colors.green[400], colors.red[400], colors.blue[400]]
    : [colors.green[500], colors.red[500], colors.blue[500]],
  dataLabels: {
    enabled: true,
    offsetX: 20,
    style: {
      colors: [colorMode.value === 'dark' ? colors.white : colors.slate[950]],
    },
  },
  xaxis: {
    categories: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'],
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
      background: newColorMode.value === 'dark' ? colors.slate[900] : colors.slate[50],
      foreColor: newColorMode.value === 'dark' ? colors.white : colors.slate[950],
    },
    dataLabels: {
      style: {
        colors: [newColorMode.value === 'dark' ? colors.white : colors.slate[950]],
      },
    },
  })
})
</script>

<template>
  <ClientOnly>
    <apexchart ref="chart" :key="props.series" :height="height || '400'" :width="width || '100%'" :options="defaultOpt" :series="props.series" />
  </ClientOnly>
</template>
