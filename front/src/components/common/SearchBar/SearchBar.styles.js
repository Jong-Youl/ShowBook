import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

export const StyledInput = styled.input`
  height: 50px;
  padding: 12px;
  font-size: 18px;
  background-color: var(--pure-white);
  border-bottom: 3px solid var(--main);
  width: 80%;
  transition: border-color 0.3s;
`;

export const StyledButton = styled.button`
  width: 10%;
  height: 50px;
  padding-right: 24px;
  border-bottom: 3px solid var(--main);
  background-color: var(--pure-white);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
`;
