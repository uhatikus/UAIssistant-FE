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
  const assistantThreads: AssistantThread[] = useSelector(selectThreads);

  const dispatch = useDispatch<AppDispatch>();

  const onNewChatClick = () => {
    dispatch(assistantActions.selectThreadId({ thread_id: null }));
    dispatch(assistantActions.resetMessagesState());
  };

  return (
    <>
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
