// LikeButton.js
import React from 'react';
import { useRecoilState } from 'recoil';
import { likeStatusState } from '../../lib/shortsRecoil';
import StyledLikeButton from './LikeButton.styles';

const LikeButton = ({ bookId }) => {
  const [likeStatus, setLikeStatus] = useRecoilState(likeStatusState(bookId));

  const toggleLike = () => {
    setLikeStatus(!likeStatus);
  };

  return (
    <StyledLikeButton
      onClick={toggleLike}
      likeStatus={likeStatus}
    ></StyledLikeButton>
  );
};

export default LikeButton;
