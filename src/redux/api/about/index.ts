import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { IAbout, IGetInfoBlock } from '~ek/types/about'

export const aboutApi = createApi({
  reducerPath: 'aboutApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['About_Content'],
  endpoints: builder => ({
    getAbout: builder.query<IAbout, void>({
      query() {
        return {
          method: 'GET',
          url: 'about',
        }
      },
      providesTags: () => [{ type: 'About_Content' }],
    }),
    postOrCreateAbout: builder.mutation<void, FormData>({
      query(formData) {
        return {
          method: 'POST',
          url: 'about',
          data: formData,
        }
      },
      invalidatesTags: () => [{ type: 'About_Content' }],
    }),
    getInfoBlocks: builder.query<IGetInfoBlock, void>({
      query(params) {
        return {
          url: 'about-info-blocks',
          method: 'GET',
          params,
        }
      },
    }),
  }),
})

export const {
  useGetAboutQuery,
  usePostOrCreateAboutMutation,
  useGetInfoBlocksQuery,
} = aboutApi
