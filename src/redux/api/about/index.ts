import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'

export const AboutApi = createApi({
  reducerPath: 'aboutApi',
  baseQuery: APIBaseQuery,
  endpoints: builder => ({
    getAbout: builder.query({
      query() {
        return { method: 'GET', url: 'about' }
      },
    }),
    postOrCreateAbout: builder.mutation({
      query(formData) {
        return {
          method: 'POST',
          url: 'about',
          data: formData,
        }
      },
    }),
  }),
})
