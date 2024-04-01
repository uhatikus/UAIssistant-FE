import { atom } from 'recoil';
import { Assistant } from '../api/assistant/types';

export const assistantCreationState = atom<boolean>({
  key: 'assistantCreationStates',
  default: false,
});

export const assistantEditingState = atom<Assistant | null>({
  key: 'assistantEditingState',
  default: null,
});
