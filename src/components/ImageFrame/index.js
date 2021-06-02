import styled from "styled-components";

const ImageFrame = styled.div`
  min-width: 72px;
  max-width: 92px;
  width: 30vw;
  height: 30vw;
  max-height: 88px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.05);
  background-image: url(${({ img }) => `${img}`});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 16px;
`;

export default ImageFrame;
