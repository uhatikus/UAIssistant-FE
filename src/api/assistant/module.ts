import {
  PayloadAction,
  Selector,
  createAsyncThunk,
  createSlice,
  createSelector,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import {
  Assistant,
  AssistantDeleteRequest,
  AssistantDeleteResponse,
  AssistantMessage,
  AssistantMessageSendRequest,
  AssistantMessageSendResponse,
  AssistantMessageType,
  AssistantRole,
  AssistantThread,
  AssistantUpdateRequest,
  AssistantUpdateResponse,
  AssistantsGetResponse,
  CreateAssistantRequest,
  CreateAssistantResponse,
  MessagesGetRequest,
  MessagesGetResponse,
  ThreadDeleteRequest,
  ThreadDeleteResponse,
  ThreadInitializeRequest,
  ThreadInitializeResponse,
  ThreadUpdateRequest,
  ThreadUpdateResponse,
  ThreadsGetRequest,
  ThreadsGetResponse,
  addUserMessagePayload,
  selectAssistantIdPayload,
  selectThreadIdPayload,
} from './types';
import { ApiState, initialApiState } from '../api-manager/models/api-state.model';
import { getErrorMessage } from '../api-manager/helpers/error.helper';
import {
  getApiErrorMessage,
  handleAsyncThunkFulfilledStatus,
  handleAsyncThunkPendingStatus,
  handleAsyncThunkRejectedStatus,
  isApiLoadingStatus,
  isApiSuccessStatus,
} from '../api-manager/helpers/api-state.helper';
import { ErrorMessage } from '../api-manager/models/error.model';
import { RootState } from '../root.reducer';
import { AssistantApiClient } from '../api-manager/clients/assistant-api-client';

const PREFIX: string = '@UAIssistant';

const assistantsAdapter = createEntityAdapter({
  selectId: (assistant: Assistant) => assistant.id,
  sortComparer: (a, b) => {
    return b.created_at.localeCompare(a.created_at);
  },
});

const threadsAdapter = createEntityAdapter({
  selectId: (thread: AssistantThread) => thread.id,
  sortComparer: (a, b) => {
    return b.created_at.localeCompare(a.created_at);
  },
});

const messagesAdapter = createEntityAdapter({
  selectId: (message: AssistantMessage) => message.id,
});

/**
 * Slice interface
 */
interface AssistantState {
  assistants: EntityState<Assistant, string>;
  threads: EntityState<AssistantThread, string>;
  messages: EntityState<AssistantMessage, string>;
  selectedAssistantId: string | null;
  selectedThreadId: string | null;

  assistantsGet: ApiState;
  threadsGet: ApiState;
  messagesGet: ApiState;
  createAssistant: ApiState;
  threadInitialize: ApiState;
  assistantMessageSend: ApiState;
  assistantDelete: ApiState;
  threadDelete: ApiState;
  assistantUpdate: ApiState;
  threadUpdate: ApiState;
}

/**s
 * Slice State
 */
const initialState: AssistantState = {
  assistants: assistantsAdapter.getInitialState(),
  threads: threadsAdapter.getInitialState(),
  messages: messagesAdapter.getInitialState(),
  selectedAssistantId: null,
  selectedThreadId: null,

  assistantsGet: initialApiState,
  threadsGet: initialApiState,
  messagesGet: initialApiState,
  createAssistant: initialApiState,
  threadInitialize: initialApiState,
  assistantMessageSend: initialApiState,
  assistantDelete: initialApiState,
  threadDelete: initialApiState,
  assistantUpdate: initialApiState,
  threadUpdate: initialApiState,
};

/**
 * Slice createAsyncThunk-s
 */

// GET REQUESTS
const getAssistants = createAsyncThunk(`${PREFIX}/getAssistants`, async (unused, { rejectWithValue }) => {
  const assistantApiClient = new AssistantApiClient().getInstance();
  return assistantApiClient
    .get('')
    .then(({ data }: { data: AssistantsGetResponse }): AssistantsGetResponse => data)
    .catch((error) => rejectWithValue({ message: getErrorMessage(error) }));
});

const getThreads = createAsyncThunk(
  `${PREFIX}/getThreads`,
  ({ assistant_id }: ThreadsGetRequest, { rejectWithValue }) => {
    const assistantApiClient = new AssistantApiClient().getInstance();
    return assistantApiClient
      .get(`/${assistant_id}/threads`)
      .then(({ data }: { data: ThreadsGetResponse }): ThreadsGetResponse => data)
      .catch((error) => rejectWithValue({ message: getErrorMessage(error) }));
  }
);

const getMessages = createAsyncThunk(
  `${PREFIX}/getMessages`,
  ({ assistant_id, thread_id }: MessagesGetRequest, { rejectWithValue }) => {
    const assistantApiClient = new AssistantApiClient().getInstance();

    return assistantApiClient
      .get(`/${assistant_id}/threads/${thread_id}/messages`)
      .then(({ data }: { data: MessagesGetResponse }): MessagesGetResponse => data)
      .catch((error) => rejectWithValue({ message: getErrorMessage(error) }));
  }
);

// POST REQUESTS
const createAssistant = createAsyncThunk(
  `${PREFIX}/createAssistant`,
  ({ name, instructions, llmsource, model }: CreateAssistantRequest, { rejectWithValue }) => {
    const assistantApiClient = new AssistantApiClient().getInstance();

    return assistantApiClient
      .post('', { name, instructions, llmsource, model })
      .then(({ data }: { data: CreateAssistantResponse }): CreateAssistantResponse => data)
      .catch((error) => rejectWithValue({ message: getErrorMessage(error) }));
  }
);

const initializeThread = createAsyncThunk(
  `${PREFIX}/initializeThread`,
  ({ assistant_id, message }: ThreadInitializeRequest, { rejectWithValue }) => {
    const assistantApiClient = new AssistantApiClient().getInstance();

    return assistantApiClient
      .post(`/${assistant_id}/threads`, { message })
      .then(({ data }: { data: ThreadInitializeResponse }): ThreadInitializeResponse => data)
      .catch((error) => rejectWithValue({ message: getErrorMessage(error) }));
  }
);

const sendMessage = createAsyncThunk(
  `${PREFIX}/sendMessage`,
  ({ assistant_id, thread_id, message }: AssistantMessageSendRequest, { rejectWithValue }) => {
    const assistantApiClient = new AssistantApiClient().getInstance();

    return assistantApiClient
      .post(`/${assistant_id}/threads/${thread_id}/messages`, {
        message,
      })
      .then(({ data }: { data: AssistantMessageSendResponse }): AssistantMessageSendResponse => data)
      .catch((error) => rejectWithValue({ message: getErrorMessage(error) }));
  }
);

// DELETE REQUESTS
const deleteAssistant = createAsyncThunk(
  `${PREFIX}/deleteAssistant`,
  ({ assistant_id }: AssistantDeleteRequest, { rejectWithValue }) => {
    const assistantApiClient = new AssistantApiClient().getInstance();

    return assistantApiClient
      .delete(`/${assistant_id}`)
      .then(({ data }: { data: AssistantDeleteResponse }): AssistantDeleteResponse => data)
      .catch((error) => rejectWithValue({ message: getErrorMessage(error) }));
  }
);

const deleteThread = createAsyncThunk(
  `${PREFIX}/deleteThread`,
  ({ assistant_id, thread_id }: ThreadDeleteRequest, { rejectWithValue }) => {
    const assistantApiClient = new AssistantApiClient().getInstance();

    return assistantApiClient
      .delete(`/${assistant_id}/threads/${thread_id}`)
      .then(({ data }: { data: ThreadDeleteResponse }): ThreadDeleteResponse => data)
      .catch((error) => rejectWithValue({ message: getErrorMessage(error) }));
  }
);

// PATCH REQUESTS
const updateAssistant = createAsyncThunk(
  `${PREFIX}/updateAssistant`,
  ({ assistant_id, name, instructions, model }: AssistantUpdateRequest, { rejectWithValue }) => {
    const assistantApiClient = new AssistantApiClient().getInstance();

    return assistantApiClient
      .patch(`/${assistant_id}`, { name, instructions, model })
      .then(({ data }: { data: AssistantUpdateResponse }): AssistantUpdateResponse => data)
      .catch((error) => rejectWithValue({ message: getErrorMessage(error) }));
  }
);

const updateThread = createAsyncThunk(
  `${PREFIX}/updateThread`,
  ({ assistant_id, thread_id, name }: ThreadUpdateRequest, { rejectWithValue }) => {
    const assistantApiClient = new AssistantApiClient().getInstance();

    return assistantApiClient
      .patch(`/${assistant_id}/threads/${thread_id}`, { name })
      .then(({ data }: { data: ThreadUpdateResponse }): ThreadUpdateResponse => data)
      .catch((error) => rejectWithValue({ message: getErrorMessage(error) }));
  }
);

/**
 * Slice
 */
export const assistantSlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    resetAssistantState: (state: AssistantState) => {
      state = initialState;
    },
    resetGetAssistantState: (state: AssistantState) => {
      state.assistants = initialState.assistants;
      state.threads = initialState.threads;
      state.messages = initialState.messages;
      state.selectedAssistantId = initialState.selectedAssistantId;
      state.selectedThreadId = initialState.selectedThreadId;
    },
    selectAssistantId: (state: AssistantState, action: PayloadAction<selectAssistantIdPayload>) => {
      const { assistant_id } = action.payload;
      state.selectedAssistantId = assistant_id;
    },
    selectThreadId: (state: AssistantState, action: PayloadAction<selectThreadIdPayload>) => {
      const { thread_id } = action.payload;
      state.selectedThreadId = thread_id;
    },
    addUserMessage: (state: AssistantState, action: PayloadAction<addUserMessagePayload>) => {
      const { message } = action.payload;
      const userMessage: AssistantMessage = {
        id: `${Math.random()}`,
        role: AssistantRole.User,
        created_at: new Date().toDateString(),
        value: {
          type: AssistantMessageType.Text,
          content: {
            message,
          },
        },
      };
      messagesAdapter.addOne(state.messages, userMessage);
    },
    resetThreadsState: (state: AssistantState) => {
      state.threads = initialState.threads;
    },
    resetMessagesState: (state: AssistantState) => {
      state.messages = initialState.messages;
    },
    resetDeleteAssistantState: (state: AssistantState) => {
      state.assistantDelete = initialState.assistantDelete;
    },

    resetDeleteThreadState: (state: AssistantState) => {
      state.threadDelete = initialState.threadDelete;
    },
    resetUpdateAssistantState: (state: AssistantState) => {
      state.assistantUpdate = initialState.assistantUpdate;
    },
    resetUpdateThreadState: (state: AssistantState) => {
      state.threadUpdate = initialState.threadUpdate;
    },
  },
  extraReducers: (builder) => {
    // getAssistants reducers
    builder.addCase(getAssistants.pending.type, (state: AssistantState) => {
      handleAsyncThunkPendingStatus(state.assistantsGet);
    });
    builder.addCase(
      getAssistants.fulfilled.type,
      (state: AssistantState, action: PayloadAction<AssistantsGetResponse>) => {
        const { assistants } = action.payload;
        assistantsAdapter.setAll(state.assistants, assistants);
        handleAsyncThunkFulfilledStatus(state.assistantsGet);
      }
    );
    builder.addCase(getAssistants.rejected.type, (state: AssistantState, action: PayloadAction<ErrorMessage>) => {
      const { message } = action.payload;
      handleAsyncThunkRejectedStatus(state.assistantsGet, message);
    });
    // getThreads reducers
    builder.addCase(getThreads.pending.type, (state: AssistantState) => {
      handleAsyncThunkPendingStatus(state.threadsGet);
    });
    builder.addCase(getThreads.fulfilled.type, (state: AssistantState, action: PayloadAction<ThreadsGetResponse>) => {
      const { threads } = action.payload;
      threadsAdapter.setAll(state.threads, threads);
      handleAsyncThunkFulfilledStatus(state.threadsGet);
    });
    builder.addCase(getThreads.rejected.type, (state: AssistantState, action: PayloadAction<ErrorMessage>) => {
      const { message } = action.payload;
      handleAsyncThunkRejectedStatus(state.threadsGet, message);
    });
    // getMessages reducers
    builder.addCase(getMessages.pending.type, (state: AssistantState) => {
      handleAsyncThunkPendingStatus(state.messagesGet);
    });
    builder.addCase(getMessages.fulfilled.type, (state: AssistantState, action: PayloadAction<MessagesGetResponse>) => {
      const { messages } = action.payload;
      messagesAdapter.setAll(state.messages, messages);
      handleAsyncThunkFulfilledStatus(state.messagesGet);
    });
    builder.addCase(getMessages.rejected.type, (state: AssistantState, action: PayloadAction<ErrorMessage>) => {
      const { message } = action.payload;
      handleAsyncThunkRejectedStatus(state.messagesGet, message);
    });
    // createAssistant reducers
    builder.addCase(createAssistant.pending.type, (state: AssistantState) => {
      handleAsyncThunkPendingStatus(state.createAssistant);
    });
    builder.addCase(
      createAssistant.fulfilled.type,
      (state: AssistantState, action: PayloadAction<CreateAssistantResponse>) => {
        const { assistant } = action.payload;
        assistantsAdapter.addOne(state.assistants, assistant);
        handleAsyncThunkFulfilledStatus(state.createAssistant);
      }
    );
    builder.addCase(createAssistant.rejected.type, (state: AssistantState, action: PayloadAction<ErrorMessage>) => {
      const { message } = action.payload;
      handleAsyncThunkRejectedStatus(state.createAssistant, message);
    });
    // initializeThread reducers
    builder.addCase(initializeThread.pending.type, (state: AssistantState) => {
      handleAsyncThunkPendingStatus(state.threadInitialize);
    });
    builder.addCase(
      initializeThread.fulfilled.type,
      (state: AssistantState, action: PayloadAction<ThreadInitializeResponse>) => {
        const { thread, messages } = action.payload;
        state.selectedThreadId = thread.id;
        threadsAdapter.addOne(state.threads, thread);
        messagesAdapter.addMany(state.messages, messages);
        handleAsyncThunkFulfilledStatus(state.threadInitialize);
      }
    );
    builder.addCase(initializeThread.rejected.type, (state: AssistantState, action: PayloadAction<ErrorMessage>) => {
      const { message } = action.payload;
      handleAsyncThunkRejectedStatus(state.threadInitialize, message);
    });
    // sendMessage reducers
    builder.addCase(sendMessage.pending.type, (state: AssistantState) => {
      handleAsyncThunkPendingStatus(state.assistantMessageSend);
    });
    builder.addCase(
      sendMessage.fulfilled.type,
      (state: AssistantState, action: PayloadAction<AssistantMessageSendResponse>) => {
        const lastAssistantResponse = action.payload;
        messagesAdapter.addMany(state.messages, lastAssistantResponse.messages);
        handleAsyncThunkFulfilledStatus(state.assistantMessageSend);
      }
    );
    builder.addCase(sendMessage.rejected.type, (state: AssistantState, action: PayloadAction<ErrorMessage>) => {
      const { message } = action.payload;
      handleAsyncThunkRejectedStatus(state.assistantMessageSend, message);
    });
    // deleteAssistant reducers
    builder.addCase(deleteAssistant.pending.type, (state: AssistantState) => {
      handleAsyncThunkPendingStatus(state.assistantDelete);
    });
    builder.addCase(
      deleteAssistant.fulfilled.type,
      (state: AssistantState, action: PayloadAction<AssistantDeleteResponse>) => {
        const { assistant } = action.payload;
        assistantsAdapter.removeOne(state.assistants, assistant.id);
        handleAsyncThunkFulfilledStatus(state.assistantDelete);
      }
    );
    builder.addCase(deleteAssistant.rejected.type, (state: AssistantState, action: PayloadAction<ErrorMessage>) => {
      const { message } = action.payload;
      handleAsyncThunkRejectedStatus(state.assistantDelete, message);
    });
    // deleteThread reducers
    builder.addCase(deleteThread.pending.type, (state: AssistantState) => {
      handleAsyncThunkPendingStatus(state.threadDelete);
    });
    builder.addCase(
      deleteThread.fulfilled.type,
      (state: AssistantState, action: PayloadAction<ThreadDeleteResponse>) => {
        const { thread } = action.payload;
        threadsAdapter.removeOne(state.threads, thread.id);
        if (state.selectedThreadId === thread.id) {
          state.selectedThreadId = initialState.selectedThreadId;
          messagesAdapter.removeAll(state.messages);
        }
        handleAsyncThunkFulfilledStatus(state.threadDelete);
      }
    );
    builder.addCase(deleteThread.rejected.type, (state: AssistantState, action: PayloadAction<ErrorMessage>) => {
      const { message } = action.payload;
      handleAsyncThunkRejectedStatus(state.threadDelete, message);
    });
    // updateAssistant reducers
    builder.addCase(updateAssistant.pending.type, (state: AssistantState) => {
      handleAsyncThunkPendingStatus(state.assistantUpdate);
    });
    builder.addCase(
      updateAssistant.fulfilled.type,
      (state: AssistantState, action: PayloadAction<AssistantUpdateResponse>) => {
        const { assistant } = action.payload;
        assistantsAdapter.updateOne(state.assistants, {
          id: assistant.id,
          changes: assistant,
        });
        handleAsyncThunkFulfilledStatus(state.assistantUpdate);
      }
    );
    builder.addCase(updateAssistant.rejected.type, (state: AssistantState, action: PayloadAction<ErrorMessage>) => {
      const { message } = action.payload;
      handleAsyncThunkRejectedStatus(state.assistantUpdate, message);
    });
    // updateThread reducers
    builder.addCase(updateThread.pending.type, (state: AssistantState) => {
      handleAsyncThunkPendingStatus(state.threadUpdate);
    });
    builder.addCase(
      updateThread.fulfilled.type,
      (state: AssistantState, action: PayloadAction<ThreadUpdateResponse>) => {
        const { thread } = action.payload;
        threadsAdapter.updateOne(state.threads, {
          id: thread.id,
          changes: thread,
        });
        handleAsyncThunkFulfilledStatus(state.threadUpdate);
      }
    );
    builder.addCase(updateThread.rejected.type, (state: AssistantState, action: PayloadAction<ErrorMessage>) => {
      const { message } = action.payload;
      handleAsyncThunkRejectedStatus(state.threadUpdate, message);
    });
  },
});

export const assistantActions = {
  ...assistantSlice.actions,
  getAssistants,
  getThreads,
  getMessages,
  createAssistant,
  initializeThread,
  sendMessage,
  deleteAssistant,
  deleteThread,
  updateAssistant,
  updateThread,
};

export default assistantSlice.reducer;

/**
 * Selectors
 */

const assistantInputSelector = ({ assistantApi }: RootState) => assistantApi;
const assistantsSelectors = assistantsAdapter.getSelectors<AssistantState>((state) => state.assistants);
const threadsSelectors = threadsAdapter.getSelectors<AssistantState>((state) => state.threads);
const messagesSelectors = messagesAdapter.getSelectors<AssistantState>((state) => state.messages);

export const selectAssistants: Selector<RootState, Assistant[]> = createSelector(
  assistantInputSelector,
  assistantsSelectors.selectAll
);

export const selectAssistant: Selector<RootState, Assistant | null> = createSelector(
  assistantInputSelector,
  ({ assistants, selectedAssistantId }) =>
    selectedAssistantId ? assistantsAdapter.getSelectors().selectById(assistants, selectedAssistantId) : null
);

export const selectThreads: Selector<RootState, AssistantThread[]> = createSelector(
  assistantInputSelector,
  threadsSelectors.selectAll
);

export const selectMessages: Selector<RootState, AssistantMessage[]> = createSelector(
  assistantInputSelector,
  messagesSelectors.selectAll
);

export const selectSelectedThreadId: Selector<RootState, string | null> = createSelector(
  assistantInputSelector,
  ({ selectedThreadId }) => selectedThreadId
);

export const selectIAssistantsLoading: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ assistantsGet }) => isApiLoadingStatus(assistantsGet)
);

export const selectIsThreadsLoading: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ threadsGet }) => isApiLoadingStatus(threadsGet)
);

export const selectIsMessagesLoading: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ messagesGet }) => isApiLoadingStatus(messagesGet)
);

export const selectIsAssistantCreationLoading: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ createAssistant }) => isApiLoadingStatus(createAssistant)
);

export const selectIsThreadInitializationLoading: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ threadInitialize }) => isApiLoadingStatus(threadInitialize)
);

export const selectIsLastAssistantResponseLoading: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ assistantMessageSend }) => isApiLoadingStatus(assistantMessageSend)
);

export const selectIsDeleteAssistantLoading: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ assistantDelete }) => isApiLoadingStatus(assistantDelete)
);

export const selectIsDeleteAssistantSuccess: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ assistantDelete }) => isApiSuccessStatus(assistantDelete)
);

export const selectDeleteAsssistantError = createSelector(assistantInputSelector, ({ assistantDelete }) =>
  getApiErrorMessage(assistantDelete)
);

export const selectIsDeleteThreadLoading: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ threadDelete }) => isApiLoadingStatus(threadDelete)
);

export const selectIsDeleteThreadSuccess: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ threadDelete }) => isApiSuccessStatus(threadDelete)
);

export const selectDeleteThreadError = createSelector(assistantInputSelector, ({ threadDelete }) =>
  getApiErrorMessage(threadDelete)
);

export const selectIsUpdateAssistantLoading: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ assistantUpdate }) => isApiLoadingStatus(assistantUpdate)
);

export const selectIsUpdateAssistantSuccess: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ assistantUpdate }) => isApiSuccessStatus(assistantUpdate)
);

export const selectUpdateAssistantError = createSelector(assistantInputSelector, ({ assistantUpdate }) =>
  getApiErrorMessage(assistantUpdate)
);

export const selectIsUpdateThreadLoading: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ threadUpdate }) => isApiLoadingStatus(threadUpdate)
);

export const selectIsUpdateThreadSuccess: Selector<RootState, boolean> = createSelector(
  assistantInputSelector,
  ({ threadUpdate }) => isApiSuccessStatus(threadUpdate)
);

export const selectUpdateThreadError = createSelector(assistantInputSelector, ({ threadUpdate }) =>
  getApiErrorMessage(threadUpdate)
);

export const selectIsNOTReadyForMessage = createSelector(
  assistantInputSelector,
  ({
    assistantsGet,
    threadsGet,
    messagesGet,
    threadInitialize,
    assistantMessageSend,
    assistantDelete,
    threadDelete,
    assistantUpdate,
    threadUpdate,
  }) =>
    isApiLoadingStatus(assistantsGet) ||
    isApiLoadingStatus(threadsGet) ||
    isApiLoadingStatus(messagesGet) ||
    isApiLoadingStatus(threadInitialize) ||
    isApiLoadingStatus(assistantMessageSend) ||
    isApiLoadingStatus(assistantDelete) ||
    isApiLoadingStatus(threadDelete) ||
    isApiLoadingStatus(assistantUpdate) ||
    isApiLoadingStatus(threadUpdate)
);
function selectById(
  assistants: any,
  arg1: any
): (
  resultFuncArgs_0: AssistantState,
  resultFuncArgs_1: import('@reduxjs/toolkit').EntitySelectors<Assistant, EntityState<Assistant, string>, string>
) => Assistant {
  throw new Error('Function not implemented.');
}
