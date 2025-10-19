import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCustomerStore = defineStore('customer', () => {
  // state
  const isCreatedCustomer = ref<boolean>(false)


  // actions
  function setCustomerCreated(val: boolean) {
    isCreatedCustomer.value = val
  }

  return { isCreatedCustomer, setCustomerCreated }
})
