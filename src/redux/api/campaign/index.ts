import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type { IGetCampaigns, ICampaignPage } from '~ek/types/campaigns'

export const campaignApi = createApi({
  reducerPath: 'campaignApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['CAMPAIGN', 'CAMPAIGNPAGE'],
  endpoints: builder => ({
    getCampaigns: builder.query<IGetCampaigns, IRequestParams>({
      query(params) {
        return { url: 'campaigns', method: 'GET', params }
      },
      providesTags: () => [{ type: 'CAMPAIGN' }],
    }),
    deleteCampaigns: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'campaigns',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'CAMPAIGN' }],
    }),
    postCampaign: builder.mutation<void, FormData>({
      query(data) {
        return {
          url: 'campaigns',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'CAMPAIGN' }],
    }),
    editCampaign: builder.mutation<void, IPutFormData>({
      query(data) {
        const { id, formData } = data
        return {
          method: 'POST',
          url: `campaigns/${id}`,
          data: formData,
        }
      },
      invalidatesTags: () => [{ type: 'CAMPAIGN' }],
    }),
    getCampaignPage: builder.query<ICampaignPage, void>({
      query() {
        return {
          url: 'campaigns-page',
          method: 'GET',
        }
      },
      providesTags: () => [{ type: 'CAMPAIGNPAGE' }],
    }),
    editCampaignPage: builder.mutation<void, FormData>({
      query(data) {
        return {
          url: 'campaigns-page',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'CAMPAIGNPAGE' }],
    }),
  }),
})

export const {
  useGetCampaignsQuery,
  useDeleteCampaignsMutation,
  useEditCampaignMutation,
  usePostCampaignMutation,
  useGetCampaignPageQuery,
  useEditCampaignPageMutation,
} = campaignApi
