import { getCookie } from "./useCookies";

export function isTokenExpired(): boolean {
  return !getCookie('access_token');
}
