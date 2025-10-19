<template>
  <article >
    <div class="flex items-center gap-x-2 mb-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="text-[var(--text-blue)] size-5"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
        >
          <path
            stroke-width="1.5"
            d="M21.5 12.686v-1.372c0-1.635 0-2.453-.305-3.188c-.304-.735-.882-1.313-2.038-2.47l-.814-.813c-1.156-1.156-1.734-1.734-2.47-2.039c-.734-.304-1.552-.304-3.187-.304h-1.372c-1.635 0-2.453 0-3.188.304c-.735.305-1.313.883-2.47 2.04l-.813.813C3.687 6.813 3.11 7.39 2.804 8.127C2.5 8.86 2.5 9.678 2.5 11.313v1.372c0 1.635 0 2.453.304 3.188c.305.735.883 1.313 2.04 2.47l.813.813c1.156 1.156 1.734 1.734 2.47 2.038c.734.305 1.552.305 3.187.305h1.372c1.635 0 2.453 0 3.188-.305c.735-.304 1.313-.882 2.47-2.038l.813-.814c1.156-1.156 1.734-1.734 2.038-2.47c.305-.734.305-1.552.305-3.187M12 16v-4.5"
          />
          <path stroke-width="1.8" d="M12 8.012v-.01" />
        </g>
      </svg>
      <commonHeader :title="$t('customers.details.info')" />
    </div>
    <section class="flex items-start gap-5">
      <imageForm
        class-name="col-span-3 w-[20%] rounded-md"
        :src="customersDetails?.img_url ?? ''"
      />
      <div class="grid grid-cols-3 gap-8">
        <commonContent> {{ $t('customers.name') }}: {{ customersDetails?.name }} </commonContent>
        <div class="flex items-center gap-x-2">
          <commonContent>
            {{ $t('customers.phone_number') }}: {{ formatPhoneDisplay(customersDetails?.phone ?? '') }}
          </commonContent>
          <iconCopy @click="copyToClipboard(formatPhoneDisplay(customersDetails?.phone ?? ''))"/>
        </div>
        <a class="hover:underline hover:text-blue-600 text-gray-600" :href="`tg://resolve?phone=${customersDetails?.telegram}`"
          >{{ $t('customers.telegram') }}: {{ formatPhoneDisplay(customersDetails?.telegram ?? '') }}
        </a>
        <commonContent>
          {{ $t('customers.lastOrderDate') }}: {{ customersDetails?.lastOrderDate }}
        </commonContent>
        <commonContent>
          {{ $t('customers.totalOrders') }}: {{ customersDetails?.totalOrders }}
        </commonContent>
        <commonContent>
          {{ $t('customers.totalSpent') }}: {{ customersDetails?.totalSpent }}
        </commonContent>
        <commonContent>
          {{ $t('customers.type') }}: {{ getCustomerTypeLabel(customersDetails?.type ?? 'BOTH') }}
        </commonContent>
        <commonContent>
          {{ $t('location.province') }}: {{ customersDetails?.district?.province?.name }}
        </commonContent>
        <commonContent>
          {{ $t('location.district') }}: {{ customersDetails?.district?.province?.name }}
        </commonContent>
        <a class="hover:underline hover:text-blue-600 col-span-3 text-gray-600" :href="customersDetails?.mapUrl" target="_blank"
          >{{ $t('customers.address') }}: {{ customersDetails?.address }}
        </a>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import commonHeader from '@/components/common/common-header.vue'
import { getCustomerDetails } from '@/services/customer-service'
import { onBeforeMount, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { type CustomerDetails } from '../../interface/customer.interface'
import imageForm from '@/components/reusable/image-form.vue'
import commonContent from '@/components/common/common-content.vue'
import { getCustomerTypeLabel } from '@/utils/useCustomerType'
import { formatPhoneDisplay } from '@/utils/formatPhoneDisplay'
import iconCopy from '@/icons/icon-copy.vue'
import { copyToClipboard } from '@/utils/useClipboard'

const route = useRoute()
const customersDetails = shallowRef<CustomerDetails>()
const customerId = Array.isArray(route.params.customer_id)
  ? route.params.customer_id[0]
  : route.params.customer_id



onBeforeMount(async () => {
  const data = await getCustomerDetails(customerId ?? '')
  customersDetails.value = data
})
</script>
