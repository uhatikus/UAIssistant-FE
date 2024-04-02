import styled from '@emotion/styled';
import { Assistant } from '../../../api/assistant/types';
import AssistantItem from './AssistantItem';
import { color } from '../../../styles/color';
import { useNavigate } from 'react-router-dom';
import AddAssistantButton from './AddAssistantButton';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assistantActions, selectAssistants } from '../../../api/assistant/module';
import { AppDispatch } from '../../../api';

const AssistantsPage = () => {
  const assistants: Assistant[] = useSelector(selectAssistants);

  const navigate = useNavigate();

  const handleAssistantItemClick = useCallback(({ id }: Assistant) => {
    navigate(`/assistants/${id}/threads`);
  }, []);

  return (
    <StyledMain className="bp5-dark">
      <AssistantList>
        <AddAssistantButton />
        {assistants.map((assistant) => (
          <AssistantItem assistant={assistant} onClick={handleAssistantItemClick} />
        ))}
      </AssistantList>
    </StyledMain>
  );
};

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(100vh - 60px); /* Limit the height to viewport height minus the height of the top bar */

  /* Styling for the scrollbar */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${color.Ubrightblue};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${color.Udarkblue};
    border-radius: 5px;
  }
`;

const AssistantList = styled.div`
  display: flex;
  flex-direction: column; /* Arrange items horizontally */
  align-items: center; /* Center items vertically */
`;

export default AssistantsPage;
