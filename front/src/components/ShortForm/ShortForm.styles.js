import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

export const StyledSwiperSlide = styled(SwiperSlide)`
  transform-origin: left center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 22px;
  font-weight: bold;
`;

export const StyledSwiper = styled(Swiper)`
  aspect-ratio: 3 / 5;

  width: 90svw;
  max-width: 100%;
`;
export const CurrentBookTitle = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  font-size: 24px;
  padding: 10px;
`;

export const CurrentBookLike = styled.div`
  position: absolute;
  top: 6vh;
  left: 50%;
  transform: translateX(0);
  max-width: 456px;
  font-size: 24px;
  padding-left: 150px;
  z-index: 1000;
`;

export const ProfileHeader = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
  aspect-ratio: 1;
  width: 20%;
  border-radius: 100%;
  margin-right: 5%;
  margin-left: 5%;
  border: 1px solid var(--bg-gray);
  cursor: pointer;
`;

export const Information = styled.div`
  margin-top: 20px;
`;

export const BookTitle = styled.div`
  width: 100%;
  max-width: 225px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 20px;
  font-weight: bold;
  text-align: left;
  color: #000000;
  cursor: pointer;
`;
export const Nickname = styled.div`
  font-size: 16px;
  font-weight: normal;
  text-align: left;
  color: #535353;
`;
