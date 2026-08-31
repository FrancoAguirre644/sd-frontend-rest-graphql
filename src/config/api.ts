const restApiUrl = import.meta.env.VITE_REST_API_URL;
const graphqlApiUrl = import.meta.env.VITE_GRAPHQL_API_URL;

if (!restApiUrl) {
  throw new Error('VITE_REST_API_URL is not configured');
}

if (!graphqlApiUrl) {
  throw new Error('VITE_GRAPHQL_API_URL is not configured');
}

export const API_CONFIG = {
  rest: {
    baseUrl: restApiUrl,
  },
  graphql: {
    url: graphqlApiUrl,
  },
};