<template>
  <el-table
    :highlight-current-row="true"
    v-loading="loadingCustomers"
    :data="customers"
    stripe
    style="width: 100%; min-width: 50%; max-height: 55vh; height: auto"
  >
    <el-table-column prop="name" :label="$t('customers.name')" width="250">
      <template #default="{ row }">
        <div class="flex items-center gap-x-1">
          <commonAvatar :src="row.img_url" />
          <p>{{ row.name }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column :label="$t('location.province') + ' / ' + $t('location.district')">
      <template #default="{ row }">
        {{ row.district.province.name }} / {{ row.district.name }}
      </template>
    </el-table-column>
    <el-table-column prop="phone" :label="$t('customers.phone_number')" />
    <el-table-column :label="$t('customers.type')">
      <template #default="{ row }">
        <tagForm
          effect="light"
          :title="getCustomerTypeLabel(row.type)"
          :type="convertCustomerType(row.type)"
        />
      </template>
    </el-table-column>
    <el-table-column :label="$t('customers.telegram')">
      <template #default="{ row }">
        <el-link :href="`tg://resolve?phone=${row.telegram}`" target="_blank" >
          {{ formatPhoneDisplay(row.telegram) }}
        </el-link>
      </template>
    </el-table-column>
    <el-table-column fixed="right" :label="$t('operations.title')" >
      <template #default="{ row }">
        <el-dropdown placement="bottom-end" class="dropdown">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon-action" viewBox="0 0 24 24">
            <path fill="currentColor" fill-rule="evenodd" d="M12.563 3.2h-1.126l-.645 2.578l-.647.2a6.3 6.3 0 0 0-1.091.452l-.599.317l-2.28-1.368l-.796.797l1.368 2.28l-.317.598a6.3 6.3 0 0 0-.453 1.091l-.199.647l-2.578.645v1.126l2.578.645l.2.647q.173.568.452 1.091l.317.599l-1.368 2.28l.797.796l2.28-1.368l.598.317q.523.278 1.091.453l.647.199l.645 2.578h1.126l.645-2.578l.647-.2a6.3 6.3 0 0 0 1.091-.452l.599-.317l2.28 1.368l.796-.797l-1.368-2.28l.317-.598q.278-.523.453-1.091l.199-.647l2.578-.645v-1.126l-2.578-.645l-.2-.647a6.3 6.3 0 0 0-.452-1.091l-.317-.599l1.368-2.28l-.797-.796l-2.28 1.368l-.598-.317a6.3 6.3 0 0 0-1.091-.453l-.647-.199zm2.945 2.17l1.833-1.1a1 1 0 0 1 1.221.15l1.018 1.018a1 1 0 0 1 .15 1.221l-1.1 1.833q.33.62.54 1.3l2.073.519a1 1 0 0 1 .757.97v1.438a1 1 0 0 1-.757.97l-2.073.519q-.21.68-.54 1.3l1.1 1.833a1 1 0 0 1-.15 1.221l-1.018 1.018a1 1 0 0 1-1.221.15l-1.833-1.1q-.62.33-1.3.54l-.519 2.073a1 1 0 0 1-.97.757h-1.438a1 1 0 0 1-.97-.757l-.519-2.073a7.5 7.5 0 0 1-1.3-.54l-1.833 1.1a1 1 0 0 1-1.221-.15L4.42 18.562a1 1 0 0 1-.15-1.221l1.1-1.833a7.5 7.5 0 0 1-.54-1.3l-2.073-.519A1 1 0 0 1 2 12.72v-1.438a1 1 0 0 1 .757-.97l2.073-.519q.21-.68.54-1.3L4.27 6.66a1 1 0 0 1 .15-1.221L5.438 4.42a1 1 0 0 1 1.221-.15l1.833 1.1q.62-.33 1.3-.54l.519-2.073A1 1 0 0 1 11.28 2h1.438a1 1 0 0 1 .97.757l.519 2.073q.68.21 1.3.54zM12 14.8a2.8 2.8 0 1 0 0-5.6a2.8 2.8 0 0 0 0 5.6m0 1.2a4 4 0 1 1 0-8a4 4 0 0 1 0 8" />
          </svg>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-button link type="warning" size="small">
                  {{ $t('operations.details') }}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item @click="onClickUpdate(row)">
                <el-button link type="primary" size="small" >
                  {{ $t('operations.edit') }}
                </el-button>
              </el-dropdown-item>
              <el-dropdown-item @click="onClickDelete(row)">
                <el-button link type="danger" size="small" >
                  {{ $t('operations.delete') }}
                </el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <!-- pagination -->
  <div class="flex justify-between items-center mt-5">
    <p>{{ $t('current_data') }}: {{ customers.length }}</p>
    <paginationPage :total="totalCustomers" @page-change="currentFilterData.page = $event" />
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
import { useDelay } from '@/utils/useDelay'
import tagForm from '@/components/reusable/tag-form.vue'
import { getCustomerTypeLabel } from '@/utils/useCustomerType'
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
  type: 'RETAIL',
})
const totalPage = ref(0)
const toggleUpdateCustomer = ref(false)
const currentFilterData = ref<CustomerFilter>({
  page: 1,
  limit: 30,
  name: '',
  phone_number: '',
  province_id: 0,
  district_id: '',
  type: null
})
const currentTotalCustomer = ref(0);

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
  await useDelay(300)
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
  if (type === 'RETAIL') {
    return 'primary'
  } else if (type === 'WHOLESALE') {
    return 'success'
  }
  return 'warning'
}

async function onConfirmDelete() {
  startLoading()

  await deleteCustomer(selectedCustomer.value.id, getAllCustomers)
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
onBeforeMount(async () => {
  await getAllCustomers()
})
</script>



<style scoped>

.icon-action{
  cursor: pointer;
  width: 25px;
  height: 25px;
  transition: all 0.3s ease-in-out;
}

.dropdown:hover .icon-action{
  border-radius: 10px;
  rotate: 200deg;
  color: var(--text-blue);
}
</style>
