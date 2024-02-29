import React, { useContext } from 'react';
import { ThemeContext } from '@/context/themeContext';

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  // const toggleTheme = () => {
  //   setThemeName(themeName === 'light' ? 'dark' : 'light');
  // };
  return <button onClick={toggleTheme}>{themeName}</button>;
};

export default ThemeSwitcher;
