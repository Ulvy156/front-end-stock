<template>
  <div class="flex gap-6">
    <!-- MAIN CONTENT -->
    <div class="flex-1 space-y-6 w-[75%]">
      <!-- SUMMARY CARDS -->
      <div class="grid grid-cols-4 gap-4">
        <div
          v-for="item in summary"
          :key="item.title"
          class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col gap-1 hover:shadow-md transition"
        >
          <p class="text-sm text-gray-500">{{ item.title }}</p>
          <p class="text-2xl font-semibold">{{ item.value }}</p>
          <p class="text-xs text-gray-400">{{ item.note }}</p>
        </div>
      </div>

      <!-- STICKY TOOLBAR -->
      <div class="sticky top-0 z-10 backdrop-blur-md bg-white/70 border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
        <el-tabs v-model="activeTab" class="!border-none !text-sm">
          <el-tab-pane
            v-for="tab in tabs"
            :key="tab.label"
            :label="`${tab.label} (${tab.count})`"
            :name="tab.label"
          />
        </el-tabs>

        <div class="flex items-center gap-2">
          <el-input
            v-model="search"
            placeholder="Search order..."
            size="small"
            class="w-52"
            prefix-icon="Search"
            clearable
          />
          <el-button size="small" plain>Sort</el-button>
          <el-button type="primary" size="small" class="!bg-blue-500">New Order</el-button>
        </div>
      </div>

      <!-- ORDER TABLE -->
      <el-table
        :data="filteredOrders"
        stripe
        border
        style="--el-table-header-bg-color: #fafafa;"
      >
        <el-table-column prop="orderId" label="Order ID" width="120">
          <template #default="{ row }">
            <span class="text-blue-600 cursor-pointer hover:underline">{{ row.orderId }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="Date" width="140" />
        <el-table-column prop="customer" label="Customer" width="200" />
        <el-table-column prop="status" label="Status" width="120">
          <template #default="{ row }">
            <span
              :class="[
                'px-2 py-0.5 rounded-full text-xs font-medium',
                row.status === 'Paid' && 'bg-emerald-100 text-emerald-700',
                row.status === 'Pending' && 'bg-amber-100 text-amber-700',
                row.status === 'Overdue' && 'bg-rose-100 text-rose-700'
              ]"
            >
              {{ row.status }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="Total" width="120">
          <template #default="{ row }">${{ row.total }}</template>
        </el-table-column>
        <el-table-column prop="balance" label="Balance Due" width="120">
          <template #default="{ row }">${{ row.balance }}</template>
        </el-table-column>
        <el-table-column prop="dueDate" label="Due Date" width="140" />
      </el-table>
    </div>

    <!-- RIGHT SIDEBAR -->
    <div class="w-[25%] bg-white border border-gray-100 rounded-2xl shadow-sm p-4 h-fit">
      <div class="flex items-center gap-3 mb-4">
        <img
          src="https://randomuser.me/api/portraits/men/42.jpg"
          alt="customer"
          class="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 class="font-semibold text-gray-800">{{ customer.name }}</h3>
          <p class="text-sm text-gray-500">{{ customer.company }}</p>
        </div>
      </div>

      <div class="text-sm space-y-3">
        <div>
          <p class="text-gray-400 text-xs uppercase mb-1">Contact Info</p>
          <p><b>Email:</b> {{ customer.email }}</p>
          <p><b>Phone:</b> {{ customer.phone }}</p>
        </div>

        <div class="border-t border-gray-100 my-3"></div>

        <div>
          <p class="text-gray-400 text-xs uppercase mb-1">Address</p>
          <p>{{ customer.address }}</p>
          <p>{{ customer.city }}, {{ customer.country }}</p>
        </div>

        <div class="border-t border-gray-100 my-3"></div>

        <div>
          <p class="text-gray-400 text-xs uppercase mb-1">Invoice Summary</p>
          <div class="flex justify-between">
            <p>Total:</p>
            <p class="font-medium">${{ invoiceSummary.total }}</p>
          </div>
          <div class="flex justify-between">
            <p>Paid:</p>
            <p class="text-emerald-600 font-medium">${{ invoiceSummary.paid }}</p>
          </div>
          <div class="flex justify-between">
            <p>Balance:</p>
            <p class="text-rose-600 font-medium">${{ invoiceSummary.balance }}</p>
          </div>
        </div>

        <div class="border-t border-gray-100 my-3"></div>

        <div>
          <p class="text-gray-400 text-xs uppercase mb-1">Sales Rep</p>
          <div class="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/women/35.jpg"
              alt=""
              class="w-6 h-6 rounded-full"
            />
            <p>{{ customer.salesRep }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

/** Summary cards */
const summary = [
  { title: 'Total Orders', value: '82', note: 'All customers combined' },
  { title: 'Paid Orders', value: '60', note: 'Fully cleared' },
  { title: 'Pending', value: '15', note: 'Awaiting payment' },
  { title: 'Overdue', value: '7', note: 'Past due date' },
]

/** Tabs (order filters) */
const tabs = [
  { label: 'All Orders', count: 82 },
  { label: 'Paid', count: 60 },
  { label: 'Pending', count: 15 },
  { label: 'Overdue', count: 7 },
]

const activeTab = ref('All Orders')
const search = ref('')

/** Orders data */
const orders = ref([
  { orderId: 'INV-1001', date: '2025-10-10', customer: 'Faruk Ahmad', status: 'Paid', total: '3200', balance: '0', dueDate: '2025-10-15' },
  { orderId: 'INV-1002', date: '2025-10-11', customer: 'Selim Khan', status: 'Pending', total: '2100', balance: '500', dueDate: '2025-10-20' },
  { orderId: 'INV-1003', date: '2025-10-12', customer: 'Zain Uddin', status: 'Overdue', total: '5000', balance: '5000', dueDate: '2025-10-18' },
  { orderId: 'INV-1004', date: '2025-10-13', customer: 'Nijum Chy', status: 'Paid', total: '1800', balance: '0', dueDate: '2025-10-15' },
  { orderId: 'INV-1005', date: '2025-10-14', customer: 'Faruk Ahmad', status: 'Pending', total: '2400', balance: '400', dueDate: '2025-10-25' },
])

const filteredOrders = computed(() =>
  orders.value.filter((o) =>
    (activeTab.value === 'All Orders' || o.status === activeTab.value) &&
    o.customer.toLowerCase().includes(search.value.toLowerCase())
  )
)

/** Sidebar customer info */
const customer = ref({
  name: 'Faruk Ahmad',
  company: 'Halal Lab',
  email: 'faruk@halallab.com',
  phone: '(480) 555-0103',
  address: '4517 Washington Ave',
  city: 'Manchester',
  country: 'UK',
  salesRep: 'Nijum Chy',
})

/** Invoice summary */
const invoiceSummary = ref({
  total: 5600,
  paid: 3200,
  balance: 2400,
})
</script>
