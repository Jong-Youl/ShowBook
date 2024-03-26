import styled from 'styled-components';

export const ImageUploadContainer = styled.div`
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  margin: 20px 20px 0px;
  cursor: pointer;
  background-color: #d0d0d0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${({ backgroundImage }) =>
    backgroundImage
      ? `url(${backgroundImage})`
      : "url('/path/to/your/default/upload-icon.png')"};
  height: 70svh;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;
