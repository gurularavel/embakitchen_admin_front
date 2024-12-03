import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { ITag, TagsApiResponse } from '~ek/types/tags'

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['TAG'],
  endpoints: builder => ({
    getTags: builder.query<TagsApiResponse, IRequestParams>({
      query() {
        return {
          method: 'GET',
          url: 'tags',
        }
      },
      providesTags: () => [{ type: 'TAG' }],
    }),
    postTag: builder.mutation<void, Pick<ITag, 'title'>>({
      query(data) {
        return {
          method: 'POST',
          url: 'tags',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'TAG' }],
    }),
    deleteTags: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'tags',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'TAG' }],
    }),
    editTag: builder.mutation<void, Pick<ITag, 'id' | 'status' | 'title'>>({
      query(data) {
        const { id, ...editData } = data
        return {
          url: `tags/${id}`,
          method: 'PUT',
          data: editData,
        }
      },
      invalidatesTags: () => [{ type: 'TAG' }],
    }),
  }),
})

export const {
  useGetTagsQuery,
  useDeleteTagsMutation,
  useEditTagMutation,
  usePostTagMutation,
} = tagApi
