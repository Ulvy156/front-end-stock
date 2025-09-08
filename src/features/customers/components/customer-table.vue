<template>
  <el-table
    @row-click="onClickUpdate"
    :highlight-current-row="true"
    :loading="isGetCustomers"
    :data="customers"
    stripe
    style="width: 100%; min-width: 50%; max-height: 55vh; height: auto"
  >
    <el-table-column prop="name" :label="$t('customers.name')">
      <template #default="{ row }">
        <div class="flex items-center gap-x-1">
          <commonAvatar :src="row.img_url" />
          <p>{{ row.name }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="address" :label="$t('customers.address')" />
    <el-table-column prop="phone" :label="$t('customers.phone_number')" />
    <el-table-column :label="$t('customers.telegram')">
      <template #default="{ row }">
        <el-link :href="`tg://resolve?phone=${row.telegram}`" target="_blank" type="primary">{{
          row.telegram
        }}</el-link>
      </template>
    </el-table-column>
    <el-table-column fixed="right" :label="$t('operations.title')" min-width="100">
      <template #default="{ row }">
        <el-button link type="warning" size="small">
          {{ $t('operations.details') }}
        </el-button>
        <el-button link type="primary" size="small" @click="onClickUpdate(row)">
          {{ $t('operations.edit') }}
        </el-button>
        <el-button link type="danger" size="small" @click="onClickDelete(row)">
          {{ $t('operations.delete') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- pagination -->
  <div class="flex justify-between items-center mt-5">
    <p>{{ $t('current_data') }}: {{ customers.length }}</p>
    <paginationPage :totalPage="totalPage" @page-change="currentPage = $event" />
  </div>
  <!-- pop-up delete  -->
  <component
    :is="dialogForm"
    @onClose="isDelete = $event"
    @onConfirm="onConfirmDelete"
    :isVisible="isDelete"
  >
    <template #header>
      {{ $t('modal_delete.title') }}
    </template>
    <template #default>
      <p>{{ $t('customers.name') }} : {{ selectedCustomer.name }}</p>
    </template>
  </component>

  <!-- update customer -->
  <component
    :customer="selectedCustomer"
    @on-close="toggleUpdateCustomer = false"
    @on-updated="getAllCustomers"
    :isVisible="toggleUpdateCustomer"
    :is="updateCustomer"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent, onBeforeMount, ref, shallowRef, watch } from 'vue'
import commonAvatar from '@/components/common/common-avatar.vue'
import paginationPage from '@/components/reusable/pagination-page.vue'
import { startLoading } from '@/composables/useLoading'
const dialogForm = defineAsyncComponent(() => import('@/components/reusable/dialog-form.vue'))
const updateCustomer = defineAsyncComponent(() => import('../components/update-customer.vue'))
import type { Customer, CustomerFilter } from '../interface/customer.interface'
import { deleteCustomer, getCustomers } from '@/services/customer-service'

//props
const props = defineProps<{
  filterData: CustomerFilter
}>();

// properties
const customers = shallowRef<Customer[]>([])
const isGetCustomers = ref(false)
const totalCustomers = ref(0)
const isDelete = ref(false)
let selectedCustomer: Customer = {
  id: '',
  name: '',
  phone: '',
  telegram: '',
  address: '',
  lastOrderDate: null,
  totalOrders: 0,
  totalSpent: 0,
  mapUrl: '',
  createdAt: '',
  updatedAt: '',
  img_url: '',
}
const totalPage = ref(0)
const currentPage = ref(1)
const toggleUpdateCustomer = ref(false)
const customerFilterData = ref<CustomerFilter>({
  page: 1,
  limit: 20,
  name: '',
  phone_number: ''
})
//functions
async function getAllCustomers() {

  const data = await getCustomers(customerFilterData.value);
  customers.value = data?.customers ?? [];
  totalPage.value = data?.total ?? 0;
  totalCustomers.value = data?.customers?.length ?? 0;

  // make update form reactive
  isGetCustomers.value = true
  toggleUpdateCustomer.value = false
}
function onClickDelete(customer: Customer) {
  isDelete.value = true
  selectedCustomer = customer
}
function onClickUpdate(customer: Customer) {
  toggleUpdateCustomer.value = true
  selectedCustomer = { ...customer }
}
async function onConfirmDelete() {
  startLoading()

  await deleteCustomer(selectedCustomer.id, getAllCustomers);
  isDelete.value = false;
}

// watch
watch(currentPage, async () => {
  await getAllCustomers()
})

watch(
  () => props,
  () => {
    customerFilterData.value = props.filterData;
  }
)

onBeforeMount(async () => {
  await getAllCustomers()
})
</script>

<style scoped>
::v-deep(.el-table__body-wrapper tbody tr) {
  cursor: pointer;
}
</style>
