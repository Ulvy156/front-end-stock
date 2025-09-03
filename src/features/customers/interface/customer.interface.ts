export interface Customer {
  id: string
  name: string
  phone: string
  telegram: string
  address: string
  lastOrderDate: string | null
  totalOrders: number
  totalSpent: number
  mapUrl: string
  createdAt: string
  updatedAt: string
}
