import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './app/constants/theme';
import AppNavigator from "./app/navigators/AppNavigator";
import { Provider, useDispatch } from 'react-redux';
import { store } from './app/store';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// import { TwilioVideo } from 'react-native-twilio-video-webrtc';

const client = new ApolloClient({
  uri: 'https://smiledomapi-production.up.railway.app/',
  cache: new InMemoryCache(),
});

export default function App() {
  const [userRole, setUserRole] = useState('');

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
      <ThemeProvider >
        <StatusBar backgroundColor={'#BFD101'} />
        <NavigationContainer>
          <AppNavigator
            type={userRole === '' ? 'patient' : userRole}
          />
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
    </ApolloProvider>
  );
}