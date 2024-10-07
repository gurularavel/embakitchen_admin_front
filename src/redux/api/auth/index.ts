import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { setUser } from '~ek/redux/feature/auth'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: APIBaseQuery,
  endpoints: builder => ({
    getToken: builder.mutation({
      query(data) {
        return {
          method: 'POST',
          url: 'login',
          data,
        }
      },
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (e) {
          alert(e)
        }
      },
    }),
  }),
})

export const { useGetTokenMutation } = authApi
