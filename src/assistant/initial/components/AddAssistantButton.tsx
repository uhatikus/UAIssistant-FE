import styled from '@emotion/styled';
import { color } from '../../../styles/color';
import { Icon } from '@blueprintjs/core';
import { Assistant, LLMSource } from '../../../api/assistant/types';
import EditAssistantItem from './EditAssistantItem';
import { useRecoilState } from 'recoil';
import { assistantCreationState, assistantEditingState } from '../../assistant.store';

const AddAssistantButton = () => {
  const [isCreation, setIsCreation] = useRecoilState(assistantCreationState);
  const [editableAssistant, setEditableAssistant] = useRecoilState(assistantEditingState);

  const toggleDiv = () => {
    setEditableAssistant(null);
    setIsCreation(!isCreation); // Toggles the state between true and false
  };

  return (
    <div style={{ width: '100%' }}>
      {!isCreation && (
        <StyledAddAssistantButton onClick={toggleDiv} addbutton={true}>
          <Icon icon={'plus'} style={{ height: '110.7px', alignItems: 'center', display: 'flex' }} />
        </StyledAddAssistantButton>
      )}
      {isCreation && (
        <StyledAddAssistantButton addbutton={false}>
          <EditAssistantItem />
        </StyledAddAssistantButton>
      )}
    </div>
  );
};

const StyledAddAssistantButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  height: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px ${color.Ubrightblue};
  background-color: ${color.Udarkgrey};
  margin: 80px auto 20px auto;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: ${(props: { addbutton: boolean }) => (props.addbutton ? 'translateY(0px)' : 'translateY(-4px)')};

  &:hover {
    box-shadow: 0px 4px 25px ${color.Ubrightblue};
    transform: translateY(-4px);
  }

  &:focus {
    outline: none;
  }
`;

export default AddAssistantButton;
