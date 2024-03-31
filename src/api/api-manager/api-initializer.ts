import { AxiosRequestConfig } from 'axios';
import { AssistantApiClient } from './clients/assistant-api-client';
import { endPoint } from '../../environment';

export const initApiClients = () => {
  new AssistantApiClient().init(endPoint.AssistantApi);
};

export const getAxiosConfig = (baseURL: string, timeout?: number): AxiosRequestConfig => {
  const DEFAULT_TIMEOUT_60_SECONDS = 60 * 1000;
  return {
    baseURL,
    withCredentials: true,
    timeout: timeout || DEFAULT_TIMEOUT_60_SECONDS,
  };
};
