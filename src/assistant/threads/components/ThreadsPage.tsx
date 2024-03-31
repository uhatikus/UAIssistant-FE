import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { selectSelectedAssistantId } from '../../../api/assistant/module';
import ThreadsPanel from './ThreadsPanel';

const ThreadsPage = () => {
  const selectedAssistantID: string | null = useSelector(selectSelectedAssistantId);
  return (
    <StyledMain className="bp5-dark">
      <ThreadsPanel />
    </StyledMain>
  );

  //   return <StyledMain className="bp5-dark">Hello Threads from assistant</StyledMain>;
};

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ThreadsPage;
