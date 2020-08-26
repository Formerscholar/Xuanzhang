import { request } from './request'
import Qs from 'qs'

export function getMyMoneyLogLists(params) {
  return request({
    url: '/CustomerBank/getMyMoneyLogLists',
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
