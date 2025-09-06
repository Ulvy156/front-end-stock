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
  img_url: string
  createdAt: string
  updatedAt: string
}

export interface CustomerFilter {
  page: number;
  limit: number;
  name: string;
  phone_number: string;
}
