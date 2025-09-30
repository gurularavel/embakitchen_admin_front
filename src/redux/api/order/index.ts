import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type {
  IOrder,
  OrderApiResponse,
  IEditOrderStatus,
} from '~ek/types/order'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['TRACK_ORDER'],
  endpoints: builder => ({
    getOrders: builder.query<OrderApiResponse, IRequestParams>({
      query(params) {
        return {
          url: 'orders',
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
    editOrderStatus: builder.mutation<void, IEditOrderStatus>({
      query(data) {
        const { order_id, ...editData } = data
        return {
          method: 'PUT',
          url: `orders/${order_id}`,
          data: editData,
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
  useEditOrderStatusMutation,
} = orderApi
