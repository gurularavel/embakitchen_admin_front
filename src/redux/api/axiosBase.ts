import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { notification } from 'antd'
import { revertAll } from '~ek/redux/feature/constants'
import { RootState } from '~ek/redux/store'

const baseURL = `${import.meta.env.VITE_BASE_URL}`

const errorNotifier = (message?: string) => {
  notification.error({
    message: 'Error',
    description: message || 'An error occurred',
    placement: 'topRight',
    duration: 2,
  })
}

export interface IAxiosBaseQuery {
  baseUrl?: string
  headers?: (
    headers: { [key: string]: string },
    store: { getState: () => RootState; signal: AbortSignal },
  ) => { [key: string]: string }
}

export interface IBaseQuery {
  url: string
  params?: AxiosRequestConfig['params']
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  responseType?: string
  error?: {
    status: number
    data: unknown
  }
}

interface ErrorResponse {
  message: string
}

export const axiosBaseQuery = ({
  baseUrl = '',
  headers,
}: IAxiosBaseQuery): BaseQueryFn<
  IBaseQuery,
  unknown,
  {
    status?: number
    data?: unknown
    error?: {
      status: number | string
      data: unknown
    }
  }
> => {
  return async (
    { url, params, method, data, responseType },
    { signal, getState },
  ) => {
    try {
      const state = getState() as RootState
      const result = await axios({
        url: baseUrl + url,
        method: method ? method : 'GET',
        ...(params && { params }),
        ...(headers && {
          headers: headers({}, { getState: () => state, signal }),
        }),
        ...(data && { data }),
        responseType: responseType || 'json',
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: { status: err.response?.status, data: err.response?.data },
      }
    }
  }
}

export const APIBaseQueryInterceptor = axiosBaseQuery({
  baseUrl: baseURL,
  headers: (
    headers: { [key: string]: string },
    { getState }: { getState: () => RootState },
  ) => {
    const { auth } = getState()
    if (auth?.token) {
      headers['Authorization'] = `Bearer ${auth.token}`
    }
    return headers
  },
})

export const APIBaseQuery: BaseQueryFn<IBaseQuery, unknown, unknown> = async (
  args,
  api,
  extraOptions,
) => {
  const result = await APIBaseQueryInterceptor(args, api, extraOptions)

  if (result.error) {
    const { status } = result.error

    if (status === 403) {
      errorNotifier('403 FORBIDDEN')
      api.dispatch(revertAll())
    } else {
      const errorData = result.error?.data as ErrorResponse
      errorNotifier(errorData?.message || 'An error occurred')
    }
  }

  return result
}
