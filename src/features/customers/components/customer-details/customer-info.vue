<template>
  <section class="w-[32%]">
    <article class="shadow-md shadow-gray-200 p-5 rounded-lg">
      <div class="flex justify-between w-full ">
        <commonAvatar />
        <div class="w-[80%]">
          <h3>Ulvy Romy</h3>
          <CustomerBadge type="VIP" />
        </div>
      </div>
      <div class="grid grid-cols-1 gap-y-2 text-[14px] mt-5">
        <!-- phone -->
        <div class="customer-contact">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M19.5 22a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5c-1.17 0-2.32-.18-3.42-.55a1.51 1.51 0 0 0-1.52.37l-1.44 1.44a14.77 14.77 0 0 1-5.89-5.89l1.43-1.43c.41-.39.56-.97.38-1.53c-.36-1.09-.54-2.24-.54-3.41A1.5 1.5 0 0 0 7 3H3.5A1.5 1.5 0 0 0 2 4.5C2 14.15 9.85 22 19.5 22M3.5 4H7a.5.5 0 0 1 .5.5c0 1.28.2 2.53.59 3.72c.05.14.04.34-.12.5L6 10.68c1.65 3.23 4.07 5.65 7.31 7.32l1.95-1.97c.14-.14.33-.18.51-.13c1.2.4 2.45.6 3.73.6a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5C10.4 21 3 13.6 3 4.5a.5.5 0 0 1 .5-.5" />
          </svg>
          <commonContent>
            +855 45 34 234
          </commonContent>
        </div>
        <!-- telegram -->
        <div class="customer-contact">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
            <path fill="currentColor"
              d="M226.27 29.22a5 5 0 0 0-5.1-.87L18.51 107.66a10.22 10.22 0 0 0 1.75 19.56L76 138.16V200a12 12 0 0 0 7.51 11.13A12.1 12.1 0 0 0 88 212a12 12 0 0 0 8.62-3.68l28-29l43 37.71a12 12 0 0 0 7.89 3a12.5 12.5 0 0 0 3.74-.59a11.87 11.87 0 0 0 8-8.72l40.62-176.6a5 5 0 0 0-1.6-4.9M20 117.38a2.13 2.13 0 0 1 1.42-2.27l174.65-68.35l-117 83.85l-57.26-11.24a2.12 2.12 0 0 1-1.81-1.99m70.87 85.38A4 4 0 0 1 84 200v-56.3l34.58 30.3Zm88.58 6.14a4 4 0 0 1-6.57 2.09l-86.45-75.81l131.7-94.38Z" />
          </svg>
          <commonContent>
            +855 45 34 234
          </commonContent>
        </div>
        <!-- location -->
        <div class="customer-contact">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
            <path fill="currentColor" d="m25 42.5l-.8-.9C23.7 41.1 12 27.3 12 19c0-7.2 5.8-13 13-13s13 5.8 13 13c0 8.3-11.7 22.1-12.2 22.7zM25 8c-6.1 0-11 4.9-11 11c0 6.4 8.4 17.2 11 20.4c2.6-3.2 11-14 11-20.4c0-6.1-4.9-11-11-11" />
            <path fill="currentColor" d="M25 24c-2.8 0-5-2.2-5-5s2.2-5 5-5s5 2.2 5 5s-2.2 5-5 5m0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3" />
          </svg>
          <commonContent>
            Tbong Khum, Kroch Chhmar
          </commonContent>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import CustomerBadge from '../reusable/CustomerBadge.vue';
import commonAvatar from '@/components/common/common-avatar.vue';
import commonContent from '@/components/common/common-content.vue';
</script>

<style scoped>
.customer-contact {
  display: flex;
  column-gap: 8px;
}
</style>
