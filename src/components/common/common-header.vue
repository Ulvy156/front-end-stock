<template>
  <h2 class="text-lg text-[var(--text-blue)]">{{title}}</h2>
</template>


<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
  }>(),
  {
    title: ''
  }
)
</script>
