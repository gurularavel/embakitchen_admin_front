import type { User } from '~ek/types/auth'
import type { IProduct } from '~ek/types/product'
import type { ICity } from '~ek/types/city'
import type { IDistrict } from '~ek/types/district'

export interface IOrder {
  id: number
  user: Omit<User, 'city'> & {
    city_id: number
    address: string
    district_id: number
  }
  status: number
  products: Pick<IProduct, 'id' | 'title'>[]
  city: Pick<ICity, 'id' | 'title'>
  district: Pick<IDistrict, 'id' | 'title'>
  address: string
  phone: string
  trackOrderStatuses: []
}

export type OrderApiResponse = ApiResponse<IOrder[]>
