import axios from "axios";
import { setCookie } from "@/utils/useCookies";

export default async function refreshToken() {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
      {},
      { withCredentials: true }
    );

    if (data?.accessToken) {

      // store it
      setCookie(
        "access_token",
        data.accessToken,
        Number(import.meta.env.VITE_JWT_EXPIRES_IN)
      );
      // store is_logged
      setCookie('is_logged', '1', Number(import.meta.env.VITE_JWT_REFRESH_EXPIRES_IN))

      // return it for axios interceptor
      return data.accessToken;
    }

    // set user to logged out
    setCookie('is_logged', '0', Number(import.meta.env.VITE_JWT_REFRESH_EXPIRES_IN))
    console.warn("⚠️ No access token returned from refresh endpoint");
    return null;
  } catch (err) {
    console.error("❌ Token refresh failed:", err);
    setCookie('is_logged', '0', Number(import.meta.env.VITE_JWT_REFRESH_EXPIRES_IN))
    return null;
  }
}
