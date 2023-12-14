<template>
  <UCard class="px-4 py-2">
    <div class="mb-4">
      <div class="mb-2 text-center">
        <slot name="logo" />
      </div>
      <div class="mb-2 text-center text-2xl font-medium">
        <slot name="title" />
      </div>
      <div class="mt-2 text-center text-sm opacity-75">
        <slot name="subtitle" />
      </div>
    </div>

    <div class="mt-4">
      <slot />
    </div>
  </UCard>
</template>
