import styled from '@emotion/styled';
import { Assistant, LLMSource } from '../../../api/assistant/types';
import AssistantItem from './AssistantItem';
import { color } from '../../../styles/color';
import { useNavigate } from 'react-router-dom';
import AddAssistantButton from './AddAssistantButton';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { assistantActions } from '../../../api/assistant/module';

const AssistantsPage = () => {
  const assistants = [
    {
      id: '1',
      name: 'Assistant 1',
      created_at: '2024-03-31 14:30:15',
      instructions: 'Be a creative writer',
      model: 'gpt-4',
      llmsource: LLMSource.OpenAI,
    },
    {
      id: '2',
      name: 'test Assistant very good 2',
      created_at: '2024-03-31 14:35:15',
      instructions: 'Be a bad writer',
      model: 'claude-3-opus-20240229',
      llmsource: LLMSource.Anthropic,
    },
    {
      id: '3',
      name: 'test Assistant 3',
      created_at: '2024-03-31 14:45:15',
      instructions:
        'Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. Be a bad writer. ',
      model: 'claude-2',
      llmsource: LLMSource.Anthropic,
    },
    {
      id: '4',
      name: 'test Assistant 4',
      created_at: '2024-03-31 14:55:15',
      instructions: 'Be a bad writer',
      model: 'gpt-3.5',
      llmsource: LLMSource.OpenAI,
    },
    {
      id: '5',
      name: 'test Assistant 5',
      created_at: '2024-03-31 15:35:15',
      instructions: 'Be a good writer',
      model: 'gpt-3.5',
      llmsource: LLMSource.OpenAI,
    },
    {
      id: '6',
      name: 'test Assistant 6',
      created_at: '2024-03-31 16:35:15',
      instructions: 'Be a great writer',
      model: 'gpt-4',
      llmsource: LLMSource.OpenAI,
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAssistantItemClick = useCallback(({ id }: Assistant) => {
    dispatch(assistantActions.selectAssistantId({ assistant_id: id }));
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
