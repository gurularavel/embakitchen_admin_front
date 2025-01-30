import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type { ISearchPage } from '~ek/types/search'

export const searchApi = createApi({
  reducerPath: 'searchApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['SEARCHPAGE'],
  endpoints: builder => ({
    getSearchPage: builder.query<ISearchPage, void>({
      query() {
        return {
          url: 'search-page',
          method: 'GET',
        }
      },
      providesTags: () => [{ type: 'SEARCHPAGE' }],
    }),
    editSearchPage: builder.mutation<void, FormData>({
      query(data) {
        return {
          url: 'search-page',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'SEARCHPAGE' }],
    }),
  }),
})

export const { useGetSearchPageQuery, useEditSearchPageMutation } = searchApi
