export interface IAuth {
  user: User
  token: string
}

export interface User {
  id: number
  name: string
  surname: string
  email: string
  phone: string
  status: boolean
  city: {
    id: number
    title: {
      en: string
    }
  }
}

export interface ILogin {
  email: string
  password: string
  role?: string
}
