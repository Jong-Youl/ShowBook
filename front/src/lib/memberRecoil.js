import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'localStorage',
  storage: localStorage,
});

export const memberState = atom({
  key: 'member',
  default: { email: '', name: '' },
  effects_UNSTABLE: [persistAtom],
});

export const loginState = atom({
  key: 'login',
  default: localStorage.getItem('accessToken') ? true : false,
});
