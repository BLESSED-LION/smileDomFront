// theme.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';

const lightTheme = {
  colors: {
    Primary: '#BFD101',
    Secondary: '#78579B',
    Accent: '#4B5200',
    Text: '#333333',
    Background: '#F5F5F5',
    Black: '#000',
    grey: '#e6e6e6',
    grey2: "#cecece",
    grey3: "#777777",
    grey4: '#434343',
    grey5: '#DBDBDB',
    White: "#ffff",
    accountText: '#2FA8E5',
    StatusBarColor: "dark",
    icon: '#777777',
    tabActive: '#2FA8E5',
    LoadingBG: '#000000',
    yellow: "#FBB635"
  },
  // ... other theme properties
};

const darkTheme = {
  colors: {
    Primary: '#0D0B31',
    Secondary: '#5A4884',
    Accent: '#874DC0',
    Text: '#FFFFFF',
    Background: '#121212',
    Black: '#000000',
    grey: '#333333',
    grey2: '#1E1E1E',
    grey3: '#555555',
    grey4: '#4C4C4C',
    grey5: '#808080',
    White: '#e6e6e6',
    accountText: '#FFFFFF',
    StatusBarColor: "light",
    icon: '#FFFFFF',
    tabActive: '#874DC0',
    LoadingBG: '#F5F5F5',
  },
  // ... other theme properties
};

export { lightTheme, darkTheme };

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  // Load theme from AsyncStorage on app start
  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme === 'dark') {
          setTheme(darkTheme);
        } else {
          setTheme(lightTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        // If there is an error, default to the light theme
        setTheme(lightTheme);
      }
    }
    loadTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(newTheme);

    // Save the selected theme to AsyncStorage
    AsyncStorage.setItem('theme', newTheme === darkTheme ? 'dark' : 'light');
  };

  // Set the StatusBar style based on the theme
  useEffect(() => {
    StatusBar.setBarStyle(theme === lightTheme ? 'dark-content' : 'light-content');
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
