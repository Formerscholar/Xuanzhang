import { request } from './request'
import Qs from 'qs'

export function getMaterielList(params) {
  return request({
    url: '/materiel/getMaterielList',
    method: 'GET',
    params,
  })
}
