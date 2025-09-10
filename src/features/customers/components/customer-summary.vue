<template>
  <div class="flex gap-x-5">
    <customerWidget
      class="bg-blue-50 text-blue-800"
      :title="$t('customers.total_customer')"
      :total="totalCustomers"
    />
    <customerWidget
      class="bg-purple-50 text-purple-800"
      :title="$t('customers.total_customer_vip')"
      :total="total_customer_vip"
    />
    <customerWidget
      class="bg-green-50 text-green-800"
      :title="$t('customers.active_total_customer')"
      :total="active_total_customer"
    />
    <customerWidget
      class="bg-indigo-50 text-indigo-800'"
      :title="$t('customers.inactive_total_customer')"
      :total="inactive_total_customer"
    />
  </div>
</template>

<script setup lang="ts">
import customerWidget from '@/components/reusable/stats-widget.vue';

interface CustomerSummary {
    totalCustomers: number,
    total_customer_vip: number,
    active_total_customer: number,
    inactive_total_customer: number,
}
withDefaults(
  defineProps<Partial<CustomerSummary>>(),
  {
    totalCustomers: 40,
    total_customer_vip: 10,
    active_total_customer: 25,
    inactive_total_customer: 5
  },
)
</script>
