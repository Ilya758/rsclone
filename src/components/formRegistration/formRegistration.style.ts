import styled, { keyframes } from 'styled-components';

const showForm = keyframes`
  0% {
    opacity: 0;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const WrapperStyle = styled.form`
  width: 100%;
  height: 100%;
  padding: 40px;
  animation: ${showForm} 2.2s linear;
  box-sizing: border-box;
  color: white;
`;

export const HeaderStyle = styled.h1`
  padding: 0px;
  font-size: 18px;
  margin: 0px;
  color: white;
`;
