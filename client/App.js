import React, {useState} from 'react';
import {AppLoading} from 'expo';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient, InMemoryCache} from 'apollo-client-preset';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import {AsyncStorage} from 'react-native';
import {Provider} from 'react-redux';

import AppNavigation from "./src/navigation/AppNavigation";
import {bootstrap} from "./src/bootstrap";
import store from "./src/store";

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('@ecommerce/token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(createUploadLink(
    {uri: 'http://localhost:4000'}
  )),
  cache: new InMemoryCache(),
  request: operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include',
      }
    });
  },
});

export default function App() {
  const [isReady, setIsReady] = useState(false);
  if (!isReady) {
    return (
      <AppLoading onFinish={() => setIsReady(true)} startAsync={bootstrap}/>
    )
  }
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AppNavigation />
      </ApolloProvider>
    </Provider>
  )
}
