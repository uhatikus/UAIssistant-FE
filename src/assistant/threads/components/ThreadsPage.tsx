import styled from '@emotion/styled';
import ThreadsPanel from './ThreadsPanel';
import MessageDisplay from './MessageDisplayPanel';
import InputPanel from './InputPanel';

const ThreadsPage = () => {
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default ThreadsPage;
