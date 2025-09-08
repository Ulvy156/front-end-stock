<template>
  <el-drawer :with-header="false" :before-close="onClose" size="35%" v-model="drawerVisible">
    <section class="flex flex-col gap-3">
      <div class="flex items-center gap-x-1 col-span-2">
        <iconEdit class="size-7 text-blue-500" />
        <commonHeader :title="$t('customers.update_customer')" />
      </div>
      <div class="flex flex-col items-center">
        <img class="w-1/3 m-auto rounded-md" :src="customerData.img_url" alt="" />
        <input class="bg-blue-50 h-fit w-fit p-1 rounded-md" type="file" @change="handleFile" />
      </div>
      <div>
        <label for="name">{{ $t('customers.name') }}</label>
        <inputField v-model="customerData.name" :size="inputSize" id="name" />
      </div>
      <div>
        <label for="phone">{{ $t('customers.phone_number') }}</label>
        <inputField v-model="customerData.phone" :size="inputSize" id="phone" />
      </div>
      <div>
        <label for="telegram">{{ $t('customers.telegram') }}</label>
        <inputField v-model="customerData.telegram" :size="inputSize" id="telegram" />
      </div>
      <div>
        <label for="address">{{ $t('customers.address') }}</label>
        <textArea v-model="customerData.address" id="address" :maxlength="150" />
      </div>
      <div>
        <label for="mapUrl">{{ $t('customers.mapUrl') }}</label>
        <textArea v-model="customerData.mapUrl" :size="inputSize" id="mapUrl" :maxlength="300" />
      </div>
      <div class="flex justify-end items-end">
        <commonButton
          @click="onClose"
          size="large"
          type="info"
          :title="$t('modal_delete.cancel')"
        />
        <commonButton
          @click="onUpdateCustomer"
          size="large"
          type="primary"
          :title="$t('modal_delete.confirm')"
        />
      </div>
    </section>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import commonHeader from '@/components/common/common-header.vue'
import iconEdit from '@/icons/icon-edit.vue'
import inputField from '@/components/reusable/input-field.vue'
import commonButton from '@/components/common/common-button.vue'
import type { Customer } from '../interface/customer.interface'
import textArea from '@/components/reusable/text-area.vue'
import { startLoading } from '@/composables/useLoading'
import { getLocalStorage } from '@/utils/useLocalStorage'
import { updateCustomer } from '@/services/customer-service'

const props = withDefaults(
  defineProps<{
    isVisible: boolean
    customer: Customer
  }>(),
  {
    isVisible: false,
    customer: () => ({}) as Customer,
  },
)

const emits = defineEmits<{
  (event: 'on-close'): void
  (event: 'on-updated'): void
}>()
const drawerVisible = ref(false)
const inputSize = 'large'
const customerData = ref({
  id: '',
  name: '',
  phone: '',
  telegram: '',
  address: '',
  mapUrl: '',
  img_url: '',
})
const selectedFile = ref()

//methods
function onClose() {
  emits('on-close')
  drawerVisible.value = false
}
function onUpdated() {
  emits('on-updated')
  drawerVisible.value = false
}
function handleFile(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0] // store selected file
    customerData.value.img_url = URL.createObjectURL(target.files[0])
  }
}
async function onUpdateCustomer() {
  const formData = appendDataToForm()
  startLoading()
  appendDataToForm()
  await updateCustomer(customerData.value.id, formData, onUpdated);
}
function appendDataToForm() {
  const formData = new FormData()
  formData.append('name', customerData.value.name)
  formData.append('phone', customerData.value.phone)
  formData.append('telegram', customerData.value.telegram)
  formData.append('address', customerData.value.address)
  formData.append('mapUrl', customerData.value.mapUrl)
  formData.append('updated_by_user_id', getLocalStorage('user_id') ?? '')

  if(selectedFile.value){
    formData.append('file', selectedFile.value)
  }
  return formData;
}

watch(
  () => props.customer,
  () => {
    customerData.value = props.customer
  },
)
watch(
  () => props.isVisible,
  () => {
    if (!props.isVisible) return

    drawerVisible.value = props.isVisible
  },
)
</script>
