import AuthReducer from '~ek/redux/feature/auth'

import { authApi } from '~ek/redux/api/auth'
import { menuApi } from '~ek/redux/api/menu'
import { aboutApi } from '~ek/redux/api/about'
import { fileRemoveApi } from '~ek/redux/api/fileRemove'
import { counterApi } from '~ek/redux/api/home/counter'
import { partnerApi } from '~ek/redux/api/home/partner'
import { sliderApi } from '~ek/redux/api/home/slider'
import { homeCommonApi } from '~ek/redux/api/home/common-info'
import { campaignApi } from '~ek/redux/api/campaign'
import { colorsApi } from '~ek/redux/api/colors'
import { blogApi } from '~ek/redux/api/blog'

export const reducer = {
  auth: AuthReducer,
  [authApi.reducerPath]: authApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  [aboutApi.reducerPath]: aboutApi.reducer,
  [fileRemoveApi.reducerPath]: fileRemoveApi.reducer,
  [counterApi.reducerPath]: counterApi.reducer,
  [partnerApi.reducerPath]: partnerApi.reducer,
  [sliderApi.reducerPath]: sliderApi.reducer,
  [homeCommonApi.reducerPath]: homeCommonApi.reducer,
  [campaignApi.reducerPath]: campaignApi.reducer,
  [colorsApi.reducerPath]: colorsApi.reducer,
  [blogApi.reducerPath]: blogApi.reducer,
}
export const middlewares = [
  authApi.middleware,
  menuApi.middleware,
  aboutApi.middleware,
  fileRemoveApi.middleware,
  counterApi.middleware,
  partnerApi.middleware,
  sliderApi.middleware,
  homeCommonApi.middleware,
  campaignApi.middleware,
  colorsApi.middleware,
  blogApi.middleware,
]
