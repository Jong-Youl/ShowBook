import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
  aspect-ratio: 1;
  width: 20%;
  border-radius: 100%;
  margin-right: 5%;
  margin-left: 5%;
  border: 1px solid var(--bg-gray);
`;

export const Nickname = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-right: auto;
`;

export const EditLink = styled.a`
  color: var(--bg-gray);
  cursor: pointer;
  font-size: small;
`;

export const ToggleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ToggleButton = styled.button`
  background-color: ${({ active }) => (active ? 'var(--main)' : 'gray')};
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
`;

export const Content = styled.div`
  text-align: center;
`;
