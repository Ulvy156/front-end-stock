<template>
  <section class="flex gap-x-5 w-full h-screen">
    <nav :class="{'close-menu': closeMenubar, 'open-menu': !closeMenubar}"
    class="shadow-xl">
      <!-- side bar -->
      <div class="flex text-blue-600 m-auto p-2 items-center justify-between shadow-sm">
        <div class="flex items-center gap-x-1" v-show="!closeMenubar">
          <commonAvatar/>
          <h1 class="text-xl text-blue-600">ឈ្មោះ</h1>
        </div>
        <svg :class="{'m-auto': closeMenubar}"
        @click="closeMenubar= !closeMenubar"
        xmlns="http://www.w3.org/2000/svg" class="size-5 cursor-pointer" viewBox="0 0 16 16">
          <path fill="currentColor"
            d="M10.315 5.032a2.11 2.11 0 0 0 2.064-1.678h1.833a.425.425 0 0 0 .3-.723a.43.43 0 0 0-.3-.124h-1.83a2.11 2.11 0 0 0-4.136 0H1.79a.424.424 0 0 0 0 .847h6.46a2.11 2.11 0 0 0 2.066 1.678m0-.88a1.23 1.23 0 1 1 0-2.46a1.23 1.23 0 0 1 0 2.46m-4.404 5.977A2.11 2.11 0 0 0 7.98 8.443l6.233-.007a.425.425 0 0 0 .3-.722a.43.43 0 0 0-.3-.124l-6.233.006a2.11 2.11 0 0 0-4.133 0L1.79 7.59a.423.423 0 0 0 0 .846l2.057.007a2.11 2.11 0 0 0 2.066 1.686m0-.88a1.23 1.23 0 1 1 0-2.46a1.23 1.23 0 0 1 0 2.46m4.398 5.938a2.11 2.11 0 0 0 2.068-1.694l1.833.026a.425.425 0 0 0 .3-.723a.43.43 0 0 0-.3-.124l-1.836-.027a2.11 2.11 0 0 0-4.13 0l-6.457.027a.424.424 0 0 0 0 .847l6.454-.026a2.11 2.11 0 0 0 2.068 1.694m0-.88a1.23 1.23 0 1 1 0-2.46a1.23 1.23 0 0 1 0 2.46"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div v-show="!closeMenubar">
        <slot name="sidebar"></slot>
      </div>
    </nav>
    <!-- main content of page -->
    <main class="w-full overflow-y-auto">
      <router-view></router-view>
    </main>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import commonAvatar from '@/common/common-avatar.vue';

const closeMenubar = ref(false);

</script>

<style scoped>
.close-menu {
  width: 5%;
  transition: 0.3s width ease-in-out;
}
.open-menu {
  width: 30%;
  transition: 0.3s width ease-in-out;
}
</style>
