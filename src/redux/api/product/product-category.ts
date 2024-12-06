import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { CategoryApiResponse, ICategory } from '~ek/types/product'

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['CATEGORY'],
  endpoints: builder => ({
    getCategories: builder.query<CategoryApiResponse, IRequestParams>({
      query(params) {
        return {
          method: 'GET',
          url: 'product-categories',
          params,
        }
      },
      providesTags: () => [{ type: 'CATEGORY' }],
    }),
    postCategory: builder.mutation<void, Pick<ICategory, 'title'>>({
      query(data) {
        return {
          method: 'POST',
          url: 'product-categories',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'CATEGORY' }],
    }),
    deleteCategories: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'product-categories',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'CATEGORY' }],
    }),
    editCategory: builder.mutation<void, ICategory>({
      query(data) {
        const { id, ...editData } = data
        return {
          url: `product-categories/${id}`,
          method: 'PUT',
          data: editData,
        }
      },
      invalidatesTags: () => [{ type: 'CATEGORY' }],
    }),
  }),
})

export const {
  useDeleteCategoriesMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
  usePostCategoryMutation,
} = categoryApi
