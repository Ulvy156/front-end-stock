<template>
  <section class=" w-[98%]">
    <div class=" widget-card">
      <statsWidget />
    </div>
    <importGoods />
    <exportsGoods/>
  </section>
</template>

<script setup lang="ts">
import statsWidget from '../components/stats-widget.vue';
import importGoods from '../components/import-goods.vue';
import exportsGoods from '../components/exports-goods.vue';
</script>



<style scoped>
.widget-card {
  display: grid;
  border: 1px solid var(--text-gray);
  border-radius: 8px;
  padding: 12px;
  gap: 20px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
</style>
