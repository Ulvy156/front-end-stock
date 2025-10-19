<template>
    <el-input
    :maxlength
    style="width: 100%"
    :placeholder
    :show-word-limit="show_word_limit"
    type="textarea"
  />
</template>

<script setup lang="ts">
interface TextArea {
      maxlength: number,
    placeholder: string,
    show_word_limit: boolean
}
withDefaults(
  defineProps<Partial<TextArea>>(),
  {
    maxlength: 30,
    placeholder: '',
    show_word_limit: true
  }
)

</script>
