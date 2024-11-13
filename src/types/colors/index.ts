export interface IColor {
  id: number
  title: ILangContent
  image: IFileProperties[]
  status: boolean
}

export interface IPostColor {
  title: ILangContent
  image: IFileProperties[]
}

export interface IGetColors {
  data: IColor[]
  pagination: IPageParams
}
