import type { District, Province } from "./location.interface"

export type CustomerType = 'RETAILS' | 'WHOLESALE' | 'VIP';
export type CustomerTypeKhmer = 'លក់រាយ' | 'លក់ដុំ' | 'VIP';
export const customerDataTypeEng = ['RETAILS', 'WHOLESALE', 'VIP'];
export const customerDataTypeKh = ['លក់រាយ', 'លក់ដុំ', 'VIP'];

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
  type: CustomerType,
  createdAt: string
  updatedAt: string
}

export interface CustomerFilter {
  page: number;
  limit: number;
  name: string;
  phone_number: string;
  province_id: number | null;
  district_id: string | null;
  type: CustomerType | null;
}

export interface CustomerDetails {
  id: string
  name: string
  phone: string
  telegram: string
  address: string
  img_url: string
  lastOrderDate: string | null
  totalOrders: number
  totalSpent: number
  mapUrl: string
  type: CustomerType,
  district_id: string
  created_by_user_id: string
  updated_by_user_id: string | null
  createdAt: string
  updatedAt: string
  district: District
  province: Province
}

export interface CustomerSummary {
  total_customers: number,
  total_retail: number,
  total_wholesale: number,
  total_retails_wholesale: number
}

export interface CreatedByUser {
  name: string,
  role: string,
  email: string,
  img_url: string,
  phone: string,
  updatedAt: string,
  createdAt: string,
}
