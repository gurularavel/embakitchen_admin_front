import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type { IOrder, OrderApiResponse, IAddOrderStatus } from '~ek/types/order'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['TRACK_ORDER'],
  endpoints: builder => ({
    getOrders: builder.query<OrderApiResponse, IRequestParams>({
      query(params) {
        return {
          url: 'track-orders',
          method: 'GET',
          params,
        }
      },
      providesTags: () => [{ type: 'TRACK_ORDER' }],
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
          data: data,
        }
      },
      invalidatesTags: () => [{ type: 'TRACK_ORDER' }],
    }),
    deleteOrder: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'orders',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'TRACK_ORDER' }],
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
  useAddOrderStatusMutation,
} = orderApi
