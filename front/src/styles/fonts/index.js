import { createGlobalStyle } from 'styled-components';
import Pretendard from './Pretendard-Regular.woff';
import Pretendard2 from './Pretendard-Regular.woff2';
import PretendardTtf from './Pretendard-Regular.ttf';

export default createGlobalStyle`
  @font-face {
    font-family: "Pretendard";
    src: url(${Pretendard}) format("woff"),
         url(${Pretendard2}) format("woff2"),
         url(${PretendardTtf}) format("truetype");
  }
`;
