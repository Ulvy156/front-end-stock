<template>
  <section class="mt-5">
    <div class="flex items-center gap-x-2 text-[var(--text-blue)]">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 36 36">
	<path fill="currentColor" d="M28.32 16.35a1 1 0 0 0-1.41 1.41L30.16 21H18a1 1 0 0 0 0 2h12.19l-3.28 3.28a1 1 0 1 0 1.41 1.41L34 22Z" class="clr-i-outline--badged clr-i-outline-path-1--badged" />
	<path fill="currentColor" d="M26 12.34a7.5 7.5 0 0 1-2-1.85v3.89h2Z" class="clr-i-outline--badged clr-i-outline-path-2--badged" />
	<path fill="currentColor" d="M6 13.61h7.61V6h8.89a7.5 7.5 0 0 1 .28-2H10.87L4 10.87V30a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2H6Zm0-1.92L11.69 6H12v6H6Z" class="clr-i-outline--badged clr-i-outline-path-3--badged" />
	<circle cx="30" cy="6" r="5" fill="currentColor" class="clr-i-outline--badged clr-i-outline-path-4--badged clr-i-badge" />
	<path fill="none" d="M0 0h36v36H0z" />
</svg>
      <h3 class="text-lg font-bold">{{ $t("exports.goods") }}</h3>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" :label="$t('exports.date')"  />
      <el-table-column prop="address" :label="$t('exports.country')" />
      <el-table-column prop="address" :label="$t('total')" />
      <el-table-column prop="address" :label="$t('exports.arrival')" />
      <el-table-column prop="address" :label="$t('exports.warehouse')" />
      <el-table-column prop="address" :label="$t('exports.customer_name')" />
    </el-table>
  </section>
</template>


<script setup lang="ts">
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
