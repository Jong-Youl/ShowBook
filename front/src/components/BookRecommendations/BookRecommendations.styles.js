import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

export const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
`;

export const StyledSwiper = styled(Swiper)`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 30vh;
  height: 45vh;
`;
