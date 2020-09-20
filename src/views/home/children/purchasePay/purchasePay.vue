<template>
  <div id="OEM">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>新建收款</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <div class="body">
        <div class="box-card item1">
          <van-field
            v-model="state"
            label="客户名称"
            @focus="focusClick"
            class="newStyle"
            @click-right-icon="focusClick"
            placeholder="点击检索客户名称"
            right-icon="arrow"
          />
          <van-field
            v-model="OrderModeState"
            label="订单模式"
            readonly
            @click-input="OrderModeClick"
            class="newStyle"
            @click-right-icon="OrderModeClick"
            placeholder="点击选择订单模式"
            right-icon="arrow"
          />

          <van-field
            v-model="ChooseChannelsStates"
            label="选择渠道"
            readonly
            @click-input="isChooseChannels = true"
            class="newStyle"
            @click-right-icon="isChooseChannels = true"
            placeholder="点击选择渠道"
            right-icon="arrow"
          />
          <van-field
            v-model="SettlementChannelstates"
            label="结算渠道"
            readonly
            @click-input="isSettlementChannel = true"
            class="newStyle"
            @click-right-icon="isSettlementChannel = true"
            placeholder="点击选择渠道"
            right-icon="arrow"
          />
          <van-field
            v-model="contractAmount"
            label="打款金额"
            class="newStyle"
          />
          <el-row class="DeliveryDate van-cell">
            <span class="lable">打款日期</span>
            <span class="time" @click="tiemrClick">{{
              timersList.SigningDate
            }}</span>
          </el-row>
          <van-field
            v-model="contractegg"
            type="textarea"
            label="备注"
            class="newStyle"
          />
        </div>
      </div>
    </scroll>
    <myBtns :commitFun="quoteclick" :cancelFun="blacknext">
      <span slot="cancel-btn">取消</span>
      <span slot="commit-btn">
        <span>提交</span>
      </span>
    </myBtns>
    <van-overlay :show="isShow" @click="closeOverlay">
      <div class="wrapper-qrCode">
        <myVqr :Content="textContent"></myVqr>
      </div>
    </van-overlay>

    <van-datetime-picker
      class="datetime"
      v-if="isDatetime"
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirms"
      @cancel="cancel"
    />
    <van-picker
      class="datetime"
      v-if="isOrderMode"
      title="订单模式"
      show-toolbar
      :columns="OrderMode"
      @confirm="OrderModeConfirm"
      @cancel="isOrderMode = false"
    />
    <van-picker
      class="datetime"
      v-if="isContractNo"
      title="合同号"
      show-toolbar
      :columns="ContractNo"
      @confirm="ContractNoConfirm"
      @cancel="isContractNo = false"
    />
    <van-picker
      class="datetime"
      v-if="isChooseChannels"
      title="选择渠道"
      show-toolbar
      :columns="ChooseChannels"
      @confirm="ChooseChannelsConfirm"
      @cancel="isChooseChannels = false"
    />
    <van-picker
      class="datetime"
      v-if="isSettlementChannel"
      title="结算渠道"
      show-toolbar
      :columns="SettlementChannel"
      @confirm="SettlementChannelConfirm"
      @cancel="isSettlementChannel = false"
    />
  </div>
</template>

<script>
import { setTimerType } from '@/common/filter'
import { TotalPriceCalc } from '@/common/utils'
import { bestURL, crosURl } from '@/network/baseURL'

import {
  getAddOemOrder,
  getReceivingInformationList,
  addOemOrder,
  getMateriel,
  getAddSettlementRecordSuppliers,
  getAddOrderSettlementRecord,
  getSettlementVariable,
  addPaymentRecord,
} from '@/network/deal'

export default {
  data() {
    return {
      isDatetime: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      state: '',
      OrderModeState: '',
      ContractNoState: '',
      ChooseChannelsStates: '',
      SettlementChannelstates: '',
      timersList: {
        SigningDate: setTimerType(new Date().getTime()),
        ContractField: setTimerType(new Date().getTime()),
      },
      tableData: [],
      arrowheadcolumns: [],
      SettlementChannel: [],
      ContractNo: [],
      isShowed: false,
      productWeight: '',
      isarrowhead: false,
      isOrderMode: false,
      isContractNo: false,
      isChooseChannels: false,
      isSettlementChannel: false,
      Products: '',
      productName: '',
      isShow: false,
      FlowingProducts: [null],
      isFlowingShow: [],
      productNum: '',
      productSubtotal: '',
      productPrice: '',
      CustomerContact: '',
      quantity: '',
      ProductNotes: '',
      contractAmount: 0,
      CompanyNumber: '',
      DiscountedAmount: 0,
      addressData: {
        id: '0',
        name: '',
        tel: '',
        address: '',
      },
      restaurants: [],
      restaurant: [],
      OrderMode: [],
      selectedID: '',
      shippingData: [],
      PartyContract: '',
      userId: '',
      distributors: [],
      CustomerNumber: '',
      knowingly: '',
      TermsPaymentInput: '',
      TransportationAssume: '',
      WarrantyTime: '',
      fileList: [],
      OtherInstructions: '',
      isWeightShow: false,
      timeout: null,
      Address: {
        DetailedAddress: '',
        contact: '',
        phone: '',
        weight: '',
        number: '',
        ProductTesting1: '',
        ProductTesting2: '',
        note: '',
      },
      states: '',
      processCost: '',
      radio: '0',
      table: false,
      dialog: false,
      Addresslog: false,
      textContent: '',
      productlog: false,
      product_img: '',
      loading: false,
      companyOrderType: [],
      variable: [],
      settlement_type: '',
      variable_id: 0,
      ChooseChannels: ['现金余额', '银行账户'],
      form: {
        companyName: '',
        Referred: '',
        selectedOptions: [],
        DetailedAddress: '',
        contact: '',
        position: '',
        phone: '',
        email: '',
        salesman: '',
      },
      Address: {
        DetailedAddress: '',
        contact: '',
        phone: '',
        weight: '',
        number: '',
        ProductTesting1: '',
        ProductTesting2: '',
        note: '',
      },
      product: {
        name: '',
        specifications: '',
        price: '',
      },
      address: [],
      orderList: [],
      number: 0,
      contractegg: '',
      order_type: '',
      order_id: '',
      isShowContractNo: true,
    }
  },
  components: {
    myBtns: () => import('@/components/common/my_btns/my_btns'),
  },
  activated() {
    this.getAddOemOrders()
  },
  computed: {
    addContractOrderData() {
      let from = new FormData()
      from.append('token', this.$store.state.token)
      from.append('settlement_type', this.settlement_type)
      from.append('variable_id', this.variable_id)
      from.append('settlement_money', this.contractAmount)
      from.append('apply_time', this.timersList.SigningDate)
      from.append('supplier_id', this.selectedID)
      from.append('order_type', this.order_type)
      from.append('order_id', this.order_id)
      from.append('remark', this.contractegg)
      return from
    },
    getAddOemOrderData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
    getReceiveDate() {
      return {
        token: this.$store.state.token,
        id: this.selectedID,
        type: 'distributor',
        _: new Date().getTime(),
      }
    },
    getMaterieldata() {
      return {
        token: this.$store.state.token,
        product_name: this.productName,
        product_model: this.Products,
        _: new Date().getTime(),
      }
    },
  },
  filters: {
    getUrl(value) {
      return bestURL + value
    },
  },
  methods: {
    SettlementChannelConfirm(value, index) {
      this.SettlementChannelstates = value
      this.variable.map((item, index1) => {
        if (index1 == index) {
          this.variable_id = item.id || item.user_id
        }
      })
      this.isSettlementChannel = false
    },
    async ChooseChannelsConfirm(value, index) {
      this.ChooseChannelsStates = value
      this.isChooseChannels = false
      const { data } = await getSettlementVariable({
        settlement_type: index ? 'bank' : 'user',
        token: this.$store.state.token,
        _: new Date().getTime(),
      })
      this.SettlementChannel = []
      this.variable = data.variable
      if (index) {
        this.settlement_type = 'bank'
        this.SettlementChannel = data.variable.map((item) => item.bank_account)
      } else {
        this.settlement_type = 'user'
        this.SettlementChannel = data.variable.map((item) => item.user_name)
      }
    },
    ContractNoConfirm(value, index) {
      this.ContractNoState = value
      this.orderList.map((item, index1) => {
        if (index1 == index) {
          this.order_id = item.id
        }
      })
      this.isContractNo = false
    },
    async OrderModeConfirm(value, index) {
      this.OrderModeState = value
      this.order_type = this.companyOrderType[index]
      if (this.order_type == 'flow' || this.order_type == 'oem') {
        this.isShowContractNo = false
      }
      this.isOrderMode = false
      const { data } = await getAddOrderSettlementRecord({
        token: this.$store.state.token,
        supplier_id: this.selectedID,
        order_type: this.companyOrderType[index],
        _: new Date().getTime(),
      })
      this.orderList = data.orderList
      this.ContractNo = data.orderList.map((item) => item['order_number'])
    },
    OrderModeClick() {
      this.isOrderMode = true
    },
    tableClick(index) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除产品?',
        })
        .then(() => {
          if (this.tableData.length == 1) {
            this.tableData = []
            this.shippingData = []
          } else {
            this.tableData = this.tableData.splice(index - 1, 1)
            this.shippingData = this.shippingData.splice(index - 1, 1)
          }
          let allmonpement = 0
          this.tableData.forEach((item) => {
            allmonpement += parseFloat(item.totalPrice)
          })
          this.Shipment = allmonpement
          this.Amounts = allmonpement
        })
    },
    arrowheadConfirm(value, index) {
      this.states = value
      this.userId = this.usersList[index].id
      this.isarrowhead = false
    },
    arrowheadradiatorClick() {
      this.isarrowhead = true
    },
    cancel() {
      this.isDatetime = false
    },
    confirms(value) {
      this.timersList.SigningDate = setTimerType(value)
      this.isDatetime = false
    },
    closeOverlay() {
      this.isShow = false
      this.blacknext()
    },
    tiemrClick() {
      this.isDatetime = true
    },
    focusClick() {
      this.$router.push({
        path: '/nameSearch',
        query: {
          data: { ...this.distributors },
        },
      })
      this.$bus.$off('nameSupplier')
      this.$bus.$on('nameSupplier', (item) => {
        if (typeof item == 'string') {
          this.state = item
        } else {
          this.state = item.name
          this.selectedID = item.id
        }
      })
    },
    async quoteclick() {
      const { code, msg } = await addPaymentRecord(this.addContractOrderData)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.blacknext()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async getAddOemOrders() {
      const { data } = await getAddSettlementRecordSuppliers(
        this.getAddOemOrderData
      )

      this.distributors = data.suppliers
      let newArr = Object.values(data.companyOrderType)
      newArr.shift()
      let newsArr = Object.keys(data.companyOrderType)
      newsArr.shift()
      this.companyOrderType = [...newsArr]
      this.OrderMode = [...newArr]
    },
    handleChange() {
      var loc = ''
      for (let i = 0; i < this.form.selectedOptions.length; i++) {
        loc += CodeToText[this.form.selectedOptions[i]]
      }
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    addNewProduct() {
      this.$router.push({
        path: '/SelectProducts',
        query: {
          data: {
            isFlowingShow: this.isFlowingShow,
          },
        },
      })
      this.$bus.$off('SelectProducts')
      this.$bus.$on('SelectProducts', (item) => {
        this.productName = item.selectData.productName
        this.Products = item.selectData.productModel
        this.productPrice = item.selectData.productPrice
        this.quantity = item.selectData.quantity
        this.ProductNotes = item.selectData.ProductNotes
        this.productWeight = item.selectData.productWeight
        this.FlowingProducts = item.selectData.FlowingProducts
        this.product_img = item.selectData.img_url
        this.processCost = item.selectData.processCost
        this.AddClick()
      })
    },
    async AddClick() {
      const { data } = await getMateriel(this.getMaterieldata)
      if (data.isExistence == 0) {
        this.$dialog
          .confirm({
            title: '提示',
            message: '是否加入临时物料库？',
          })
          .then(() => {
            this.isTemporary = '1'
          })
          .catch(() => {
            this.isTemporary = '0'
            this.tableData.pop()
          })
          .finally(() => {
            let totalPrice = TotalPriceCalc(
              this.productPrice,
              this.productWeight,
              this.processCost,
              this.quantity
            )

            let addproductdata = {
              goods: this.productName,
              model: this.Products,
              nums: this.quantity,
              price: this.productPrice,
              totalPrice,
              weight: this.productWeight,
              process_cost: this.processCost,
              product_img: this.product_img,
            }
            this.tableData.push(addproductdata)

            let newArr = []
            newArr.push(this.productName)
            newArr.push(this.Products)
            newArr.push(this.quantity)
            newArr.push(this.productPrice)
            newArr.push(this.ProductNotes)
            newArr.push(this.productWeight)
            newArr.push([null, 1])
            this.shippingData.push(newArr)

            let allmonpement = 0
            this.tableData.forEach((item) => {
              allmonpement += parseFloat(item.totalPrice)
            })
            this.contractAmount = allmonpement
            this.DiscountedAmount = allmonpement

            this.Products = ''
            this.productPrice = ''
            this.productWeight = ''
            this.FlowingProducts = ''
            this.quantity = ''
            this.ProductSubtotal = ''
            this.ProductNotes = ''
            this.isShowed = false
          })
      } else {
        let totalPrice = TotalPriceCalc(
          this.productPrice,
          this.productWeight,
          this.processCost,
          this.quantity
        )

        let addproductdata = {
          goods: this.productName,
          model: this.Products,
          nums: this.quantity,
          price: this.productPrice,
          totalPrice,
          weight: this.productWeight,
          process_cost: this.processCost,
          product_img: this.product_img,
        }
        this.tableData.push(addproductdata)

        let newArr = []
        newArr.push(this.productName)
        newArr.push(this.Products)
        newArr.push(this.quantity)
        newArr.push(this.productPrice)
        newArr.push(this.ProductNotes)
        newArr.push(this.productWeight)
        newArr.push([null, 1])
        this.shippingData.push(newArr)

        let allmonpement = 0
        this.tableData.forEach((item) => {
          allmonpement += parseFloat(item.totalPrice)
        })
        this.contractAmount = allmonpement
        this.DiscountedAmount = allmonpement

        this.Products = ''
        this.productPrice = ''
        this.productWeight = ''
        this.FlowingProducts = ''
        this.quantity = ''
        this.ProductSubtotal = ''
        this.ProductNotes = ''
        this.isShowed = false
      }
    },
    calcPrice() {
      if (this.productPrice != '' && this.productNum != '') {
        this.productSubtotal =
          parseFloat(this.productPrice) * parseFloat(this.productNum)
      }
    },
    blacknext() {
      this.isDatetime = false
      this.state = ''
      this.OrderModeState = ''
      this.ContractNoState = ''
      this.ChooseChannelsStates = ''
      this.SettlementChannelstates = ''
      this.tableData = []
      this.arrowheadcolumns = []
      this.SettlementChannel = []
      this.ContractNo = []
      this.isShowed = false
      this.productWeight = ''
      this.isarrowhead = false
      this.isOrderMode = false
      this.isContractNo = false
      this.isChooseChannels = false
      this.isSettlementChannel = false
      this.Products = ''
      this.productName = ''
      this.isShow = false
      this.isFlowingShow = []
      this.productNum = ''
      this.productSubtotal = ''
      this.productPrice = ''
      this.CustomerContact = ''
      this.quantity = ''
      this.ProductNotes = ''
      this.contractAmount = 0
      this.CompanyNumber = ''
      this.DiscountedAmount = 0
      this.addressData = {}
      this.restaurants = []
      this.restaurant = []
      this.OrderMode = []
      this.selectedID = ''
      this.shippingData = []
      this.PartyContract = ''
      this.userId = ''
      this.distributors = []
      this.CustomerNumber = ''
      this.knowingly = ''
      this.TermsPaymentInput = ''
      this.TransportationAssume = ''
      this.WarrantyTime = ''
      this.fileList = []
      this.OtherInstructions = ''
      this.isWeightShow = false
      this.timeout = null
      this.Address = {}
      this.states = ''
      this.processCost = ''
      this.radio = '0'
      this.table = false
      this.dialog = false
      this.Addresslog = false
      this.textContent = ''
      this.productlog = false
      this.product_img = ''
      this.loading = false
      this.companyOrderType = []
      this.variable = []
      this.settlement_type = ''
      this.variable_id = 0
      this.form = {}
      this.Address = {}
      this.product = {}
      this.address = []
      this.orderList = []
      this.number = 0
      this.contractegg = ''
      this.order_type = ''
      this.order_id = ''
      this.isShowContractNo = true
      this.$router.replace('/home')
    },
    async getReceiving() {
      const { data } = await getReceivingInformationList(this.getReceiveDate)

      this.listData = data.receivingInformationList
      this.addressData.name = this.listData[0].consignee
      this.addressData.id = this.listData[0].id
      this.addressData.tel = this.listData[0].consignee_tel
      this.addressData.address = this.listData[0].consignee_address
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },

    handleSelectss(val) {
      this.userId = val.address
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      this.Addresslog = false
      this.productlog = false
      this.radio = '0'
      clearTimeout(this.timer)
      document.querySelector('#createContract .nav-bar').style.display = 'flex'
    },
    addressClick() {
      this.$router.push({
        name: 'addressList',
        params: {
          data: this.listData,
        },
      })
    },
    querySearchAsyncs(queryString, cb) {
      var restaurants = this.restaurant
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
  },
}
</script>

<style scoped lang="scss">
#OEM {
  padding-top: 5.428571rem;
  padding-bottom: 3.785714rem;
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.428571rem;
    width: 100%;
    overflow: hidden;
  }
  .drawer_my {
    .demo-drawer__content {
      max-width: 1024px;
      margin: 0 auto;
      margin-top: 1.714286rem;
      padding: 0.357143rem;

      .demo-drawer__header {
      }
      .demo-drawer__footer {
        width: 100%;
        position: fixed;
        padding: 0.714286rem;
        background-color: #fff;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      font-size: 1.285714rem;
      margin-left: -0.571429rem;
      color: #030303;
    }
  }
  .body {
    background-color: #f8f7f5;

    .item1 {
      margin-bottom: 0.714286rem;
      .DeliveryDate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .lable {
          width: 4.928571rem;
          text-align: justify;
          text-align-last: justify;
          color: black;
          padding-right: 0.714286rem;
          border-right: 1px solid #e7e7e7;
        }
        .time {
          flex: 1;
          text-align: right;
          padding: 0 1rem;
        }
      }
      .btns {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        .van-button {
          margin-right: 0.714286rem;
        }
      }
      .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f8f7f5;
        padding: 0.714286rem 1.142857rem;
        .delect {
          height: 100%;
          line-height: 6.571429rem;
        }
        .product_box {
          .wrap_item {
            padding: 0.357143rem;

            .wrap_left {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              .img {
                width: 5.928571rem;
                height: 5.928571rem;
                background-color: #655d55;
                border-radius: 0.357143rem;
                margin-right: 0.714286rem;
              }
              .text {
                flex: 1;
                font-size: 1rem;
                color: #000;
                overflow: hidden;
                .title {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  font-size: 1rem;
                }
                .model {
                  color: #ccc;
                }
                p {
                  margin-bottom: 0.357143rem;
                }
                .wrap_right {
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-end;
                  color: #ccc;
                  .wrap_right_text {
                    font-size: 0.857143rem;
                  }
                  .funds_box {
                    font-size: 1.142857rem;
                    color: black;
                  }
                }
              }
            }
          }
          .wrap_money {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            padding: 0.357143rem;
            font-size: 1.142857rem;
            color: #848484;
          }
        }
        em {
          display: block;
          font-size: 1.142857rem;
          color: #585858;
          width: 6.357143rem;
          text-align: left;
        }
        div {
          display: block;
          font-size: 1.142857rem;
          text-align: left;
          flex: 1;
        }
      }
      .AddProduct {
        display: flex;
        justify-content: center;
        align-items: center;
        .coutent {
          display: flex;
          justify-content: center;
          align-items: center;
          em {
            text-align: center;
          }
        }
      }
    }
  }
  .datetime {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
