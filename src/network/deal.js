import { request } from './request'
import Qs from 'qs'

export function getleft(params) {
  return request({
    url: '/top/left',
    method: 'GET',
    params,
  })
}
export function getContractOrderList(params) {
  return request({
    url: '/TradingCenter/getContractOrderList',
    method: 'GET',
    params,
  })
}

export function getDesignatedTasksDetail(params) {
  return request({
    url: '/DesignatedTasks/getDesignatedTasksDetail',
    method: 'GET',
    params,
  })
}
export function checkDesignatedTasksStatus(data) {
  return request({
    url: '/DesignatedTasks/checkDesignatedTasksStatus',
    method: 'POST',
    data,
  })
}
export function checkDesignatedTasksUserStatus(data) {
  return request({
    url: '/DesignatedTasks/checkDesignatedTasksUserStatus',
    method: 'POST',
    data,
  })
}
export function getUndischargedOutsourcingOrderList(params) {
  return request({
    url: '/OutsourcingOrder/getUndischargedOutsourcingOrderList',
    method: 'GET',
    params,
  })
}

export function getSupplierDetail(params) {
  return request({
    url: '/Index/getSupplierDetail',
    method: 'GET',
    params,
  })
}
export function getDistributorDetail(params) {
  return request({
    url: '/Index/getDistributorDetail',
    method: 'GET',
    params,
  })
}
export function getLiquidatedOutsourcingOrderList(params) {
  return request({
    url: '/OutsourcingOrder/getLiquidatedOutsourcingOrderList',
    method: 'GET',
    params,
  })
}
export function getUndischargedOemOrderList(params) {
  return request({
    url: '/OemOrder/getUndischargedOemOrderList',
    method: 'GET',
    params,
  })
}
export function getAddOemOrder(params) {
  return request({
    url: '/OemOrder/getAddOemOrder',
    method: 'GET',
    params,
  })
}
export function getLiquidatedOemOrderList(params) {
  return request({
    url: '/OemOrder/getLiquidatedOemOrderList',
    method: 'GET',
    params,
  })
}
export function getDeliverGoodsList(params) {
  return request({
    url: '/DeliverGoods/getDeliverGoodsList',
    method: 'GET',
    params,
  })
}
export function getSettlementRecordList(params) {
  return request({
    url: '/Settlement/getSettlementRecordList',
    method: 'GET',
    params,
  })
}
export function getCollectInvoiceRecordList(params) {
  return request({
    url: '/Invoice/getCollectInvoiceRecordList',
    method: 'GET',
    params,
  })
}
export function getWarehouseDetailList(params) {
  return request({
    url: '/Warehouse/getWarehouseDetailList',
    method: 'GET',
    params,
  })
}
export function getWarehouseLists(params) {
  return request({
    url: '/Warehouse/getWarehouseLists',
    method: 'GET',
    params,
  })
}
export function getAddContractOrder(params) {
  return request({
    url: '/TradingCenter/getAddContractOrder',
    method: 'GET',
    params,
  })
}
export function getReceivingInformationList(params) {
  return request({
    url: '/TradingCenter/getReceivingInformationList',
    method: 'GET',
    params,
  })
}
export function getFlowOrderList(params) {
  return request({
    url: '/FlowOrder/getFlowOrderList',
    method: 'GET',
    params,
  })
}
export function uploadFile(data) {
  return request({
    url: '/materiel/uploadFile',
    method: 'POST',
    data,
  })
}
export function getContractOrder(data) {
  return request({
    url: '/TradingCenter/getContractOrder',
    method: 'POST',
    data,
  })
}
export function addContractOrder(data) {
  return request({
    url: '/TradingCenter/addContractOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function editContractOrder(data) {
  return request({
    url: '/TradingCenter/editContractOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function getAddDeliverGoodsDistributors(params) {
  return request({
    url: '/DeliverGoods/getAddDeliverGoodsDistributors',
    method: 'GET',
    params,
  })
}
export function addAutonomousDeliverRecord(data) {
  return request({
    url: '/DeliverGoods/addAutonomousDeliverRecord',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function addAutonomousReturnRecord(data) {
  return request({
    url: '/DeliverGoods/addAutonomousReturnRecord',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function editAutonomousReturnRecord(data) {
  return request({
    url: '/DeliverGoods/editAutonomousReturnRecord',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function getMateriel(params) {
  return request({
    url: '/Materiel/getMateriel',
    method: 'GET',
    params,
  })
}
export function getAddFlowOrder(params) {
  return request({
    url: '/FlowOrder/getAddFlowOrder',
    method: 'GET',
    params,
  })
}
export function getMaterielList(params) {
  return request({
    url: '/Currency/getMaterielList',
    method: 'GET',
    params,
  })
}
export function addFlowOrder(data) {
  return request({
    url: '/FlowOrder/addFlowOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function addWarehouseOrder(data) {
  return request({
    url: '/Warehouse/addWarehouseOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function addOemOrder(data) {
  return request({
    url: '/OemOrder/addOemOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function getAddWarehouseEnter(params) {
  return request({
    url: '/Warehouse/getAddWarehouseEnter',
    method: 'GET',
    params,
  })
}
export function addWarehouseEnter(data) {
  return request({
    url: '/Warehouse/addWarehouseEnter',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function addWarehouseOut(data) {
  return request({
    url: '/Warehouse/addWarehouseOut',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function getAddOutsourcingOrder(params) {
  return request({
    url: '/OutsourcingOrder/getAddOutsourcingOrder',
    method: 'GET',
    params,
  })
}
export function addOutsourcingOrder(data) {
  return request({
    url: '/OutsourcingOrder/addOutsourcingOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function getEditContractOrder(params) {
  return request({
    url: '/TradingCenter/getEditContractOrder',
    method: 'GET',
    params,
  })
}
export function addDeliverRecord(data) {
  return request({
    url: '/DeliverGoods/addDeliverRecord',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function deleteDeliverRecord(data) {
  return request({
    url: '/DeliverGoods/deleteDeliverRecord',
    method: 'POST',
    data,
  })
}
export function getEditDeliverRecord(params) {
  return request({
    url: '/DeliverGoods/getEditDeliverRecord',
    method: 'GET',
    params,
  })
}
export function deleteFlowOrderProduct(data) {
  return request({
    url: '/FlowOrder/deleteFlowOrderProduct',
    method: 'POST',
    data,
  })
}
export function getAddSettlementRecordDistributors(params) {
  return request({
    url: '/Settlement/getAddSettlementRecordDistributors',
    method: 'GET',
    params,
  })
}
export function addSettlementRecord(data) {
  return request({
    url: '/Settlement/addSettlementRecord',
    method: 'POST',
    data,
  })
}
export function getSettlementVariable(params) {
  return request({
    url: '/Settlement/getSettlementVariable',
    method: 'GET',
    params,
  })
}
export function deleteContractOrder(data) {
  return request({
    url: '/TradingCenter/deleteContractOrder',
    method: 'POST',
    data,
  })
}
