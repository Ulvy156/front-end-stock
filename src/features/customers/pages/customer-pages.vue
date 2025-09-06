<template>
  <section class="grid grid-cols-1 gap-y-2 w-[99%]">
    <!-- customer summary -->
    <customerSummary />
    <!-- search sections -->
    <customerFilter @on-search="filterData = $event"/>
    <!-- customer table -->
    <CustomerTable :filterData="filterData" />
  </section>
</template>

<script setup lang="ts">
import customerSummary from '../components/customer-summary.vue'
import customerFilter from '../components/customer-filter.vue'
import CustomerTable from '../components/customer-table.vue'
import { ref } from 'vue'
import type { CustomerFilter } from '../interface/customer.interface'

//properties
const filterData = ref<CustomerFilter>({
  page: 1,
  limit: 20,
  name: '',
  phone_number: ''
})

</script>
