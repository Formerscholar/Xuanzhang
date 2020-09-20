const timers = {
  state: {
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
      Shipdata: '',
    },
  },
  actions: {},
  getters: {},
  mutations: {
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
  },
}
export default timers
