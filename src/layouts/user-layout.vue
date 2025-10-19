<template>
  <mainLayout>
    <template #sidebar>
      <userNavbar />
    </template>
  </mainLayout>
</template>

<script lang="ts" setup>
import mainLayout from './main-layout.vue';
import userNavbar from '@/features/user/components/user-navbar.vue';

</script>

