import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../../axiosBase'
import { IDistrict } from '~ek/types/region'

export const districtApi = createApi({
  reducerPath: 'districtApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['DISTRICT'],
  endpoints: builder => ({
    getDistricts: builder.query({
      query() {
        return {
          method: 'GET',
          url: 'districts',
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
    editDistrict: builder.mutation<void, IDistrict>({
      query(data) {
        const { id, ...editData } = data
        return {
          url: `districts/${id}`,
          method: 'PUT',
          data: editData,
        }
      },
    }),
  }),
})

export const {
  useGetDistrictsQuery,
  useEditDistrictMutation,
  useDeleteDistrictsMutation,
  usePostDistrictMutation,
} = districtApi
