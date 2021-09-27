import {ApiRequest} from 'src/Models/ReduxModels';

export function fakeBackend(request: ApiRequest) {
  const {data, method, url} = request;

  if (url === '/Auth/Login/v2') {
    return new Promise(function(resolve, reject) {
      const response: any = {};

      resolve({data: response});
    });
  }

  return false;
}
