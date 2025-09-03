<template>
  <el-button :size :type plain>{{ title }}</el-button>
</template>

<script setup lang="ts">
type BtnType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
type BtnSize = 'large' | 'default' | 'small';

withDefaults(
  defineProps<{
    title?: string
    type?: BtnType,
    size?: BtnSize
  }>(),
  {
    title: 'ចូលប្រពន្ធ័',
    type: 'default', // only one default, not the whole union
    size: 'default'
  }
)
</script>
