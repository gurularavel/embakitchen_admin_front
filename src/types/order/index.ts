import type { IProduct } from '~ek/types/product'
import type { ICity } from '~ek/types/city'
import type { IDistrict } from '~ek/types/district'

export interface IOrder {
  id: number
  city: ICity & { hasDistricts: boolean }
  district: IDistrict
  products: ({ width: number; height: number } & Pick<
    IProduct,
    | 'id'
    | 'title'
    | 'slug'
    | 'tags'
    | 'category'
    | 'images'
    | 'bannerImage'
    | 'mainImage'
  >)[]
  name: string
  surname: string
  address: string
  phone: string
  message: string
  status: number
  created_at: string
}

export interface IEditOrderStatus {
  order_id: number
  isCalling: boolean
}

export type OrderApiResponse = ApiResponse<IOrder[]>
