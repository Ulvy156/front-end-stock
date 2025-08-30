<template>
  <el-input
  style="width: 100%"
  :placeholder
  :suffix-icon="icon"
  :size
  :type
  />
</template>

<script lang="ts" setup>


interface Input {
  placeholder: string,
  icon: unknown | null,
  size: 'large' | 'default' | 'small',
  type: string

}

withDefaults(
  defineProps<Partial<Input>>(),
  {
    placeholder: "Please input...",
    icon: undefined,
    size: 'default',
    type: 'text'
  }
)
</script>
