import {createContext, useContext} from 'react';
import {ThemeData} from 'presentation/presentation';

export const ThemeContext = createContext<ThemeData | null>(null);

export const useTheme = (): ThemeData => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};
