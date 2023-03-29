import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface IUser {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: string;
}

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clear: () => void;
}

export const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: IUser) => {
          set((_state) => ({
            user: user,
          }));
        },
        clear: () =>
          set(() => ({
            user: null,
          })),
      }),
      {
        name: 'user-storage',
      }
    )
  )
);
