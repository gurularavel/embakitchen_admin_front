export interface ICity {
  id: number
  title: ILangContent
  rurals: []
  status: boolean
}

export type CityApiResponse = ApiResponse<ICity[]>
