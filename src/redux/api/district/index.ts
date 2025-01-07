import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { DistrictApiResponse, IDistrict } from '~ek/types/district'

export const districtApi = createApi({
  reducerPath: 'districtApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['DISTRICT'],
  endpoints: builder => ({
    getDistricts: builder.query<DistrictApiResponse, IRequestParams>({
      query(params) {
        return {
          method: 'GET',
          url: 'districts',
          params,
        }
      },
      providesTags: () => [{ type: 'DISTRICT' }],
    }),
    postDistrict: builder.mutation({
      query(data) {
        return {
          method: 'POST',
          url: 'districts',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'DISTRICT' }],
    }),
    deleteDistricts: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'districts',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'DISTRICT' }],
    }),
    editDistrict: builder.mutation<
      void,
      Pick<IDistrict, 'id' | 'status' | 'title'>
    >({
      query(data) {
        const { id, ...editData } = data
        return {
          url: `districts/${id}`,
          method: 'PUT',
          data: editData,
        }
      },
      invalidatesTags: () => [{ type: 'DISTRICT' }],
    }),
  }),
})

export const {
  useDeleteDistrictsMutation,
  useEditDistrictMutation,
  useGetDistrictsQuery,
  usePostDistrictMutation,
} = districtApi
