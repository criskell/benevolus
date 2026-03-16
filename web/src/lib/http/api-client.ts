import axiosClient from 'axios';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

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

const isServer = () => typeof window === 'undefined';

export const api = axiosClient.create({
  baseURL: isServer() ? env.NEXT_PUBLIC_API_URL : '',
  withCredentials: true,
});

const forwardServerCookies = async (config: InternalAxiosRequestConfig) => {
  if (!isServer()) {
    return;
  }

  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const requestCookies = cookieStore.getAll();

  config.headers.set('Origin', env.NEXT_PUBLIC_APP_URL);

  if (requestCookies.length === 0) {
    return;
  }

  const serializedCookies = requestCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  config.headers.set('Cookie', serializedCookies);

  const xsrfCookie = requestCookies.find(
    (cookie) => cookie.name === 'XSRF-TOKEN'
  );

  if (!xsrfCookie) {
    return;
  }

  config.headers.set('X-XSRF-TOKEN', decodeURIComponent(xsrfCookie.value));
};

api.interceptors.request.use(async (config) => {
  await forwardServerCookies(config);

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
