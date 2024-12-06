import { ICity } from '~ek/types/city'

export interface IStore {
  id: number
  title: ILangContent
  address: ILangContent
  phone: string
  schedule: {
    open: string
    close: string
  }
  coords: {
    longitude: string
    latitude: string
  }
  email: string
  city: ICity
  status: boolean
}

export type StoreApiResponse = ApiResponse<IStore[]>

export type FormField = Omit<IStore, 'id'>
