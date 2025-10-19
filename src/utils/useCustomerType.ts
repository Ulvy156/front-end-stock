import type { CustomerType as CustomerTypeEnglish, CustomerTypeKhmer } from "@/features/customers/interface/customer.interface"

// translate from english to khmer
export const getCustomerTypeLabel = (type: CustomerTypeEnglish) => {
  return CustomerType[type]
}

// translate from khmer to english
export const getCustomerKhmerLabel = (type: CustomerTypeKhmer) => {
  if(type === 'លក់រាយ'){
    return 'RETAILS'
  } else if (type === 'លក់ដុំ'){
    return 'WHOLESALE'
  }
  return 'VIP';
}
export const CustomerType = {
    RETAILS: 'លក់រាយ',
    WHOLESALE: 'លក់ដុំ',
    VIP: 'លក់រាយនិងលក់ដុំ'
} as const;


