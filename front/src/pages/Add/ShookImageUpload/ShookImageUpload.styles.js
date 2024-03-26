import styled from 'styled-components';

export const ImageUploadContainer = styled.div`
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  margin: 20px 20px 5px;
  cursor: pointer;
  background-color: #d0d0d0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${({ backgroundimage }) =>
    backgroundimage
      ? `url(${backgroundimage})`
      : "url('/path/to/your/default/upload-icon.png')"};
  height: 65svh;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;
