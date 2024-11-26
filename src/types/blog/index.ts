export interface IBlog {
  id: number
  title: ILangContent
  slug: ILangContent
  description: ILangContent
  content: ILangContent
  image: IFileProperties[]
  status: boolean
}
export interface IGetBlogs {
  data: IBlog[]
  pagination: IPageParams
}

export interface IFormBlog {
  image: IFileProperties[]
  title: ILangContent
  description: ILangContent
  similar_post_ids: number[]
  content: ILangContent
}
