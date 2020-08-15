import { request } from './request'
import Qs from 'qs'

export function getReimbursementList(params) {
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

export function deleteReimbursement(data) {
  return request({
    url: '/Finance/deleteReimbursement',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function toExamineReimbursement(data) {
  return request({
    url: '/Finance/toExamineReimbursement',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function getUserReimbursementList(params) {
  return request({
    url: '/Finance/getUserReimbursementList',
    method: 'GET',
    params,
  })
}

export function getMyToExamineReimbursementList(params) {
  return request({
    url: '/Finance/getMyToExamineReimbursementList',
    method: 'GET',
    params,
  })
}

export function getEditReimbursement(params) {
  return request({
    url: '/Finance/getEditReimbursement',
    method: 'GET',
    params,
  })
}
export function editReimbursement(data) {
  return request({
    url: '/Finance/editReimbursement',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function cancelToExamineReimbursement(data) {
  return request({
    url: '/Finance/cancelToExamineReimbursement',
    method: 'POST',
    data: Qs.stringify(data),
  })
}