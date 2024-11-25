export interface IAbout<T = IFileProperties[]> {
  id: number
  title: ILangContent
  content: ILangContent
  counter_info: ILangContent
  solutions: {
    title: ILangContent
    options: ILangContent[]
  }
  video: T
  image: T
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
  title?: ILangContent
  content?: ILangContent
  status?: boolean
}

export interface IParams {
  status?: boolean
  page?: number
}
