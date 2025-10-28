<template>
  <div class="flex gap-x-5">
    <customerWidget :percentage="1" class="bg-blue-50 text-blue-800" :title="$t('customers.details.total_orders')"
      :total="10">
      <template #default>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="m17.371 19.827l2.84-2.796l-.626-.627l-2.214 2.183l-.955-.975l-.627.632zM6.77 8.731h10.462v-1H6.769zM18 22.116q-1.671 0-2.835-1.165Q14 19.787 14 18.116t1.165-2.836T18 14.116t2.836 1.164T22 18.116q0 1.67-1.164 2.835Q19.67 22.116 18 22.116M4 20.769V4h16v7.56q-.244-.09-.484-.154q-.241-.064-.516-.1V5H5v14.05h6.344q.068.41.176.802q.109.392.303.748l-.034.034l-1.135-.826l-1.346.961l-1.346-.961l-1.346.961l-1.347-.961zm2.77-4.5h4.709q.056-.275.138-.515t.192-.485H6.77zm0-3.769h7.31q.49-.387 1.05-.645q.56-.259 1.197-.355H6.769zM5 19.05V5z" />
        </svg>
      </template>
    </customerWidget>
    <customerWidget :percentage="45" class="bg-purple-50 text-purple-800"
      :title="$t('customers.details.total_paid_orders')" :total="32">
      <template #default>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
            <path d="M14.5 11a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0" />
            <path
              d="M22 11V5.927c0-.568-.324-1.082-.867-1.25C20.19 4.383 18.479 4 16 4c-4.58 0-5.803 1.677-12.122.424C2.921 4.234 2 4.945 2 5.92v10.017c0 .688.473 1.293 1.145 1.441c3.885.857 5.957.674 7.855.345" />
            <path
              d="M2 8c1.951 0 3.705-1.595 3.929-3.246M18.5 4.5c0 2.04 1.765 3.969 3.5 3.969M6 17.496a4 4 0 0 0-4-4M14 18s1 0 2 2c0 0 3.177-5 6-6" />
          </g>
        </svg>
      </template>
    </customerWidget>
    <customerWidget :percentage="45" class="bg-green-50 text-green-800" :title="$t('customers.details.pending')"
      :total="34">
      <template #default>

        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M14 13q-1.25 0-2.125-.875T11 10t.875-2.125T14 7t2.125.875T17 10t-.875 2.125T14 13m-7 3q-.825 0-1.412-.587T5 14V6q0-.825.588-1.412T7 4h14q.825 0 1.413.588T23 6v8q0 .825-.587 1.413T21 16zm2-2h10q0-.825.588-1.412T21 12V8q-.825 0-1.412-.587T19 6H9q0 .825-.587 1.413T7 8v4q.825 0 1.413.588T9 14m11 6H3q-.825 0-1.412-.587T1 18V7h2v11h17zM7 14V6z" />
        </svg>
      </template>
    </customerWidget>
    <customerWidget :percentage="23" class="bg-indigo-50 text-indigo-600" :title="$t('customers.details.overdue')"
      :total="45">
      <template #default>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">
          <path fill="currentColor" fill-rule="evenodd"
            d="M5 1a.75.75 0 0 1 .75.75V3h5V1.75a.75.75 0 0 1 1.5 0V3H14a1 1 0 0 1 1 1v4.25a.75.75 0 0 1-1.5 0V7.5h-11v6h5.75a.75.75 0 0 1 0 1.5H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.25V1.75A.75.75 0 0 1 5 1M2.5 6h11V4.5h-11zm8.78 4.22a.75.75 0 1 0-1.06 1.06L11.94 13l-1.72 1.72a.75.75 0 1 0 1.06 1.06L13 14.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L14.06 13l1.72-1.72a.75.75 0 1 0-1.06-1.06L13 11.94z"
            clip-rule="evenodd" />
        </svg>
      </template>
    </customerWidget>
  </div>
</template>

<script setup lang="ts">
import customerWidget from '@/components/reusable/stats-widget.vue'

</script>

<style scoped>
svg {
  width: 25px;
  height: 25px;
}
</style>
