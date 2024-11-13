import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { setUser } from '~ek/redux/feature/auth'
import { revertAll } from '~ek/redux/feature/constants'

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
        } catch {
          return
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query() {
        return {
          url: 'logout',
          method: 'POST',
        }
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          dispatch(revertAll())
        } catch {
          return
        }
      },
    }),
  }),
})

export const { useGetTokenMutation, useLogoutMutation } = authApi
