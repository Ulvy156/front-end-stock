<template>
  <section class="flex gap-x-5 w-full min-h-screen overflow-auto">
    <nav :class="closeMenubar ? 'close-menu' : 'open-menu'" class="shadow-xl sticky z-10 left-0 top-0">
      <!-- side bar -->
      <div class="flex cursor-pointer blue m-auto p-2 items-center justify-between shadow-sm  px-5">
        <svg @click="closeMenubar = !closeMenubar" xmlns="http://www.w3.org/2000/svg" class="size-8" viewBox="0 0 48 48">
          <path fill="#cfd8dc" d="M5 19h38v19H5z" />
          <path fill="#b0bec5" d="M5 38h38v4H5z" />
          <path fill="#455a64" d="M27 24h12v18H27z" />
          <path fill="#e3f2fd" d="M9 24h14v11H9z" />
          <path fill="#1e88e5" d="M10 25h12v9H10z" />
          <path fill="#90a4ae" d="M36.5 33.5c-.3 0-.5.2-.5.5v2c0 .3.2.5.5.5s.5-.2.5-.5v-2c0-.3-.2-.5-.5-.5" />
          <g fill="#558b2f">
            <circle cx="24" cy="19" r="3" />
            <circle cx="36" cy="19" r="3" />
            <circle cx="12" cy="19" r="3" />
          </g>
          <path fill="#7cb342"
            d="M40 6H8c-1.1 0-2 .9-2 2v3h36V8c0-1.1-.9-2-2-2m-19 5h6v8h-6zm16 0h-5l1 8h6zm-26 0h5l-1 8H9z" />
          <g fill="#ffa000">
            <circle cx="30" cy="19" r="3" />
            <path d="M45 19c0 1.7-1.3 3-3 3s-3-1.3-3-3s1.3-3 3-3z" />
            <circle cx="18" cy="19" r="3" />
            <path d="M3 19c0 1.7 1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3z" />
          </g>
          <path fill="#ffc107" d="M32 11h-5v8h6zm10 0h-5l2 8h6zm-26 0h5v8h-6zM6 11h5l-2 8H3z" />
        </svg>
        <svg :class="{ 'hidden': closeMenubar }" @click="closeMenubar = !closeMenubar"
          xmlns="http://www.w3.org/2000/svg" class="size-5 cursor-pointer" viewBox="0 0 16 16">
          <path fill="currentColor"
            d="M10.315 5.032a2.11 2.11 0 0 0 2.064-1.678h1.833a.425.425 0 0 0 .3-.723a.43.43 0 0 0-.3-.124h-1.83a2.11 2.11 0 0 0-4.136 0H1.79a.424.424 0 0 0 0 .847h6.46a2.11 2.11 0 0 0 2.066 1.678m0-.88a1.23 1.23 0 1 1 0-2.46a1.23 1.23 0 0 1 0 2.46m-4.404 5.977A2.11 2.11 0 0 0 7.98 8.443l6.233-.007a.425.425 0 0 0 .3-.722a.43.43 0 0 0-.3-.124l-6.233.006a2.11 2.11 0 0 0-4.133 0L1.79 7.59a.423.423 0 0 0 0 .846l2.057.007a2.11 2.11 0 0 0 2.066 1.686m0-.88a1.23 1.23 0 1 1 0-2.46a1.23 1.23 0 0 1 0 2.46m4.398 5.938a2.11 2.11 0 0 0 2.068-1.694l1.833.026a.425.425 0 0 0 .3-.723a.43.43 0 0 0-.3-.124l-1.836-.027a2.11 2.11 0 0 0-4.13 0l-6.457.027a.424.424 0 0 0 0 .847l6.454-.026a2.11 2.11 0 0 0 2.068 1.694m0-.88a1.23 1.23 0 1 1 0-2.46a1.23 1.23 0 0 1 0 2.46"
            clip-rule="evenodd" />
        </svg>

      </div>
      <!-- menu list -->
      <aside class="flex flex-col justify-between h-[90%]" v-show="!closeMenubar">
        <slot name="sidebar"></slot>
      </aside>
    </nav>

    <main class="w-full m-auto h-screen overflow-auto ">
      <div class="p-2 flex justify-between items-end gap-5 w-full m-auto">
        <commonHeader :title="useNavigateTitleStore().title" class="text-[var(--text-gray)]" />
        <div class="flex items-center gap-x-2">
        <commonHeader :title="getLocalStorage('name') ?? ''" class="text-[var(--text-gray)]" />
          <el-dropdown placement="bottom-end">
            <commonAvatar class="cursor-pointer" :src="user_image" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">
                  Logout
                </el-dropdown-item>
                <el-dropdown-item>
                  Profile
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>
  </section>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import commonAvatar from '@/components/common/common-avatar.vue';
import { getLocalStorage } from '@/utils/useLocalStorage';
import commonHeader from '@/components/common/common-header.vue';
import { useNavigateTitleStore } from '../stores/navigateTitleStore';
import { api } from '@/plugins/axios';
import { removeCookie } from '@/utils/useCookies';

// properties
const previousActiveIndex = ref(0);
const closeMenubar = ref(false);
const user_image = ref('');
//functions
function onClickNavItem() {
  const navList = document.getElementById('nav-list')?.children;
  if (navList) {
    Array.from(navList).forEach((navItem: Element, index: number) => {
      // add click listener to each nav-item
      navItem.addEventListener('click', () => {
        // add active class if user click on
        previousActiveIndex.value = index;
        navItem.classList.add('active-nav')
        // remove all other active class
        removeActiveClass(navList);
      });
    });
  }
}

function removeActiveClass(list: HTMLCollection) {
  Array.from(list).forEach((ele, idx) => {
    // if selected index diff from idx it meant that ele is not active
    if (previousActiveIndex.value !== idx) {
      ele.classList.remove('active-nav')
    }
  }
  )
}

async function getUserProfile() {
  await api.get('/auth/profile')
    .then((res) => {
      user_image.value = res.data.img_url;
    })
}

function logout() {
  removeCookie('refresh_token');
  removeCookie('access_token');
  location.href = '/login';
}

onMounted(() => {
  onClickNavItem();
});

onBeforeMount(async () => {
  await getUserProfile();
})

</script>

<style>
.close-menu {
  width: 5%;
  transition: 0.3s width ease-in-out;
  overflow: hidden;
}

.open-menu {
  width: 25%;
  transition: 0.3s width ease-in-out;
  overflow: hidden;
}

.nav-item {
  padding: 10px;
  border-radius: 5px;
  color: rgb(142, 138, 138);
  display: flex;
  align-items: center;
  column-gap: 5px;
}

.nav-item>svg {
  width: 20px;
  height: 20px;
}

.nav-item:not(.active-nav):hover {
  background: #a6a8ab;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: white;
}

/* .active-nav {
  background: #155dfc;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: white;
} */
.active-nav {
  background: #155dfc;
  padding: 10px 18px; /* a bit more horizontal padding */
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: white;
  border-radius: 8px; /* smooth rounded corners */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
