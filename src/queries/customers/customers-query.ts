import type { CustomerFilter } from '@/features/customers/interface/customer.interface'
import { getCustomerByID, getCustomers, getCustomerSummary } from '@/services/customer-service'
import { useQuery } from '@tanstack/vue-query'

export function queryCustomerByID(customer_id: string) {
    return useQuery({
        queryKey: ['queryCustomerByID', customer_id],
        queryFn: () => getCustomerByID(customer_id),
        enabled: !!customer_id,
    })
}

export function queryAllCustomer(filter?: CustomerFilter) {
    return useQuery({
        queryKey: ['queryAllCustomer'],
        queryFn: () => getCustomers(filter),
    })
}

export function queryCustomerSummary() {
    return useQuery({
        queryKey: ['queryCustomerSummary'],
        queryFn: () => getCustomerSummary(),
    })
}
