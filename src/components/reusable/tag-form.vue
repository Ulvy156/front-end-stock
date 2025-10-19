<template>
  <el-tag :type :effect>{{ title }}</el-tag>
</template>

<script setup lang="ts">

type TagType = 'primary' | 'success' | 'info' | 'warning' | 'danger'
type EffectType = 'plain' | 'light' | 'dark';

withDefaults(
  defineProps<{
    title: string,
    type: TagType,
    effect?: EffectType
  }>(),
  {
    title: '',
    type: 'primary',
    effect: 'plain'
  }
)
</script>
