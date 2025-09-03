<template>
  <el-drawer :before-close="onClose" size="40%" v-model="drawerVisible">

    <section class="grid grid-cols-2 gap-3">
      <div class="flex items-center gap-x-1 col-span-2">
        <iconEdit class="size-7 text-blue-500" />
        <commonHeader :title="$t('customers.update_customer')" />
      </div>
      <div>
        <label for="name">{{ $t('customers.name') }}</label>
        <inputField v-model="updateCustomer.name" :size="inputSize" id="name" />
      </div>
      <div>
        <label for="phone">{{ $t('customers.phone_number') }}</label>
        <inputField v-model="updateCustomer.phone" :size="inputSize" id="phone" />
      </div>
      <div>
        <label for="telegram">{{ $t('customers.telegram') }}</label>
        <inputField v-model="updateCustomer.telegram" :size="inputSize" id="telegram" />
      </div>
      <div>
        <label for="address">{{ $t('customers.address') }}</label>
        <inputField v-model="updateCustomer.address" :size="inputSize" id="address" />
      </div>
      <div>
        <label for="mapUrl">{{ $t('customers.mapUrl') }}</label>
        <inputField v-model="updateCustomer.address" :size="inputSize" id="mapUrl" />
      </div>
      <div class="flex justify-end items-end">
        <commonButton @click="onClose" size="large" type="info" :title="$t('modal_delete.cancel')" />
        <commonButton size="large" type="primary" :title="$t('modal_delete.confirm')" />
      </div>
    </section>

  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import commonHeader from '@/components/common/common-header.vue';
import iconEdit from '@/icons/icon-edit.vue';
import inputField from '@/components/reusable/input-field.vue';
import commonButton from '@/components/common/common-button.vue';
import type { Customer } from '../interface/customer.interface';
const props = withDefaults(
  defineProps<{
    isVisible: boolean,
    customer: Customer
  }>(),
  {
    isVisible: false,
    customer: () => ({} as Customer)
  }
)

const emits = defineEmits<{
  (event: 'on-close'): void
}>();
const drawerVisible = ref(false);
const inputSize = 'large';
const updateCustomer = ref<Customer>({
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

//methods
function onClose() {
  emits('on-close')
  drawerVisible.value = false;
}


watch(
  () => props.customer,
  () => {
    updateCustomer.value = props.customer;
  }
)
watch(
  () => props.isVisible,
  () => {
    if (!props.isVisible) return;

    drawerVisible.value = props.isVisible;
  }
)
</script>
