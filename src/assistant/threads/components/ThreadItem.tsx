import styled from '@emotion/styled';
import { Button, Icon, InputGroup, Intent, Menu, MenuItem, Popover } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';
import { AssistantThread } from '../../../api/assistant/types';
import { assistantActions, selectSelectedThreadId } from '../../../api/assistant/module';
import { AppDispatch } from '../../../api';
import { color } from '../../../styles/color';
import { useState } from 'react';
import DeleteConfirmationPopup from '../../../shared/components/DeleteConfirmationPopup';
import { useParams } from 'react-router-dom';

// TODO: (ASSISTANT) make something better than text-overflow: ellipsis;

interface Props {
  assistantThread: AssistantThread;
}

const ThreadItem = ({ assistantThread }: Props) => {
  const { assistantId } = useParams<{ assistantId: string }>();
  const selectedThreadId: string | null = useSelector(selectSelectedThreadId);
  const [name, setName] = useState(assistantThread.name);
  const [isEditableName, setIsEditableName] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleEditClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsEditableName(true);
  };

  const handleSaveClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsEditableName(false);
    dispatch(
      assistantActions.updateThread({
        assistant_id: assistantThread.assistant_id,
        thread_id: assistantThread.id,
        name: name!,
      })
    );
  };

  const handleLocalDeleteClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    setIsDeleteOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(false);
    dispatch(assistantActions.deleteThread({ assistant_id: assistantId!, thread_id: assistantThread.id }));
  };

  const onThreadClick = () => {
    dispatch(assistantActions.resetMessagesState());
    dispatch(
      assistantActions.getMessages({
        thread_id: assistantThread!.id,
        assistant_id: assistantId!,
      })
    );
    dispatch(assistantActions.selectThreadId({ thread_id: assistantThread.id }));
  };

  return (
    <ThreadItemContainer selected={selectedThreadId === assistantThread.id}>
      {!isEditableName && (
        <ThreadNameContainer onClick={() => onThreadClick()}>{assistantThread.name}</ThreadNameContainer>
      )}
      {isEditableName && (
        <InputGroup
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Thread Name"
          style={{ width: '230px', padding: '8px 35px', marginLeft: '30px', fontSize: '18px' }}
        />
      )}
      {!isEditableName && (
        <Button
          onClick={handleEditClick}
          intent={Intent.NONE}
          style={{ marginLeft: '0px', cursor: 'pointer', borderRadius: '4px' }}
          minimal
          small
        >
          <Icon icon={'edit'} />
        </Button>
      )}

      {isEditableName && (
        <Button
          onClick={handleSaveClick}
          intent={Intent.SUCCESS}
          style={{ marginLeft: '0px', cursor: 'pointer', borderRadius: '4px' }}
          minimal
          small
          disabled={name === ''}
        >
          <Icon icon={'tick'} />
        </Button>
      )}
      <Button
        onClick={handleLocalDeleteClick}
        intent={Intent.DANGER}
        style={{ marginRight: '10px', cursor: 'pointer', borderRadius: '4px' }}
        minimal
        small
      >
        <Icon icon={'trash'} />
      </Button>
      <DeleteConfirmationPopup
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => handleDeleteClick()}
        message={`Are you sure you want to delete chat "${assistantThread.name}"`}
      />
    </ThreadItemContainer>
  );
};

export default ThreadItem;

const ThreadItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  box-shadow: 0px -20px 20px -20px ${(props: { selected: boolean }) => (props.selected ? color.Ubrightblue : 'initial')}
    inset;

  cursor: pointer;
  :hover {
    box-shadow: 0px -20px 20px -20px
      ${(props: { selected: boolean }) => (props.selected ? color.Ubrightblue : color.Udarkblue)} inset;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ThreadNameContainer = styled.div`
  width: 100%;
  height: 40px;
  min-height: 40px;
  max-height: 40px;
  padding: 8px 35px;

  font-size: 18px;
  font-weight: 450;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
