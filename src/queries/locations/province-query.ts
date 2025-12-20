import { getAllProvinces, getProvinceWithDistrict } from '@/services/locations/province-service'
import { useQuery } from '@tanstack/vue-query'

export function queryProvinceWithDistrict(province_id: number) {
  return useQuery({
    queryKey: ['provinceWithDistrict', province_id],
    queryFn: () => getProvinceWithDistrict(province_id),
    enabled: !!province_id,
  })
}

export function queryAllProvinces() {
  return useQuery({
    queryKey: ['allProvinces'],
    queryFn: getAllProvinces,
  })
}
