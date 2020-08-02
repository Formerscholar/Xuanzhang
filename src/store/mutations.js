const mutations = {
  setLoginDate(state, palyload) {
    state.loginDate = palyload
  },
  setUserInfo(state, palyload) {
    state.userInfo = palyload
  },
  setToken(state, palyload) {
    state.token = palyload
  },
  setDetailsData(state, palyload) {
    state.detailsdata = palyload
  },
  setBankCardSinfo(state, palyload) {
    state.bankCardSinfo = palyload
  },
  setAddDetailsData(state, palyload) {
    state.AddDetailsData = palyload
  },
  setAddressID(state, palyload) {
    state.AddressID = palyload
  },
  setAddress(state, palyload) {
    state.Address = palyload
  },
  setproductData(state, palyload) {
    state.productData = palyload
  },
}

export default mutations
