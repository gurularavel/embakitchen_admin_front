import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type { IProduct, ProductApiResponse } from '~ek/types/product'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['PRODUCT'],
  endpoints: builder => ({
    getProducts: builder.query<ProductApiResponse, IRequestParams>({
      query(params) {
        return {
          url: 'products',
          method: 'GET',
          params,
        }
      },
      providesTags: () => [{ type: 'PRODUCT' }],
    }),
    getProductById: builder.query<IProduct, number>({
      query(id) {
        return {
          url: `products/${id}`,
          method: 'GET',
        }
      },
    }),
    editProduct: builder.mutation<void, IPutFormData>({
      query(data) {
        const { id, formData } = data
        return {
          method: 'POST',
          url: `products/${id}`,
          data: formData,
        }
      },
      invalidatesTags: () => [{ type: 'PRODUCT' }],
    }),
    deleteProducts: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'products',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'PRODUCT' }],
    }),
    postProduct: builder.mutation<void, FormData>({
      query(data) {
        return {
          url: 'products',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'PRODUCT' }],
    }),
  }),
})

export const {
  useDeleteProductsMutation,
  useEditProductMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
  usePostProductMutation,
} = productApi
