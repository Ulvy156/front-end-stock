<template>
  <div class="flex gap-x-5">
    <customerWidget
      :percentage="customerSummary.percentChanges.total"
      class="bg-blue-50 text-blue-800"
      :title="$t('customers.total_customer')"
      :total="customerSummary.total"
    >
      <template #default>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g fill="none">
            <path
              stroke="currentColor"
              stroke-width="1.5"
              d="M21 12a8.96 8.96 0 0 1-1.526 5.016A8.99 8.99 0 0 1 12 21a8.99 8.99 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"
            />
            <path
              fill="currentColor"
              d="M13.25 9c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0 0 14.75 9zM12 10.25c-.69 0-1.25-.56-1.25-1.25h-1.5A2.75 2.75 0 0 0 12 11.75zM10.75 9c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 0 0 9.25 9zM12 7.75c.69 0 1.25.56 1.25 1.25h1.5A2.75 2.75 0 0 0 12 6.25zM5.166 17.856l-.719-.214l-.117.392l.267.31zm13.668 0l.57.489l.266-.31l-.117-.393zM9 15.75h6v-1.5H9zm0-1.5a4.75 4.75 0 0 0-4.553 3.392l1.438.428A3.25 3.25 0 0 1 9 15.75zm3 6a8.23 8.23 0 0 1-6.265-2.882l-1.138.977A9.73 9.73 0 0 0 12 21.75zm3-4.5c1.47 0 2.715.978 3.115 2.32l1.438-.428A4.75 4.75 0 0 0 15 14.25zm3.265 1.618A8.23 8.23 0 0 1 12 20.25v1.5a9.73 9.73 0 0 0 7.403-3.405z"
            />
          </g>
        </svg>
      </template>
    </customerWidget>
    <customerWidget
      :percentage="customerSummary.percentChanges.retails"
      class="bg-purple-50 text-purple-800"
      :title="$t('customers.total_retails')"
      :total="customerSummary.retails"
    >
      <template #default>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M7.75 16a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m5.5-1.25a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0m3 1.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5M4.873 3.633A1.75 1.75 0 0 1 6.22 3h11.56c.521 0 1.015.232 1.348.633l3.58 4.32c.676.814.097 2.047-.962 2.047H21v8.75a2.5 2.5 0 0 1-2.5 2.5h-13a2.5 2.5 0 0 1-2.5-2.5V10h-.746c-1.058 0-1.637-1.233-.962-2.048zM6.22 4.5a.25.25 0 0 0-.192.09L2.786 8.5h18.428l-3.241-3.91a.25.25 0 0 0-.193-.09zM4.5 10v8.75a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V10z"
          />
        </svg>
      </template>
    </customerWidget>
    <customerWidget
      :percentage="customerSummary.percentChanges.wholesale"
      class="bg-green-50 text-green-800"
      :title="$t('customers.total_wholesale')"
      :total="customerSummary.wholesale"
    >
      <template #default>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M240 186h-10V56.28l11.26-2.41a6 6 0 1 0-2.52-11.74l-224 48a6 6 0 0 0 2.52 11.74L26 100v86H16a6 6 0 0 0 0 12h224a6 6 0 0 0 0-12M38 97.42l180-38.57V186h-28v-58a6 6 0 0 0-6-6H72a6 6 0 0 0-6 6v58H38ZM178 154H78v-20h100ZM78 166h100v20H78Z"
          />
        </svg>
      </template>
    </customerWidget>
    <customerWidget
      :percentage="customerSummary.percentChanges.both"
      class="bg-indigo-50 text-indigo-600"
      :title="$t('customers.total_both')"
      :total="customerSummary.both"
    >
      <template #default>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1"
          >
            <path d="M1.5 12.5v11h21v-11m1 0H.5L12 6zm-14 0v11m-5-2v-7m2 7v-7" />
            <path d="M20.5 19.5h-4v4h4zm-4 0h-4v4h4zm2-4h-4v4h4z" />
          </g>
        </svg>
      </template>
    </customerWidget>
  </div>
</template>

<script setup lang="ts">
import customerWidget from '@/components/reusable/stats-widget.vue'
import { getCustomerSummary } from '@/services/customer-service'
import { onBeforeMount, ref } from 'vue'

const customerSummary = ref({
  both: 0,
  retails: 0,
  wholesale: 0,
  total: 0,
  percentChanges: {
    both: 0,
    retails: 0,
    wholesale: 0,
    total: 0,
  },
})

onBeforeMount(async () => {
  const res = await getCustomerSummary()
  customerSummary.value = res
})
</script>

<style scoped>
svg {
  width: 25px;
  height: 25px;
}
</style>
