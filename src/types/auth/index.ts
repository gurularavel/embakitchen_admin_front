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
  role: 'user' | 'admin' | undefined
}

export interface ILogin {
  email: string
  password: string
  role?: string
}

export interface RefreshTokenResult {
  message: string
  new_token: string
  old_token: string
}
