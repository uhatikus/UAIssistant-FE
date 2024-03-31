import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getAxiosConfig } from '../api-initializer';

export class AssistantApiClient {
  private static instance: AxiosInstance;

  init = (baseURL: string) => {
    AssistantApiClient.instance = axios.create(getAxiosConfig(baseURL));

    this._initializeRequestInterceptor();
  };

  private _initializeRequestInterceptor = () => {
    AssistantApiClient.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => config,
      (error: any) => Promise.reject(error)
    );
  };

  public getInstance = () => AssistantApiClient.instance;
}
