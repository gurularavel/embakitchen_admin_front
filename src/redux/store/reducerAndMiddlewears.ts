import { menuApi } from '~ek/redux/api/menu'
import { aboutApi } from '~ek/redux/api/about'

export const reducer = {
  [menuApi.reducerPath]: menuApi.reducer,
  [aboutApi.reducerPath]: aboutApi.reducer,
}
export const middlewares = [menuApi.middleware, aboutApi.middleware]
