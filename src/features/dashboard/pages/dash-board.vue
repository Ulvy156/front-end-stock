<template>
  <section >
    <div class="flex justify-between gap-x-5">
      <statsWidget
        v-for="stats in statsWidgetData"
        :key="stats.title"
        :title="stats.title"
        :total="stats.total"
        :class="stats.style"
      >
        <template #default>
          <span v-html="stats.icon"></span>
        </template>
      </statsWidget>
    </div>
  </section>
</template>

<script setup lang="ts">
import statsWidget from '@/components/reusable/stats-widget.vue'
import { readonly } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const statsWidgetData = readonly([
  {
    title: t('dashboard.total_product'),
    total: 33,
    style: 'bg-blue-50 text-blue-800',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-blue-800" viewBox="0 0 2048 2048">
            <path fill="currentColor" d="m960 120l832 416v1040l-832 415l-832-415V536zm625 456L960 264L719 384l621 314zM960 888l238-118l-622-314l-241 120zM256 680v816l640 320v-816zm768 1136l640-320V680l-640 320z" />
          </svg>`,
  },
  {
    title: t('customers.total_customer'),
    total: 43,
    style: 'bg-purple-50 text-purple-800',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-purple-800" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.1 9.1 0 0 0 3.741-.479q.01-.12.01-.241a3 3 0 0 0-4.692-2.478m.94 3.197l.001.031q0 .337-.037.666A11.94 11.94 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6 6 0 0 1 6 18.719m12 0a5.97 5.97 0 0 0-.941-3.197m0 0A6 6 0 0 0 12 12.75a6 6 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72a9 9 0 0 0 3.74.477m.94-3.197a5.97 5.97 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0m6 3a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0m-13.5 0a2.25 2.25 0 1 1-4.5 0a2.25 2.25 0 0 1 4.5 0" />
          </svg>`,
  },
  {
    title: t('dashboard.total_order'),
    total: 24,
    style: 'bg-green-50 text-green-800',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-green-800" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h10m-10 7h10m-10 7h10M4 4h1v5M4 9h2m.5 11H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02" />
          </svg>`,
  },
  {
    title: t('dashboard.total_staff'),
    total: 67,
    style: 'bg-indigo-50 text-indigo-800',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="size-6 text-indigo-800" viewBox="0 0 24 24">
	<path fill="currentColor" d="M10 2.5C8.035 2.5 6.42 4.055 6.42 6S8.036 9.5 10 9.5s3.579-1.555 3.579-3.5s-1.615-3.5-3.58-3.5M7.42 6c0-1.369 1.143-2.5 2.58-2.5c1.436 0 2.579 1.131 2.579 2.5s-1.143 2.5-2.58 2.5C8.564 8.5 7.422 7.369 7.422 6m-.402 5.618c.156-.043.368-.003.586.138c.49.317 1.33.73 2.394.73s1.904-.413 2.393-.73c.219-.14.43-.18.585-.138q.221.06.44.13l.984.316a.5.5 0 0 0 .305-.952l-.985-.316a12 12 0 0 0-.478-.142c-.52-.143-1.027.026-1.394.263c-.394.254-1.045.569-1.85.569s-1.457-.315-1.85-.57c-.367-.236-.874-.405-1.395-.262q-.24.067-.478.142l-.984.316a3.53 3.53 0 0 0-2.214 2.037v.002l-.001.003l-.02.06l-.024.081a6 6 0 0 0-.092.373c-.027.14-.034.206-.045.312l-.375 3.543c-.147 1.07.443 2.148 1.59 2.414c1.178.273 3.087.563 5.888.563a.5.5 0 0 0 0-1c-2.732 0-4.565-.283-5.662-.537c-.572-.133-.915-.672-.824-1.308v-.01l.378-3.562a2 2 0 0 1 .032-.229l.001-.004l.002-.01l.008-.032l.042-.174l.01-.032l.002-.01l.001-.004l.027-.09a2.53 2.53 0 0 1 1.58-1.434l.985-.315q.219-.07.439-.13M18.5 13a.5.5 0 0 0-1 0v.833h-.337c-.917 0-1.663.744-1.663 1.662c0 .426.098.787.332 1.071c.226.276.529.416.8.507l2.417.802c.203.068.296.132.346.194c.044.053.105.163.105.436a.664.664 0 0 1-.664.662h-1.505a.83.83 0 0 1-.831-.834a.5.5 0 0 0-1 0a1.83 1.83 0 0 0 1.831 1.834h.169V21a.5.5 0 1 0 1 0v-.833h.336c.917 0 1.664-.744 1.664-1.662c0-.425-.098-.787-.332-1.071c-.226-.276-.53-.416-.8-.507l-2.418-.802c-.203-.068-.295-.132-.346-.194c-.043-.052-.104-.163-.104-.436c0-.364.297-.662.663-.662h1.505a.83.83 0 0 1 .832.834a.5.5 0 1 0 1 0a1.83 1.83 0 0 0-1.832-1.834H18.5z" />
</svg>`,
  },
])
</script>
