<template>
  <el-table
    :highlight-current-row="true"
    v-loading="loadingCustomers"
    :data="customers"
    stripe
    style="width: 100%; min-width: 50%; height: 55vh;"
  >
    <!-- Name + Avatar -->
    <el-table-column :label="$t('customers.name')" width="250">
      <template #default="{ row }">
        <div class="flex items-center gap-x-1">
          <commonAvatar :src="row.img_url" />
          <p>{{ row.name }}</p>
        </div>
      </template>
    </el-table-column>

    <!-- Province / District -->
    <el-table-column :label="$t('location.province') + ' / ' + $t('location.district')">
      <template #default="{ row }">
        {{ row.province.name }} / {{ row.province.district[0].name }}
      </template>
    </el-table-column>

    <!-- Phone -->
    <el-table-column prop="phone" :label="$t('customers.phone_number')">
      <template #default="{ row }">
        {{ row.phone }}
      </template>
    </el-table-column>

    <!-- Customer Type -->
    <el-table-column :label="$t('customers.type')">
      <template #default="{ row }">
        <tagForm
          effect="light"
          :title="getCustomerTypeLabel(row.type)"
          :type="convertCustomerType(row.type)"
        />
      </template>
    </el-table-column>

    <!-- Telegram -->
    <el-table-column :label="$t('customers.telegram')">
      <template #default="{ row }">
        <el-link :href="`tg://resolve?phone=${row.telegram}`" target="_blank">
          {{ formatPhoneDisplay(row.telegram) }}
        </el-link>
      </template>
    </el-table-column>

    <!-- Operations -->
    <el-table-column fixed="right" :label="$t('operations.title')" min-width="100">
      <template #default="{ row }">
        <el-button link type="warning" size="small" @click="$router.push(`/customer/details/${row.id}`)">
          {{ $t('operations.details') }}
        </el-button>
        <el-button @click="onClickUpdate(row)" link type="primary" size="small">
          {{ $t('operations.edit') }}
        </el-button>
        <el-button @click="onClickDelete(row)" link type="danger" size="small">
          {{ $t('operations.delete') }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- pagination -->
  <div class="flex justify-between items-center my-2">
    <p>{{ $t('total_data') }}: {{ totalCustomers }}</p>
    <div class="flex justify-end items-end gap-x-5 w-1/2 ">
      <p>{{ $t('current_data') }}: {{ customers.length }}</p>
      <paginationPage :total="totalCustomers" @page-change="currentFilterData.page = $event" />
    </div>
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
const updateCustomer = defineAsyncComponent(() => import('./update-customer.vue'))
import type { Customer, CustomerFilter } from '../../interface/customer.interface'
import { deleteCustomer, getCustomers } from '@/services/customer-service'
import { formatPhoneDisplay } from '@/utils/formatPhoneDisplay'
import tagForm from '@/components/reusable/tag-form.vue'
import { getCustomerTypeLabel } from '@/utils/useCustomerType'
import { notify } from '@/composables/useNotify'
import { useI18n } from "vue-i18n";
import { useCustomerStore } from '../../stores/useCustomer'

//props
const props = defineProps<{
  filterData: CustomerFilter
}>()

// properties
const customers = shallowRef<Customer[]>([])
const loadingCustomers = ref(false)
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
  updatedAt: '',
  type: 'RETAILS',
})
const totalPage = ref(0)
const toggleUpdateCustomer = ref(false)
const currentFilterData = ref<CustomerFilter>({
  page: 1,
  limit: 20,
  name: '',
  phone_number: '',
  province_id: 0,
  district_id: '',
  type: null,
})
const currentTotalCustomer = ref(0)
const { t } = useI18n();
const useCustomer = useCustomerStore();
//functions
async function hideUpdatedForm() {
  toggleUpdateCustomer.value = false
  await getAllCustomers()
}
async function getAllCustomers() {
  //start loading
  loadingCustomers.value = true

  const data = await getCustomers(currentFilterData.value)

  customers.value = data?.customers ?? []
  totalPage.value = data?.lastPage ?? 0
  totalCustomers.value = data?.total ?? 0
  currentTotalCustomer.value = data?.current_total ?? 0
  // delay for show
  // end lading
  loadingCustomers.value = false
}

function onClickDelete(customer: Customer) {
  isDelete.value = true

  selectedCustomer.value = JSON.parse(JSON.stringify(customer))
}

function onClickUpdate(customer: Customer) {
  selectedCustomer.value = JSON.parse(JSON.stringify(customer))
  toggleUpdateCustomer.value = true
}

function convertCustomerType(type: string) {
  if (type === 'RETAILS') {
    return 'primary'
  } else if (type === 'WHOLESALE') {
    return 'success'
  }
  return 'warning'
}

async function onConfirmDelete() {
  startLoading()

  await deleteCustomer(selectedCustomer.value.id, ()=> {
    notify({ message: t('customers.deleted'), type: 'success' })
  });
  await getAllCustomers();
  isDelete.value = false
}

// watch
// props filter from customer-filter
watch(
  () => props.filterData,
  async () => {
    currentFilterData.value = props.filterData
    await getAllCustomers()
  },
)
// watch pagination
watch(
  () => currentFilterData.value.page,
  async () => {
    await getAllCustomers();
  },
)
//watch customer created
watch(
  () => useCustomer.isCreatedCustomer,
  async() => {
    if(!useCustomer.isCreatedCustomer) return;
    useCustomer.isCreatedCustomer = false;
    await getAllCustomers();

  }
)
onBeforeMount(async () => {
  await getAllCustomers()
})
</script>
