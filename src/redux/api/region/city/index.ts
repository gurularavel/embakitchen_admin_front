import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '../../axiosBase'
import { CityApiResponse, ICity } from '~ek/types/region'

export const cityApi = createApi({
  reducerPath: 'cityApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['CITY'],
  endpoints: builder => ({
    getCities: builder.query<CityApiResponse, IRequestParams>({
      query(params) {
        return {
          method: 'GET',
          url: 'cities',
          params,
        }
      },
      providesTags: () => [{ type: 'CITY' }],
    }),
    postCity: builder.mutation({
      query(data) {
        return {
          method: 'POST',
          url: 'cities',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'CITY' }],
    }),
    deleteCities: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'cities',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'CITY' }],
    }),
    editCity: builder.mutation<void, Pick<ICity, 'id' | 'status' | 'title'>>({
      query(data) {
        const { id, ...editData } = data
        return {
          url: `cities/${id}`,
          method: 'PUT',
          data: editData,
        }
      },
    }),
  }),
})

export const {
  useGetCitiesQuery,
  usePostCityMutation,
  useDeleteCitiesMutation,
  useEditCityMutation,
} = cityApi
