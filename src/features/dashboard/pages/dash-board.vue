<template>
  <section class=" w-[98%]">
    <div class="p-2 flex justify-end items-center gap-5 ">
      <div class="flex items-center">
        <commonAvatar />
        <h1 class=" text-xl">{{ getLocalStorage('name') }}</h1>
      </div>
    </div>
    <div class=" widget-card">
      <statsWidget />
    </div>
    <importGoods />
    <exportsGoods/>
  </section>
</template>

<script setup lang="ts">
import commonAvatar from '@/components/common/common-avatar.vue';
import { getLocalStorage } from '@/utils/useLocalStorage';
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
