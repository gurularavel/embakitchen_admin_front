import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { IGetSliders } from '~ek/types/home/slider'

export const sliderApi = createApi({
  reducerPath: 'sliderApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['SLIDER'],
  endpoints: builder => ({
    getSliders: builder.query<IGetSliders, IRequestParams>({
      query(params) {
        return { url: 'sliders', method: 'GET', params }
      },
      providesTags: () => [{ type: 'SLIDER' }],
    }),
    deleteSlider: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'sliders',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'SLIDER' }],
    }),
    postSlider: builder.mutation<void, FormData>({
      query(data) {
        return {
          method: 'POST',
          url: 'sliders',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'SLIDER' }],
    }),
    editSlider: builder.mutation<void, IPutFormData>({
      query(data) {
        const { id, formData } = data
        return {
          method: 'POST',
          url: `sliders/${id}`,
          data: formData,
        }
      },
      invalidatesTags: () => [{ type: 'SLIDER' }],
    }),
  }),
})

export const {
  useGetSlidersQuery,
  useDeleteSliderMutation,
  usePostSliderMutation,
  useEditSliderMutation,
} = sliderApi
