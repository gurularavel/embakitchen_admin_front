export interface IPartner {
  id: number
  title: ILangContent
  image: IFileProperties[]
  status: boolean
}

export interface IFormPartner {
  title: ILangContent
  image: File[]
}

export interface IPutPartner {
  id: number
  formData: FormData
}

export interface IGetPartners {
  data: IPartner[]
  pagination: IPageParams
}
