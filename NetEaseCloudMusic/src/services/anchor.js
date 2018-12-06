import request from '../utils/request';

const Url = 'http://123.206.55.50:14000'
export function getBanner() {
  return request(`${Url}/banner`);
}
