export interface ICategory {
  title: ILangContent
  id: number
  status: boolean
}

export type CategoryApiResponse = ApiResponse<ICategory[]>
