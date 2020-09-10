import { request } from './request'
import Qs from 'qs'

export function getMyMoneyLogLists(params) {
  return request({
    url: '/CustomerBank/getMyMoneyLogLists',
    method: 'GET',
    params,
  })
}

export function getUserMoneyLogLists(params) {
  return request({
    url: '/CustomerBank/getUserMoneyLogLists',
    method: 'GET',
    params,
  })
}

// export function getEditMaterielStatus(data) {
//   return request({
//     url: '/materiel/getEditMaterielStatus',
//     method: 'POST',
//     data: Qs.stringify(data),
//   })
// }

export function getUserMoneyLogAccountsList(params) {
  return request({
    url: '/CustomerBank/getUserMoneyLogAccountsList',
    method: 'GET',
    params,
  })
}
