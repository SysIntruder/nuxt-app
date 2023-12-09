<script setup>
const props = defineProps(['title', 'status', 'diff', 'percentage', 'total', 'currency'])
const { title, status, diff, percentage, total, currency } = props
</script>

<template>
  <UCard class="m-2" :ui="{ header: { padding: 'p-2 sm:px-6' } }">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-lg truncate">{{ title }}</span>
        <span
          v-if="percentage > -1"
          class="flex items-center text-right font-medium"
          :class="{
            'text-green-500 dark:text-green-400': status === 'good',
            'text-red-500 dark:text-red-400': status === 'bad',
          }"
        >
          <span v-if="diff === 'inc'" class="text-4xl relative bottom-0.5">&#128897;</span>
          <span v-else-if="diff === 'dec'" class="text-4xl relative bottom-0.5">&#128899;</span>
          <span v-else class="text-4xl">&#128900;</span>
          {{ percentage }}%
        </span>
      </div>
    </template>

    <div class="flex flex-col gap-2 w-full">
      <span class="text-4xl font-semibold truncate">
        {{ currency ? 'Rp ' : '' }}{{ total ? total : 0 }}
      </span>
    </div>
  </UCard>
</template>
