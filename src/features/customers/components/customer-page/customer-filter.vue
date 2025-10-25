<template>
  <dialogForm width="50%" @onClose="isVisible = false" @onConfirm="onSearch" :isVisible>
    <form @submit.prevent="onSearch" class="grid grid-cols-2 gap-5">
      <div class="col-span-2">
        <commonHeader :title="$t('filter.title') + $t('customers.title')" />
      </div>
      <div>
        <label for="name">{{ $t('customers.name') }}</label>
        <inputField :value-on-clear="''" v-model="filterData.name" id="name"
          :placeholder="$t('customers.placehoder_name')" :size="'large'" :icon="iconSearch" />
      </div>
      <div>
        <label for="phone">{{ $t('customers.phone_number') }}</label>
        <inputField :value-on-clear="''" v-model="filterData.phone_number" id="phone"
          :placeholder="$t('customers.placeholder_phone_number')" :size="'large'" :icon="iconSearch" />
      </div>
      <div>
        <label for="province">{{ $t('location.province') }}</label>
        <el-select :value-on-clear="''" filterable clearable id="province" v-model="selectedProvince"
          placeholder="Select" size="large">
          <el-option v-for="item in provinces" :key="item.name" @click="filterData.province_id = item.id"
            :label="item.name" :value="item.name" />
        </el-select>
      </div>
      <div>
        <label for="district">{{ $t('location.district') }}</label>
        <el-select :value-on-clear="''" id="district" filterable :disabled="!selectedProvince" size="large"
          v-model="selectedDistrict" clearable placeholder="Select" style="width: 100%">
          <el-option v-for="item in districts" @click="filterData.district_id = item.id" :key="item.name"
            :label="item.name" :value="item.name" />
        </el-select>
      </div>
      <div>
        <label for="customer_type">{{ $t('customers.type') }}</label>
        <el-select :value-on-clear="null" id="customer_type" filterable size="large" v-model="selectedCustomerType"
          clearable placeholder="Select" style="width: 100%">
          <el-option v-for="item in customerDataTypeKh" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <button type="submit" style="display: none"></button>
    </form>
  </dialogForm>
  <div class="flex justify-between ">
    <div class="flex w-1/2">
      <commonHeader :title="$t('customers.title')" >
        <template #default>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
              d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" stroke-width="1" />
          </svg>
        </template>
      </commonHeader>
    </div>
    <div class="flex justify-end gap-x-1 w-1/2">
      <el-button :icon="iconSearch" circle @click="isVisible = true" />
      <el-button :icon="iconAdd" circle @click="isCreate = true" />
    </div>
  </div>

  <!-- create customer -->
   <component
    @on-close="onCreatedCustomer"
    :isVisible="isCreate"
    :is="createCustomer"
   />
</template>

<script setup lang="ts">
import inputField from '@/components/reusable/input-field.vue'
import iconSearch from '@/icons/icon-search.vue'
import iconAdd from '@/icons/icon-add.vue'
import { defineAsyncComponent, onBeforeMount, ref, shallowRef, watch } from 'vue'
import type { CustomerFilter, CustomerTypeKhmer } from '../../interface/customer.interface'
import dialogForm from '@/components/reusable/dialog-form.vue'
import { getAllProvinces, getProvinceWithDistrict } from '@/services/locations/province-service'
import type { District, Province } from '../../interface/location.interface'
import commonHeader from '@/components/common/common-header.vue'
import { customerDataTypeKh } from '../../interface/customer.interface'
import { getCustomerKhmerLabel } from '@/utils/useCustomerType'
const createCustomer = defineAsyncComponent(()=> import('./create-customer.vue'));

//emits
const emit = defineEmits<{
  (event: 'on-search', value: CustomerFilter): void,
  (event: 'on-created', value: boolean): void,
}>()

//properties
const filterData = ref<CustomerFilter>({
  page: 1,
  limit: 20,
  name: '',
  phone_number: '',
  province_id: 0,
  district_id: '',
  type: null
})
const isVisible = ref(false)
const isCreate = ref(false);
const provinces = shallowRef<Province[]>([])
const districts = shallowRef<District[]>([])
const selectedProvince = ref('')
const selectedDistrict = ref('')
const selectedCustomerType = ref<CustomerTypeKhmer>()
// Debounced search to prevent quick repeated calls
const onSearch = () => {
  isVisible.value = false
  emit('on-search', { ...filterData.value })
}
const onCreatedCustomer = () => {
  // emit event to parent for fetching customer summary
  isCreate.value = false;
  emit('on-created', true);
}
// convert khmer type to english ( customer type )
watch(
  selectedCustomerType,
  () => {
    if (!selectedCustomerType.value) {
      filterData.value.type = null;
      return;
    };
    filterData.value.type = getCustomerKhmerLabel(selectedCustomerType.value)
  }
)

// if user selected province show district based on province
watch(selectedProvince, async () => {
  // if user clear selected province
  if (!selectedProvince.value) {
    filterData.value.province_id = null
    return
  }

  if (!filterData.value.province_id) return
  await getProvinceWithDistrict(filterData.value.province_id).then((res) => {
    districts.value = res.data.data.district
  })
})

onBeforeMount(async () => {
  await getAllProvinces().then((res) => {
    provinces.value = res.data.data
  })
})
</script>


