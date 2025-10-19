// composables/useEscToGoBack.ts
import { onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router"

export function useEscToGoBack() {
  const router = useRouter()

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      router.back()
    }
  }

  onMounted(() => {
    window.addEventListener("keydown", handleEsc)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleEsc)
  })
}
