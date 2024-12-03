export interface ITag {
  id: number
  title: ILangContent
  status: boolean
}

export type TagsApiResponse = ApiResponse<ITag[]>
