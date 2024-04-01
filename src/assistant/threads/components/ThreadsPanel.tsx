import _ from 'lodash';
import React from 'react';
import styled from '@emotion/styled';
import { Button, Icon } from '@blueprintjs/core';
import { useDispatch, useSelector } from 'react-redux';
import ThreadItem from './ThreadItem';
import { assistantActions, selectThreads } from '../../../api/assistant/module';
import { AssistantThread } from '../../../api/assistant/types';
import { color } from '../../../styles/color';
import { AppDispatch } from '../../../api';

const ThreadsPanel: React.FC = () => {
  //   const assistantThreads: AssistantThread[] = useSelector(selectThreads);
  const assistantThreads: AssistantThread[] = [
    {
      id: '121',
      name: 'new chat 1',
      assistant_id: '1',
      created_at: '2024-03-31 14:30:15',
    },
    {
      id: '122',
      name: 'new chat 2',
      assistant_id: '1',
      created_at: '2024-03-31 17:30:15',
    },
    {
      id: '123',
      name: 'new chat 3',
      assistant_id: '1',
      created_at: '2024-03-31 18:30:15',
    },
    {
      id: '124',
      name: 'new chat chat chat chat chat chat chat chat 4',
      assistant_id: '1',
      created_at: '2024-03-31 19:30:15',
    },
    {
      id: '125',
      name: 'new chat 5',
      assistant_id: '1',
      created_at: '2024-03-31 20:30:15',
    },
  ];

  //   const {
  //     deleteTargetThread,
  //     isThreadDeleteModalVisible,
  //     isDeleteThreadLoading,
  //     openThreadDeleteModal,
  //     closeThreadDeleteModal,
  //     deleteThread,
  //   } = useDeleteThreadModal();

  //   const {
  //     updateTargetThreadName,
  //     isThreadNameUpdateModalVisible,
  //     isUpdateThreadNameLoading,
  //     openThreadNameUpdateModal,
  //     closeThreadNameUpdateModal,
  //     updateThreadName,
  //   } = useUpdateThreadNameModal();

  const dispatch = useDispatch<AppDispatch>();

  const onNewChatClick = () => {
    dispatch(assistantActions.selectThreadId({ thread_id: null }));
    dispatch(assistantActions.resetMessagesState());
  };

  return (
    <>
      {/* {!_.isNull(deleteTargetThread) && (
        <DeleteModal
          isOpen={isThreadDeleteModalVisible}
          scope="Chat"
          name={deleteTargetThread!.name}
          isDeleteLoading={isDeleteThreadLoading}
          onDelete={deleteThread}
          onCloseSelf={closeThreadDeleteModal}
        />
      )}
      {!_.isNull(updateTargetThreadName) && (
        <RenameModal
          isOpen={isThreadNameUpdateModalVisible}
          scope="Chat"
          name={updateTargetThreadName.name}
          isRenameLoading={isUpdateThreadNameLoading}
          onRename={updateThreadName}
          onCloseSelf={closeThreadNameUpdateModal}
        />
      )} */}
      <ThreadsPanelContainer>
        <Button
          icon={<Icon icon="new-drawing" size={16} />}
          minimal
          text="New chat"
          style={{ marginBottom: '10px', fontSize: '20px', marginTop: '30px' }} //, backgroundColor: '#742ddd'
          onClick={() => onNewChatClick()}
        />
        <ThreadsContainer>
          {assistantThreads.map((thread) => {
            return <ThreadItem key={thread.id} assistantThread={thread} />;
          })}
        </ThreadsContainer>
      </ThreadsPanelContainer>
    </>
  );
};

export default ThreadsPanel;

const ThreadsPanelContainer = styled.div`
  width: 17%;
  height: calc(100vh - 60px);
  background-color: ${color.Udarkgrey};
  box-shadow: 0 0 15px ${color.Ubrightblue};

  display: flex;
  flex-direction: column;
`;

const ThreadsContainer = styled.div`
  overflow-y: auto;
`;
