import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { IAbout, IGetInfoBlock, IPostBlock, IPutBlock } from '~ek/types/about'

export const aboutApi = createApi({
  reducerPath: 'aboutApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['ABOUT_CONTENT', 'ABOUT_INFO_BLOCKS'],
  endpoints: builder => ({
    getAbout: builder.query<IAbout, void>({
      query() {
        return {
          method: 'GET',
          url: 'about-page',
        }
      },
      providesTags: () => [{ type: 'ABOUT_CONTENT' }],
    }),
    postOrCreateAbout: builder.mutation<void, FormData>({
      query(formData) {
        return {
          method: 'POST',
          url: 'about-page',
          data: formData,
        }
      },
      invalidatesTags: () => [{ type: 'ABOUT_CONTENT' }],
    }),
    getInfoBlocks: builder.query<IGetInfoBlock, IRequestParams>({
      query(params) {
        return {
          url: 'about-info-blocks',
          method: 'GET',
          params,
        }
      },
      providesTags: () => [{ type: 'ABOUT_INFO_BLOCKS' }],
    }),
    deleteInfoBlocks: builder.mutation<void, IDelete>({
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
    editInfoBlock: builder.mutation<void, IPutBlock>({
      query(data) {
        const { id, ...putData } = data
        return {
          method: 'PUT',
          url: `about-info-blocks/${id}`,
          data: putData,
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
  useEditInfoBlockMutation,
} = aboutApi
