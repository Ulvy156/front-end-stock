<template>
  <article class="flex flex-col justify-between items-start p-5 w-full shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-md">
    <div class="flex justify-between items-center w-full">
      <h3 class="text-md text-gray-400">{{ title }}</h3>
      <slot>
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 2048 2048">
        <path fill="currentColor" d="m960 120l832 416v1040l-832 415l-832-415V536zm625 456L960 264L719 384l621 314zM960 888l238-118l-622-314l-241 120zM256 680v816l640 320v-816zm768 1136l640-320V680l-640 320z" />
      </svg>
      </slot>
    </div>
    <h1 class="text-2xl font-[600] mt-3">{{total}} </h1>
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
