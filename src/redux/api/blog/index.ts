import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type { IGetBlogs } from '~ek/types/blog'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['BLOG'],
  endpoints: builder => ({
    getBlogs: builder.query<IGetBlogs, IRequestParams>({
      query(params) {
        return { url: 'posts', method: 'GET', params }
      },
      providesTags: () => [{ type: 'BLOG' }],
    }),
    deleteBlogs: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'posts',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'BLOG' }],
    }),
    postBlog: builder.mutation<void, FormData>({
      query(data) {
        return {
          url: 'posts',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'BLOG' }],
    }),
    editBlog: builder.mutation<void, IPutFormData>({
      query(data) {
        const { id, formData } = data
        return {
          method: 'POST',
          url: `posts/${id}`,
          data: formData,
        }
      },
      invalidatesTags: () => [{ type: 'BLOG' }],
    }),
  }),
})

export const {
  useGetBlogsQuery,
  useDeleteBlogsMutation,
  useEditBlogMutation,
  usePostBlogMutation,
} = blogApi
