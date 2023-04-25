import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export enum LanguagesEnum {
  SINHALA,
  ENGLISH,
  TAMIL,
}

interface ILanguageStore {
  lang: LanguagesEnum;
  setLang: (lang: LanguagesEnum) => void;
  clear: () => void;
}

export const useLanguageStore = create<ILanguageStore>()(
  devtools(
    persist(
      (set) => ({
        lang: LanguagesEnum.ENGLISH,
        setLang: (lang: LanguagesEnum) => {
          set((_state) => ({
            lang: lang,
          }));
        },
        clear: () =>
          set(() => ({
            lang: LanguagesEnum.ENGLISH,
          })),
      }),
      {
        name: 'lang-storage',
      }
    )
  )
);
