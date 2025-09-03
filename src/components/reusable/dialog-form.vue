<template>
  <el-dialog
    v-model="dialogVisible"
    class="custom-transition-dialog"
    width="30%"
    :transition="transitionConfig"
    :before-close="onClose"
  >

    <template #header>
      <slot name="header"></slot>
    </template>
        <template #default>
      <slot name="default"></slot>
    </template>
    <template #footer>
      <el-button @click="onClose">{{ $t("modal_delete.cancel") }}</el-button>
      <el-button type="danger" @click="onConfirm">
        {{ $t("modal_delete.confirm") }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

import type { DialogTransition } from 'element-plus';

//props
const props =  withDefaults(
  defineProps<{
    isVisible: boolean
  }>(),
  {
    isVisible: false
  }
)
const emits = defineEmits<{
  (event: "onClose", value: boolean): void
  (event: "onConfirm", value: boolean): void
}>();

const dialogVisible = ref(false)
const isObjectConfig = ref(false)

function onClose() {
  dialogVisible.value = false;
  emits("onClose", dialogVisible.value );
}
function onConfirm() {
  dialogVisible.value = false;
  emits("onConfirm", dialogVisible.value );
}
const transitionConfig = computed<DialogTransition>(() => {
  if (isObjectConfig.value) {
    return {
      name: 'dialog-custom-object',
      appear: true,
      mode: 'out-in',
      duration: 500,
    }
  }
  return `dialog-scale`
})

watch(
  ()=>props.isVisible,
  ()=>{
  if(!props.isVisible) return;

  dialogVisible.value = props.isVisible;
})

</script>

<style scoped>
code {
  background: var(--el-bg-color-page);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: block;
  margin-top: 8px;
}
</style>

<style>
/* Scale Animation */
.dialog-scale-enter-active,
.dialog-scale-leave-active,
.dialog-scale-enter-active .el-dialog,
.dialog-scale-leave-active .el-dialog {
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.dialog-scale-enter-from,
.dialog-scale-leave-to {
  opacity: 0;
}

.dialog-scale-enter-from .el-dialog,
.dialog-scale-leave-to .el-dialog {
  transform: scale(0.5);
  opacity: 0;
}


</style>
