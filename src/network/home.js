import { request } from './request'
import Qs from 'qs'
export function getUserDesignatedTasks(params) {
  return request({
    url: '/DesignatedTasks/getUserDesignatedTasks',
    method: 'GET',
    params,
  })
}
export function getCompleteDesignatedTasks(params) {
  return request({
    url: '/DesignatedTasks/getCompleteDesignatedTasks',
    method: 'GET',
    params,
  })
}
export function getDesignatedTasks(params) {
  return request({
    url: '/DesignatedTasks/getDesignatedTasks',
    method: 'GET',
    params,
  })
}
export function getAddDesignatedTasks(params) {
  return request({
    url: '/DesignatedTasks/getAddDesignatedTasks',
    method: 'GET',
    params,
  })
}
export function getUserIndex(params) {
  return request({
    url: '/Index/index',
    method: 'GET',
    params,
  })
}

export function addDesignatedTasks(data) {
  return request({
    url: '/DesignatedTasks/addDesignatedTasks',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function uploadImage(data) {
  return request({
    url: '/materiel/uploadImage2',
    method: 'POST',
    data,
  })
}
export function editUser(data) {
  return request({
    url: '/login/editUser',
    method: 'POST',
    data,
  })
}
export function getCompleteOrderProduct(params) {
  return request({
    url: '/DeliverGoods/getCompleteOrderProduct',
    method: 'GET',
    params,
  })
}
export function changeProductStatus(params) {
  return request({
    url: '/DeliverGoods/changeProductStatus',
    method: 'GET',
    params,
  })
}
