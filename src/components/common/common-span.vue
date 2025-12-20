<template>
  <span class="text-[12px] text-gray-400 w-full">{{ props.content }}</span>
</template>

<script setup lang="ts">

const props =  withDefaults(
  defineProps<{
    content: string
  }>(),
  {
    content: ''
  }
)

</script>
