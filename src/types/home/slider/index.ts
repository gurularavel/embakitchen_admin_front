export interface ISlider {
  id: number
  title: ILangContent
  excerpt: ILangContent
  image: IFileProperties[]
  status: boolean
}

export interface IFormSlider {
  title: ILangContent
  excerpt: ILangContent
  image: IFileProperties
}

export interface IGetSliders {
  data: ISlider[]
  pagination: IPageParams
}
