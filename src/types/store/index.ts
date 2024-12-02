import { ICity } from '~ek/types/region'

export interface IStore {
  id: number
  title: ILangContent
  address: ILangContent
  phone: string
  schedule: {
    open: string
    close: string
  }
  email: string
  city: ICity
  status: boolean
}

export interface IStores {
  data: IStore[]
  pagination: IPagination
}

export type FormField = Omit<IStore, 'id'>
