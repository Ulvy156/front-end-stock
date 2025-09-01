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
  <el-table :loading="isGetCustomers" :data="customers" stripe style="width: 100%">
    <el-table-column prop="name" :label="$t('customers.name')" />
    <el-table-column prop="phone" :label="$t('customers.phone_number')" />
    <el-table-column prop="telegram" :label="$t('customers.telegram')" />
    <el-table-column prop="lastOrderDate" :label="$t('customers.lastOrderDate')" />
    <el-table-column fixed="right" :label="$t('operations.title')">
      <template #default="{ row }">
        <el-button link type="warning" size="small" >
          {{ $t("operations.details") }}
        </el-button>
        <el-button link type="primary" size="small">
          {{ $t("operations.edit") }}
        </el-button>
        <el-button link type="danger" size="small" @click="onClickDelete(row)">
          {{ $t("operations.delete") }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <component :is="dialogForm"
  @onClose="isDelete = $event"
  @onConfirm="onConfirmDelete"
  :isVisible="isDelete">
    <template #header>
      {{ $t("modal_delete.title") }}
    </template>
    <template #default>
      <p>{{ $t("customers.name") }} : {{ selectedCustomer.name }}</p>
    </template>
  </component>
</template>

<script setup lang="ts">
import { api } from '@/plugins/axios';
import { defineAsyncComponent, onBeforeMount, ref, shallowRef } from 'vue';
import commonHeader from '@/components/common/common-header.vue';
import { startLoading, stopLoading } from '@/composables/useLoading';
import { notify } from '@/composables/useNotify';
const dialogForm = defineAsyncComponent(() => import("@/components/reusable/dialog-form.vue"))

//interface
interface Customer {
  id: string;
  name: string;
}

// properties
const customers = shallowRef([]);
const isGetCustomers = ref(false);
const isDelete = ref(false)
const selectedCustomer = ref<Customer>({
  id: '',
  name: ''
});

//functions
async function getCustomers() {
  await api.get("/customers")
    .then((res) => {
      customers.value = res.data.data;
    })
    .finally(() => {
      isGetCustomers.value = true;
    })
}
function onClickDelete(customer: Customer) {
  isDelete.value = true;
  selectedCustomer.value = customer;
}
async function onConfirmDelete() {
  console.log("start");
  startLoading();

  await api.delete(`/customers/${selectedCustomer.value.id}`)
  .then(()=>{
    notify({ message: "Customer deleted successfully", type: "success" });
  })
  .catch((err)=>{
    console.log(err);

    notify({ message: "Customer deleted failed", type: "error" });
  })
  .finally(()=>{
    stopLoading();
  })
}

onBeforeMount(async () => {
  await getCustomers();
})
</script>
