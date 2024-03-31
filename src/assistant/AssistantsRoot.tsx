import styled from '@emotion/styled';
import { Route, Routes, Navigate } from 'react-router';
import AssistantsPage from './initial/components/AssistantsPage';
import ThreadsPage from './threads/components/ThreadsPage';

const AssistantsRoot = () => {
  return (
    <StyledMain className="bp5-dark">
      <Routes>
        <Route path="/" element={<Navigate to="/assistants" replace />} />
        <Route path="/assistants" element={<AssistantsPage />} />
        <Route path={`/assistants/:assistantId?/threads`} element={<ThreadsPage />} />
      </Routes>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
`;

export default AssistantsRoot;
