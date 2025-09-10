import { api } from "@/plugins/axios";

export async function getAllDistrict() {
  return await api.get('/district')
}
