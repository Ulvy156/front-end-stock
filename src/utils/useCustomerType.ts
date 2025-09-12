import type { CustomerType as CustomerTypeEnglish, CustomerTypeKhmer } from "@/features/customers/interface/customer.interface"

// translate from english to khmer
export const getCustomerTypeLabel = (type: CustomerTypeEnglish) => {
  return CustomerType[type]
}

// translate from khmer to english
export const getCustomerKhmerLabel = (type: CustomerTypeKhmer) => {
  if(type === 'លក់រាយ'){
    return 'RETAIL'
  } else if (type === 'លក់ដុំ'){
    return 'WHOLESALE'
  }
  return 'BOTH';
}
export const CustomerType = {
    RETAIL: 'លក់រាយ',
    WHOLESALE: 'លក់ដុំ',
    BOTH: 'លក់រាយនិងលក់ដុំ'
} as const;


