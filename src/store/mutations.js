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
  setNewTimers(state, palyload) {
    if (palyload.type == 'Sign') {
      state.timers.Sign = palyload.timers
    } else if (palyload.type == 'committed') {
      state.timers.committed = palyload.timers
    } else if (palyload.type == 'DeliveryDate') {
      state.timers.DeliveryDate = palyload.timers
    } else if (palyload.type == 'SigningDate') {
      state.timers.SigningDate = palyload.timers
    } else if (palyload.type == 'ContractField') {
      state.timers.ContractField = palyload.timers
    } else if (palyload.type == 'outSigningDate') {
      state.timers.outSigningDate = palyload.timers
    } else if (palyload.type == 'outContractField') {
      state.timers.outContractField = palyload.timers
    } else if (palyload.type == 'delivery') {
      state.timers.delivery = palyload.timers
    } else if (palyload.type == 'end_time') {
      state.timers.end_time = palyload.timers
    } else if (palyload.type == 'ShipTimes') {
      state.timers.ShipTimes = palyload.timers
    } else if (palyload.type == 'CreditDate') {
      state.timers.CreditDate = palyload.timers
    } else if (palyload.type == 'Shipdata') {
      state.timers.Shipdata = palyload.timers
    }
  },
  setAddress(state, palyload) {
    state.Address = palyload
  },
  setproductData(state, palyload) {
    state.productData = palyload
  },
}

export default mutations
