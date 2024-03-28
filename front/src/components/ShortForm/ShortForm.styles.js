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
  aspect-ratio: 3 / 4.43;

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
  bottom: 11vh;
  left: 50%;
  transform: translateX(0);
  max-width: 456px;
  font-size: 24px;
  padding-left: 150px;
`;
