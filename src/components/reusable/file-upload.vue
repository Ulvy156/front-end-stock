<script setup lang="ts">
import { ref } from 'vue'
import { notify } from '@/composables/useNotify';

const props = withDefaults(
  defineProps<{
    maxSizeMB?: number
    preview?: boolean
  }>(),
  {
    maxSizeMB: 1, // default 1MB
    preview: true,
  }
)

const emit = defineEmits<{
  (e: 'update:file', file: File | null): void
}>()

const previewUrl = ref<string | null>(null)

const handleFile = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const maxSizeBytes = props.maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    notify({title: '',message: `File too big! Max size: ${props.maxSizeMB}MB`, type: 'error'})
    input.value = ''
    emit('update:file', null)
    return
  }

  if (props.preview) {
    previewUrl.value = URL.createObjectURL(file)
  }

  emit('update:file', file)
}

const removeFile = () => {
  previewUrl.value = null
  emit('update:file', null)
}
</script>

<template>
  <div class="flex flex-col items-start gap-2">
    <input
      type="file"
      accept="image/*"
      class="bg-blue-50 h-fit w-fit p-1 rounded-md cursor-pointer"
      @change="handleFile"
    />
    <span class="text-yellow-600">Max file size: {{ props.maxSizeMB }}MB</span>
    <div v-if="preview && previewUrl" class="relative w-32 h-32 mt-2">
      <img
        :src="previewUrl"
        class="w-32 h-32 object-cover rounded-md shadow-sm"
      />
      <button
        @click="removeFile"
        class="absolute top-1 right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded"
      >
        ✕
      </button>
    </div>
  </div>
</template>
