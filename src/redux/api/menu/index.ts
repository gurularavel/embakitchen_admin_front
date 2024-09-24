import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../axiosBase'
import { IMenu } from '~ek/types/menu'

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: APIBaseQuery,
  endpoints: builder => ({
    getMenus: builder.query<IMenu[], { lang: string }>({
      query(lang) {
        return {
          url: 'menus',
          method: 'GET',
          params: lang,
        }
      },
    }),
  }),
})

export const { useGetMenusQuery } = menuApi
