import axiosClient from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { env } from '../env';

export type RequestConfig<T = unknown> = {
  baseURL?: string;
  url?: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
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

export type ResponseConfig<TData = unknown> = {
  data: TData;
  status: number;
  statusText: string;
  headers?: AxiosResponse['headers'];
};

export type ResponseErrorConfig<TError = unknown> = TError;

export type Client = <TData, _TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables>
) => Promise<ResponseConfig<TData>>;

export const api = axiosClient.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  validateStatus: (status) => status < 500,
});

api.interceptors.request.use(async (config) => {
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    if (allCookies.length > 0) {
      config.headers.set(
        'Cookie',
        allCookies.map((c) => `${c.name}=${c.value}`).join('; ')
      );

      const xsrfCookie = allCookies.find((c) => c.name === 'XSRF-TOKEN');
      if (xsrfCookie) {
        config.headers.set(
          'X-XSRF-TOKEN',
          decodeURIComponent(xsrfCookie.value)
        );
      }
    }
  }

  return config;
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
