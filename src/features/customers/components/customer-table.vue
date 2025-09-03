<template>
  <div class="flex">
    <div class="flex items-center gap-x-1 text-[var(--text-blue)]">
      <svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path fill="none" stroke="currentColor"
          d="M10.8 14v-1.7a2 2 0 0 0-2-2H7.2a2 2 0 0 0-2 2V14m9.3-3.5V9.3a2 2 0 0 0-2-2H11m-9.5 3.2V9.3a2 2 0 0 1 2-2H5m4.605-.195a1.605 1.605 0 1 1-3.21 0a1.605 1.605 0 0 1 3.21 0Zm3.8-3a1.605 1.605 0 1 1-3.21 0a1.605 1.605 0 0 1 3.21 0Zm-7.5 0a1.605 1.605 0 1 1-3.21 0a1.605 1.605 0 0 1 3.21 0Z"
          stroke-width="1" />
      </svg>
      <commonHeader :title='$t("customers.title")' />
    </div>
  </div>
  <el-table :loading="isGetCustomers" :data="customers" stripe style="width: 100%; min-width: 50%; height: 60vh;">
    <el-table-column prop="name" :label="$t('customers.name')" >
      <template #default="{ row }">
          <div class="flex items-center gap-x-1">
            <commonAvatar/>
            <p>{{ row.name }}</p>
          </div>
      </template>
    </el-table-column>
    <el-table-column prop="phone" :label="$t('customers.phone_number')" />
    <el-table-column prop="telegram" :label="$t('customers.telegram')" />
    <el-table-column prop="lastOrderDate" :label="$t('customers.lastOrderDate')" />
    <el-table-column fixed="right" :label="$t('operations.title')">
      <template #default="{ row }">
        <el-button link type="warning" size="small">
          {{ $t("operations.details") }}
        </el-button>
        <el-button link type="primary" size="small" @click="onClickUpdate(row)">
          {{ $t("operations.edit") }}
        </el-button>
        <el-button link type="danger" size="small" @click="onClickDelete(row)">
          {{ $t("operations.delete") }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- pagination -->
  <div class="flex justify-between items-center mt-5">
    <p>{{ $t("current_data") }}: {{ customers.length }}</p>
    <paginationPage :totalPage="totalPage" @page-change="currentPage = $event" />
  </div>

  <!-- pop-up delete  -->
  <component :is="dialogForm" @onClose="isDelete = $event" @onConfirm="onConfirmDelete" :isVisible="isDelete">
    <template #header>
      {{ $t("modal_delete.title") }}
    </template>
    <template #default>
      <p>{{ $t("customers.name") }} : {{ selectedCustomer.name }}</p>
    </template>
  </component>

  <!-- update customer -->
  <component :customer="selectedCustomer" @on-close="toggleUpdateCustomer = false" :isVisible="toggleUpdateCustomer"
    :is="updateCustomer" />

</template>

<script setup lang="ts">
import { api } from '@/plugins/axios';
import { defineAsyncComponent, onBeforeMount, ref, shallowRef, watch } from 'vue';
import commonHeader from '@/components/common/common-header.vue';
import commonAvatar from '@/components/common/common-avatar.vue';
import { startLoading, stopLoading } from '@/composables/useLoading';
import { notify } from '@/composables/useNotify';
const dialogForm = defineAsyncComponent(() => import("@/components/reusable/dialog-form.vue"))
const updateCustomer = defineAsyncComponent(() => import("./update-customer.vue"));
import paginationPage from '@/components/reusable/pagination-page.vue';
import type { Customer } from '../interface/customer.interface';

// properties
const customers = shallowRef([]);
const isGetCustomers = ref(false);
const isDelete = ref(false)
const selectedCustomer = ref<Customer>({
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
  updatedAt: ''
});
const totalPage = ref(0);
const currentPage = ref(1);
const toggleUpdateCustomer = ref(false);

//functions
async function getCustomers() {
  const meta = { page: currentPage.value };
  await api.get("/customers", {
    params: meta
  })
    .then((res) => {
      customers.value = res.data.data.customers;
      totalPage.value = res.data.data.total;
    })
    .finally(() => {
      isGetCustomers.value = true;
    })
}
function onClickDelete(customer: Customer) {
  isDelete.value = true;
  selectedCustomer.value = customer;
}
function onClickUpdate(customer: Customer) {
  toggleUpdateCustomer.value = true;
  selectedCustomer.value = customer;
}
async function onConfirmDelete() {
  startLoading();

  await api.delete(`/customers/${selectedCustomer.value.id}`)
    .then(async () => {
      await getCustomers();

      notify({ message: "Customer deleted successfully", type: "success" });
    })
    .catch((err) => {
      console.error(err);

      notify({ message: "Customer deleted failed", type: "error" });
    })
    .finally(() => {
      isDelete.value = false;
      stopLoading();
    })
}

// watch
watch(currentPage, async () => {
  await getCustomers();
})

onBeforeMount(async () => {
  await getCustomers();
})
</script>
