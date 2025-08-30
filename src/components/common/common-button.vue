<template>
  <button class="border-non w-full bg-blue-500 p-2 rounded-md text-white cursor-pointer">{{ title }}</button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
  }>(),
  {
    title: 'ចូលប្រពន្ធ័'
  }
)
</script>
