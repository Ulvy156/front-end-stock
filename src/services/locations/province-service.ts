import { api } from "@/plugins/axios";

export async function getAllProvinces() {
  return await api.get('/province')
}

// get province with district by province id
export async function getProvinceWithDistrict(province_id: number) {
  return await api.get(`/province/districts/${province_id}`)
}
