export interface IProjectPage {
  id: number
  title: ILangContent
  image: IFileProperties[]
}

export interface IProject {
  id: number
  title: ILangContent
  slug: ILangContent
  images: IFileProperties[]
  status: boolean
}

export type ProjectApiResponse = ApiResponse<IProject[]>
