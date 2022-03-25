import styled from 'styled-components';

export const HeaderStyle = styled.div`
  position: relative;
  z-index: 10;
  flex: 5;
  min-height: 80px;
`;

export const FooterStyle = styled.div`
  position: relative;
  width: 100%;
  flex: 5;
  z-index: 1;
  background-repeat: no-repeat;
  background-position-x: 50%;
  background-position-y: 0;
  background-size: 564px 40px;
`;

export const RegistrationWrapperStyle = styled.div`
  width: 100%;
  height: 100vh;
  background-color: grey;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const VideoOverlayStyle = styled.video`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
`;
