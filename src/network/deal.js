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
    data: Qs.stringify(data),
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
export function getAddDeliverGoods(params) {
  return request({
    url: '/DeliverGoods/getAddDeliverGoods',
    method: 'GET',
    params,
  })
}
export function getAddDeliverGoodsProduct(params) {
  return request({
    url: '/DeliverGoods/getAddDeliverGoodsProduct',
    method: 'GET',
    params,
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
export function addStorageRecord(data) {
  return request({
    url: '/StorageRecord/addStorageRecord',
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
export function delWarehouseRecord(data) {
  return request({
    url: '/Warehouse/delWarehouseRecord',
    method: 'POST',
    data,
  })
}

export function delDeliverRecord(data) {
  return request({
    url: '/DeliverGoods/delDeliverRecord',
    method: 'POST',
    data,
  })
}

export function cancelDelDeliverRecord(data) {
  return request({
    url: '/DeliverGoods/cancelDelDeliverRecord',
    method: 'POST',
    data,
  })
}
export function getAddStorageRecordSuppliers(params) {
  return request({
    url: '/StorageRecord/getAddStorageRecordSuppliers',
    method: 'GET',
    params,
  })
}
export function getAddStorageRecordProduct(params) {
  return request({
    url: '/StorageRecord/getAddStorageRecordProduct',
    method: 'GET',
    params,
  })
}

export function getEditWarehouseEnter(params) {
  return request({
    url: '/Warehouse/getEditWarehouseEnter',
    method: 'GET',
    params,
  })
}
export function editWarehouseOut(data) {
  return request({
    url: '/Warehouse/editWarehouseOut',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function getAddDeliverGoodsOrderNumber(params) {
  return request({
    url: '/DeliverGoods/getAddDeliverGoodsOrderNumber',
    method: 'GET',
    params,
  })
}

export function getFlowDeliverDetail(params) {
  return request({
    url: '/DeliverGoods/getFlowDeliverDetail',
    method: 'GET',
    params,
  })
}

export function editAutonomousDeliverRecord(data) {
  return request({
    url: '/DeliverGoods/editAutonomousDeliverRecord',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function delOutsourcingOrder(data) {
  return request({
    url: '/OutsourcingOrder/delOutsourcingOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function getOutsourcingDetail(params) {
  return request({
    url: '/OutsourcingOrder/getOutsourcingDetail',
    method: 'GET',
    params,
  })
}
export function getEditOutsourcingOrder(params) {
  return request({
    url: '/OutsourcingOrder/getEditOutsourcingOrder',
    method: 'GET',
    params,
  })
}
export function editOutsourcingOrder(data) {
  return request({
    url: '/OutsourcingOrder/editOutsourcingOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function deleteOutsourcingOrderProduct(data) {
  return request({
    url: '/OutsourcingOrder/deleteOutsourcingOrderProduct',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function getChangeOutsourcingOrder(data) {
  return request({
    url: '/OutsourcingOrder/getChangeOutsourcingOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function changeOutsourcingOrder(data) {
  return request({
    url: '/OutsourcingOrder/changeOutsourcingOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function getWarehouseDetail(params) {
  return request({
    url: '/Warehouse/getWarehouseDetail',
    method: 'GET',
    params,
  })
}

export function addReceivingInformation(data) {
  return request({
    url: '/TradingCenter/addReceivingInformation',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function getEditReceivingInformation(params) {
  return request({
    url: '/TradingCenter/getEditReceivingInformation',
    method: 'GET',
    params,
  })
}

export function editReceivingInformation(data) {
  return request({
    url: '/TradingCenter/editReceivingInformation',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function deleteReceivingInformation(data) {
  return request({
    url: '/TradingCenter/deleteReceivingInformation',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function addInventory(data) {
  return request({
    url: '/MaterielManagement/addInventory',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function getAddPicking(params) {
  return request({
    url: '/MaterielManagement/getAddPicking',
    method: 'GET',
    params,
  })
}

export function addPicking(data) {
  return request({
    url: '/MaterielManagement/addPicking',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function addMaterielReturn(data) {
  return request({
    url: '/MaterielManagement/addMaterielReturn',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
export function getUserContractOrderList(params) {
  return request({
    url: '/TradingCenter/getUserContractOrderList',
    method: 'GET',
    params,
  })
}

export function toExamineDeliveryRecord(data) {
  return request({
    url: '/DeliverGoods/toExamineDeliveryRecord',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function cancelToExamineDeliveryRecord(data) {
  return request({
    url: '/DeliverGoods/cancelToExamineDeliveryRecord',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function toExamineContractOrder(data) {
  return request({
    url: '/TradingCenter/toExamineContractOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}

export function cancelToExamineContractOrder(data) {
  return request({
    url: '/TradingCenter/cancelToExamineContractOrder',
    method: 'POST',
    data: Qs.stringify(data),
  })
}
