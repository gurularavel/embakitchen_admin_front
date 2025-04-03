import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type { IOrder, OrderApiResponse, IAddOrderStatus } from '~ek/types/order'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['ORDER'],
  endpoints: builder => ({
    getOrders: builder.query<OrderApiResponse, IRequestParams>({
      query(params) {
        return {
          url: 'track-orders',
          method: 'GET',
          params,
        }
      },
      providesTags: () => [{ type: 'ORDER' }],
    }),
    getOrderById: builder.query<IOrder, number>({
      query(id) {
        return {
          url: `track-orders/${id}`,
          method: 'GET',
        }
      },
    }),
    addOrderStatus: builder.mutation<void, IAddOrderStatus>({
      query(data) {
        return {
          method: 'POST',
          url: 'track-orders',
          data: { ...data, date: data.date || '2024-12-04 06:28:13' },
        }
      },
      invalidatesTags: () => [{ type: 'ORDER' }],
    }),
    deleteOrder: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'track-orders',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'ORDER' }],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useAddOrderStatusMutation,
} = orderApi
