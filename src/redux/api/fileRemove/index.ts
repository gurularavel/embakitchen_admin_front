import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'

interface IRemoveFile {
  mediaIDS: string[]
}

export const fileRemoveApi = createApi({
  reducerPath: 'fileRemove',
  baseQuery: APIBaseQuery,
  endpoints: builder => ({
    fileRemove: builder.mutation<void, IRemoveFile>({
      query(data) {
        return {
          url: 'delete-media',
          method: 'DELETE',
          data,
        }
      },
    }),
  }),
})

export const { useFileRemoveMutation } = fileRemoveApi
