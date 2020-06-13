import { request } from './request'
import Qs from 'qs'

export function getReimbursementLists(params) {
  return request({
    url: '/Finance/getReimbursementList',
    method: 'GET',
    params,
  })
}

export function getAddReimbursement(params) {
  return request({
    url: '/Finance/getAddReimbursement',
    method: 'GET',
    params,
  })
}

export function addReimbursement(data) {
  return request({
    url: '/Finance/addReimbursement',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function reimbursementDetail(params) {
  return request({
    url: '/Finance/reimbursementDetail',
    method: 'GET',
    params,
  })
}
