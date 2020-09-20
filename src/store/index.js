import mutations from './mutations'
import actions from './actions'
import modules from './modules/index'
import getters from './getters'

const state = {
  bankCardSinfo: {
    bankName: '张三现金代持',
    phone: '13665200888',
    Balance: '8888.88',
  },
  loginDate: {},
  userInfo: [],
  token: '',
  detailsdata: {},
  AddDetailsData: {},
  AddressID: 0,
  Address: {},
  productData: [],
}

export default {
  state,
  getters,
  mutations,
  actions,
  modules,
}
