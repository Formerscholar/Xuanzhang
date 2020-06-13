import { request } from './request'
import Qs from 'qs'

export function getDistributors(params) {
  return request({
    url: '/CustomerMarketing/getDistributors',
    method: 'GET',
    params,
  })
}
export function getSuppliers(params) {
  return request({
    url: '/CustomerMarketing/getSuppliers',
    method: 'GET',
    params,
  })
}
export function getDistributorUser() {
  return request({
    url: '/CustomerMarketing/getDistributorUser',
    method: 'GET',
    params: {
      _: new Date().getTime(),
    },
  })
}

export function editDistributor(data) {
  return request({
    url: '/CustomerMarketing/editDistributor',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function editSupplier(data) {
  return request({
    url: '/CustomerMarketing/editSupplier',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function addDistributor(data) {
  return request({
    url: '/CustomerMarketing/addDistributor',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function addSupplier(data) {
  return request({
    url: '/CustomerMarketing/addSupplier',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function deleteDistributor(data) {
  return request({
    url: '/CustomerMarketing/deleteDistributor',
    method: 'POST',
    data,
  })
}

export function deleteSupplier(data) {
  return request({
    url: '/CustomerMarketing/deleteSupplier',
    method: 'POST',
    data,
  })
}
export function getAddContractOrder(params) {
  return request({
    url: '/TradingCenter/getAddContractOrder',
    method: 'GET',
    params,
  })
}

export function getEditDistributor(params) {
  return request({
    url: '/CustomerMarketing/getEditDistributor',
    method: 'GET',
    params,
  })
}
export function getEditSupplier(params) {
  return request({
    url: '/CustomerMarketing/getEditSupplier',
    method: 'GET',
    params,
  })
}
