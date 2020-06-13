import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions'
import modules from './modules'

Vue.use(Vuex)

const state = {
  bankCardSinfo: {
    bankName: '张三现金代持',
    phone: '13665200888',
    Balance: '8888.88',
  },
  // 登录后的数据
  loginDate: {},
  // 用户信息
  userInfo: [],
  token: '',
  // detailsdata
  detailsdata: {},
  AddDetailsData: {},
  timersType: '',
  // 全局时间集合
  timers: {
    Sign: '',
    ShipTimes: '',
    committed: '',
    DeliveryDate: '',
    SigningDate: '',
    ContractField: '',
    outSigningDate: '',
    outContractField: '',
    delivery: '',
    end_time: '',
    CreditDate: '',
  },
  // 地址新增/修改
  AddressID: 0,
  Address: {},
  // 产品数据
  productData: [],
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
})
