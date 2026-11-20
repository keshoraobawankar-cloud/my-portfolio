import { createContext, useContext } from 'react';
import { Locale } from '../types';

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  toggleLocale: () => {},
});

export function useLocale() {
  return useContext(LocaleContext);
}
