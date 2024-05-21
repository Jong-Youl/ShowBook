// LikeButton.js
import React from 'react';
import { useRecoilState } from 'recoil';
import { likeStatusState } from '../../lib/shortsRecoil';
import StyledLikeButton from './LikeButton.styles';
import { likeShook } from '../../api/ShookService';

const LikeButton = ({ shookId }) => {
  const [likeStatus, setLikeStatus] = useRecoilState(likeStatusState(shookId));

  const toggleLike = () => {
    if (likeShook({ shookId })) {
      setLikeStatus(!likeStatus);
    }
  };

  return (
    <StyledLikeButton
      onClick={toggleLike}
      likestatus={likeStatus.toString()}
    ></StyledLikeButton>
  );
};

export default LikeButton;
