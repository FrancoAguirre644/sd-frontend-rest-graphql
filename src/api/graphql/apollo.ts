import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

import { API_CONFIG } from '../../config/api';

const httpLink = new HttpLink({
  uri: API_CONFIG.graphql.baseUrl,
});

export const apolloClient =
  new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });