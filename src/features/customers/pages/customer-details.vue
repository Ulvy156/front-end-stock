<template>
  <section class="flex flex-col gap-y-5">
    <customerInfo :customerDetails/>
    <customerCreated :created_by/>
    <customerUpdated :updated_by/>
    <customerSale/>
  </section>
</template>


<script setup lang="ts">
import { useEscToGoBack } from '@/utils/useEscToGoBack'
import customerInfo from '../components/customer-details/customer-info.vue';
import customerCreated from '../components/customer-details/customer-created.vue';
import customerUpdated from '../components/customer-details/customer-updated.vue';
import customerSale from '../components/customer-details/customer-sale.vue';
import { getCustomerDetails } from '@/services/customer-service';
import { useRoute } from 'vue-router';
import { onBeforeMount, shallowRef } from 'vue';
import type { CreatedByUser, CustomerDetails } from '../interface/customer.interface';


// properties
const route = useRoute()
const customerId = Array.isArray(route.params.customer_id)
  ? route.params.customer_id[0]
  : route.params.customer_id
const created_by = shallowRef<CreatedByUser>({
  name: '',
  role: '',
  email: '',
  img_url: '',
  phone: '',
  updatedAt: '',
  createdAt: ''
})
const updated_by = shallowRef<CreatedByUser>({
  name: '',
  role: '',
  email: '',
  img_url: '',
  phone: '',
  updatedAt: '',
  createdAt: ''
})
const customerDetails = shallowRef<CustomerDetails>({
  id: '',
  name: '',
  phone: '',
  telegram: '',
  address: '',
  img_url: '',
  lastOrderDate: null,
  totalOrders: 0,
  totalSpent: 0,
  mapUrl: '',
  type: 'RETAIL',
  district_id: '',
  created_by_user_id: '',
  updated_by_user_id: null,
  createdAt: '',
  updatedAt: '',
  district: undefined
})
// enable key esc for go back
useEscToGoBack();


onBeforeMount(async () => {
  const data = await getCustomerDetails(customerId ?? '');
  created_by.value = data.createdBy;
  updated_by.value = data.updatedBy;
  customerDetails.value = data;
})
</script>


<style>

article {
  padding: 20px;
  background: #f9fafb;
  border-radius: 6px;
      --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
}
</style>
