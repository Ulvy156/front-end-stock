import { getCookie, setCookie } from "@/utils/useCookies";
import axios from "axios";

export default async function refreshToken() {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
    {}, // empty body
    {
      headers: {
        'refresh_token': getCookie("refresh_token")
      }
    }
  )
  console.log(data);

  setCookie("access_token", data.accessToken, 900) // 15mn
  setCookie("refresh_token", data.refreshToken, 604800) // 7 days
}
