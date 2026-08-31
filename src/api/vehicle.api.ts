import * as restApi from './rest/vehicle.api';
import * as graphqlApi from './graphql/vehicle.api';

export type ApiType = 'rest' | 'graphql';

const apiClients = {
  rest: restApi,
  graphql: graphqlApi,
};

export function getVehicleApi(apiType: ApiType) {
  return apiClients[apiType];
}