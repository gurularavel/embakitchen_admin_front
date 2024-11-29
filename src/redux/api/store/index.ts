import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { IStores, IStore } from '~ek/types/store'

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['STORE'],
  endpoints: builder => ({
    getStores: builder.query<IStores, IRequestParams>({
      query(params) {
        return {
          url: 'stores',
          method: 'GET',
          params,
        }
      },
      providesTags: () => [{ type: 'STORE' }],
    }),
    deleteStore: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'stores',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'STORE' }],
    }),
    postStore: builder.mutation<void, Omit<IStore, 'id' | 'slug'>>({
      query(data) {
        return {
          url: 'stores',
          method: 'POST',
          data,
        }
      },
    }),
  }),
})

export const {
  useGetStoresQuery,
  useDeleteStoreMutation,
  usePostStoreMutation,
} = storeApi
