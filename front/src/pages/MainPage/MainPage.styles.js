import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 80vh;
`;

export const RightAlignedButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-right: 10px;
`;

export const Heading = styled.span`
  color: ${(props) => props.color || 'var(--font-black)'};
  font-weight: ${(props) => (props.bold ? '920' : '620')};
  white-space: pre-wrap;
  font-size: large;
  padding: 5px;
`;


export const Loading = styled.span`
  color: ${(props) => props.color || 'var(--font-black)'};
  font-weight: ${(props) => (props.bold ? '920' : '620')};
  white-space: pre-wrap;
  font-size: 32px;
  padding: 5px;
`;