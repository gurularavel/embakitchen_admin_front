import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { IGetHomeInfo } from '~ek/types/home/common-info'

export const homeCommonApi = createApi({
  reducerPath: 'common-info',
  baseQuery: APIBaseQuery,
  tagTypes: ['HOME_INFO'],
  endpoints: builder => ({
    getHomeInfo: builder.query<IGetHomeInfo, void>({
      query() {
        return { url: 'home', method: 'GET' }
      },
      providesTags: () => [{ type: 'HOME_INFO' }],
    }),
    postHomeInfo: builder.mutation<void, FormData>({
      query(data) {
        return {
          url: 'home',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'HOME_INFO' }],
    }),
  }),
})

export const { useGetHomeInfoQuery, usePostHomeInfoMutation } = homeCommonApi
