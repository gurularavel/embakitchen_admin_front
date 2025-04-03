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
import { cityApi } from '~ek/redux/api/city'
import { districtApi } from '~ek/redux/api/district'
import { tagApi } from '~ek/redux/api/tags'
import { storeApi } from '~ek/redux/api/store'
import { projectApi } from '~ek/redux/api/project'
import { categoryApi } from '~ek/redux/api/product/product-category'
import { productApi } from '~ek/redux/api/product/products'
import { searchApi } from '~ek/redux/api/search'
import { orderApi } from '~ek/redux/api/order'
import { orderStatusApi } from '~ek/redux/api/order-status'

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
  [cityApi.reducerPath]: cityApi.reducer,
  [districtApi.reducerPath]: districtApi.reducer,
  [tagApi.reducerPath]: tagApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [orderStatusApi.reducerPath]: orderStatusApi.reducer,
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
  cityApi.middleware,
  districtApi.middleware,
  tagApi.middleware,
  storeApi.middleware,
  projectApi.middleware,
  categoryApi.middleware,
  productApi.middleware,
  searchApi.middleware,
  orderApi.middleware,
  orderStatusApi.middleware,
]
