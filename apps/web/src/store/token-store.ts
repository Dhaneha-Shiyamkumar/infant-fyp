import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ITokenStore {
  token: string | null;
  setToken: (token: string) => void;
  clear: () => void;
}

export const useTokenStore = create<ITokenStore>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (token: string) => {
          set((_state) => ({
            token: token,
          }));
        },
        clear: () =>
          set(() => ({
            token: null,
          })),
      }),
      {
        name: 'token-storage',
      }
    )
  )
);
