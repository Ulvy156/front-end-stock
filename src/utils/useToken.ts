import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token: string): boolean {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    if (!decoded.exp) return true;

    const now = Math.floor(Date.now() / 1000); // current time in seconds
    return decoded.exp < now;
  } catch {
    return true; // invalid token
  }
}
