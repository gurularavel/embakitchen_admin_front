import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type {
  IOrderStatus,
  OrderStatusApiResponse,
} from '~ek/types/order-status'

export const orderStatusApi = createApi({
  reducerPath: 'orderStatusApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['ORDER_STATUS'],
  endpoints: builder => ({
    getOrderStatuses: builder.query<OrderStatusApiResponse, IRequestParams>({
      query(params) {
        return {
          url: 'track-order-statuses',
          method: 'GET',
          params,
        }
      },
      providesTags: () => [{ type: 'ORDER_STATUS' }],
    }),
    postOrderStatus: builder.mutation<void, Pick<IOrderStatus, 'title'>>({
      query(data) {
        return {
          url: 'track-order-statuses',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'ORDER_STATUS' }],
    }),
    editOrderStatus: builder.mutation<void, IOrderStatus>({
      query(data) {
        const { id, ...orderdata } = data
        return {
          method: 'PUT',
          url: `track-order-statuses/${id}`,
          data: orderdata,
        }
      },
      invalidatesTags: () => [{ type: 'ORDER_STATUS' }],
    }),
    deleteOrderStatus: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'track-order-statuses',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'ORDER_STATUS' }],
    }),
  }),
})

export const {
  useGetOrderStatusesQuery,
  useEditOrderStatusMutation,
  useDeleteOrderStatusMutation,
  usePostOrderStatusMutation,
} = orderStatusApi
