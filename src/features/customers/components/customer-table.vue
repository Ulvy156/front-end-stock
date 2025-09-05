<template>
  <section class="grid grid-cols-1 gap-y-2 w-[99%]">
    <div class="flex gap-x-2">
      <customerWidget class="bg-blue-50 text-blue-800" :title="$t('customers.total_customer')" :total="totalCustomers" />
      <customerWidget class="bg-purple-50 text-purple-800" :title="$t('customers.total_customer_vip')" :total="totalCustomers" />
      <customerWidget class="bg-green-50 text-green-800" :title="$t('customers.active_total_customer')" :total="totalCustomers" />
      <customerWidget class="bg-red-50 text-red-800" :title="$t('customers.inactive_total_customer')" :total="totalCustomers" />
    </div>

    <el-table :loading="isGetCustomers" :data="customers" stripe style="width: 100%; min-width: 50%; height: 60vh;">
      <el-table-column prop="name" :label="$t('customers.name')">
        <template #default="{ row }">
          <div class="flex items-center gap-x-1">
            <commonAvatar />
            <p>{{ row.name }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="phone" :label="$t('customers.phone_number')" />
      <el-table-column :label="$t('customers.telegram')" >
        <template #default="{ row }">
          <el-link :href="`tg://resolve?phone=${row.telegram}`" target="_blank" type="primary">{{ row.telegram }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="lastOrderDate" :label="$t('customers.lastOrderDate')" />
      <el-table-column fixed="right" :label="$t('operations.title')" min-width="120">
        <template #default="{ row }">
          <el-button plain type="warning" size="small">
            {{ $t("operations.details") }}
          </el-button>
          <el-button plain type="primary" size="small" @click="onClickUpdate(row)">
            {{ $t("operations.edit") }}
          </el-button>
          <el-button plain type="danger" size="small" @click="onClickDelete(row)">
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
  </section>

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
import commonAvatar from '@/components/common/common-avatar.vue';
import customerWidget from './customer-widget.vue';
import { startLoading, stopLoading } from '@/composables/useLoading';
import { notify } from '@/composables/useNotify';
const dialogForm = defineAsyncComponent(() => import("@/components/reusable/dialog-form.vue"))
const updateCustomer = defineAsyncComponent(() => import("./update-customer.vue"));
import paginationPage from '@/components/reusable/pagination-page.vue';
import type { Customer } from '../interface/customer.interface';

// properties
const customers = shallowRef([]);
const isGetCustomers = ref(false);
const totalCustomers = ref(0);
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
      totalCustomers.value = res.data.data.total;

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
