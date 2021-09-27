import axios, {AxiosRequestConfig, ResponseType} from 'axios';

import {Action} from 'src/Models/ReduxModels';
import {Environments} from 'src/Models/ConfigModels';
import {fakeBackend} from './Mock/fake-backend';
import store from 'src/Store/store';

export type UrlApis = '' | 'local' | 'postman' | 'viacep' | 'paypal';

function getClient(client: UrlApis, environment: Environments) {
  let baseURL = 'https://gamerapp-api.azurewebsites.net';
  let responseType: ResponseType = 'json';

  switch (client) {
    case 'local': {
      baseURL = 'http://192.168.0.14:3000';
      break;
    }

    case 'postman': {
      baseURL = 'https://0a18dae5-6691-4d6e-b1d9-f9bd6e0e2a23.mock.pstmn.io';
      break;
    }

    case 'viacep': {
      baseURL = 'https://viacep.com.br/';
      break;
    }

    case 'paypal': {
      baseURL =
        environment === 'production'
          ? 'https://api.paypal.com'
          : 'https://api.sandbox.paypal.com';
      break;
    }

    default: {
      baseURL =
        environment === 'production'
          ? 'https://gamerapp-api.azurewebsites.net'
          : environment === 'development'
          ? 'https://gamerapp-api-dev.azurewebsites.net'
          : 'https://0a18dae5-6691-4d6e-b1d9-f9bd6e0e2a23.mock.pstmn.io';
      break;
    }
  }

  return axios.create({
    baseURL,
    responseType,
  });
}

async function Api(action: Action<any>, noAuth?: boolean) {
  const state = store.getState();
  const apiClient: UrlApis = action.payload.client || '';

  const {environment} = state.config;

  const client = getClient(apiClient, environment);

  client.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      const {response} = error;
      const {data} = response;

      return Promise.reject(data || response || error);
    },
  );

  const {data, method, url} = action.payload.request;

  const fakeBackendResponse = fakeBackend(action.payload.request);

  if (fakeBackendResponse) {
    return fakeBackendResponse;
  }

  let config: AxiosRequestConfig = {};

  if (action.payload.client === 'paypal') {
    const {bearerToken} = state.paypal;

    config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
    };
  } else {
    if (!noAuth) {
      const {token} = state.user;

      config = {
        withCredentials: true,
        headers: {
          Authorization: `bearer ${token}`,
        },
      };
    }
  }

  if (method === 'POST') {
    return client.post(url, data, config);
  } else if (method === 'PUT') {
    return client.put(url, data, config);
  } else if (method === 'DELETE') {
    return client.delete(url, config);
  }

  return client.get(url, data);
}

export default Api;
