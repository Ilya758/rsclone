import styled from 'styled-components';

export const WrapperStyle = styled.div`
  margin: 5px 0px;
  margin-bottom: auto;
  border: 1px solid rgba(50, 39, 27, 1);
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InsideWrapperStyle = styled.div`
  margin: 1px;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, green 100%, black 100%, red 100%);
  display: flex;
  align-items: center;
  padding: 0px 5px;
  justify-content: center;
`;
