<script setup lang="ts">
import { computed } from 'vue';
import userLayout from './layouts/user-layout.vue';
import { getCookie } from './utils/useCookies';
import { isTokenExpired } from './utils/useToken';
import LoginComponent from './features/auth/LoginComponent.vue';

const tokenExpired = isTokenExpired(getCookie("access_token") ?? '');

const currentLayout = computed(() =>{
  return tokenExpired ? LoginComponent : userLayout
})
</script>

<template>
  <currentLayout/>
</template>

<style scoped></style>
