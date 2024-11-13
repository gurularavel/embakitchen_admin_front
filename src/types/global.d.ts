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
    total: number
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

  interface IFile {
    file: File[] | null
    fileList: UploadFile[]
  }

  type IFileType = 'image' | 'video'

  interface IFileProperties {
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

  interface IPutFormData {
    id: number
    formData: FormData
  }

  interface IRequestParams {
    page?: number
  }

  interface IError {
    data: {
      exception: string
      line: number
      message: string
      file: string
      terrace: []
    }
    status: number
  }
}

export {}
