import { atomFamily } from 'recoil';

export const likeStatusState = atomFamily({
  key: 'likeStatus',
  default: false,
});
