export interface IBlog {
  id: number
  title: ILangContent
  slug: ILangContent
  description: ILangContent
  content: ILangContent
  image: IFileProperties[]
  status: boolean
  similar_posts: Omit<IBlog, 'similar_posts' | 'content'>[]
}

export interface IGetBlogs {
  data: Omit<IBlog, 'similar_posts'>[]
  pagination: IPageParams
}

export interface IFormBlog {
  image: IFileProperties[]
  title: ILangContent
  description: ILangContent
  similar_post_ids: number[]
  content: ILangContent
}

export interface IBlogPage {
  id: number
  title: ILangContent
  image: IFileProperties[]
  similar_article_title: ILangContent
}
