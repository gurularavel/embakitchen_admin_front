export interface IBlog {
  id: number
  title: ILangContent
  slug: ILangContent
  content: ILangContent
  content2: ILangContent
  image: IFileProperties[]
  image2: IFileProperties[]
  status: boolean
}
export interface IGetBlogs {
  data: IBlog[]
  pagination: IPageParams
}

export interface IFormBlog {
  title: ILangContent
  content: ILangContent
  content2: ILangContent
  image: IFileProperties[]
  image2: IFileProperties[]
}
