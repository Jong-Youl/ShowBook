import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 85%;
`;

export const Heading = styled.span`
  margin-left: 5%;
  margin-bottom: 10px;
  width: 90%;
  color: ${(props) => props.color || 'var(--font-black)'};
  font-weight: ${(props) => (props.bold ? '920' : '620')};
  white-space: pre-wrap;
  font-size: large;
`;
export const SmallLetters = styled.span`
  font-weight: bold;
  margin-left: 5%;
  margin-bottom: 10px;
  width: 90%;
  color: var(--bg-gray);
  white-space: pre-wrap;
  font-size: small;
`;

export const CategoryButton = styled.button`
  margin-left: 5%;
  margin-bottom: 10px;
  padding: 10px 20px;
  border: 1px solid #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${(props) =>
    props.selected ? 'var(--wine5)' : 'var(--line-gray)'};
  color: ${(props) => (props.selected ? 'var(--main)' : 'var(--font-black)')};
  border-color: ${(props) =>
    props.selected ? 'var(--main)' : 'var(--bg-gray)'};
`;

export const InputText = styled.input`
  padding-bottom: 10px;
  border: 1px solid rgba(0, 0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
  margin-left: 5%;
  margin-bottom: 10%;
  width: 63%;
  border-bottom-color: var(--main);
`;

export const MarginBottom = styled.span`
  margin-bottom: 10%;
`;

export const Select = styled.select`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  background: white;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--main);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 5%;
  width: 90%;
  &:hover {
    background-color: var(--main);
  }
`;
