import React, {useState} from 'react';
import {AppLoading} from 'expo';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient, InMemoryCache, HttpLink} from 'apollo-client-preset';

import AppNavigation from "./src/navigation/AppNavigation";
import {bootstrap} from "./src/bootstrap";

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:4000'}),
  cache: new InMemoryCache()
});

export default function App() {
  const [isReady, setIsReady] = useState(false);
  if (!isReady) {
    return (
      <AppLoading onFinish={() => setIsReady(true)} startAsync={bootstrap}/>
    )
  }
  return (
    <ApolloProvider client={client}>
      <AppNavigation />
    </ApolloProvider>
  )
}
