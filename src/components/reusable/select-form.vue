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
      v-model="selectedItem"
    >
      <el-option
        v-for="item in items"
        :key="item.id"
        :value="item.label"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts" >
import { ref } from 'vue'
interface Select {
  id: number | string;
  label: string;
}
withDefaults(
  defineProps<{
    items: Select[],
    id?: string,
    placeholder?: string,
    label?: string
  }>(),
  {
    items: ()=> [] as Select[],
    id: '',
    placeholder: 'Please select',
    label: ''
  }
)

const selectedItem = ref<Select>()

defineEmits<{
  (e: 'update:modelValue', value: Select): void
}>()
</script>
