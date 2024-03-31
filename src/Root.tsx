import styled from '@emotion/styled';
import { color } from './styles/color';
import AssistantsRoot from './assistant/AssistantsRoot';
import { useNavigate } from 'react-router-dom';

const Root = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to home page
    navigate('/assistants');
  };

  return (
    <StyledMain className="bp5-dark">
      <Background />
      <StyledTopBar>
        <div
          onClick={handleClick}
          className="logo-container"
          style={{ width: '47px', height: '58px', overflow: 'hidden', cursor: 'pointer' }}
        >
          <img src="/logo.png" alt="s" style={{ height: '100%', width: 'auto' }} />
        </div>
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          AIssistant
        </div>
      </StyledTopBar>
      <AssistantsRoot />
    </StyledMain>
  );
};

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${color.Udarkgrey};
  z-index: -1; /* Ensure the background stays behind other content */
`;

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTopBar = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  min-height: 60px;
  padding: 0 20px;
  background-color: black;
  box-shadow: 0 0 40px ${color.Ubrightblue};
  font-weight: 500;
  font-size: 39px;
  position: relative;
`;

export default Root;
