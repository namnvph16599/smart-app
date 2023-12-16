import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BASE_URL + '/graphql',
  includeExtensions: true,
});

export const client = new ApolloClient({
  name: 'mobile',
  link: from([httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
  },
});
