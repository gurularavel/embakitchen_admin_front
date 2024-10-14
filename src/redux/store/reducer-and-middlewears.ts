import AuthReducer from '~ek/redux/feature/auth'

import { authApi } from '~ek/redux/api/auth'
import { menuApi } from '~ek/redux/api/menu'
import { aboutApi } from '~ek/redux/api/about'
import { fileRemoveApi } from '~ek/redux/api/fileRemove'
import { counterApi } from '~ek/redux/api/home/counter'

export const reducer = {
  auth: AuthReducer,
  [counterApi.reducerPath]: counterApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  [aboutApi.reducerPath]: aboutApi.reducer,
  [fileRemoveApi.reducerPath]: fileRemoveApi.reducer,
}
export const middlewares = [
  authApi.middleware,
  menuApi.middleware,
  aboutApi.middleware,
  fileRemoveApi.middleware,
  counterApi.middleware,
]
