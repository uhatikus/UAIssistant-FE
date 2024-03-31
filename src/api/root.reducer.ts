import { combineReducers } from '@reduxjs/toolkit';
import assistantReducer from './assistant/module';

const rootReducer = combineReducers({
  assistantApi: assistantReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
