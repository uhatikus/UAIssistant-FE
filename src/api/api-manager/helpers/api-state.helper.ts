import _ from 'lodash';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../root.reducer';
import { ApiStatus } from '../enums/api-status.enum';
import { ApiState } from '../models/api-state.model';

export const handleAsyncThunkPendingStatus = (state: ApiState): void => {
  state.status = ApiStatus.Loading;
};
export const handleAsyncThunkFulfilledStatus = (state: ApiState): void => {
  state.status = ApiStatus.Success;
};
export const handleAsyncThunkRejectedStatus = (state: ApiState, errorMessage: string): void => {
  state.status = ApiStatus.Failure;
  if (state.status === ApiStatus.Failure) {
    state.error = errorMessage;
  }
};

export const isApiIdleStatus = (apiState: ApiState) => {
  return apiState.status === ApiStatus.Idle;
};
export const isApiLoadingStatus = (apiState: ApiState) => {
  return apiState.status === ApiStatus.Loading;
};
export const isApiSuccessStatus = (apiState: ApiState) => {
  return apiState.status === ApiStatus.Success;
};
export const isApiFailureStatus = (apiState: ApiState) => {
  return apiState.status === ApiStatus.Failure;
};
export const getApiErrorMessage = (apiState: ApiState): string | null => {
  return apiState.status === ApiStatus.Failure ? apiState.error : null;
};

interface ApiStateKey {
  isLoadingKey: string;
  isLoadedKey: string;
  errorKey: string;
}

const getApiStateKey = (apiNameInCamelCase: string): ApiStateKey => {
  const apiNameInPascalCase = _.upperFirst(apiNameInCamelCase);

  return {
    isLoadingKey: `is${apiNameInPascalCase}Loading`,
    isLoadedKey: `is${apiNameInPascalCase}Loaded`,
    errorKey: `${apiNameInCamelCase}Error`,
  };
};

export const handleAsyncThunkPending = (state: any, apiNameInCamelCase: string): void => {
  const { isLoadingKey, isLoadedKey, errorKey } = getApiStateKey(apiNameInCamelCase);

  state[isLoadingKey] = true;
  state[isLoadedKey] = false;
  state[errorKey] = null;
};

export const handleAsyncThunkFulFilled = (state: any, apiNameInCamelCase: string): void => {
  const { isLoadingKey, isLoadedKey } = getApiStateKey(apiNameInCamelCase);

  state[isLoadingKey] = false;
  state[isLoadedKey] = true;
};

export const handleAsyncThunkRejected = (state: any, apiNameInCamelCase: string, errorMessage: string): void => {
  const { isLoadingKey, isLoadedKey, errorKey } = getApiStateKey(apiNameInCamelCase);

  state[isLoadingKey] = false;
  state[isLoadedKey] = true;

  state[errorKey] = errorMessage;
};

export const createSelectIsLoading = <T>(inputSelector: (state: RootState) => T, keys: Array<keyof T>) => {
  return createSelector(inputSelector, (selectedState): boolean =>
    keys.some((key) => isApiLoadingStatus(selectedState[key] as unknown as ApiState))
  );
};
