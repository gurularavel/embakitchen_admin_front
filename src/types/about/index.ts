export interface IAbout {
  id: number
  title: ILangContent
  content: ILangContent
  video: IFileProperties
  image: IFileProperties
}

export interface InfoBlock {
  id: number
  title: ILangContent
  content: ILangContent
  slug: ILangContent
  status: boolean
}

export interface IGetInfoBlock {
  data: InfoBlock[]
  pagination: IPagination
}

export interface IPostBlock {
  title: ILangContent
  content: ILangContent
}

export interface IPutBlock {
  id: number
  data: {
    title: ILangContent
    content: ILangContent
    status: boolean
  }
}

export interface IParams {
  status?: boolean
  page?: number
}
