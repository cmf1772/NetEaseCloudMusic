import request from '../utils/request';

const Url = 'http://123.206.55.50:14000'
export function login(params) {
  return request(`${Url}/login/cellphone?phone=${params.user}&password=${params.password}`);
}
