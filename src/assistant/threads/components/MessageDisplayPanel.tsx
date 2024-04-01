import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Spinner, SpinnerSize } from '@blueprintjs/core';
import { useSelector } from 'react-redux';
import { AssistantMessage, AssistantMessageType, AssistantRole } from '../../../api/assistant/types';
import { selectIsNOTReadyForMessage, selectMessages } from '../../../api/assistant/module';
import MessageRenderer from './MessageRenderer';

// TODO: (ASSISTANT) add animation for new messages. Maybe in MessageRenderer.

const MessageDisplay: React.FC = () => {
  const assistantMessages: AssistantMessage[] = useSelector(selectMessages);
  const isNOTReadyForMessage: boolean = useSelector(selectIsNOTReadyForMessage);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const introMessage: AssistantMessage = {
    id: 'intro_message_id',
    role: AssistantRole.Assistant,
    created_at: '0',
    value: {
      type: AssistantMessageType.Text,
      content: {
        message: `Hello Alex! \nHow can I assist you with your data analysis needs today? `,
      },
    },
  };

  useEffect(() => {
    const scrollToBottom = () => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Adding a delay before scrolling to allow time for rendering (adjust the delay as needed)
    const scrollDelay = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(scrollDelay);
  }, [assistantMessages, bottomRef]);

  return (
    <MessageDisplayContainer>
      {[introMessage, ...assistantMessages].map((message) => (
        <MessageRenderer message={message} key={Math.random()} />
      ))}
      {isNOTReadyForMessage && (
        <StyledMessage>
          <Spinner size={SpinnerSize.SMALL} />
        </StyledMessage>
      )}
      <div ref={bottomRef} />
    </MessageDisplayContainer>
  );
};

export default MessageDisplay;

const MessageDisplayContainer = styled.div`
  overflow: auto;
  padding-top: 30px;
  padding-inline: 100px;
  display: flex;
  flex-direction: column;
`;

const StyledMessage = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  color: white;

  border-radius: 5px;
  width: fit-content;
`;
