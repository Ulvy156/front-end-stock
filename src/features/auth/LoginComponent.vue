<template>
  <form @submit.prevent="login"
  class="mt-[10%] content-center m-auto w-1/2 p-10 shadow-2xl rounded-md flex justify-between overflow-hidden">
    <section class="w-1/2 flex flex-col justify-between">
      <div>
          <div class="flex text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-8" viewBox="0 0 1024 1024">
              <path fill="currentColor" d="M320 288v-22.336C320 154.688 405.504 64 512 64s192 90.688 192 201.664v22.4h131.072a32 32 0 0 1 31.808 28.8l57.6 576a32 32 0 0 1-31.808 35.2H131.328a32 32 0 0 1-31.808-35.2l57.6-576a32 32 0 0 1 31.808-28.8H320zm64 0h256v-22.336C640 189.248 582.272 128 512 128s-128 61.248-128 137.664v22.4zm-64 64H217.92l-51.2 512h690.56l-51.264-512H704v96a32 32 0 1 1-64 0v-96H384v96a32 32 0 0 1-64 0z" />
            </svg>
            <h1 class="text-2xl">កម្មវិធីគ្រប់គ្រងទំនិញ</h1>
          </div>
          <div class="mt-10">
            <label for="email">អ៊ីមែល</label>
            <inputField
              size="large"
              id="email"
              placeholder="សូមបញ្ចូលអ៊ីមែល"
              v-model="loginData.email"
              :icon="iconEmail"
            />
          </div>
          <div class="mt-5 grid gap-1">
            <label for="psw" >ពាក្យសម្ងាត់</label>
            <inputField
              :type="isShowPassword ? '' : 'password'"
              size="large"
              placeholder="សូមបញ្ចូលពាក្យសម្ងាត់"
              id="psw"
              v-model="loginData.password"
              :icon="iconPassword"
            />
          </div>
          <div class="mt-5 flex items-center gap-x-3">
            <input type="checkbox" v-model="isShowPassword" name="checkbox" id="checkbox">
            <label for="checkbox" >បង្ហាញពាក្យសម្ងាត់</label>
          </div>
      </div>
      <commonButton title="ចូលប្រពន្ធ័"/>
    </section>
    <img
    class="w-1/2"
    src="../assets/undraw_access-account_aydp.svg" alt="login-image" >
  </form>
</template>

<script setup lang="ts">
import iconEmail from '@/icons/icon-email.vue'
import iconPassword from '@/icons/icon-password.vue'
import inputField from '@/components/reusable/input-field.vue'
import commonButton from '@/components/common/common-button.vue'
import { ref } from 'vue'
import { api } from '@/plugins/axios'
import { setCookie } from '@/utils/useCookies'
//properties
const loginData = ref({
  email: '',
  password: '',
})
const isShowPassword = ref(false);

//functions
async function login() {
  await api.post('/auth/login', loginData.value)
  .then(async (res) => {
    setCookie('access_token', res.data.access_token, 3600) // 1h
    setCookie('refresh_token', res.data.refreshToken, 3600) // 1h
    // store user info
    await getUserProfile();
  })
  .catch((err)=>{
    console.error(err);
  })

}

async function getUserProfile() {
  await api.get('/auth/profile')
  .then((res) => {
    console.log(res.data);

    setCookie('user_id', res.data.id, 3600) // 1h
    setCookie('is_admin', res.data.is_admin, 3600) // 1h
  })
}
</script>
