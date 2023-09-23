import axios, { AxiosInstance } from 'axios';
import { HttpClientInterface } from './types';

class HttpClient implements Partial<HttpClientInterface> {
  protected axios: AxiosInstance;

  /**
   @param config An optional object of type HttpClientConfig used to set the base URL and adapter.
   @param type A string value of either 'default' or 'custom', used to set the headers according to the pactSettings object.
   @returns an instance of the HttpClient class.
   */
  constructor() {
    this.axios = axios.create();
  }

  /**
   @param url A string representing the URL path to be requested.
   @param queryParams An optional object containing query parameters to be appended to the URL.
   @param config An optional object of type HttpRequest used to set request-specific configuration like headers.
   @returns a Promise of type TResponse.
   */
  get<TResponse>(url: string, queryParams: any = {}): Promise<TResponse> {
    return this.axios.get(url, queryParams);
  }

  /**

   @returns an instance of the AxiosInstance used by the HttpClient class.
   */
  getInstance(): AxiosInstance {
    return this.axios;
  }

}

export default HttpClient;
