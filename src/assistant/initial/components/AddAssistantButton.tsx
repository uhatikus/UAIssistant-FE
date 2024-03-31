import styled from '@emotion/styled';
import { color } from '../../../styles/color';
import { Icon } from '@blueprintjs/core';

const AddAssistantButton = () => {
  return (
    <StyledAddAssistantButton>
      <Icon icon={'plus'} />
    </StyledAddAssistantButton>
  );
};

const StyledAddAssistantButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  height: 70px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px ${color.Ubrightblue};
  background-color: ${color.Udarkgrey};
  margin: 80px auto 20px auto;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 4px 25px ${color.Ubrightblue};
    transform: translateY(-4px);
  }

  &:focus {
    outline: none;
  }
`;

export default AddAssistantButton;
