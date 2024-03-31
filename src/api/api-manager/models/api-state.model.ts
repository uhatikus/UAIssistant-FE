import { ApiStatus } from '../enums/api-status.enum';

interface IdleState {
  status: ApiStatus.Idle;
}
interface LoadingState {
  status: ApiStatus.Loading;
}
interface SuccessState {
  status: ApiStatus.Success;
}
interface FailureState {
  status: ApiStatus.Failure;
  error: string;
}

export type ApiState = IdleState | LoadingState | SuccessState | FailureState;

export const initialApiState: ApiState = {
  status: ApiStatus.Idle,
};
