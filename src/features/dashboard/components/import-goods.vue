<template>
  <section class="mt-5">
    <div class="flex items-center gap-x-2 text-[var(--text-blue)]">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
        <path fill="currentColor" d="M27 6v5H17V6zm0-2H17a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M12 25H6v-8h6v-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6zm18-5H16.828l2.586-2.586L18 16l-5 5l5 5l1.414-1.414L16.828 22H30zM11 6v5H6V6zm0-2H6a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" />
      </svg>
      <h3 class="text-lg font-bold">{{ $t("imports.goods") }}</h3>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" :label="$t('imports.date')" />
      <el-table-column prop="address" :label="$t('imports.country')" />
      <el-table-column prop="address" :label="$t('total')" />
      <el-table-column prop="address" :label="$t('imports.arrival')" />
      <el-table-column prop="address" :label="$t('imports.warehouse')" />
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
