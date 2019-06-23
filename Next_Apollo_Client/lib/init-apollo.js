import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

import { resolvers, typeDefs } from '../resolvers';

let apolloClient = null

function create (initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  // console.log('initialState..........', initialState);
  const cache = new InMemoryCache().restore(initialState || {});
  //default state
  cache.writeData({
    data: {
      isLoggedIn: true
    }
  })
  return new ApolloClient({
    connectToDevTools: true, //process.browser, //as to enable devtools made it to true
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: 'http://localhost:9000/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      // Use fetch() polyfill on the server
      fetch: !process.browser && fetch
    }),
    cache,
    typeDefs,
    resolvers
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
