<template>
  <section class="flex w-full h-screen overflow-hidden">
    <nav :class="closeMenubar ? 'close-menu' : 'open-menu'" class="shadow-xl sticky z-10 left-0 top-0 bg-gray-800">
      <!-- side bar -->
      <div
      :class="{'px-1': closeMenubar, 'px-5':!closeMenubar}"
      class="flex cursor-pointer blue m-auto py-4 items-center justify-between shadow-sm ">
        <!-- <img @click="closeMenubar = !closeMenubar" class="w-[20%] p-2 bg-white" src="../../public/logo.png" alt=""> -->
      <img class="size-10 bg-white rounded-full" @click="closeMenubar = !closeMenubar" src="../../../../public/logo.png" alt="">

        <svg xmlns="http://www.w3.org/2000/svg" :class="{ hidden: closeMenubar }" @click="closeMenubar = !closeMenubar"
          class="size-5 cursor-pointer text-white" viewBox="0 0 256 256">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16">
            <path d="m 16,64 224.93778,0.09256" />
            <path
              d="M 48,16 H 207.91114 C 225.62929,16 240,30.281849 240,48 v 160 c 0,17.71816 -14.28185,32 -32,32 H 48 C 30.281848,240 16.069099,225.73073 16.06221,208.01257 L 16,48 C 15.993112,30.281851 30.281848,16 48,16 Z" />
            <path d="M 160,64 V 240" />
          </g>
        </svg>
      </div>
      <!-- menu list -->
      <aside class="flex flex-col justify-between h-[90%]" v-show="!closeMenubar">
        <slot name="sidebar"></slot>
      </aside>
    </nav>

    <main class="w-full min-h-screen h-auto overflow-auto ">
      <div class="py-2 px-6 flex justify-between items-end gap-5 w-full sticky top-0 z-50 shadow-sm bg-white">
        <inputField style="width: 30%" size="large">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" stroke-width="1" />
            </svg>
          </template>
        </inputField>
        <div class="flex justify-end items-center gap-x-2 w-1/2">
          <el-dropdown placement="bottom-end">
            <div class="flex items-center gap-x-2 cursor-pointer">
              <commonAvatar class="cursor-pointer" :src="user_image" />
              <div class="flex flex-col gap-y-2">
                <h3 class="text-[var(--text-gray)] text-[15px]">{{ getLocalStorage('name') }}</h3>
                <tagForm :title="getLocalStorage('role_name') ?? ''" type="primary"/>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <div class="flex justify-start items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor"
                        d="M18.5 20.247V16S16 14.5 12 14.5S5.5 16 5.5 16v4.247M1.5 12C1.5 6.201 6.201 1.5 12 1.5S22.5 6.201 22.5 12S17.799 22.5 12 22.5S1.5 17.799 1.5 12Zm10.426.5S8.5 10.68 8.5 8c0-1.933 1.569-3.5 3.504-3.5A3.495 3.495 0 0 1 15.5 8c0 2.68-3.426 4.5-3.426 4.5z"
                        stroke-width="1" />
                    </svg>
                    <p>Profile</p>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div class="flex justify-start items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                      <path fill="currentColor"
                        d="m14.136 3.361l.498-.05zm-.152-.82l-.445.23zm.447 2.277l.398-.303zm.929.384l-.067-.495zm1.238-.82l.317.386zm.687-.473l.152.476zm.702.035l.199-.459zm.637.538l-.353.354zm.894.894l.353-.354zm.538.637l.459-.199zm.035.702l.476.152zm-.472.687l-.387-.317zm-.822 1.239l-.495-.067zm.385.928l-.303.397zm1.457.295l.05-.498zm.82.152l.229-.444zm.47.521l.466-.184zm.001 2.926l-.465-.184zm-.472.52l.23.445zm-.82.153l-.05-.497l-.015.001l-.017.003zm0 0l.05.498l.017-.002l.016-.003zm-1.456.295l-.303-.398zm-.384.929l-.496.066zm.821 1.238l-.387.316zm.472.687l-.477.152zm-.035.702l-.459-.199zm-.538.637l.354.353zm-.894.893l-.353-.353zm-.637.538l.2.46zm-.702.035l-.152.477zm-.687-.472l.317-.387l-.005-.003zm0 0l-.317.387l.005.004zm-1.238-.82l.066-.496zm-.929.384l.398.303zm-.295 1.456l-.497-.05zm-.152.82l-.445-.229zm-.521.472l-.184-.465zm-2.926 0l.184-.465zm-.52-.472l.444-.229zm-.153-.82l-.498.05zm-.295-1.456l-.398.303zm-.928-.384l-.067-.496zm-1.239.82l-.317-.386l-.007.006l-.008.007zm0 0l.317.388l.008-.007l.007-.006zm-.687.473l.152.476zm-.702-.035l-.2.459zm-.637-.538l.353-.354zm-.894-.894l-.353.354zm-.538-.637l.459-.198zm-.035-.702l.476.152zm.472-.687l.387.317zm.821-1.239l.496.067zm-.384-.928l.303-.397zm-1.457-.295l-.05.498zm-.82-.152l.23-.445zm-.47-.521l-.466.184zm0-2.926l-.466-.184zm.47-.52l-.229-.445zm.82-.153v-.5h-.024l-.025.002zm0 0v.5h.025l.025-.003zm1.457-.295l-.303-.398zm.385-.928l.495-.067zM4.38 7.4l.387-.316zm-.472-.687l.476-.152zm.035-.702l-.459-.198zm.538-.637l.354.354zm.894-.893l-.354-.354zm.637-.538l-.199-.46zm.702-.035l.152-.477zm.687.472l.317-.387zm1.238.821l.067-.495zm.93-.385l-.399-.303zm.294-1.456l.497.05zm.152-.82l-.444-.228zm.521-.471l.184.465zm2.926 0l.184-.465zm1.17 1.242a8 8 0 0 0-.063-.542a1.5 1.5 0 0 0-.142-.458l-.889.459c.01.02.027.06.044.164c.019.11.033.253.056.476zm.196 1.203c-.012-.015-.048-.076-.087-.29a13 13 0 0 1-.108-.913l-.995.1c.04.401.073.732.119.99c.045.252.115.509.276.72zm.464.192a.5.5 0 0 1-.464-.192l-.796.606a1.5 1.5 0 0 0 1.393.577zm.988-.713c-.325.267-.547.448-.722.569c-.179.124-.248.141-.266.144l.133.991c.262-.035.493-.167.704-.314c.215-.15.472-.36.785-.616zm.852-.561c-.16.051-.295.132-.423.223c-.124.088-.265.204-.429.338l.634.774c.173-.142.285-.233.375-.297a.6.6 0 0 1 .148-.086zm1.053.052a1.5 1.5 0 0 0-1.053-.052l.305.952a.5.5 0 0 1 .35.018zm.792.644c-.15-.15-.279-.28-.393-.38a1.5 1.5 0 0 0-.399-.264l-.398.918c.021.009.059.03.139.1c.083.072.185.174.344.333zm.893.893l-.893-.893l-.707.707l.893.893zm.644.792a1.5 1.5 0 0 0-.265-.399c-.1-.114-.23-.243-.379-.393l-.707.707c.159.159.26.261.334.344c.07.08.09.118.099.139zm.052 1.053a1.5 1.5 0 0 0-.052-1.053l-.918.398a.5.5 0 0 1 .017.35zm-.561.852c.134-.164.25-.305.338-.429c.09-.128.172-.263.223-.423l-.953-.305a.6.6 0 0 1-.085.148a8 8 0 0 1-.297.375zm-.713.988c.003-.018.02-.087.144-.266c.121-.175.302-.397.569-.722l-.774-.634c-.256.313-.467.57-.616.785c-.147.21-.279.442-.314.704zm.192.464a.5.5 0 0 1-.192-.464l-.991-.133a1.5 1.5 0 0 0 .577 1.392zm1.203.195c-.419-.042-.703-.07-.913-.108c-.214-.039-.275-.075-.29-.087l-.606.795c.21.16.467.23.72.276c.257.046.588.08.99.12zm1 .206a1.5 1.5 0 0 0-.458-.142c-.15-.025-.332-.043-.542-.064l-.1.995c.224.023.367.037.477.056a.6.6 0 0 1 .164.044zm.707.781a1.5 1.5 0 0 0-.707-.781l-.459.889a.5.5 0 0 1 .236.26zm.105 1.015c0-.211 0-.394-.01-.546a1.5 1.5 0 0 0-.095-.469l-.93.368c.008.021.02.063.027.168a8 8 0 0 1 .008.48zm0 1.264v-1.264h-1v1.264zm-.105 1.014c.062-.156.085-.312.095-.469c.01-.151.01-.334.01-.545h-1c0 .224 0 .368-.008.479a.6.6 0 0 1-.027.168zm-.707.782a1.5 1.5 0 0 0 .707-.782l-.93-.367a.5.5 0 0 1-.236.26zm-1 .206c.21-.021.393-.04.542-.065c.155-.025.308-.064.457-.14l-.458-.89a.6.6 0 0 1-.164.044c-.11.019-.253.033-.476.056zm.033-.005l-.165-.986zm-1.235.2c.015-.012.076-.049.29-.087c.21-.038.494-.067.912-.108l-.1-.995c-.401.04-.732.072-.99.119c-.252.045-.508.115-.719.275zm-.193.464a.5.5 0 0 1 .193-.464l-.607-.796a1.5 1.5 0 0 0-.577 1.393zm.713.988a13 13 0 0 1-.569-.722c-.124-.178-.141-.248-.144-.266l-.99.133c.035.262.167.493.313.704c.15.214.36.472.616.784zm.561.852a1.5 1.5 0 0 0-.223-.424a9 9 0 0 0-.338-.428l-.774.633c.142.174.233.285.297.376a.6.6 0 0 1 .085.147zm-.052 1.053a1.5 1.5 0 0 0 .052-1.053l-.953.304a.5.5 0 0 1-.017.351zm-.643.791c.149-.149.278-.278.378-.392c.104-.119.198-.245.265-.4l-.918-.397a.6.6 0 0 1-.1.138a8 8 0 0 1-.333.344zm-.894.894l.893-.894l-.707-.707l-.893.894zm-.792.643c.154-.067.28-.16.399-.264c.114-.1.243-.23.393-.38l-.707-.706c-.159.159-.261.26-.344.333a.6.6 0 0 1-.139.1zm-1.053.053a1.5 1.5 0 0 0 1.053-.053l-.398-.917a.5.5 0 0 1-.35.017zm-.852-.562c.164.134.305.25.429.338c.128.091.263.173.423.224l.305-.953a.6.6 0 0 1-.148-.085a8 8 0 0 1-.375-.298zm.005.004l.624-.781zm-.993-.716c.018.002.088.02.266.144c.175.121.397.302.722.568l.634-.774c-.313-.255-.57-.466-.785-.616c-.21-.146-.442-.278-.704-.313zm-.464.192a.5.5 0 0 1 .464-.192l.133-.991a1.5 1.5 0 0 0-1.392.576zm-.195 1.203c.042-.419.07-.703.108-.913c.039-.214.075-.275.087-.29l-.795-.607c-.16.21-.23.468-.276.72c-.046.257-.08.588-.12.99zm-.206 1c.077-.15.115-.303.141-.458c.026-.15.044-.332.065-.542l-.995-.1a8 8 0 0 1-.056.477a.6.6 0 0 1-.044.164zm-.781.707a1.5 1.5 0 0 0 .781-.707l-.889-.459a.5.5 0 0 1-.26.236zm-1.015.105c.211 0 .394 0 .546-.01c.156-.01.313-.033.469-.095l-.368-.93a.6.6 0 0 1-.168.027c-.11.008-.255.008-.48.008zm-1.264 0h1.264v-1h-1.264zm-1.015-.105c.157.062.313.085.47.095c.151.01.334.01.545.01v-1c-.224 0-.368 0-.479-.008a.6.6 0 0 1-.168-.027zm-.781-.707a1.5 1.5 0 0 0 .781.707l.368-.93a.5.5 0 0 1-.26-.236zm-.206-1q.03.317.064.542c.026.155.065.308.142.458l.889-.459a.6.6 0 0 1-.044-.164a8 8 0 0 1-.056-.476zm-.195-1.203c.012.015.048.076.087.29c.038.21.066.495.108.913l.995-.1c-.04-.401-.073-.732-.119-.99c-.045-.252-.115-.509-.276-.72zm-.464-.192a.5.5 0 0 1 .464.192l.795-.606a1.5 1.5 0 0 0-1.392-.577zm-.988.713c.325-.267.547-.448.722-.569c.179-.124.248-.142.266-.144l-.133-.991c-.262.035-.493.167-.704.314c-.215.149-.472.36-.785.616zm.015-.013l-.664-.748zm-.867.574c.16-.051.295-.132.423-.223c.124-.088.265-.204.429-.338l-.634-.774a8 8 0 0 1-.375.297a.6.6 0 0 1-.148.085zm-1.053-.052a1.5 1.5 0 0 0 1.053.052l-.305-.953a.5.5 0 0 1-.35-.017zm-.792-.644c.15.15.279.28.393.38c.118.103.245.197.399.264l.398-.918a.6.6 0 0 1-.139-.1a8 8 0 0 1-.344-.333zm-.893-.893l.893.893l.707-.707l-.893-.893zm-.644-.792c.067.154.161.28.265.399c.1.114.23.243.379.393l.707-.707a8 8 0 0 1-.334-.344a.6.6 0 0 1-.1-.139zm-.052-1.053a1.5 1.5 0 0 0 .052 1.053l.918-.398a.5.5 0 0 1-.018-.35zm.561-.852c-.134.164-.25.305-.338.429a1.5 1.5 0 0 0-.223.423l.952.305a.6.6 0 0 1 .086-.148c.064-.09.155-.202.297-.375zm.713-.988c-.003.018-.02.087-.144.266c-.122.175-.302.397-.569.722l.774.634c.256-.313.467-.57.616-.785c.147-.21.279-.442.314-.704zm-.192-.464a.5.5 0 0 1 .192.464l.991.133a1.5 1.5 0 0 0-.577-1.392zm-1.203-.195c.419.041.703.07.913.108c.214.039.275.075.29.087l.606-.796c-.21-.16-.467-.23-.72-.275c-.257-.046-.588-.08-.99-.12zm-1-.206c.15.077.303.115.458.141c.15.026.331.044.542.065l.1-.995a8 8 0 0 1-.477-.056a.6.6 0 0 1-.164-.044zm-.707-.782a1.5 1.5 0 0 0 .707.782l.459-.889a.5.5 0 0 1-.236-.26zM1.5 12.633c0 .211 0 .394.01.546a1.5 1.5 0 0 0 .095.468l.93-.367a.6.6 0 0 1-.027-.168a8 8 0 0 1-.008-.48zm0-1.264v1.264h1v-1.264zm.105-1.015a1.5 1.5 0 0 0-.095.47c-.01.151-.01.334-.01.545h1c0-.224 0-.368.008-.479a.6.6 0 0 1 .027-.168zm.707-.781a1.5 1.5 0 0 0-.707.781l.93.368a.5.5 0 0 1 .236-.26zm1-.206q-.317.03-.542.064a1.5 1.5 0 0 0-.458.142l.459.889c.02-.01.06-.027.164-.044c.11-.019.253-.033.476-.056zm.05-.002v1zm0 0v1zm1.153-.193c-.015.012-.076.048-.29.087c-.21.038-.494.066-.913.108l.1.995c.401-.04.733-.073.99-.119c.253-.045.51-.115.72-.276zm.192-.464a.5.5 0 0 1-.192.464l.607.795a1.5 1.5 0 0 0 .576-1.392zm-.713-.989c.267.326.448.548.57.723c.124.179.14.248.143.266l.991-.133c-.035-.262-.167-.493-.314-.704c-.149-.215-.36-.472-.616-.785zm-.561-.852c.05.16.132.296.223.424c.088.123.204.265.338.428l.774-.633a8 8 0 0 1-.297-.376a.6.6 0 0 1-.086-.147zm.052-1.052a1.5 1.5 0 0 0-.052 1.052l.952-.304a.5.5 0 0 1 .018-.35zm.644-.792c-.15.149-.28.278-.38.393a1.5 1.5 0 0 0-.264.399l.918.397a.6.6 0 0 1 .1-.138a7 7 0 0 1 .333-.344zm.893-.894l-.893.894l.707.707l.893-.894zm0 0l.707.707zm.792-.643a1.5 1.5 0 0 0-.399.264c-.114.1-.244.23-.393.38l.707.706c.159-.158.261-.26.344-.333c.08-.07.118-.09.139-.1zm1.053-.053a1.5 1.5 0 0 0-1.053.053l.398.918a.5.5 0 0 1 .35-.018zm.852.562c-.164-.134-.305-.25-.429-.338a1.5 1.5 0 0 0-.423-.224l-.305.953a.6.6 0 0 1 .148.085c.09.065.202.156.376.298zm.988.713c-.018-.003-.087-.02-.266-.144a13 13 0 0 1-.722-.57l-.633.775c.312.256.57.467.784.616c.21.146.442.278.704.314zm.464-.193a.5.5 0 0 1-.464.193l-.133.99a1.5 1.5 0 0 0 1.393-.576zm.195-1.202c-.042.418-.07.703-.108.912c-.039.214-.075.275-.087.29l.796.607c.16-.21.23-.467.275-.72c.046-.257.08-.588.12-.99zm.206-1c-.077.15-.116.303-.142.458c-.025.15-.043.331-.064.542l.995.1a8 8 0 0 1 .056-.477a.6.6 0 0 1 .044-.164zm.782-.707a1.5 1.5 0 0 0-.782.708l.889.458a.5.5 0 0 1 .26-.236zm1.014-.105c-.211 0-.394 0-.546.01a1.5 1.5 0 0 0-.468.095l.367.93a.6.6 0 0 1 .168-.027c.11-.008.255-.008.48-.008zm1.264 0h-1.264v1h1.264zm1.015.105a1.5 1.5 0 0 0-.47-.095c-.151-.01-.334-.01-.545-.01v1c.224 0 .368 0 .479.008a.6.6 0 0 1 .168.027zm.781.707a1.5 1.5 0 0 0-.782-.707l-.367.93a.5.5 0 0 1 .26.236zM15.5 12a3.5 3.5 0 0 1-3.5 3.5v1a4.5 4.5 0 0 0 4.5-4.5zM12 8.5a3.5 3.5 0 0 1 3.5 3.5h1A4.5 4.5 0 0 0 12 7.5zM8.5 12A3.5 3.5 0 0 1 12 8.5v-1A4.5 4.5 0 0 0 7.5 12zm3.5 3.5A3.5 3.5 0 0 1 8.5 12h-1a4.5 4.5 0 0 0 4.5 4.5z" />
                    </svg>
                    <p>Profile</p>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div @click="logout" class="flex justify-start items-center gap-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24">
                      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                        stroke-miterlimit="10" stroke-width="1.5"
                        d="m17 16l4-4m0 0l-4-4m4 4H7m4 9H5.4A2.4 2.4 0 0 1 3 18.6V5.4A2.4 2.4 0 0 1 5.4 3H11" />
                    </svg>
                    <p> Sign Out</p>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <router-view v-slot="{ Component }" class="ml-6 pr-2 mt-5 w-[98%]">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>
  </section>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import commonAvatar from '@/components/common/common-avatar.vue'
import { getLocalStorage } from '@/utils/useLocalStorage'
import { api } from '@/plugins/axios'
import { removeCookie } from '@/utils/useCookies'
import inputField from '@/components/reusable/input-field.vue'
import tagForm from '@/components/reusable/tag-form.vue'
// properties
const previousActiveIndex = ref(0)
const closeMenubar = ref(false)
const user_image = ref('')
//functions
function onClickNavItem() {
  const navList = document.getElementById('nav-list')?.children
  if (navList) {
    Array.from(navList).forEach((navItem: Element, index: number) => {
      // add click listener to each nav-item
      navItem.addEventListener('click', () => {
        // add active class if user click on
        previousActiveIndex.value = index
        navItem.classList.add('active-nav')
        // remove all other active class
        removeActiveClass(navList)
      })
    })
  }
}

function removeActiveClass(list: HTMLCollection) {
  Array.from(list).forEach((ele, idx) => {
    // if selected index diff from idx it meant that ele is not active
    if (previousActiveIndex.value !== idx) {
      ele.classList.remove('active-nav')
    }
  })
}

async function getUserProfile() {
  await api.get('/auth/profile').then((res) => {
    user_image.value = res.data.img_url
  })
}

function logout() {
  removeCookie('refresh_token')
  removeCookie('access_token')
  location.href = '/login'
}

onMounted(() => {
  onClickNavItem()
})

onBeforeMount(async () => {
  await getUserProfile()
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
  color: white;
  display: flex;
  align-items: center;
  column-gap: 5px;
}

.nav-item>svg {
  width: 20px;
  height: 20px;
}

.nav-item:not(.active-nav):hover {
  background: white;
  padding: 10px 18px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: black;
  transition: all 0.3s ease-in-out;
}

.active-nav {
  background: #155dfc;
  padding: 10px 18px;
  /* a bit more horizontal padding */
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: white;
  border-radius: 8px;
  /* smooth rounded corners */
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
