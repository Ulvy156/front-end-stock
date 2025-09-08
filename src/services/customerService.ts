import { stopLoading, startLoading } from "@/composables/useLoading";
import { notify } from "@/composables/useNotify";
import type { Customer, CustomerFilter } from "@/features/customers/interface/customer.interface";
import { api } from "@/plugins/axios";
import type { AxiosError, AxiosResponse } from "axios";
import { useI18n } from "vue-i18n";

export interface Customers {
  customers: Customer[],
  total: number,
  lastPage: number,
}
const { t } = useI18n();

export async function getCustomers(
  params: CustomerFilter
): Promise<Customers  | null> {
  startLoading();

  try {
    const res: AxiosResponse = await api.get("/customers", { params });
    return res.data.data as Customers;
  } catch (err) {
    const error = err as AxiosError<{ message: string[] }>;
    console.error(err);
    notify({ message: error.response?.data?.message[0] || 'Something went wrong', type: 'error' });
    return null;
  } finally {
    stopLoading();
  }
}


export async function getCustomerByID(id: string, callback?: (res: AxiosResponse<Customer>) => void) {
  startLoading();

  await api.get(`/customers/${id}`)
    .then((res) => {
      callback?.(res);
    })
    .catch((err) => {
      console.error(err)
      notify({ message: err.response.data.message[0], type: 'error' })
    })
    .finally(() => {
      stopLoading()
    })
}

export async function createCustomer(payload: FormData, callback?: () => void) {
  startLoading();

  await api.post("/customers", payload)
    .then(() => {
      callback?.();
      notify({ message: t('customers.created'), type: 'success' })
    })
    .catch((err) => {
      console.error(err)
      notify({ message: err.response.data.message[0], type: 'error' })
    })
    .finally(() => {
      stopLoading()
    })
}

export async function updateCustomer(id: string, payload: FormData, callback?: () => void) {
  startLoading();

  await api.patch(`/customers/${id}`, payload)
    .then(() => {
      callback?.();
      notify({ message: t('customers.updated'), type: 'success' })
    })
    .catch((err) => {
      console.error(err)
      notify({ message: err.response.data.message[0], type: 'error' })
    })
    .finally(() => {
      stopLoading()
    })
}

export async function deleteCustomer(id: string, callback?: () => void) {
  startLoading();

  await api.delete(`/customers/${id}`)
    .then(() => {
      callback?.();
      notify({ message: t('customers.deleted'), type: 'success' })
    })
    .catch((err) => {
      console.error(err)
      notify({ message: err.response.data.message[0], type: 'error' })
    })
    .finally(() => {
      stopLoading()
    })
}
