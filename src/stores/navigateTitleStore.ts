import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useNavigateTitleStore = defineStore('navigate-title', () => {
  const { t } = useI18n()
  const title = ref(t('navbar.dashboard'))

  function setNavigateTitle(value: string) {
    title.value = value;
  }

  return { title, setNavigateTitle }
})
