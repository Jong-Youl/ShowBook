import styled, { css } from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 20px;
  color: #999;
  font-weight: normal;
  border: 2px solid var(--bg-gray);
  border-radius: 30px;
  padding: 8px 20px;
  margin-left: 10px;
  margin-right: 10px;

  ${(props) =>
    props.activeStep &&
    css`
      color: var(--main);
      border: 2px solid var(--main);
    `}
`;
export const ErrorMessage = styled.div`
  color: var(--main);
  margin: 10px 0;
  text-align: center;
  position: absolute; // 절대 위치 설정
  top: 50%; // 컨테이너 상단에 위치
  left: 0; // 왼쪽 정렬
  right: 0; // 오른쪽 정렬
  z-index: 10; // 다른 요소 위에 오버레이
`;
