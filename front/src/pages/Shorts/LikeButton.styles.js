import styled from 'styled-components';

// 여기서는 likeStatus를 직접적인 속성으로 전달하지 않습니다.
const StyledLikeButton = styled.button`
  width: 40px;
  height: 40px;

  background-color: var(--bg-beige);
  background-image: url(${(props) =>
    props.likestatus === 'true'
      ? '/img/icon/heartSelected.png'
      : '/img/icon/heartDeselected.png'});
  background-size: cover;
  border: none;
  cursor: pointer;
`;

export default StyledLikeButton;
