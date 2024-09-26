import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'

interface IFileProperties {
  [key: string]: {
    name: string
    file_name: string
    uuid: string
    preview_url: string
    original_url: string
    order: number
    custom_properties: []
    extension: string
    size: number
  }
}

interface IAbout {
  id: number
  title: ILangContent
  content: ILangContent
  video: IFileProperties
  image: IFileProperties
}

export const aboutApi = createApi({
  reducerPath: 'aboutApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['About_Content'],
  endpoints: builder => ({
    getAbout: builder.query<IAbout, void>({
      query() {
        return {
          method: 'GET',
          url: 'about',
        }
      },
      providesTags: () => [{ type: 'About_Content' }],
    }),
    postOrCreateAbout: builder.mutation<void, FormData>({
      query(formData) {
        return {
          method: 'POST',
          url: 'about',
          data: formData,
        }
      },
      invalidatesTags: () => [{ type: 'About_Content' }],
    }),
  }),
})

export const { useGetAboutQuery, usePostOrCreateAboutMutation } = aboutApi
