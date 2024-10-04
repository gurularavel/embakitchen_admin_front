export interface IAuth {
  admin: Admin
  token: string
}

export interface Admin {
  id: number
  name: string
  surname: string
  email: string
  created_at: string
  updated_at: string
}

export interface ILogin {
  email: string
  password: string
}
