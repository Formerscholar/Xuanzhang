import { request } from './request'
import Qs from 'qs'

export function getMaterielList(params) {
  return request({
    url: '/materiel/getMaterielList',
    method: 'GET',
    params,
  })
}

export function getAddMateriel(params) {
  return request({
    url: '/materiel/getAddMateriel',
    method: 'GET',
    params,
  })
}

export function addMateriel(data) {
  return request({
    url: '/materiel/addMateriel',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function editMaterielStatus(data) {
  return request({
    url: '/materiel/editMaterielStatus',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function getEditMateriel(params) {
  return request({
    url: '/materiel/getEditMateriel',
    method: 'GET',
    params,
  })
}

export function editMateriel(data) {
  return request({
    url: '/materiel/editMateriel',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function getAddSpareParts(params) {
  return request({
    url: '/materiel/getAddSpareParts',
    method: 'GET',
    params,
  })
}

export function getMaterielBoom(params) {
  return request({
    url: '/materiel/getMaterielBoom',
    method: 'GET',
    params,
  })
}

export function addSpareParts(data) {
  return request({
    url: '/materiel/addSpareParts',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function synchronizationBoom(data) {
  return request({
    url: '/materiel/synchronizationBoom',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
