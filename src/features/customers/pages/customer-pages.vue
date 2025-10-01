<template>
  <section class="grid grid-cols-1 gap-y-2 ">
    <!-- customer summary -->
    <customerSummary />
    <!-- search sections -->
    <customerFilter @on-search="setFilterData($event)" @on-create="createdCustomer"/>
    <!-- customer table -->
    <CustomerTable :filterData="filterData" />
  </section>
</template>

<script setup lang="ts">
import customerSummary from '../components/customer-page/customer-summary.vue'
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

// functions
function setFilterData(filter:CustomerFilter) {
  filterData.value = filter;
}
function createdCustomer() {

}

</script>
