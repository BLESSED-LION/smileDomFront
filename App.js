import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './app/constants/theme';
import AppNavigator from "./app/navigators/AppNavigator";
import SignUpScreen from './app/screens/SignUpScreen'
import { Provider } from 'react-redux';
import store from './app/store';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './app/constants/theme';

export default function App() {
  // const {theme} = useTheme()
  return (
    <ThemeProvider >
      <Provider store={store}>
        {/* <StatusBar backgroundColor="#0D0B31" barStyle="light-content" /> */}
        <NavigationContainer>
          <AppNavigator />
          <Toast />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}