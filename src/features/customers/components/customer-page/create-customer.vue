<template>
  <el-drawer :with-header="false" :before-close="onClose" size="50%" v-model="drawerVisible">
    <section class="grid grid-cols-2 gap-3">
      <div class="flex items-center gap-x-1 col-span-2">
        <iconAdd class="size-6 text-blue-700" />
        <commonHeader :title="$t('customers.create_customer')" />
      </div>
      <div class="flex flex-col items-center col-span-2">
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
        <label for="province">{{ $t('location.province') }}</label>
        <el-select id="province" size="large" v-model="selectedProvince.name" clearable placeholder="Select"
          style="width: 100%">
          <el-option v-for="item in provinces" @click="selectedProvince.id = item.id" :key="item.name"
            :label="item.name" :value="item.name" />
        </el-select>
      </div>
      <div>
        <label for="district">{{ $t('location.district') }}</label>
        <el-select id="district" filterable :disabled="!selectedProvince.id" size="large"
          v-model="selectedDistrict.name" clearable placeholder="Select" style="width: 100%">
          <el-option v-for="item in districts" @click="selectedDistrict.id = item.id" :key="item.name"
            :label="item.name" :value="item.name" />
        </el-select>
      </div>
      <div>
        <label for="customer_type">{{ $t('customers.type') }}</label>
        <el-select id="customer_type" size="large" v-model="selectedCustomerType" clearable placeholder="Select"
          style="width: 100%">
          <el-option
          v-for="value in customerDataTypeKh"
          :key="value"
          :value="value"
          :label="value" />
        </el-select>
      </div>
      <div class="col-span-2">
        <label for="address">{{ $t('customers.address') }}</label>
        <textArea v-model="customerData.address" id="address" :maxlength="150" />
      </div>
      <div class="col-span-2">
        <label for="mapUrl">{{ $t('customers.mapUrl') }}</label>
        <textArea v-model="customerData.mapUrl" :size="inputSize" id="mapUrl" :maxlength="300" />
      </div>
      <div class="flex justify-end items-end col-span-2">
        <commonButton @click="onClose" size="large" type="info" :title="$t('modal_delete.cancel')" />
        <commonButton @click="onCreateCustomer" size="large" type="primary" :title="$t('modal_delete.confirm')" />
      </div>
    </section>
  </el-drawer>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, shallowRef, watch } from 'vue'
import commonHeader from '@/components/common/common-header.vue'
import iconAdd from '@/icons/icon-add.vue'
import inputField from '@/components/reusable/input-field.vue'
import commonButton from '@/components/common/common-button.vue'
import { customerDataTypeKh, type CustomerDetails, type CustomerTypeKhmer } from '../../interface/customer.interface'
import textArea from '@/components/reusable/text-area.vue'
import { startLoading } from '@/composables/useLoading'
import { getLocalStorage } from '@/utils/useLocalStorage'
import { createCustomer } from '@/services/customer-service'
import { getAllProvinces, getProvinceWithDistrict } from '@/services/locations/province-service';
import type { District, Province } from '../../interface/location.interface'
import { notify } from '@/composables/useNotify'
import { useI18n } from "vue-i18n";
import { getCustomerKhmerLabel } from '@/utils/useCustomerType'
import { useCustomerStore } from '../../stores/useCustomer'

const props = withDefaults(
  defineProps<{
    isVisible: boolean
  }>(),
  {
    isVisible: false
  },
)

const emits = defineEmits<{
  (event: 'on-close'): void
}>()
const { t } = useI18n();

// properties
const drawerVisible = ref(false)
const inputSize = 'large'
const customerData = ref<CustomerDetails>({
  id: '',
  name: '',
  phone: '',
  telegram: '',
  address: '',
  mapUrl: '',
  img_url: '',
  lastOrderDate: null,
  totalOrders: 0,
  totalSpent: 0,
  district_id: '',
  created_by_user_id: '',
  updated_by_user_id: null,
  createdAt: '',
  updatedAt: '',
  district: undefined,
  type: 'RETAIL'
})
const selectedFile = ref()
const selectedProvince = ref<Province>({
  id: 0,
  name: '',
  createdAt: '',
  updatedAt: ''
})
const selectedDistrict = ref<District>({
  id: '',
  name: '',
  province_id: 0,
  createdAt: '',
  updatedAt: '',
  province: undefined
})
const provinces = shallowRef<Province[]>([])
const districts = shallowRef<District[]>([])
const selectedCustomerType = ref<CustomerTypeKhmer>()
const customerStore = useCustomerStore();
//methods
function onClose() {
  drawerVisible.value = false;
  emits('on-close')
}

function createdCustomerSuccess() {
  drawerVisible.value = false;
  customerStore.setCustomerCreated(true);
  notify({ message: t('customers.created'), type: 'success' })
  onClose();
}

function handleFile(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0] // store selected file
    customerData.value.img_url = URL.createObjectURL(target.files[0])
  }
}

async function onCreateCustomer() {
  const formData = appendDataToForm()
  startLoading()
  appendDataToForm()
  await createCustomer(formData, createdCustomerSuccess);
}

function appendDataToForm() {
  const formData = new FormData()
  formData.append('name', customerData.value.name)
  formData.append('phone', customerData.value.phone)
  formData.append('telegram', customerData.value.telegram)
  formData.append('address', customerData.value.address)
  formData.append('mapUrl', customerData.value.mapUrl)
  formData.append('type', customerData.value.type)
  formData.append('district_id', selectedDistrict.value.id)
  formData.append('created_by_user_id', getLocalStorage('user_id') ?? '')

  if (selectedFile.value) {
    formData.append('file', selectedFile.value)
  }
  return formData;
}

// props toggle visible
watch(
  () => props.isVisible,
  () => {
    drawerVisible.value = props.isVisible;
  }
)
// convert khmer type to english ( customer type )
watch(
  selectedCustomerType,
  () => {
    if(!selectedCustomerType.value) return;
    customerData.value.type = getCustomerKhmerLabel(selectedCustomerType.value)
  }
)

// if user selected province show district based on province
watch(
  () => selectedProvince.value.name,
  async() => {
  console.log(selectedProvince.value);

  await getProvinceWithDistrict(selectedProvince.value.id)
    .then((res) => {
      districts.value = res.data.data.district;
    })
})

onBeforeMount(async () => {

  await getAllProvinces()
    .then((res) => {
      provinces.value = res.data.data;

    })
})
</script>
