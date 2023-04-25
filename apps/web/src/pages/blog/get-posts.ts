import { LanguagesEnum } from '../../store/language-store';
import english from './english';
import sinhala from './sinhala';
import tamil from './tamil';

export const getPosts = (lang: LanguagesEnum) => {
  switch (lang) {
    case LanguagesEnum.SINHALA:
      return sinhala;
    case LanguagesEnum.TAMIL:
      return tamil;
    default:
      return english;
  }
};
