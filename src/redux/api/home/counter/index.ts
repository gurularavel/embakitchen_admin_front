import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { ICounter, IPostCounter } from '~ek/types/home/counter'

export const counterApi = createApi({
  reducerPath: 'counterApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['COUNTER'],
  endpoints: builder => ({
    getCounts: builder.query({
      query(params) {
        return { url: 'counters', method: 'GET', params }
      },
      providesTags: () => [{ type: 'COUNTER' }],
    }),
    deleteCounter: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'counters',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'COUNTER' }],
    }),
    postCounter: builder.mutation<void, IPostCounter>({
      query(data) {
        return {
          url: 'counters',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'COUNTER' }],
    }),
    editCounter: builder.mutation<void, ICounter>({
      query(data) {
        const { id, ...putData } = data
        return {
          method: 'PUT',
          url: `counters/${id}`,
          data: putData,
        }
      },
      invalidatesTags: () => [{ type: 'COUNTER' }],
    }),
  }),
})

export const {
  useGetCountsQuery,
  useDeleteCounterMutation,
  usePostCounterMutation,
  useEditCounterMutation,
} = counterApi
