<template>
  <el-pagination
  @current-change="handleCurrentChange"
  background
  layout="prev, pager, next"
  :page-size="props.pageSize"
  :total="props.totalPage" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    totalPage: number,
    pageSize?: number
  }>(),
  {
    totalPage: 1,
    pageSize: 30
  }
)

const emits = defineEmits<{
  (event: 'page-change', val: number): void
}>();

const handleCurrentChange = (val: number) => {
  emits("page-change", val);
}
</script>
