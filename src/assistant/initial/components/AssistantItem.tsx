import styled from '@emotion/styled';
import { Assistant } from '../../../api/assistant/types';
import { color } from '../../../styles/color';
import { Button, Icon, Intent } from '@blueprintjs/core';
import { useRecoilState } from 'recoil';
import { assistantCreationState, assistantEditingState } from '../../assistant.store';
import EditAssistantItem from './EditAssistantItem';
import { useState } from 'react';
import DeleteConfirmationPopup from '../../../shared/components/DeleteConfirmationPopup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../api';
import { assistantActions } from '../../../api/assistant/module';

interface Props {
  assistant: Assistant;
  onClick: (assistant: Assistant) => void;
}

const AssistantItem: React.FC<Props> = ({ assistant, onClick }) => {
  const [isCreation, setIsCreation] = useRecoilState(assistantCreationState);
  const [editableAssistant, setEditableAssistant] = useRecoilState(assistantEditingState);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const isCurrentAssistantEditable: boolean = assistant.id === editableAssistant?.id;

  const dispatch = useDispatch<AppDispatch>();

  const handleEditClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsCreation(false);
    setEditableAssistant(assistant);
  };

  const handleLocalDeleteClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsDeleteOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(false);
    dispatch(assistantActions.deleteAssistant({ assistant_id: assistant.id }));
  };

  return (
    <div style={{ width: '100%' }}>
      {!isCurrentAssistantEditable && (
        <StyledAssistantItem onClick={() => onClick(assistant)} edit={false}>
          <FirstRow>
            <NameWrapper>
              <AssistantName>{assistant.name}</AssistantName>
            </NameWrapper>
            <CenteredInfo>
              <InfoItem>
                <Label>LLM:</Label>
                <LLMValue>{assistant.llmsource}</LLMValue>
              </InfoItem>
              <InfoItem>
                <Label>Model:</Label> <ModelValue>{assistant.model}</ModelValue>
              </InfoItem>
            </CenteredInfo>
            <CreatedAt>{assistant.created_at}</CreatedAt>
            <ButtonsWrapper>
              <Button
                onClick={handleEditClick}
                intent={Intent.NONE}
                style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                minimal
                small
              >
                <Icon icon={'edit'} />
              </Button>
              <Button
                onClick={handleLocalDeleteClick}
                intent={Intent.DANGER}
                style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                minimal
                small
              >
                <Icon icon={'trash'} />
              </Button>
            </ButtonsWrapper>
          </FirstRow>
          <InfoItem>
            <Label>Instructions:</Label>
          </InfoItem>

          <Instructions>{assistant.instructions}</Instructions>
        </StyledAssistantItem>
      )}
      {isCurrentAssistantEditable && (
        <StyledAssistantItem edit={true}>
          <EditAssistantItem assistant={assistant} />
        </StyledAssistantItem>
      )}
      <DeleteConfirmationPopup
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => handleDeleteClick()}
        message={`Are you sure you want to delete Assistant "${assistant.name}"`}
      />
    </div>
  );
};

const StyledAssistantItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  height: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px ${color.Ubrightblue};
  background-color: ${color.Udarkgrey};
  margin: 20px auto;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: ${(props: { edit: boolean }) => (props.edit ? 'translateY(-4px)' : 'translateY(0px)')};

  &:hover {
    box-shadow: 0px 4px 25px ${color.Ubrightblue};
    transform: translateY(-4px);
  }
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  position: relative;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AssistantName = styled.div`
  font-weight: bold;
  font-size: 24px;
  max-width: 360px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CenteredInfo = styled.div`
  position: absolute; /* Add absolute positioning */
  left: 60%; /* Move to the horizontal center */
  transform: translateX(-60%); /* Center horizontally */
  display: flex;
  align-items: center;
`;

const InfoItem = styled.div`
  font-size: 16px;
  margin-right: 20px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const LLMValue = styled.div`
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ModelValue = styled.div`
  width: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CreatedAt = styled.div`
  font-size: 14px;
  margin-left: auto;
  margin-right: 5px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Instructions = styled.div`
  max-height: 35px;
  height: 35px;
  font-size: 14px;
  margin-top: 5px;
  white-space: pre-wrap;
  overflow-y: auto;
`;

export default AssistantItem;
