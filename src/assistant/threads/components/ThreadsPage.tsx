import styled from '@emotion/styled';
import ThreadsPanel from './ThreadsPanel';
import MessageDisplay from './MessageDisplayPanel';
import InputPanel from './InputPanel';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '../../../api';
import { assistantActions } from '../../../api/assistant/module';
import { useParams } from 'react-router-dom';

const ThreadsPage = () => {
  const { assistantId } = useParams<{ assistantId: string }>();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(assistantActions.resetThreadsState());
    dispatch(assistantActions.resetMessagesState());
    dispatch(assistantActions.selectThreadId({ thread_id: null }));
    dispatch(assistantActions.getThreads({ assistant_id: assistantId! }));
  }, []);

  return (
    <StyledMain className="bp5-dark">
      <ThreadsPanel />
      <ChatContainer>
        <MessageDisplay />
        <InputPanel />
      </ChatContainer>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  padding: 30px 20px;
  width: 90%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default ThreadsPage;
