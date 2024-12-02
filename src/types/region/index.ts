export interface ICity {
  id: number
  title: ILangContent
  rurals: []
  districts: Omit<IDistrict, 'city_id'>[]
  status: boolean
}

export interface IDistrict {
  id: number
  city_id: number
  title: ILangContent
  status: boolean
}
