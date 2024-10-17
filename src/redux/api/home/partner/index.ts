import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { IPutPartner } from '~ek/types/home/partners'

export const partnerApi = createApi({
  reducerPath: 'partnerApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['PARTNER'],
  endpoints: builder => ({
    getPartners: builder.query({
      query(params) {
        return { url: 'partners', method: 'GET', params }
      },
      providesTags: () => [{ type: 'PARTNER' }],
    }),
    deletePartner: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'partners',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'PARTNER' }],
    }),
    postPartner: builder.mutation<void, FormData>({
      query(data) {
        return {
          url: 'partners',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'PARTNER' }],
    }),
    editPartner: builder.mutation<void, IPutPartner>({
      query(data) {
        const { id, formData } = data
        return {
          method: 'POST',
          url: `partners/${id}`,
          data: formData,
        }
      },
      invalidatesTags: () => [{ type: 'PARTNER' }],
    }),
  }),
})

export const {
  useGetPartnersQuery,
  useDeletePartnerMutation,
  usePostPartnerMutation,
  useEditPartnerMutation,
} = partnerApi
