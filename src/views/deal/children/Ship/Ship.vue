<template>
  <div id="Ship">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>发货</span>
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
                @select="inputchanges"
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
        </el-card>

        <el-card class="box-card item1" v-show="isShowed">
          <el-row class="SigningDate line">
            <em>选择产品</em>
            <div>
              <el-autocomplete
                v-model="states"
                :fetch-suggestions="querySearchAsyncs"
                placeholder="请输入内容"
                @select="handleSelect"
                @change="handchange"
              ></el-autocomplete>
            </div>
          </el-row>
          <van-field v-model="Products" label="产品型号" />
          <van-field v-model="productPrice" type="number" label="产品价格" />
          <van-field v-model="productWeight" v-if="isWeightShow" type="number" label="产品重量" />
          <van-field
            v-model="FlowingProducts[index+1]"
            v-for="(item,index) in isFlowingShow"
            :key="index"
            :data-id="index+1"
            label="流水产品"
          />
          <van-field v-model="quantity" type="number" label="产品数量" />
          <van-field v-model="ProductSubtotal" type="number" label="产品小计" />
          <van-field v-model="ProductNotes" label="产品备注" />
          <div class="btns">
            <van-button @click="cancelClick" color="linear-gradient(to right, #ccc, #666)">取消</van-button>
            <van-button @click="AddClick" color="linear-gradient(to right, #4bb0ff, #6149f6)">添加</van-button>
          </div>
        </el-card>

        <el-card class="box-card item1">
          <van-field v-model="Shipment" type="number" label="发货金额" />
          <van-field v-model="Amounts" type="number" label="折后金额" />
          <timers
            class="DeliveryDate"
            type="DeliveryDate"
            title="日期"
            :valueData="timersList.DeliveryDate"
          />
          <van-field v-model="DeliveryNotes" type="text" label="发货备注" />
        </el-card>
      </div>
    </scroll>
    <div class="footer">
      <el-button type="primary" plain @click="SubmitNow">立即提交</el-button>
      <el-button type="primary" plain @click="PendingNow">提交待核</el-button>
    </div>
  </div>
</template>
    
<script>
import scroll from '@/components/common/scroll/scroll'
import navbar from '@/components/common/navbar/NavBar'
import { regionData, CodeToText } from 'element-china-area-data'
import timers from '@/components/content/timers/timers'
import { setTimerType } from '@/common/utils.js'
import Qs from 'qs'
import { Dialog } from 'vant'

import {
  getAddDeliverGoodsDistributors,
  addAutonomousDeliverRecord,
  getMateriel
} from '@/network/deal'

export default {
  data() {
    return {
      Products: '',
      productPrice: '',
      productWeight: '',
      FlowingProducts: ['0'],
      quantity: '',
      ProductSubtotal: '',
      ProductNotes: '',
      Shipment: 0,
      Amounts: 0,
      number: '',
      timersList: {
        DeliveryDate: setTimerType(new Date().getTime())
      },
      distributors: [],
      materiel: [],
      restaurants: [],
      restaurant: [],
      state: '',
      states: '',
      timeout: null,
      radio: '0',
      fileList: [],
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
      tableData: [],
      isShowed: false,
      distributor_id: 0,
      shippingValue: '',
      shippingData: [],
      DeliveryNotes: '',
      isFlowingShow: 0,
      isWeightShow: false,
      isTemporary: '0'
    }
  },
  components: {
    navbar,
    timers,
    scroll
  },
  created() {
    this.getAddDeliverGood()
  },
  activated() {
    if (this.$store.state.timers.DeliveryDate != '') {
      this.timersList.DeliveryDate = this.$store.state.timers.DeliveryDate
    }
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
    document.querySelectorAll('input').forEach(item => {
      item.style.border = 'none'
    })
    document.querySelector('textarea').style.border = 'none'
  },
  deactivated() {
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  computed: {
    getAddDeliverData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime()
      }
    },
    addAutonomousData() {
      console.log(this.isFlowingShow)
      console.log('this.FlowingProducts', this.FlowingProducts)
      return {
        distributor_id: this.distributor_id,
        shipping_details: this.shippingData,
        token: this.$store.state.token,
        total_funds: this.Amounts,
        total_money: this.Shipment,
        apply_time: this.timersList.DeliveryDate,
        type: 0,
        remark: this.DeliveryNotes
      }
    },
    addAutonomousDatas() {
      console.log(this.isFlowingShow)
      console.log('this.FlowingProducts', this.FlowingProducts)
      return {
        distributor_id: this.distributor_id,
        shipping_details: this.shippingData,
        token: this.$store.state.token,
        total_funds: this.Amounts,
        total_money: this.Shipment,
        apply_time: this.timersList.DeliveryDate,
        type: 1,
        remark: this.DeliveryNotes
      }
    },
    getMaterieldata() {
      return {
        token: this.$store.state.token,
        product_name: this.shippingValue,
        product_model: this.Products,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    inputchanges(value) {
      this.distributors.map((item, index) => {
        if (index == value.address * 1) {
          this.distributor_id = item.id
        }
      })
    },
    async getAddDeliverGood() {
      const { data } = await getAddDeliverGoodsDistributors(
        this.getAddDeliverData
      )
      console.log('getAddDeliverGoodsDistributors', data)
      if (data.customerProductExtraField.length > 0) {
        this.isFlowingShow = data.customerProductExtraField.length
      }
      if (data.customerProductField.weight == 1) {
        this.isWeightShow = true
      }
      this.distributors = data.distributors
      this.distributors.map((item, index) => {
        let obj = {
          value: item.name,
          address: index.toString()
        }
        this.restaurants.push(obj)
      })
      this.materiel = data.materiel
      this.materiel.map((item, index) => {
        let obj = {
          value: item.name,
          address: index.toString()
        }
        this.restaurant.push(obj)
      })
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
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      // 转数字类型
      this.shippingValue = item.value
      let nums = parseInt(item.address)
      console.log(nums)
      // 循环产品数组取出对应数据
      this.materiel.map((item, index) => {
        if (index == nums) {
          // 型号 specification
          this.Products = item.specification
          // 价格 out_price
          this.productPrice = item.out_price
        }
      })
    },
    handchange(value) {
      this.shippingValue = value
    },
    addNewProduct() {
      this.isShowed = true
    },
    cancelClick() {
      this.states = ''
      this.Products = ''
      this.productPrice = ''
      this.productWeight = ''
      this.FlowingProducts = []
      this.quantity = ''
      this.ProductSubtotal = ''
      this.ProductNotes = ''
      this.isShowed = false
    },
    async AddClick() {
      const { data } = await getMateriel(this.getMaterieldata)
      if (data.isExistence == 0) {
        Dialog.confirm({
          title: '提示',
          message: '是否加入临时物料库？'
        })
          .then(() => {
            this.isTemporary = '1'
          })
          .catch(() => {
            this.isTemporary = '0'
            this.tableData.pop()
          })
      }

      let adderssnum = this.productPrice * this.quantity
      let addproductdata = {
        goods: this.states,
        model: this.Products,
        nums: this.quantity,
        price: this.productPrice,
        totalPrice: adderssnum
      }
      this.tableData.push(addproductdata)

      let newArr = []
      newArr.push(this.shippingValue)
      newArr.push(this.Products)
      newArr.push(this.quantity)
      newArr.push(this.productPrice)
      newArr.push(this.ProductNotes)
      newArr.push(this.productWeight)
      newArr.push(this.FlowingProducts)
      newArr.push(this.isTemporary)
      this.shippingData.push(newArr)
      this.Shipment += adderssnum
      this.Amounts += adderssnum
      this.states = ''
      this.Products = ''
      this.productPrice = ''
      this.productWeight = ''
      this.FlowingProducts = ''
      this.quantity = ''
      this.ProductSubtotal = ''
      this.ProductNotes = ''
      this.isShowed = false
    },
    async SubmitNow() {
      const res = await addAutonomousDeliverRecord(this.addAutonomousData)
      console.log('addAutonomousDeliverRecord', res)
      if (res.code == 200) {
        this.blacknext()
      }
    },
    async PendingNow() {
      const res = await addAutonomousDeliverRecord(this.addAutonomousDatas)
      console.log('addAutonomousDeliverRecord', res)
      if (res.code == 200) {
        this.blacknext()
      }
    }
  }
}
</script>
    
<style lang="scss" scoped>
#Ship {
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
      margin-left: -3.071429rem;
      font-size: 1.285714rem;
      font-weight: 700;
      color: #030303;
    }
  }
  .body {
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
      .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f8f7f5;
        padding: 0.714286rem 1.142857rem;

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
