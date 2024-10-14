declare global {
  interface TailwindStyle {
    [key: string]: string
  }

  interface ILangContent {
    en: string
    az: string
    ru: string
  }

  interface IPagination {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }

  interface IPageParams {
    take: number
    current: number
    pageSize: number
  }

  interface IDelete {
    ids: React.Key[]
  }

  interface IError {
    timestamp?: string
    status: number
    error: string
    message: string
    errors?: string[]
  }
}

export {}
