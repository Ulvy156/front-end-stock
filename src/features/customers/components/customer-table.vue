<template>
  <el-table
    :highlight-current-row="true"
    v-loading="loadingCustomers"
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
    <el-table-column :label="$t('customers.address')" >
      <template #default="{ row }">
        {{ row.district.province.name }} / {{ row.district.name }}
      </template>
    </el-table-column>
    <el-table-column prop="phone" :label="$t('customers.phone_number')" />
    <el-table-column :label="$t('customers.telegram')">
      <template #default="{ row }">
        <el-link :href="`tg://resolve?phone=${row.telegram}`" target="_blank" type="primary">
          {{formatPhoneDisplay(row.telegram)}}
        </el-link>
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
    <paginationPage :totalPage="totalPage" @page-change="currentFilterData.page = $event" />
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
    :isVisible="toggleUpdateCustomer"
    :customer="selectedCustomer"
    @on-close="toggleUpdateCustomer = false"
    @on-updated="hideUpdatedForm"
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
import { formatPhoneDisplay } from '@/utils/formatPhoneDisplay'

//props
const props = defineProps<{
  filterData: CustomerFilter
}>();

// properties
const customers = shallowRef<Customer[]>([])
const loadingCustomers = ref(false);
const totalCustomers = ref(0)
const isDelete = ref(false)
const selectedCustomer = shallowRef<Customer>({
  id: '',
  name: '',
  phone: '',
  telegram: '',
  address: '',
  lastOrderDate: null,
  totalOrders: 0,
  totalSpent: 0,
  mapUrl: '',
  img_url: '',
  createdAt: '',
  updatedAt: ''
})
const totalPage = ref(0)
const toggleUpdateCustomer = ref(false)
const currentFilterData = shallowRef<CustomerFilter>({
  page: 1,
  limit: 30,
  name: '',
  phone_number: ''
})

//functions
async function hideUpdatedForm() {
  toggleUpdateCustomer.value = false;
  await getAllCustomers();
}
async function getAllCustomers() {
  loadingCustomers.value = true;
  const data = await getCustomers(currentFilterData.value);
  customers.value = data?.customers ?? [];
  totalPage.value = data?.lastPage ?? 0;
  totalCustomers.value = data?.customers?.length ?? 0;

  loadingCustomers.value = false;
}

function onClickDelete(customer: Customer) {
  isDelete.value = true

  selectedCustomer.value = JSON.parse(JSON.stringify(customer))
}

function onClickUpdate(customer: Customer) {
  selectedCustomer.value = JSON.parse(JSON.stringify(customer));
  toggleUpdateCustomer.value = true
}

async function onConfirmDelete() {
  startLoading()

  await deleteCustomer(selectedCustomer.value.id, getAllCustomers);
  isDelete.value = false;
}

// watch
watch(
  () => props.filterData,
  async () => {
    currentFilterData.value = props.filterData;
    await getAllCustomers()
  }
)

onBeforeMount(async () => {
  await getAllCustomers()
})
</script>

