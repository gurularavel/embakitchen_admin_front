import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type { IBlog, IBlogPage, IGetBlogs } from '~ek/types/blog'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['BLOG', 'BLOGPAGE'],
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
    getBlogById: builder.query<IBlog, number>({
      query(id: number) {
        return { method: 'GET', url: `posts/${id}` }
      },
      transformResponse: (response: [IBlog]) => response[0],
      providesTags: () => [{ type: 'BLOG' }],
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
    getBlogPage: builder.query<IBlogPage, void>({
      query() {
        return {
          url: 'blog-page',
          method: 'GET',
        }
      },
      providesTags: () => [{ type: 'BLOGPAGE' }],
    }),
    editBlogPage: builder.mutation<void, FormData>({
      query(data) {
        return {
          url: 'blog-page',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'BLOGPAGE' }],
    }),
  }),
})

export const {
  useGetBlogsQuery,
  useDeleteBlogsMutation,
  useGetBlogByIdQuery,
  useEditBlogMutation,
  usePostBlogMutation,
  useGetBlogPageQuery,
  useEditBlogPageMutation,
} = blogApi
