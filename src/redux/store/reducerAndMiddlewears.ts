import { menuApi } from '~ek/redux/api/menu'
import { aboutApi } from '~ek/redux/api/about'
import { fileRemoveApi } from '~ek/redux/api/fileRemove'

export const reducer = {
  [menuApi.reducerPath]: menuApi.reducer,
  [aboutApi.reducerPath]: aboutApi.reducer,
  [fileRemoveApi.reducerPath]: fileRemoveApi.reducer,
}
export const middlewares = [
  menuApi.middleware,
  aboutApi.middleware,
  fileRemoveApi.middleware,
]
