export const enum LLMSource {
  OpenAI = 'openai',
  Anthropic = 'anthropic',
  Gemini = 'gemini',
}

export const LLMList = [LLMSource.OpenAI, LLMSource.Anthropic, LLMSource.Gemini];

export const LLMModelsDictionary = {
  [LLMSource.OpenAI]: [
    'gpt-4-turbo-preview',
    'gpt-4-1106-preview',
    'gpt-4-0613',
    'gpt-4-0125-preview',
    'gpt-4',
    // 'gpt-4-vision-preview',
    // 'gpt-4-1106-vision-preview',
    // 'gpt-4-32k',
    // 'gpt-4-32k-0613',
    'gpt-3.5-turbo-16k-0613',
    'gpt-3.5-turbo-16k',
    'gpt-3.5-turbo-1106',
    'gpt-3.5-turbo-0613',
    'gpt-3.5-turbo-0125',
    'gpt-3.5-turbo',
  ],
  [LLMSource.Anthropic]: [
    'claude-3-opus-20240229',
    'claude-3-sonnet-20240229',
    'claude-3-haiku-20240307',
    'claude-2.1',
    'claude-2.0',
    'claude-instant-1.2',
  ],
  [LLMSource.Gemini]: ['gemini-1.5-pro-latest', 'gemini-pro', 'gemini-pro-vision'],
};

export const enum AssistantRole {
  Assistant = 'assistant',
  User = 'user',
}

export enum AssistantMessageType {
  Text = 'text',
  Plot = 'plotly_json',
  File = 'file',
}

export interface Assistant {
  id: string;
  name: string;
  created_at: string;
  instructions: string;
  model: string;
  llmsource: LLMSource;
}

export interface AssistantThread {
  id: string;
  name: string;
  assistant_id: string;
  created_at: string;
}

export interface AssistantMessage {
  id: string;
  role: AssistantRole;
  created_at: string;
  value: AssistantTextMessage | AssistantPlotMessage | AssistantFileMessage;
}

export interface AssistantTextMessage {
  type: AssistantMessageType.Text;
  content: {
    message: string;
  };
}

export interface AssistantFileMessage {
  type: AssistantMessageType.File;
  content: {
    filename: string;
    file_id: string;
  };
}

export interface AssistantPlotMessage {
  type: AssistantMessageType.Plot;
  content: {
    file_id: string;
    filename: string;
    raw_json: string;
  };
}

export interface AssistantsGetResponse {
  assistants: Assistant[];
}

export interface ThreadsGetRequest {
  assistant_id: string;
}

export interface ThreadsGetResponse {
  threads: AssistantThread[];
}

export interface MessagesGetRequest {
  assistant_id: string;
  thread_id: string;
}

export interface MessagesGetResponse {
  messages: AssistantMessage[];
}

export interface CreateAssistantRequest {
  name: string;
  instructions: string;
  llmsource: LLMSource;
  model: string;
}

export interface CreateAssistantResponse {
  assistant: Assistant;
}

export interface ThreadInitializeRequest {
  assistant_id: string;
  message: string;
}

export interface ThreadInitializeResponse {
  thread: AssistantThread;
  messages: AssistantMessage[];
}

export interface AssistantMessageSendRequest extends ThreadInitializeRequest {
  thread_id: string;
}

export interface AssistantMessageSendResponse {
  assistant_id: string;
  thread_id: string;
  messages: AssistantMessage[];
}

export interface AssistantDeleteRequest {
  assistant_id: string;
}

export interface AssistantDeleteResponse {
  assistant: Assistant;
}

export interface ThreadDeleteRequest {
  assistant_id: string;
  thread_id: string;
}

export interface ThreadDeleteResponse {
  thread: AssistantThread;
}

export interface AssistantUpdateRequest {
  assistant_id: string;
  name: string;
  instructions: string;
  model: string;
}

export interface AssistantUpdateResponse {
  assistant: Assistant;
}

export interface ThreadUpdateRequest {
  assistant_id: string;
  thread_id: string;
  name: string;
}

export interface ThreadUpdateResponse {
  thread: AssistantThread;
}

export interface selectAssistantIdPayload {
  assistant_id: string | null;
}

export interface selectThreadIdPayload {
  thread_id: string | null;
}

export interface addUserMessagePayload {
  message: string;
}
