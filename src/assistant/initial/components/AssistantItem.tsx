import styled from '@emotion/styled';
import { Assistant } from '../../../api/assistant/types';
import { color } from '../../../styles/color';
import { Button, Icon, Intent } from '@blueprintjs/core';

interface Props {
  assistant: Assistant;
  onClick: (assistant: Assistant) => void;
}

const AssistantItem: React.FC<Props> = ({ assistant, onClick }) => {
  const handleEditClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    console.log('edit');
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    console.log('delete');
  };

  return (
    <StyledAssistantItem onClick={() => onClick(assistant)}>
      <FirstRow>
        <NameWrapper>
          <AssistantName>{assistant.name}</AssistantName>
        </NameWrapper>
        <CenteredInfo>
          <InfoItem>
            <Label>LLM:</Label> <Value>{assistant.llmsource}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Model:</Label> <Value>{assistant.model}</Value>
          </InfoItem>
        </CenteredInfo>
        <CreatedAt>{assistant.created_at}</CreatedAt>
        <ButtonsWrapper>
          <Button
            onClick={handleDeleteClick}
            intent={Intent.DANGER}
            style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
            minimal
            small
          >
            <Icon icon={'trash'} />
          </Button>
          <Button
            onClick={handleEditClick}
            intent={Intent.WARNING}
            style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
            minimal
            small
          >
            <Icon icon={'edit'} />
          </Button>
        </ButtonsWrapper>
      </FirstRow>

      <Instructions>{assistant.instructions}</Instructions>
    </StyledAssistantItem>
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

const Value = styled.span`
  max-width: 200px;
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
  font-size: 14px;
  margin-top: 5px;
  white-space: pre-wrap;
`;

export default AssistantItem;
