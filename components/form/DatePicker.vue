<script setup>
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
})

const emit = defineEmits(['update:model-value', 'close'])

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', value)
    emit('close')
  },
})
</script>

<template>
  <VCalendarDatePicker
    v-model="date"
    transparent
    borderless
    color="green"
    :is-dark="isDark"
    title-position="left"
    trim-weeks
    :first-day-of-week="2"
  />
</template>
