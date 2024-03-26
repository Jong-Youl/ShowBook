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
`;

export const ToggleButton = styled.button`
  border: 2px solid
    ${({ active }) => (active === 'true' ? 'var(--main)' : 'var(--bg-gray)')};
  background-color: ${({ active }) =>
    active === 'true' ? 'var(--main)' : 'var(--bg-beige)'};
  color: ${({ active }) =>
    active === 'true' ? 'var(--pure-white)' : 'var(--font-black)'};
  padding: 10px 20px;

  //border-radius: 30px;
  cursor: pointer;
`;

export const Content = styled.div`
  text-align: center;
  margin-top: 20px;
`;
