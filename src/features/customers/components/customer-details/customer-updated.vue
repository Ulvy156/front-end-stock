<template>
  <article >
    <div class="flex items-center gap-x-2 mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="size-7 text-blue-600" viewBox="0 0 32 32">
        <path fill="currentColor"
          d="M16 4c-3.855 0-7 3.145-7 7c0 2.379 1.21 4.484 3.031 5.75C7.926 18.352 5 22.352 5 27h2c0-4.398 3.191-8.074 7.375-8.844L15 20h2l.625-1.844C21.809 18.926 25 22.602 25 27h2c0-4.648-2.926-8.648-7.031-10.25C21.789 15.484 23 13.379 23 11c0-3.855-3.145-7-7-7m0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5s-5-2.227-5-5s2.227-5 5-5m-1 15l-1 6h4l-1-6z" />
      </svg>
      <commonHeader :title="$t('customers.details.updated_by')" />
    </div>
    <section class="flex items-center gap-5">
      <imageForm class-name="col-span-3 w-[10%] h-[10%] rounded-full" :src="updated_by?.img_url ?? ''" />
      <div class="grid grid-cols-3 gap-8">
        <commonContent> {{ $t('user.name') }}: {{ updated_by?.name }} </commonContent>
        <div class="flex items-center gap-x-2">
          <commonContent>
            {{ $t('user.phone_number') }}: {{ formatPhoneDisplay(updated_by?.phone ?? '') }}
          </commonContent>
          <iconCopy @click="copyToClipboard(formatPhoneDisplay(updated_by?.phone ?? ''))" />
        </div>
        <commonContent>
          {{ $t('user.role') }}: {{ updated_by?.role }}
        </commonContent>
        <commonContent>
          {{ $t('customers.details.updated_at') }}: {{ toKhmerDateTime(updated_by?.updatedAt) }}
        </commonContent>
        <commonContent>
          {{ $t('user.email') }}: {{ updated_by?.email }}
        </commonContent>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import commonHeader from '@/components/common/common-header.vue'
import { onMounted } from 'vue'
import imageForm from '@/components/reusable/image-form.vue'
import commonContent from '@/components/common/common-content.vue'
import { formatPhoneDisplay } from '@/utils/formatPhoneDisplay'
import iconCopy from '@/icons/icon-copy.vue'
import { copyToClipboard } from '@/utils/useClipboard'
import type { CreatedByUser } from '../../interface/customer.interface'
import { toKhmerDateTime } from '@/utils/useDate'

defineProps<{
  updated_by: CreatedByUser
}>();




onMounted(()=>{

})
</script>
