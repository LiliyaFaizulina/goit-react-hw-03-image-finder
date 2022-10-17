import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c2632;
  z-index: 12;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  cursor: auto;
`;

export const Image = styled.img`
  display: ${props => (props.loaded ? 'block' : 'none')};
  width: 70vw;
  height: auto;
  margin: 0 auto;
`;
