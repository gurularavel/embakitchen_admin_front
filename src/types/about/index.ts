export interface IFileProperties {
  [key: string]: {
    name: string
    file_name: string
    uuid: string
    preview_url: string
    original_url: string
    order: number
    custom_properties: []
    extension: string
    size: number
  }
}

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
