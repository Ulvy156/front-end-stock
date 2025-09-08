<template>
  <form @submit.prevent="onSearch"
  class="flex gap-x-5">
    <div>
      <label for="name">{{ $t('customers.name') }}</label>
      <inputField
      v-model="filterData.name"
        id="name"
        :placeholder="$t('customers.placehoder_name')"
        :size="'large'"
        :icon="iconSearch"
      />
    </div>
    <div>
      <label for="phone">{{ $t('customers.phone_number') }}</label>
      <inputField
      v-model="filterData.phone_number"
        id="phone"
        :placeholder="$t('customers.placeholder_phone_number')"
        :size="'large'"
        :icon="iconSearch"
      />
    </div>

  </form>
</template>

<script setup lang="ts">
import inputField from '@/components/reusable/input-field.vue'
import iconSearch from '@/icons/icon-search.vue'
import { ref } from 'vue';
import type { CustomerFilter } from '../interface/customer.interface';
//emits
const emit = defineEmits<{
  (event: 'on-search', value: CustomerFilter): void
}>();

//properties
const filterData = ref<CustomerFilter>({
  page: 1,
  limit: 20,
  name: '',
  phone_number: ''
})

function onSearch() {
  emit('on-search', filterData.value)
}
</script>
