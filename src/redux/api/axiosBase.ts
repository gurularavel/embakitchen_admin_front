import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { v4 as uuid } from 'uuid'
import { revertAll } from '~ek/redux/feature/constants'

const baseURL = `${import.meta.env.VITE_BASE_URL}`

const errorNotifier = (message?: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  })
}

export interface IAxiosBaseQuery {
  baseUrl?: string
  headers?: (
    headers: { [key: string]: string },
    store: { getState: unknown; signal: unknown },
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
      const result = await axios({
        url: baseUrl + url,
        method: method ? method : 'GET',
        ...(params && { params }),
        ...(headers && { headers: headers({}, { getState, signal }) }),
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
  headers: headers => {
    headers['x-requestid'] = uuid()
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
