import { request } from './request'
import Qs from 'qs'

export function getlogin(params) {
  return request({
    url: '/login/login',
    params,
  })
}

export function getIndex(data) {
  return request({
    url: '/Login/index',
    method: 'POST',
    data,
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'POST',
  })
}

export function getUserList(params) {
  return request({
    url: '/login/getUserList',
    params,
  })
}
export function getDepartments(params) {
  return request({
    url: '/SystemSetup/getDepartments',
    params,
  })
}
export function getRoles(params) {
  return request({
    url: '/Login/getRoles',
    params,
  })
}
export function addUser(data) {
  return request({
    method: 'POST',
    url: '/Login/addUser',
    data,
  })
}
export function getAppVersion(params) {
  return request({
    url: '/Customer/getAppVersion',
    params,
  })
}

export function editUserStatus(data) {
  return request({
    method: 'POST',
    url: '/Login/editUserStatus',
    data: Qs.stringify(data),
  })
}

export function getEditUserNew(data) {
  return request({
    method: 'POST',
    url: '/Login/getEditUserNew',
    data: Qs.stringify(data),
  })
}

export function editUser(data) {
  return request({
    method: 'POST',
    url: '/Login/editUser',
    data,
  })
}
