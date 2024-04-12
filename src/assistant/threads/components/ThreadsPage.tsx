import styled from '@emotion/styled';
import ThreadsPanel from './ThreadsPanel';
import MessageDisplay from './MessageDisplayPanel';
import InputPanel from './InputPanel';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '../../../api';
import { assistantActions, selectAssistant } from '../../../api/assistant/module';
import { useParams } from 'react-router-dom';
import { Assistant } from '../../../api/assistant/types';
import { color } from '../../../styles/color';

const ThreadsPage = () => {
  const { assistantId } = useParams<{ assistantId: string }>();
  const assistant: Assistant | null = useSelector(selectAssistant);

  const assistantname = assistant ? assistant.name : '';

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(assistantActions.selectAssistantId({ assistant_id: assistantId! }));
    dispatch(assistantActions.resetThreadsState());
    dispatch(assistantActions.resetMessagesState());
    dispatch(assistantActions.selectThreadId({ thread_id: null }));
    dispatch(assistantActions.getThreads({ assistant_id: assistantId! }));
  }, []);

  return (
    <StyledMain className="bp5-dark">
      <ThreadsPanel />
      <ChatContainer>
        <AssistantName>{assistantname}</AssistantName>
        <MessageDisplay />
        <InputPanel />
      </ChatContainer>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  display: flex;
`;

const AssistantName = styled.div`
  font-size: 22px;
  opacity: 0.73;
  padding-top: 11px;
  padding-bottom: 5px;
  color: ${color.Ubrightblue};
`;

const ChatContainer = styled.div`
  padding: 20px 20px;
  width: 90%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default ThreadsPage;
