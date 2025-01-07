import { ICity } from '~ek/types/city'

export interface IDistrict {
  id: number
  title: ILangContent
  status: boolean
  city: ICity
}

export interface IFormDistrict {
  title: ILangContent
  city_id: number
  status: boolean
}

export type DistrictApiResponse = ApiResponse<IDistrict[]>
