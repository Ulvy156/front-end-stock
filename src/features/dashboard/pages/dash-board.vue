<template>
  <section class=" w-[98%]">
    <div class="flex justify-between gap-x-2">
      <statsWidget
      v-for="stats in statsWidgetData"
      :key="stats.title"
      :title="stats.title"
      :total="stats.total"
      :class="stats.style"
      />
    </div>
    <importGoods />
    <exportsGoods/>
  </section>
</template>

<script setup lang="ts">
import importGoods from '../components/import-goods.vue';
import exportsGoods from '../components/exports-goods.vue';
import statsWidget from '@/components/reusable/stats-widget.vue';
import { readonly } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const statsWidgetData = readonly([
  {
    title: t('dashboard.total_revenue'),
    total: 100,
    style: 'bg-blue-50 text-blue-800'
  },
  {
    title: t('dashboard.total_expense'),
    total: 100,
    style: 'bg-purple-50 text-purple-800'
  },
  {
    title: t('dashboard.total_order'),
    total: 100,
    style: 'bg-green-50 text-green-800'
  },
  {
    title: t('customers.total_customer'),
    total: 100,
    style: 'bg-red-50 text-red-800'
  }
])
</script>




