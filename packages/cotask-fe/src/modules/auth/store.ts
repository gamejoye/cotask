import { create } from 'zustand';

type StoreType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const useAuthStore = create<StoreType>(set => ({
  isAuthenticated: false,

  login: () => {
    set(() => ({
      isAuthenticated: true,
    }));
  },

  logout: () => {
    set(() => ({
      isAuthenticated: false,
    }));
  },
}));

export default useAuthStore;
