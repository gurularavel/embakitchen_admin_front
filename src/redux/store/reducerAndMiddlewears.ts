import { menuApi } from '~ek/redux/api/menu'

export const reducer = {
  [menuApi.reducerPath]: menuApi.reducer,
}
export const middlewares = [menuApi.middleware]
