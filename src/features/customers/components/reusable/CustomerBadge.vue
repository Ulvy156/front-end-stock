<template>
  <el-tag
    :type="tagType"
    effect="light"
    class="text-xs font-medium"
    round
  >
    {{ (type) }}
  </el-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: 'RETAILS' | 'WHOLESALE' | 'VIP'
}

const props = defineProps<Props>()

const tagType = computed(() => {
  switch (props.type) {
    case 'RETAILS':
      return 'info'
    case 'WHOLESALE':
      return 'success'
    case 'VIP':
      return 'primary'
    default:
      return ''
  }
})

</script>
