import axiosClient from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { env } from '../env';

export type RequestConfig<T = unknown> = {
  baseURL?: string;
  url?: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  params?: unknown;
  data?: T;
  responseType?:
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream';
  signal?: AbortSignal;
  headers?: AxiosRequestConfig['headers'];
  validateStatus?: (status: number) => boolean;
};

export type ResponseConfig<T = unknown> = {
  data: T;
  status: number;
  statusText: string;
  headers?: AxiosResponse['headers'];
};

export type ResponseErrorConfig<T = unknown> = T;

export const api = axiosClient.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  validateStatus: (status) => status < 500,
});

export const client = async <TData, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  const promise = api
    .request<TVariables, ResponseConfig<TData>>(config)
    .catch((e: AxiosError<TError>) => {
      throw e;
    });

  return promise;
};

export default client;
