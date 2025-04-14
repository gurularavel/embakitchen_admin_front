import { IColor } from '~ek/types/colors'
import { ITag } from '~ek/types/tags'

export interface ICategory {
  title: ILangContent
  id: number
  status: boolean
  bannerImage: IFileProperties[]
}

export type CategoryApiResponse = ApiResponse<ICategory[]>

export interface IProduct {
  id: number
  title: ILangContent
  slug: ILangContent
  content: ILangContent
  style: ILangContent
  material: ILangContent
  facade: ILangContent
  decor: ILangContent
  design: ILangContent
  status: boolean
  images: IFileProperties[]
  bannerImage: IFileProperties[]
  mainImage: IFileProperties[]
  category: {
    id: number
    title: ILangContent
  }
  colors: IColor[]
  tags: ITag[]
  similar_products: IProduct[]
  comments: []
}

export type IFormProduct = Omit<
  IProduct,
  | 'slug'
  | 'status'
  | 'id'
  | 'category'
  | 'colors'
  | 'tags'
  | 'similar_products'
  | 'comments'
> & {
  product_category_id: number
  color_ids: number[]
  tag_ids: number[]
  similar_product_ids: number[]
}

export type ProductApiResponse = ApiResponse<IProduct[]>
