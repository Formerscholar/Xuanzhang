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
          <!-- <el-row class="customerName line">
            <em>负责人</em>
            <div>
              <el-autocomplete
                v-model="states"
                :fetch-suggestions="querySearchAsyncs"
                placeholder="请输入内容"
                @select="handleSelectss"
              ></el-autocomplete>
            </div>
          </el-row>-->
          <van-field
            v-model="states"
            label="负责人"
            @focus="focusClick"
            class="newStyle"
            @click-right-icon="focusClick"
            placeholder="点击选择负责人"
            right-icon="arrow"
          />
          <van-field v-model="states" label="合同编号" class="newStyle" />
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

          <van-field v-model="states" label="加工费" class="newStyle" />
          <van-field v-model="states" label="折后加工" class="newStyle" />
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
  </div>
</template>
    
<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { setTimerType } from '@/common/filter'

import myBtns from '@/components/common/my_btns/my_btns'
import {
  getAddOemOrder,
  getReceivingInformationList,
  addOemOrder,
} from '@/network/deal'
export default {
  data() {
    return {
      state: '',
      timersList: {
        SigningDate: setTimerType(new Date().getTime()),
        ContractField: setTimerType(new Date().getTime()),
      },
      tableData: [],
      isShowed: false,
      Products: '',
      productName: '',
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
      radio: '0',
      table: false,
      dialog: false,
      Addresslog: false,
      productlog: false,
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
      options: regionData,
      address: [],
      number: 0,
    }
  },
  components: {
    myBtns,
  },
  activated() {
    this.getAddOemOrders()
    if (this.$store.state.Address.id != undefined) {
      this.addressData.name = this.$store.state.Address.name
      this.addressData.tel = this.$store.state.Address.tel
      this.addressData.address = this.$store.state.Address.address
      this.addressData.id = this.$store.state.Address.id
      this.$store.commit('setAddress', {})
    }
  },
  deactivated() {
    this.restaurant = []
    this.restaurants = []
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
  },
  methods: {
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
      this.distributors.forEach((item, index) => {
        let obj = {
          value: item.name,
          address: item.id,
        }
        this.restaurants.push(obj)
      })
      if (data.customerProductField.weight == '1') {
        this.isWeightShow = true
      } else {
        this.isWeightShow = false
      }
      this.isFlowingShow = data.customerProductExtraField
      this.usersList = data.users
      this.usersList.forEach((item, index) => {
        let obj = {
          value: item.name,
          address: item.id,
        }
        this.restaurant.push(obj)
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
      this.isShowed = true
    },
    AddClick() {
      let adderssnum = this.productPrice * this.quantity
      let addproductdata = {
        goods: this.productName,
        model: this.Products,
        nums: this.quantity,
        price: this.productPrice,
        totalPrice: adderssnum,
      }
      this.contractAmount += adderssnum
      this.DiscountedAmount += adderssnum
      this.tableData.push(addproductdata)
      let newArr = []
      newArr.push(this.productName)
      newArr.push(this.Products)
      newArr.push(this.productNum)
      newArr.push(this.productPrice)
      newArr.push(this.ProductNotes)
      newArr.push(this.quantity)
      newArr.push(this.FlowingProducts)
      this.shippingData.push(newArr)
      this.cancelClick()
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
  min-height: 100vh;
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 2.785714rem;
    width: 100%;
    overflow: hidden;
  }
  .drawer_my {
    .demo-drawer__content {
      max-width: 1024px;
      margin: 0 auto;
      margin-top: 1.714286rem;
      padding: 0.357143rem;
      max-height: calc(100vh - 5.428571rem);
      height: calc(100vh - 5.428571rem);
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
    min-height: calc(100vh - 5.428571rem);

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
