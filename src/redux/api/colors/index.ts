import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type { IGetColors } from '~ek/types/colors'

export const colorsApi = createApi({
  reducerPath: 'colorsApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['COLOR'],
  endpoints: builder => ({
    getColors: builder.query<IGetColors, IRequestParams>({
      query(params) {
        return { url: 'colors', method: 'GET', params }
      },
      providesTags: () => [{ type: 'COLOR' }],
    }),
    deleteColors: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'colors',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'COLOR' }],
    }),
    postColor: builder.mutation<void, FormData>({
      query(data) {
        return {
          url: 'colors',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'COLOR' }],
    }),
    editColor: builder.mutation<void, IPutFormData>({
      query(data) {
        const { id, formData } = data
        return {
          method: 'POST',
          url: `colors/${id}`,
          data: formData,
        }
      },
      invalidatesTags: () => [{ type: 'COLOR' }],
    }),
  }),
})

export const {
  useGetColorsQuery,
  useDeleteColorsMutation,
  usePostColorMutation,
  useEditColorMutation,
} = colorsApi
