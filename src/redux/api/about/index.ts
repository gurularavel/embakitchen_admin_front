import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import {
  IAbout,
  IGetInfoBlock,
  IDeleteBlock,
  IPostBlock,
} from '~ek/types/about'

export const aboutApi = createApi({
  reducerPath: 'aboutApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['ABOUT_CONTENT', 'ABOUT_INFO_BLOCKS'],
  endpoints: builder => ({
    getAbout: builder.query<IAbout, void>({
      query() {
        return {
          method: 'GET',
          url: 'about',
        }
      },
      providesTags: () => [{ type: 'ABOUT_CONTENT' }],
    }),
    postOrCreateAbout: builder.mutation<void, FormData>({
      query(formData) {
        return {
          method: 'POST',
          url: 'about',
          data: formData,
        }
      },
      invalidatesTags: () => [{ type: 'ABOUT_CONTENT' }],
    }),
    getInfoBlocks: builder.query<IGetInfoBlock, void>({
      query(params) {
        return {
          url: 'about-info-blocks',
          method: 'GET',
          params,
        }
      },
      providesTags: () => [{ type: 'ABOUT_INFO_BLOCKS' }],
    }),
    deleteInfoBlocks: builder.mutation<void, IDeleteBlock>({
      query(data) {
        return {
          method: 'DELETE',
          url: 'about-info-blocks',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'ABOUT_INFO_BLOCKS' }],
    }),
    postInfoBlock: builder.mutation<void, IPostBlock>({
      query(data) {
        return {
          method: 'POST',
          url: 'about-info-blocks',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'ABOUT_INFO_BLOCKS' }],
    }),
  }),
})

export const {
  useGetAboutQuery,
  usePostOrCreateAboutMutation,
  useGetInfoBlocksQuery,
  useDeleteInfoBlocksMutation,
  usePostInfoBlockMutation,
} = aboutApi
