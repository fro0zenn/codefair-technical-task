import { AxiosAdapter, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export type HttpRequest = AxiosRequestConfig;

export type HttpResponse<TResponse> = Promise<AxiosResponse<TResponse>>;

export interface HttpClientConfig {
  baseUrl?: string;
  adapter?: AxiosAdapter;
}

export interface HttpClientInterface {
  get<TResponse>(url: string, config?: HttpRequest): HttpResponse<TResponse>;

  post<TBodyParams>(url: string, bodyParams?: TBodyParams, config?: HttpRequest): HttpResponse<void>;

  upload<TResponse>(url: string, bodyParams?: any, config?: HttpRequest): HttpResponse<TResponse>;

  patch<TResponse>(url: string, bodyParams?: any, config?: HttpRequest): HttpResponse<TResponse>;

  put<TBodyParams>(url: string, bodyParams?: TBodyParams, config?: HttpRequest): HttpResponse<unknown>;

  delete<TResponse>(url: string, config?: HttpRequest): HttpResponse<TResponse>;

  getInstance(): AxiosInstance;

}
