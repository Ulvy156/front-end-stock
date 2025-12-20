<template>
  <article class="flex flex-col justify-between items-start p-5 w-full shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-md">
    <div class="flex justify-between items-center w-full">
      <h3 class="text-md text-gray-400">{{ title }}</h3>
      <slot>
        <svg xmlns="http://www.w3.org/2000/svg" class="size-6" viewBox="0 0 2048 2048">
        <path fill="currentColor" d="m960 120l832 416v1040l-832 415l-832-415V536zm625 456L960 264L719 384l621 314zM960 888l238-118l-622-314l-241 120zM256 680v816l640 320v-816zm768 1136l640-320V680l-640 320z" />
      </svg>
      </slot>
    </div>
    <!-- used for display percentage only show if exist -->
    <div class="flex items-center gap-x-1 mt-2" v-if="percentage">
      <span :class="['text-[12px]', svgColor]">{{ content }} {{ mathABS(percentage) }}%</span>
      <!-- icon downgrade -->
      <svg xmlns="http://www.w3.org/2000/svg" class="text-red-800 size-3" viewBox="0 0 24 24" v-if="percentage < 0">
        <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5">
          <path d="M3.5 10.5v9c0 .466 0 .699.076.883a1 1 0 0 0 .541.54C4.301 21 4.534 21 5 21s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883v-9c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54C5.699 9 5.466 9 5 9s-.699 0-.883.076a1 1 0 0 0-.54.541c-.077.184-.077.417-.077.883Z" />
          <path stroke-linecap="round" d="m17.5 8l2 2.5l-2.5 2" />
          <path stroke-linecap="round" d="M19 10.502s-7.5 0-15-7.5" />
          <path d="M10.5 14v5.5c0 .466 0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883V14c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54c-.184-.077-.417-.077-.883-.077s-.699 0-.883.076a1 1 0 0 0-.54.541c-.077.184-.077.417-.077.883Zm7 2.5v3c0 .466 0 .699.076.883a1 1 0 0 0 .541.54c.184.077.417.077.883.077s.699 0 .883-.076a1 1 0 0 0 .54-.541c.077-.184.077-.417.077-.883v-3c0-.466 0-.699-.076-.883a1 1 0 0 0-.541-.54C19.699 15 19.466 15 19 15s-.699 0-.883.076a1 1 0 0 0-.54.541c-.077.184-.077.417-.077.883Z" />
        </g>
      </svg>
      <!-- icon growth -->
      <svg xmlns="http://www.w3.org/2000/svg" class="text-green-800 size-3" viewBox="0 0 20 20" v-else>
        <path fill="currentColor" d="M14 2.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-.69l-4.47 4.47a.75.75 0 0 1-1.06 0L8.5 6.56l-4.22 4.22a.75.75 0 1 1-1.06-1.06l4.75-4.75a.75.75 0 0 1 1.06 0l2.47 2.47l3.94-3.94h-.69a.75.75 0 0 1-.75-.75M3.75 14a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75m4.75-2.25a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0zM11.75 13a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5a.75.75 0 0 1 .75-.75m4.75-3.25a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0z" />
      </svg>
    </div>
    <h1 class="text-2xl font-[600] mt-3">{{total}} </h1>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';



const props = withDefaults(
  defineProps<{
    total: number,
    title: string,
    percentage?: number | null
  }>(),
  {
    total: 0,
    title: "",
    percentage: null
  }
)
const mathABS = (value: number) => {
  return Math.abs(value);
}
// display text color based on percentage
const content = computed(() => {
  if(!props.percentage) return '';
  return props.percentage > 0 ? 'ច្រើនជាងខែមុន' : 'តិចជាងខែមុន'
})

// display svg color based on percentage
const svgColor = computed(() => {
  if(!props.percentage) return '';
  return props.percentage > 0 ? 'text-green-800' : 'text-red-800';
})
</script>
