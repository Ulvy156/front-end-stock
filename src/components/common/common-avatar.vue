<template>
   <el-avatar
      :src="avatarSrc"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Avatar {
  src?: string
}
const props =   defineProps<Avatar>();


const avatarSrc = computed(() => {
  return props.src && props.src.length > 0
    ? props.src
    : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';
});


</script>
