export interface ICity {
  id: number
  title: ILangContent
  status: boolean
}

export type CityApiResponse = ApiResponse<ICity[]>
