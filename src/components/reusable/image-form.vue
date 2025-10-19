<template>
  <img :class="className" :src="userProfile" alt="" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props =   defineProps<{
    src?: string
    className: string
  }>();

const userProfile = computed(() => {
  return props.src ? props.src : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
})
</script>
