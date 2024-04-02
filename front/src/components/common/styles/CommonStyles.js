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

export const ChartTitle = styled.h2`
  text-align: left;
  margin: 15px 15px 20px;
  font-size: 20px;
  font-weight: bold;
`;

export const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
`;

export const SmallButton = styled.button`
  padding: 10px 25px;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  background-color: ${({ $isactive }) =>
    $isactive ? 'var(--main)' : '#cccccc'};
  color: ${({ $isactive }) => ($isactive ? 'white' : 'white')};
  cursor: ${({ $isactive }) => ($isactive ? 'pointer' : 'not-allowed')};
  transition: background-color 0.3s ease;

  display: block;
  margin-left: auto;
  margin-right: 20px;
  margin-top: 15px;
  width: fit-content;
`;

export const TitleAndButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 제목과 버튼 사이 공간을 최대로 확보 */
  margin-bottom: 20px; /* 컨테이너 아래 여백 추가 */
`;

export const ArrowButton = styled.button`
  padding: 5px;
  font-size: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;