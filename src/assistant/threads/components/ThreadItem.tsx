import styled from '@emotion/styled';
import { Button, Icon, Intent, Menu, MenuItem, Popover } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';
import { AssistantThread } from '../../../api/assistant/types';
import { assistantActions, selectSelectedThreadId } from '../../../api/assistant/module';
import { AppDispatch } from '../../../api';
import { color } from '../../../styles/color';

// TODO: (ASSISTANT) make something better than text-overflow: ellipsis;

interface Props {
  assistantThread: AssistantThread;
  onDeleteClick: (deleteThread: AssistantThread) => void;
  onEditClick: (updateThreadName: AssistantThread) => void;
}

const ThreadItem = ({ assistantThread, onDeleteClick, onEditClick }: Props) => {
  const selectedAssistantId: string | null = useSelector(selectSelectedThreadId);
  const selectedThreadId: string | null = useSelector(selectSelectedThreadId);

  const dispatch = useDispatch<AppDispatch>();

  const onThreadClick = () => {
    dispatch(assistantActions.resetMessagesState());
    dispatch(
      assistantActions.getMessages({
        thread_id: assistantThread!.id,
        assistant_id: selectedAssistantId!,
      })
    );
    dispatch(assistantActions.selectThreadId({ thread_id: assistantThread.id }));
  };

  return (
    <ThreadItemContainer selected={selectedThreadId === assistantThread.id}>
      <ThreadNameContainer onClick={() => onThreadClick()}>{assistantThread.name}</ThreadNameContainer>
      <Popover
        usePortal
        placement="bottom-start"
        minimal
        content={
          <Menu style={{ minWidth: '35px', maxWidth: '35px', width: '35px' }}>
            <MenuItem
              icon={<Icon icon="edit" size={13} />}
              intent={Intent.WARNING}
              onClick={() => onEditClick(assistantThread)}
              text={undefined}
            />
            <MenuItem
              icon={<Icon icon="trash" size={13} />}
              intent={Intent.DANGER}
              onClick={() => onDeleteClick(assistantThread)}
              text={undefined}
            />
          </Menu>
        }
      >
        <Button icon={<Icon icon="more" size={13} />} minimal small />
      </Popover>
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
  padding: 8px;

  font-size: 18px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
