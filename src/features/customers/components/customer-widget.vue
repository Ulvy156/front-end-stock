<template>
  <article class="flex flex-col items-center p-5 w-full hover:shadow-sm transition-shadow duration-300 cursor-pointer rounded-md">
    <h3 class="text-lg">{{ title }}</h3>
    <h1 class="text-2xl">{{total}} </h1>
  </article>
</template>

<script setup lang="ts">


withDefaults(
  defineProps<{
    total: number,
    title: string,
  }>(),
  {
    total: 0,
    title: ""

  }
)
</script>
