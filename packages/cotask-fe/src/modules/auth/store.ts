import { User } from '@cotask/types';
import { create } from 'zustand';

type StoreType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const useAuthStore = create<StoreType>(set => ({
  user: null,
  isAuthenticated: false,

  login: (user: User) => {
    set(() => ({
      isAuthenticated: true,
      user,
    }));
  },

  logout: () => {
    set(() => ({
      isAuthenticated: false,
      user: null,
    }));
  },
}));

export default useAuthStore;
