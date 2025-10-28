<template>
  <section class="grid grid-cols-1 gap-y-2 ">
    <!-- customer summary -->
    <customerSummary :isCreatedNewCustomer />
    <!-- search sections -->
    <customerFilter @on-search="setFilterData($event)" @on-created="isCreatedNewCustomer = $event"/>
    <!-- customer table -->
    <CustomerTable :filterData="filterData"  />
  </section>
</template>

<script setup lang="ts">
import customerSummary from '../components/customer-page/total-customer-summary.vue'
import customerFilter from '../components/customer-page/customer-filter.vue'
import CustomerTable from '../components/customer-page/customer-table.vue'
import { ref } from 'vue'
import type { CustomerFilter } from '../interface/customer.interface'

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
const isCreatedNewCustomer = ref(false);

// functions
function setFilterData(filter:CustomerFilter) {
  filterData.value = filter;
}


</script>
