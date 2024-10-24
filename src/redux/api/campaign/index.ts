import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import type { IGetCampaigns } from '~ek/types/campaigns'

export const campaignApi = createApi({
  reducerPath: 'campaignApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['CAMPAIGN'],
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
  }),
})

export const {
  useGetCampaignsQuery,
  useDeleteCampaignsMutation,
  useEditCampaignMutation,
  usePostCampaignMutation,
} = campaignApi
