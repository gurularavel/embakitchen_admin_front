export interface IMenu {
  id: number
  external_link: string
  internal_link: string
  parent_id: number | null
  sub: number
  created_at: string
  updated_at: string
  title: string
  translations: ITranslation[]
}

interface ITranslation {
  id: number
  menu_id: number
  locale: string
  title: string
}
