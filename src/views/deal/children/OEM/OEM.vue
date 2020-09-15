<template>
  <div id="OEM">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>发起代工</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <div class="body">
        <el-card class="box-card item1">
          <van-field
            v-model="state"
            label="客户名称"
            @focus="focusClick"
            class="newStyle"
            @click-right-icon="focusClick"
            placeholder="点击检索客户名称"
            right-icon="arrow"
          />
          <el-row class="DeliveryDate van-cell">
            <span class="lable">承诺交期</span>
            <span class="time" @click="tiemrClick">{{timersList.SigningDate}}</span>
          </el-row>
          <van-field
            v-model="states"
            label="负责人"
            readonly
            @click-input="arrowheadradiatorClick"
            class="newStyle"
            @click-right-icon="arrowheadradiatorClick"
            placeholder="点击选择负责人"
            right-icon="arrow"
          />
          <van-field v-model="knowingly" label="合同编号" class="newStyle" />
        </el-card>
        <el-card class="box-card item1">
          <el-row class="tanle line" style="border-bottom: .714286rem solid #f2f2f2;">
            <div class="product_box" v-for="(item,index) in tableData" :key="index">
              <van-swipe-cell>
                <div class="wrap_item">
                  <div class="wrap_left">
                    <img
                      v-if="item.product_img && item.product_img != 0 "
                      class="img"
                      :src="item.product_img | getUrl"
                    />
                    <img src="@/assets/image/Default.png" class="img" v-else />
                    <div class="text">
                      <div class="title">
                        <p>{{item.goods}}</p>
                      </div>
                      <p class="model">{{item.model}}</p>
                      <div class="wrap_right">
                        <span
                          class="wrap_right_text"
                        >({{item.price}}×{{item.weight}}+{{item.process_cost}})×{{item.nums}}</span>
                        <span class="funds_box">
                          <span>￥</span>
                          <span class="funds">{{item.totalPrice}}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <template #right>
                  <van-button class="delect" type="danger" @click="tableClick(index)" text="删除" />
                </template>
              </van-swipe-cell>
            </div>
          </el-row>

          <el-row class="AddProduct line">
            <div @click="addNewProduct" class="coutent">
              <i class="iconfont icon-copy"></i>
              <em>选择产品</em>
            </div>
          </el-row>

          <van-field v-model="contractAmount" label="加工费" class="newStyle" />
          <van-field v-model="DiscountedAmount" label="折后加工" class="newStyle" />
        </el-card>
      </div>
    </scroll>
    <myBtns :commitFun="quoteclick" :cancelFun="quxiaoClick">
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
      v-if="isarrowhead"
      title="负责人"
      show-toolbar
      :columns="restaurant"
      @confirm="arrowheadConfirm"
      @cancel="isarrowhead = false"
    />
  </div>
</template>
    
<script>
import { setTimerType } from '@/common/filter'
import { TotalPriceCalc } from '@/common/utils'
import { bestURL, crosURl } from '@/network/baseURL'

import myBtns from '@/components/common/my_btns/my_btns'
import {
  getAddOemOrder,
  getReceivingInformationList,
  addOemOrder,
  getMateriel,
} from '@/network/deal'
export default {
  data() {
    return {
      isDatetime: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      state: '',
      timersList: {
        SigningDate: setTimerType(new Date().getTime()),
        ContractField: setTimerType(new Date().getTime()),
      },
      tableData: [],
      arrowheadcolumns: [],
      isShowed: false,
      productWeight: '',
      isarrowhead: false,
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
      number: 0,
    }
  },
  components: {
    myBtns,
  },
  activated() {
    this.$Jurisdiction('86', this.$store.state.catearr, () => {
      this.$router.replace('/login')
      this.$toast('您的账号无该模块权限!')
    })
    this.getAddOemOrders()
  },
  computed: {
    addContractOrderData() {
      return {
        distributor_id: this.selectedID,
        contract_amount: this.contractAmount,
        amount_of_discount: this.DiscountedAmount,
        oem_order_product: this.shippingData,
        token: this.$store.state.token,
        user_id: this.userId,
        template_set: null,
        acceptance_criteria: null,
        transport_undertaking: null,
        commitment_period: this.timersList.SigningDate,
        remark: null,
        receiving_id: this.addressData.id,
        other_order_number: this.knowingly,
      }
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
    tableClick(index) {
      console.log(index)
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
          console.log(index, this.tableData, this.shippingData)
        })
    },
    arrowheadConfirm(value, index) {
      this.states = value
      this.userId = this.usersList[index].id
      this.isarrowhead = false
    },
    arrowheadradiatorClick() {
      this.isarrowhead = true
      console.log('arrowheadradiatorClick')
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
        console.log(item)
        if (typeof item == 'string') {
          this.state = item
        } else {
          this.state = item.name
          this.selectedID = item.id
        }
      })
    },
    async quoteclick() {
      const { code } = await addOemOrder(this.addContractOrderData)
      if (code == 200) {
        this.state = ''
        this.PartyContract = ''
        this.CompanyNumber = ''
        this.CustomerContact = ''
        this.CustomerNumber = ''
        this.tableData = []
        this.contractAmount = 0
        this.DiscountedAmount = 0
        this.TermsPaymentInput = ''
        this.TransportationAssume = ''
        this.WarrantyTime = ''
        this.OtherInstructions = ''
        this.fileList = []
        this.addressData = {}
        this.$router.replace('/deal/purchase')
      }
    },
    quxiaoClick() {
      this.state = ''
      this.PartyContract = ''
      this.CompanyNumber = ''
      this.CustomerContact = ''
      this.CustomerNumber = ''
      this.tableData = []
      this.contractAmount = 0
      this.DiscountedAmount = 0
      this.TermsPaymentInput = ''
      this.TransportationAssume = ''
      this.WarrantyTime = ''
      this.OtherInstructions = ''
      this.fileList = []
      this.addressData = {}
      this.$router.replace('/deal/purchase')
    },
    async getAddOemOrders() {
      const { data } = await getAddOemOrder(this.getAddOemOrderData)
      console.log('getAddOemOrder', data)
      this.distributors = data.distributors
      // this.distributors.forEach((item, index) => {
      //   let obj = {
      //     value: item.name,
      //     address: item.id,
      //   }
      //   this.restaurants.push(obj)
      // })
      if (data.customerProductField.weight == '1') {
        this.isWeightShow = true
      } else {
        this.isWeightShow = false
      }
      this.isFlowingShow = data.customerProductExtraField
      this.usersList = data.users
      this.usersList.forEach((item, index) => {
        this.restaurant.push(item.name)
      })
    },
    handleChange() {
      var loc = ''
      for (let i = 0; i < this.form.selectedOptions.length; i++) {
        loc += CodeToText[this.form.selectedOptions[i]]
      }
      console.log(loc)
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
        console.log(item)
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
            console.log(this.shippingData)
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
        console.log(this.shippingData)
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
    cancelClick() {
      this.states = ''
      this.productName = ''
      this.Products = ''
      this.productPrice = ''
      this.productNum = ''
      this.FlowingProducts = []
      this.quantity = ''
      this.productSubtotal = ''
      this.ProductNotes = ''
      this.isShowed = false
    },
    blacknext() {
      this.loading = false
      this.dialog = false
      this.Addresslog = false
      this.productlog = false
      this.radio = '0'
      clearTimeout(this.timer)
      this.$router.replace('/deal/purchase')
    },
    async getReceiving() {
      const { data } = await getReceivingInformationList(this.getReceiveDate)
      console.log('getReceivingInformationList', data)
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
    handleSelect(val) {
      this.selectedID = val.address
      console.log(this.selectedID)
      this.getReceiving()
    },
    handleSelectss(val) {
      this.userId = val.address
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      if (this.form.companyName != '' && this.form.DetailedAddress != '') {
        this.restaurants.push({
          value: this.form.companyName,
          address: this.form.DetailedAddress,
        })
      }
      if (this.Address.DetailedAddress != '') {
        let addinfo = `${this.Address.contact} ${this.Address.phone}`
        this.address.push(addinfo)
        this.radio = this.address.length - 1
      }

      if (
        this.product.name != '' &&
        this.product.specifications != '' &&
        this.product.number != '' &&
        this.product.price != ''
      ) {
        let addproductdata = {
          goods: this.product.name,
          model: this.product.specifications,
          nums: this.product.number,
          price: this.product.price,
          totalPrice: this.product.price * this.product.number,
        }
        this.tableData.push(addproductdata)
      }

      this.loading = true
      this.Addresslog = false
      this.productlog = false
      this.timer = setTimeout(() => {
        done()
        setTimeout(() => {
          this.loading = false
        }, 400)
      }, 2000)
      document.querySelector('#createContract .nav-bar').style.display = 'flex'
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
    
<style lang="scss" scoped>
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
