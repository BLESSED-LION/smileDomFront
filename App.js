import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './app/constants/theme';
import AppNavigator from "./app/navigators/AppNavigator";
import { Provider, useDispatch } from 'react-redux';
import { store } from './app/store';
import Toast from 'react-native-toast-message';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// import { TwilioVideo } from 'react-native-twilio-video-webrtc';

const httpLink = new HttpLink({
  uri: 'https://smiledomapi-production.up.railway.app/graphql',
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  if (networkError) console.error(`[Network error]: ${JSON.stringify(networkError, null, 2)})`)
})

const authLink = setContext((_, { headers }) => {
  const state = store.getState();
  const token = state.user.token;
  console.log(token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(httpLink),
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