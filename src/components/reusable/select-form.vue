<!-- BaseSelect.vue -->
<template>
  <div>
    <label :for="id">{{ label }}</label>
    <el-select
      :id="id"
      filterable
      clearable
      :placeholder="placeholder"
      size="large"
    >
      <el-option
        v-for="item in items"
        @click="selectedItem = item"
        :key="item"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts" >
import { ref } from 'vue'

withDefaults(
  defineProps<{
    items: T[],
    id: string,
    placeholder: string,
    label: string
  }>(),
  {
    items: [],
    id: '',
    placeholder: 'Please select',
    label: ''
  }
)

const selectedItem = ref<T>()

defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()
</script>
