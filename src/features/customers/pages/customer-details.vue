<template>
  <div class="flex gap-6">
    <!-- MAIN CONTENT -->
    <div class="flex-1 space-y-6 w-[75%]">
      <!-- CUSTOMER SUMMARY CARDS -->
      <customerSummary/>
      <!-- CUSTOMER ORDERS -->
      <customerOrders/>

    </div>

  </div>
</template>

<script setup lang="ts">
import customerSummary from '../components/customer-details/customer-summary.vue'
import customerOrders from '../components/customer-details/customer-orders.vue'

</script>
