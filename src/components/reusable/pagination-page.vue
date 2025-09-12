<template>
  <el-pagination
    @current-change="handleCurrentChange"
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="total"
  />
</template>

<script setup lang="ts">

withDefaults(
  defineProps<{
    total: number
    pageSize?: number
  }>(),
  {
    total: 1,
    pageSize: 30,
  },
)


const emits = defineEmits<{
  (event: 'page-change', val: number): void
}>()

const handleCurrentChange = (val: number) => {
  emits('page-change', val)
}

</script>
