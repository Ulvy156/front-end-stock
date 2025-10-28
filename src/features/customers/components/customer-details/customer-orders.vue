<template>
  <!-- STICKY TOOLBAR -->
  <div
    class="sticky top-0 z-10 backdrop-blur-md bg-white/70 border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
    <el-tabs v-model="activeTab" class="!border-none !text-sm">
      <el-tab-pane v-for="tab in tabs" :key="tab.label" :label="`${tab.label} (${tab.count})`" :name="tab.label" />
    </el-tabs>

    <div class="flex items-center gap-2">
      <selectForm v-model="filterData.order_type" :items="orderStatus" />
    </div>
  </div>

  <!-- ORDER TABLE -->
  <el-table :data="filteredOrders" stripe border style="--el-table-header-bg-color: #fafafa;">
    <el-table-column prop="orderId" label="Order ID">
      <template #default="{ row }">
        <span class="text-blue-600 cursor-pointer hover:underline">{{ row.orderId }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="Date" width="140" />
    <el-table-column prop="customer" label="Customer" width="200" />
    <el-table-column prop="status" label="Status">
      <template #default="{ row }">
        <span :class="[
          'px-2 py-0.5 rounded-full text-xs font-medium',
          row.status === 'Paid' && 'bg-emerald-100 text-emerald-700',
          row.status === 'Pending' && 'bg-amber-100 text-amber-700',
          row.status === 'Overdue' && 'bg-rose-100 text-rose-700'
        ]">
          {{ row.status }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="total" label="Total">
      <template #default="{ row }">{{ formatMoney(row.total) }}</template>
    </el-table-column>
    <el-table-column prop="balance" label="Balance Due">
      <template #default="{ row }">{{ formatMoney(row.balance) }}</template>
    </el-table-column>
    <el-table-column prop="dueDate" label="Due Date" width="140" />
  </el-table>
  <paginationPage :total="20" />
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatMoney } from '@/utils/useFormatMoney'
import selectForm from '@/components/reusable/select-form.vue'
import orderStatus from '@/features/orders/data/order-status'
import paginationPage from '@/components/reusable/pagination-page.vue'
/** Tabs (order filters) */
const tabs = [
  { label: 'All Orders', count: 82 },
  { label: 'Paid', count: 60 },
  { label: 'Pending', count: 15 },
  { label: 'Overdue', count: 7 },
]

const activeTab = ref('All Orders')
const search = ref('')
const filterData = ref({
  order_type: 0
})
/** Orders data */
const orders = ref([
  { orderId: 'INV-1001', date: '2025-10-10', customer: 'Faruk Ahmad', status: 'Paid', total: 3200, balance: 20, dueDate: '2025-10-15' },
  { orderId: 'INV-1002', date: '2025-10-11', customer: 'Selim Khan', status: 'Pending', total: 2100, balance: 500, dueDate: '2025-10-20' },
  { orderId: 'INV-1003', date: '2025-10-12', customer: 'Zain Uddin', status: 'Overdue', total: 5000, balance: 5000, dueDate: '2025-10-18' },
  { orderId: 'INV-1004', date: '2025-10-13', customer: 'Nijum Chy', status: 'Paid', total: 1800, balance: 20, dueDate: '2025-10-15' },
  { orderId: 'INV-1005', date: '2025-10-14', customer: 'Faruk Ahmad', status: 'Pending', total: 2400, balance: 400, dueDate: '2025-10-25' },
])

const filteredOrders = computed(() =>
  orders.value.filter((o) =>
    (activeTab.value === 'All Orders' || o.status === activeTab.value) &&
    o.customer.toLowerCase().includes(search.value.toLowerCase())
  )
)

</script>
