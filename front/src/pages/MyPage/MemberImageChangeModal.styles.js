import styled from 'styled-components';


export const ModalWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  height: 40%;
  width: 100%;
  max-width: 456px;
  border-radius: 15px 15px 0 0;
  transform: translateX(-50%);
  background-color: var(--bg-beige);
  padding: 20px;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--bg-beige);
  font-size: 30px;
  padding-right: 12px;
`;

export const ProfileImageInModal = styled.img`
  aspect-ratio: 1;
  width: 50%;
  border-radius: 100%;
  margin-right: 5%;
  margin-left: 5%;
  border: 1px solid var(--bg-gray);
`;

export const CurrentProfileImageInModal = styled.div`
  aspect-ratio: 1;
  width: 50%;
  border-radius: 100%;
  margin-right: 5%;
  margin-left: 5%;
  border: 1px solid var(--bg-gray);
`;

export const ProfileImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top:20px;
`

export const UploadButton = styled.button`
  background-color: var(--bg-beige);
  padding: 10px;
  border: none;
  margin-top: 20px;
  font-size:24px;
  cursor: pointer;
`;

export const ImageName = styled.button`
  background-color: var(--bg-beige);
  padding: 10px;
  border: none;
  margin-top: 20px;
  font-size:24px;
`;

export const ModalButton = styled.button`
  padding: 10px;
  font-size: large;
  margin: 10px 5px 5px;
  background-color:var(--main);
  border-radius: 15px;
  cursor: pointer;

  width: 120px;
  flex-grow: 1;
  color: var(--pure-white);
  margin-top:20px;
`

export const TitleStyle = styled.div`
    text-align: center;
    font-size: 32px;

`