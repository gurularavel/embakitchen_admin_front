import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type { IStore, StoreApiResponse } from '~ek/types/store'

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['STORE'],
  endpoints: builder => ({
    getStores: builder.query<StoreApiResponse, IRequestParams>({
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
      invalidatesTags: () => [{ type: 'STORE' }],
    }),
    editStore: builder.mutation<void, IStore>({
      query(data) {
        const { id, ...editData } = data
        return {
          url: `stores/${id}`,
          method: 'PUT',
          data: editData,
        }
      },
      invalidatesTags: () => [{ type: 'STORE' }],
    }),
  }),
})

export const {
  useGetStoresQuery,
  useDeleteStoreMutation,
  usePostStoreMutation,
  useEditStoreMutation,
} = storeApi
