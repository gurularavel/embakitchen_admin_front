export interface ICampaign {
  id: number
  title: ILangContent
  slug: ILangContent
  content: ILangContent
  startDate: string
  endDate: string
  image: IFileProperties[]
  status: boolean
}

export interface IGetCampaigns {
  data: ICampaign[]
  pagination: IPageParams
}

export interface IFormCampaign {
  title: ILangContent
  content: ILangContent
  startDate: string
  endDate: string
  image: IFileProperties
  status: boolean
  campaignDates: [string, string]
}
