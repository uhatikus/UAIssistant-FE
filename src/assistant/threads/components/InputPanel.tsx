import _ from 'lodash';
import React from 'react';
import styled from '@emotion/styled';
import { Button, TextArea } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';
import { atom, useRecoilState } from 'recoil';
import {
  assistantActions,
  selectIsNOTReadyForMessage,
  selectSelectedAssistantId,
  selectSelectedThreadId,
} from '../../../api/assistant/module';
import { AppDispatch } from '../../../api';
import { color } from '../../../styles/color';

export const promptState = atom<string>({
  key: 'prompt',
  default: '',
});

// TODO: (ASSISTANT) add autofocus on TextArea after the click "New Chat"
// TODO: (ASSISTANT) add autoresize for TextArea (available for a newer version of blueprintjs/core)

const InputPanel: React.FC = () => {
  const selectedThreadId: string | null = useSelector(selectSelectedThreadId);
  const selectedAssistantID: string | null = useSelector(selectSelectedAssistantId);
  const isNOTReadyForMessage: boolean = useSelector(selectIsNOTReadyForMessage);

  const [prompt, setPrompt] = useRecoilState(promptState);

  const dispatch = useDispatch<AppDispatch>();

  const handleSendMessage = async () => {
    dispatch(assistantActions.addUserMessage({ message: prompt }));
    if (_.isNull(selectedThreadId)) {
      dispatch(assistantActions.initializeThread({ assistant_id: selectedAssistantID!, message: prompt }));
    } else {
      dispatch(
        assistantActions.sendMessage({
          thread_id: selectedThreadId!,
          assistant_id: selectedAssistantID!,
          message: prompt,
        })
      );
    }
    setPrompt('');
  };

  return (
    <InputTextAreaContainer>
      <TextArea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (!isNOTReadyForMessage && e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        fill
        autoResize
        autoFocus
      />
      <Button
        icon="send-message"
        minimal
        style={{ position: 'absolute', bottom: '35px', right: '70px' }}
        onClick={handleSendMessage}
        disabled={isNOTReadyForMessage}
      />
    </InputTextAreaContainer>
  );
};

export default InputPanel;

const InputTextAreaContainer = styled.div`
  margin-top: auto;
  width: 100%;
  padding-inline: 100px;
`;
