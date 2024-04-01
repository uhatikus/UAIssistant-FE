import { Text } from '@blueprintjs/core';
import styled from '@emotion/styled';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GraphRenderer from './GraphRenderer';
import { AssistantMessage, AssistantMessageType, AssistantRole } from '../../../api/assistant/types';

const MessageRenderer = ({ message }: { message: AssistantMessage }) => {
  const { role, value } = message;
  const { type, content } = value;

  switch (type) {
    case AssistantMessageType.Text:
      return (
        <StyledMessage>
          <StyledRole>{role === AssistantRole.User ? 'You' : AssistantRole.Assistant}</StyledRole>
          <Markdown remarkPlugins={[remarkGfm]}>{content.message}</Markdown>
        </StyledMessage>
      );

    case AssistantMessageType.Plot:
      return (
        <StyledMessage>
          <StyledRole>{role === AssistantRole.User ? 'You' : AssistantRole.Assistant}</StyledRole>
          <GraphRenderer data={JSON.parse(content.raw_json).data} layout={JSON.parse(content.raw_json).layout} />
        </StyledMessage>
      );

    case AssistantMessageType.File:
      return (
        <StyledMessage>{/* <FileDownloader file_id={content.file_id} filename={content.filename} /> */}</StyledMessage>
      );
    default:
      return null;
  }
};

const StyledMessage = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  color: white;
  font-size: 18px;

  border-radius: 5px;
  width: fit-content;
  word-break: break-word;
`;

const StyledRole = styled(Text)`
  font-weight: bold;
  text-transform: capitalize;
  font-size: 20px;
  margin-bottom: 5px;
`;

export default MessageRenderer;
