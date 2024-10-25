export interface IColor {
  id: number
  title: ILangContent
  hex: string
  status: boolean
}

export interface IPostColor {
  title: ILangContent
  hex: string
}

export interface IGetColors {
  data: IColor[]
  pagination: IPageParams
}
