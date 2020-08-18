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
export function addPersonDistributor(data) {
  return request({
    url: '/CustomerMarketing/addPersonDistributor',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function editPersonDistributor(data) {
  return request({
    url: '/CustomerMarketing/editPersonDistributor',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function editPersonSupplier(data) {
  return request({
    url: '/CustomerMarketing/editPersonSupplier',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function addPersonSupplier(data) {
  return request({
    url: '/CustomerMarketing/addPersonSupplier',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function addCompanySupplier(data) {
  // addCompanySupplier 新增 供应商 公司
  return request({
    url: '/CustomerMarketing/addCompanySupplier',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function editCompanySupplier(data) {
  // editCompanySupplier 编辑 供应商 公司
  return request({
    url: '/CustomerMarketing/editCompanySupplier',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function editCompanyDistributor(data) {
  // editCompanyDistributor 编辑 客户 公司
  return request({
    url: '/CustomerMarketing/editCompanyDistributor',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function addCompanyDistributor(data) {
  // addCompanyDistributor 新增 客户 公司
  return request({
    url: '/CustomerMarketing/addCompanyDistributor',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
