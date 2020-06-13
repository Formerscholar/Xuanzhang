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
    <scroll class="scroll-wrapper">
      <div class="body">
        <el-card class="box-card item1">
          <el-row class="customerName line">
            <em>客户名称</em>
            <div>
              <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
          </el-row>
          <timers
            class="SigningDate line"
            type="SigningDate"
            title="承诺交期"
            :valueData="timersList.SigningDate"
          />
          <el-row class="customerName line">
            <em>负责人</em>
            <div>
              <el-autocomplete
                v-model="states"
                :fetch-suggestions="querySearchAsyncs"
                placeholder="请输入内容"
                @select="handleSelectss"
              ></el-autocomplete>
            </div>
          </el-row>
        </el-card>
        <el-card class="box-card item1">
          <el-row class="tanle line">
            <el-table :data="tableData" style="width: 100%; font-size: .714286rem;">
              <el-table-column prop="goods" label="品名"></el-table-column>
              <el-table-column prop="model" label="型号"></el-table-column>
              <el-table-column prop="nums" label="数量"></el-table-column>
              <el-table-column prop="price" label="单价"></el-table-column>
              <el-table-column prop="totalPrice" label="总价"></el-table-column>
            </el-table>
          </el-row>
          <el-row class="AddProduct line">
            <div @click="addNewProduct" class="coutent">
              <i class="el-icon-box"></i>
              <em>添加产品</em>
            </div>
          </el-row>
          <div class="box-card item1" v-show="isShowed">
            <van-field v-model="productName" label="名称" />
            <van-field v-model="Products" label="型号" />
            <van-field
              v-model="FlowingProducts[index+1]"
              v-for="(item,index) in isFlowingShow"
              :key="index"
              :data-id="index+1"
              label="单号"
            />
            <van-field v-model="productPrice" type="number" label="价格" />
            <van-field v-model="quantity" v-if="isWeightShow" type="number" label="针数(千针)" />
            <van-field v-model="productNum" type="number" label="数量" />
            <van-field @focus="calcPrice" v-model="productSubtotal" type="number" label="小计" />
            <van-field v-model="ProductNotes" label="备注" />
            <div class="btns">
              <van-button @click="cancelClick" color="linear-gradient(to right, #ccc, #666)">取消</van-button>
              <van-button @click="AddClick" color="linear-gradient(to right, #4bb0ff, #6149f6)">添加</van-button>
            </div>
          </div>
          <van-field v-model="contractAmount" type="number" label="加工费" />
          <van-field v-model="DiscountedAmount" type="number" label="折后加工费" />
        </el-card>
        <el-card class="box-card item1">
          <div class="address" @click="addressClick">
            <div class="lefticon">
              <van-icon name="location" />
            </div>
            <div class="cententbox">
              <div class="nametell">
                <span>{{addressData.name}}</span>
                <em>{{addressData.tel}}</em>
              </div>
              <div class="NEWSaddress">
                <span>{{addressData.address}}</span>
              </div>
            </div>
            <div class="righticon">
              <van-icon name="arrow" />
            </div>
          </div>
        </el-card>
      </div>
    </scroll>
    <div class="footer">
      <el-button type="primary" @click="quoteclick" plain>提交</el-button>
      <el-button type="primary" @click="quxiaoClick" plain>取消</el-button>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import { regionData, CodeToText } from 'element-china-area-data'
import timers from '@/components/content/timers/timers'
import { setTimerType } from '@/common/utils.js'
import scroll from '@/components/common/scroll/scroll'
import {
  getAddOemOrder,
  getReceivingInformationList,
  addOemOrder
} from '@/network/deal'
export default {
  name: 'OEM',
  data() {
    return {
      state: '',
      timersList: {
        SigningDate: setTimerType(new Date().getTime()),
        ContractField: setTimerType(new Date().getTime())
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
        address: ''
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
        note: ''
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
        salesman: ''
      },
      Address: {
        DetailedAddress: '',
        contact: '',
        phone: '',
        weight: '',
        number: '',
        ProductTesting1: '',
        ProductTesting2: '',
        note: ''
      },
      product: {
        name: '',
        specifications: '',
        price: ''
      },
      options: regionData,
      address: [],
      number: 0
    }
  },
  components: { navbar, timers, scroll },
  activated() {
    this.getAddOemOrders()
    if (this.$store.state.timers.SigningDate != '') {
      this.timersList.SigningDate = this.$store.state.timers.SigningDate
    }
    if (this.$store.state.timers.ContractField != '') {
      this.timersList.ContractField = this.$store.state.timers.ContractField
    }
    if (this.$store.state.Address.id != undefined) {
      this.addressData.name = this.$store.state.Address.name
      this.addressData.tel = this.$store.state.Address.tel
      this.addressData.address = this.$store.state.Address.address
      this.addressData.id = this.$store.state.Address.id
      this.$store.commit('setAddress', {})
    }
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
    document.querySelectorAll('input').forEach(item => {
      item.style.border = 'none'
    })
    document.querySelector('textarea').style.border = 'none'
  },
  deactivated() {
    this.restaurant = []
    this.restaurants = []
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
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
        receiving_id: this.addressData.id
      }
    },
    getAddOemOrderData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime()
      }
    },
    getReceiveDate() {
      return {
        token: this.$store.state.token,
        id: this.selectedID,
        type: 'distributor',
        _: new Date().getTime()
      }
    }
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
        this.$router.go(-1)
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
      // this.$router.replace('/deal/purchase')
      this.$router.go(-1)
    },
    async getAddOemOrders() {
      const { data } = await getAddOemOrder(this.getAddOemOrderData)
      console.log('getAddOemOrder', data)
      this.distributors = data.distributors
      this.distributors.forEach((item, index) => {
        let obj = {
          value: item.name,
          address: item.id
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
          address: item.id
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
        totalPrice: adderssnum
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
      this.$router.go(-1)
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
      return state => {
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
          address: this.form.DetailedAddress
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
          totalPrice: this.product.price * this.product.number
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
          data: this.listData
        }
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
    }
  }
}
</script>
    
<style lang="scss" scoped>
#OEM {
  padding-top: 5.428571rem;
  padding-bottom: 2.785714rem;
  min-height: 100vh;
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
      margin-left: -3.071429rem;
      font-size: 1.285714rem;
      font-weight: 700;
      color: #030303;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 2.785714rem;
    width: 100%;
    overflow: hidden;
    .body {
      padding: 1.428571rem 1.071429rem;
      background-color: #f8f7f5;
      min-height: calc(100vh - 5.428571rem);

      .item1 {
        margin-bottom: 0.714286rem;
        .btns {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          .van-button {
            margin-right: 0.714286rem;
          }
        }
        .address {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.642857rem 1.142857rem;
          .lefticon {
            width: 1.714286rem;
            height: 1.714286rem;
            border-radius: 50%;
            background-color: #ff4400;
            display: flex;
            justify-content: center;
            align-items: center;
            .van-icon {
              color: #fff;
              font-size: 0.857143rem;
            }
          }
          .cententbox {
            text-align: left;
            margin: 0 0.714286rem;
            flex: 1;
            .nametell {
              span {
                font-size: 0.857143rem;
                color: #333333;
              }
              em {
                font-size: 0.571429rem;
                color: #999;
                margin-left: 0.357143rem;
              }
            }
            .NEWSaddress {
              margin: 0.607143rem 0;
              span {
                font-size: 0.642857rem;
                color: #333333;
              }
            }
            .title {
              span {
                font-size: 0.642857rem;
                color: #d85c26;
              }
            }
          }
          .righticon {
            .van-icon {
              color: #ccc;
            }
          }
        }
        .customerName {
          padding: 0.714286rem 1.142857rem;
        }
        .line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f8f7f5;

          em {
            display: block;
            font-size: 1.142857rem;
            color: #585858;
            font-weight: 700;
            width: 6.357143rem;
            text-align: left;
          }
          div {
            display: block;
            font-size: 1.142857rem;
            font-weight: 700;
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
  }
  .footer {
    height: 2.785714rem;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
  }
}
</style>
