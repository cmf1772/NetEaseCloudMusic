import request from '../utils/request';

const Url = 'http://123.206.55.50:14000'
export function detail(params) {
    // console.log('parmas', params)
  return request(`${Url}/song/detail?ids=${params}`);
}

export function getUrl(id) {
  // console.log('parmas', id)
return request(`${Url}/song/url?id=${id}`);
}

export function getSearch(params) {
  // console.log('params...', params)
return request(`${Url}/search?keywords= ${params.search}`);
}

