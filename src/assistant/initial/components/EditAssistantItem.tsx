import _ from 'lodash';
import styled from '@emotion/styled';
import { Assistant, LLMList, LLMModelsDictionary, LLMSource } from '../../../api/assistant/types';
import { Button, InputGroup, Intent, Menu, MenuItem, Popover, Position, TextArea } from '@blueprintjs/core';
import { useState } from 'react';
import { color } from '../../../styles/color';
import { useRecoilState } from 'recoil';
import { assistantCreationState, assistantEditingState } from '../../assistant.store';
import { useDispatch } from 'react-redux';
import { assistantActions } from '../../../api/assistant/module';
import { AppDispatch } from '../../../api';

interface Props {
  assistant?: Assistant;
}

const EditAssistantItem: React.FC<Props> = ({ assistant }) => {
  const [name, setName] = useState(assistant?.name);
  const [instructions, setInstructions] = useState(assistant?.instructions);
  const [selectedLLM, setCurrentLLMState] = useState(assistant?.llmsource ?? LLMSource.OpenAI);
  const [selectedModel, setCurrentModelState] = useState(assistant?.model ?? LLMModelsDictionary[selectedLLM][0]);

  const [isCreation, setIsCreation] = useRecoilState(assistantCreationState);
  const [editableAssistant, setEditableAssistant] = useRecoilState(assistantEditingState);

  const isCurrentAssistantEditable: boolean = !isCreation && assistant?.id === editableAssistant?.id;

  const dispatch = useDispatch<AppDispatch>();

  const handleSaveClick = () => {
    if (_.isUndefined(assistant)) {
      // save new assistant
      //   TODO: Add loadinng
      dispatch(
        assistantActions.createAssistant({
          name: name!,
          instructions: instructions!,
          llmsource: selectedLLM,
          model: selectedModel,
        })
      );
    } else {
      // update old assistant
      //   TODO: Add loadinng
      dispatch(
        assistantActions.updateAssistant({
          assistant_id: assistant!.id,
          name: name!,
          instructions: instructions!,
          model: selectedModel,
        })
      );
    }
    setIsCreation(false);
    setEditableAssistant(null);
    // Add your save logic here
  };

  return (
    <StyledEditableAssistantItem>
      <FirstRow>
        <NameWrapper>
          <AssistantName>
            <InputGroup
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Assistant Name"
              style={{ width: '300px', boxShadow: `0px -2px 10px -2px ${color.Ubrightblue} inset` }}
            />
          </AssistantName>
        </NameWrapper>
        <CenteredInfo>
          <InfoItem>
            <Label>LLM:</Label>{' '}
            {!isCurrentAssistantEditable && (
              <Value>
                <Popover
                  position={Position.BOTTOM}
                  captureDismiss
                  minimal
                  content={
                    <StyledMenu
                      style={{
                        backgroundColor: color.Udarkgrey,
                        width: '120px',
                        maxWidth: '120px',
                        minWidth: '120px',
                      }}
                    >
                      {LLMList.map((llm) => (
                        <MenuItem
                          style={{ width: '110px', maxWidth: '110px' }}
                          key={llm}
                          text={llm}
                          onClick={() => {
                            setCurrentLLMState(llm);
                            setCurrentModelState(LLMModelsDictionary[llm][0]);
                          }}
                        />
                      ))}
                    </StyledMenu>
                  }
                >
                  <StyledButton
                    style={{
                      backgroundColor: color.Udarkgrey,
                      width: '120px',
                      boxShadow: `0px -2px 10px -2px ${color.Ubrightblue} inset`,
                    }}
                    text={selectedLLM}
                    rightIcon="caret-down"
                  />
                </Popover>
              </Value>
            )}
            {isCurrentAssistantEditable && <Value>{assistant?.llmsource}</Value>}
          </InfoItem>
          <InfoItem>
            <Label>Model:</Label>{' '}
            <Value>
              <Popover
                position={Position.BOTTOM}
                captureDismiss
                minimal
                content={
                  <StyledMenu style={{ backgroundColor: color.Udarkgrey, width: '220px', maxWidth: '220px' }}>
                    {LLMModelsDictionary[selectedLLM].map((model) => (
                      <MenuItem
                        style={{ width: '210px', maxWidth: '210px' }}
                        key={model}
                        text={model}
                        onClick={() => setCurrentModelState(model)}
                      />
                    ))}
                  </StyledMenu>
                }
              >
                <StyledButton
                  style={{
                    backgroundColor: color.Udarkgrey,
                    boxShadow: `0px -2px 10px -2px ${color.Ubrightblue} inset`,
                    width: '220px',
                  }}
                  text={selectedModel}
                  rightIcon="caret-down"
                />
              </Popover>
            </Value>
          </InfoItem>
        </CenteredInfo>
        <ButtonsWrapper>
          <Button
            onClick={handleSaveClick}
            intent={Intent.SUCCESS}
            style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
            icon="tick"
            text="Save"
            disabled={_.isUndefined(name) || name === ''}
          ></Button>
          <Button
            onClick={() => {
              setIsCreation(false);
              setEditableAssistant(null);
            }}
            intent={Intent.NONE}
            style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
            text="Cancel"
          ></Button>
        </ButtonsWrapper>
      </FirstRow>
      <InfoItem>
        <Label>Instructions:</Label>
      </InfoItem>
      <TextArea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Enter Instructions"
        fill
        style={{
          width: '970px',

          height: '45px',
          // overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap',
          boxShadow: `0px -2px 10px -2px ${color.Ubrightblue} inset`,
        }}
      />
    </StyledEditableAssistantItem>
  );
};

// const styledEditableAssistantItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   max-width: 1000px;
//   height: auto;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0px 2px 10px ${color.Ubrightblue};
//   background-color: ${color.Udarkgrey};
//   margin: 20px auto;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover {
//     box-shadow: 0px 4px 25px ${color.Ubrightblue};
//     transform: translateY(-4px);
//   }
// `;

const StyledEditableAssistantItem = styled.div`
  width: 100%;
  height: 110.7px;
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
  min-width: 100%;
  max-height: 35px;
  height: 35px;
  font-size: 14px;
  margin-top: 5px;
  white-space: pre-wrap;
  overflow-y: auto;
`;

const StyledMenu = styled(Menu)`
  /* padding-block: 10px; */
  max-height: 300px;
  overflow-y: auto;
  text-overflow: ellipsis;
  background-color: ${color.Udarkgrey};
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

const StyledButton = styled(Button)`
  white-space: nowrap;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default EditAssistantItem;
