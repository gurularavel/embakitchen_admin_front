import { ITag } from '~ek/types/tags'

export interface IProjectPage {
  id: number
  title: ILangContent
  image: IFileProperties[]
}

export interface IProject {
  id: number
  title: ILangContent
  content: ILangContent
  slug: ILangContent
  images: IFileProperties[]
  bannerImage: IFileProperties[]
  similar_project_ids?: number[]
  similar_projects?: IProject[]
  tag_ids?: number[]
  tags: ITag[]
  status: boolean
}

export type IFormProject = Omit<
  IProject,
  'id' | 'slug' | 'status' | 'similar_projects' | 'tags'
>
export interface IEditProjectForm extends IFormProject {
  status: boolean
}

export type ProjectApiResponse = ApiResponse<IProject[]>
