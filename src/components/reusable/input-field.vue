<template>
  <el-input
    style="width: 100%"
    :placeholder
    :suffix-icon="icon"
    :size :type
    :clearable
    :disabled>
    >
    <template #suffix>
      <slot name="icon" />
    </template>
  </el-input>
</template>

<script lang="ts" setup>


interface Input {
  placeholder: string,
  icon: unknown | null,
  size: 'large' | 'default' | 'small',
  type: string,
  disabled: boolean,
  clearable: boolean

}

withDefaults(
  defineProps<Partial<Input>>(),
  {
    placeholder: "Please input...",
    icon: undefined,
    size: 'default',
    type: 'text',
    disabled: false,
    clearable: true
  }
)
</script>
