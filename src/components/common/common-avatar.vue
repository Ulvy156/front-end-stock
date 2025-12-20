<template>
  <el-avatar
    :src="currentSrc"
    @error="onError"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Avatar {
  src?: string
}

const props = defineProps<Avatar>()

const fallback =
  'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'

const currentSrc = ref(props.src || fallback)

// update if prop changes
watch(
  () => props.src,
  (newSrc) => {
    currentSrc.value = newSrc || fallback
  }
)

function onError() {
  currentSrc.value = fallback
}
</script>
