import { createI18n } from "vue-i18n"
import en from "@/locales/en.json"
import kh from "@/locales/kh.json"

type MessageSchema = typeof en  // type inference from your JSON

const lng = (localStorage.getItem("lng") as "en" | "kh") ?? "kh"

const i18n = createI18n<[MessageSchema], "en" | "kh">({
  legacy: false,
  locale: lng,
  fallbackLocale: "kh",
  globalInjection: true,
  messages: {
    en,
    kh
  }
})

export default i18n
