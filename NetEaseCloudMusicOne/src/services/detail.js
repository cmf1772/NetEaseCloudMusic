import request from '../utils/request';

const Url = 'http://123.206.55.50:14000'
export function detail(params) {
    // console.log('parmas', params)
  return request(`${Url}/song/detail?ids=${params}`);
}

export function getUrl(params) {
  // console.log('parmas', params)
return request(`${Url}/song/url?id=${params}`);
}
