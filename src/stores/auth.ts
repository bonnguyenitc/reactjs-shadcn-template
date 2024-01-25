import { User, getUserApi } from '@/features/auth/api/auth';
import { storage } from '@/utils';
import { redirect } from '@tanstack/react-router';
import { create } from 'zustand';

type AuthStore = {
  user?: User;
  isLogged: boolean;
  checkLoggedAction: () => void;
  loginSuccessAction: (token: string) => void;
  logoutAction: () => void;
  setInfoUserAction: (user?: User) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  isLogged: false,

  checkLoggedAction: () => {
    const token = storage.getToken();
    set({
      isLogged: !!token,
    });
  },
  loginSuccessAction: (token) => {
    storage.setToken(token);
    set({
      isLogged: true,
    });
    window.location.href = '/';
  },
  logoutAction: () => {
    storage.clearToken();
    set({
      isLogged: false,
      user: undefined,
    });
    window.location.href = '/login';
  },
  setInfoUserAction: async (user) => {
    set({
      user,
    });
  },
}));
