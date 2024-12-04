import { createApi } from '@reduxjs/toolkit/query/react'
import { APIBaseQuery } from '~ek/redux/api/axiosBase'
import { ProjectApiResponse, type IProjectPage } from '~ek/types/project'

export const projectApi = createApi({
  reducerPath: 'projectApi',
  baseQuery: APIBaseQuery,
  tagTypes: ['PROJECT', 'PROJECTPAGE'],
  endpoints: builder => ({
    getProjects: builder.query<ProjectApiResponse, IRequestParams>({
      query(params) {
        return {
          url: 'projects',
          method: 'GET',
          params,
        }
      },
      providesTags: () => [{ type: 'PROJECT' }],
    }),
    deleteProjects: builder.mutation<void, IDelete>({
      query(data) {
        return {
          url: 'projects',
          method: 'DELETE',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'PROJECT' }],
    }),
    getProjectPage: builder.query<IProjectPage, void>({
      query() {
        return {
          url: 'projects-page',
          method: 'GET',
        }
      },
      providesTags: () => [{ type: 'PROJECTPAGE' }],
    }),
    editProjectPage: builder.mutation<void, FormData>({
      query(data) {
        return {
          url: 'projects-page',
          method: 'POST',
          data,
        }
      },
      invalidatesTags: () => [{ type: 'PROJECTPAGE' }],
    }),
  }),
})

export const {
  useEditProjectPageMutation,
  useGetProjectPageQuery,
  useGetProjectsQuery,
  useDeleteProjectsMutation,
} = projectApi
