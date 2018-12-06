import request from '../utils/request';

const Url = 'http://123.206.55.50:14000'
export function getSearch(params) {
    // console.log('params...', params)
  return request(`${Url}/search?keywords= ${params.search}`);
}
