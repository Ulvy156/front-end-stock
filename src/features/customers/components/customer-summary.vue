<template>
  <div class="flex gap-x-5">
    <customerWidget class="bg-blue-50 text-blue-800" :title="$t('customers.total_customer')" :total="total_customers">
      <template #default>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M18 18.72a9.1 9.1 0 0 0 3.741-.479q.01-.12.01-.241a3 3 0 0 0-4.692-2.478m.94 3.197l.001.031q0 .337-.037.666A11.94 11.94 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6 6 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.941-3.197m0 0A6 6 0 0 0 12 12.75a6 6 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72a9 9 0 0 0 3.74.477m.94-3.197a5.97 5.97 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0m6 3a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0m-13.5 0a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0" />
        </svg>
      </template>
    </customerWidget>
    <customerWidget class="bg-purple-50 text-purple-800" :title="$t('customers.total_retails')"
      :total="total_retail">
      <template #default>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            d="M24 31.68V16.319m-3.936 12.479c.775.98 1.746 1.346 3.098 1.346h1.87c1.741 0 3.152-1.375 3.152-3.072h0c0-1.697-1.41-3.072-3.152-3.072h-2.066c-1.74 0-3.152-1.375-3.152-3.072h0c0-1.697 1.41-3.072 3.152-3.072h1.87c1.353 0 2.324.365 3.099 1.346m-3.874 14.96v7.592m19.44-30.21v19.27L24.965 41.517a1.81 1.81 0 0 1-1.81 0L4.5 30.745V11.474m26.448 7.318L43.5 11.545l-9.12-5.266h0l-6.426 3.71c-2.183 1.26-5.732 1.254-7.929-.014L13.56 6.242L4.5 11.474l12.552 7.247"
            stroke-width="1" />
        </svg>
      </template>
    </customerWidget>
    <customerWidget class="bg-green-50 text-green-800" :title="$t('customers.total_wholesale')"
      :total="total_wholesale">
      <template #default>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path fill="currentColor"
            d="M353.4 32H94.7C42.6 32 0 74.6 0 126.6v258.7C0 437.4 42.6 480 94.7 480h258.7c52.1 0 94.7-42.6 94.7-94.6V126.6c0-52-42.6-94.6-94.7-94.6m-50 316.4c-27.9 48.2-89.9 64.9-138.2 37.2c-22.9 39.8-54.9 8.6-42.3-13.2l15.7-27.2c5.9-10.3 19.2-13.9 29.5-7.9c18.6 10.8-.1-.1 18.5 10.7c27.6 15.9 63.4 6.3 79.4-21.3c15.9-27.6 6.3-63.4-21.3-79.4c-17.8-10.2-.6-.4-18.6-10.6c-24.6-14.2-3.4-51.9 21.6-37.5c18.6 10.8-.1-.1 18.5 10.7c48.4 28 65.1 90.3 37.2 138.5m21.8-208.8c-17 29.5-16.3 28.8-19 31.5c-6.5 6.5-16.3 8.7-26.5 3.6c-18.6-10.8.1.1-18.5-10.7c-27.6-15.9-63.4-6.3-79.4 21.3s-6.3 63.4 21.3 79.4c0 0 18.5 10.6 18.6 10.6c24.6 14.2 3.4 51.9-21.6 37.5c-18.6-10.8.1.1-18.5-10.7c-48.2-27.8-64.9-90.1-37.1-138.4c27.9-48.2 89.9-64.9 138.2-37.2l4.8-8.4c14.3-24.9 52-3.3 37.7 21.5" />
        </svg>
      </template>
    </customerWidget>
    <customerWidget class="bg-indigo-50 text-indigo-800" :title="$t('customers.total_both')"
      :total="total_retails_wholesale">
      <template #default>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M2.047 14.668a1 1 0 0 0 .465.607l1.91 1.104v2.199a1 1 0 0 0 1 1h2.199l1.104 1.91a1.01 1.01 0 0 0 .866.5c.174 0 .347-.046.501-.135L12 20.75l1.91 1.104a1 1 0 0 0 1.366-.365l1.103-1.91h2.199a1 1 0 0 0 1-1V16.38l1.91-1.104a1 1 0 0 0 .365-1.367L20.75 12l1.104-1.908a1 1 0 0 0-.365-1.366l-1.91-1.104v-2.2a1 1 0 0 0-1-1H16.38l-1.103-1.909a1 1 0 0 0-.607-.466a1 1 0 0 0-.759.1L12 3.25l-1.909-1.104a1 1 0 0 0-1.366.365l-1.104 1.91H5.422a1 1 0 0 0-1 1V7.62l-1.91 1.104a1.003 1.003 0 0 0-.365 1.368L3.251 12l-1.104 1.908a1 1 0 0 0-.1.76M12 13c-3.48 0-4-1.879-4-3c0-1.287 1.029-2.583 3-2.915V6.012h2v1.109c1.734.41 2.4 1.853 2.4 2.879h-1l-1 .018C13.386 9.638 13.185 9 12 9c-1.299 0-2 .515-2 1c0 .374 0 1 2 1c3.48 0 4 1.879 4 3c0 1.287-1.029 2.583-3 2.915V18h-2v-1.08c-2.339-.367-3-2.003-3-2.92h2c.011.143.159 1 2 1c1.38 0 2-.585 2-1c0-.325 0-1-2-1" />
        </svg>
      </template>
    </customerWidget>
  </div>
</template>

<script setup lang="ts">
import customerWidget from '@/components/reusable/stats-widget.vue';
import type { CustomerSummary } from '../interface/customer.interface';

withDefaults(
  defineProps<Partial<CustomerSummary>>(),
  {
    total_customers: 21,
    total_retail: 32,
    total_retails_wholesale: 34,
    total_wholesale: 13
  },
)
</script>


<style scoped>
svg {
  width: 25px;
  height: 25px;
}
</style>
