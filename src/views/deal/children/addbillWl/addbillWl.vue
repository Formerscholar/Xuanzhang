<template>
  <div id="addbill">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>新增订单</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="body">
      <el-card class="box-card item1">
        <el-row class="customerName line">
          <em>客户名称</em>
          <div>
            <el-autocomplete
              v-model="state"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelects"
            ></el-autocomplete>
          </div>
        </el-row>
        <el-row class="tanle line">
          <el-table :data="tableData" style="width: 100%; font-size: .714286rem;">
            <el-table-column prop="goods" label="品名"></el-table-column>
            <el-table-column prop="model" label="型号"></el-table-column>
            <el-table-column prop="nums" label="数量"></el-table-column>
          </el-table>
        </el-row>
        <el-row class="AddProduct line">
          <div @click="addNewProduct" class="coutent">
            <i class="el-icon-box"></i>
            <em>添加产品</em>
          </div>
        </el-row>
        <timers class="delivery" type="delivery" title="承诺交期" :valueData="timersList.delivery" />
        <van-field v-model="other" label="其他说明" />
      </el-card>
      <el-card class="box-card item1" v-show="isShowed">
        <van-field v-model="states" label="名称" />
        <van-field v-model="Products" label="型号" />
        <van-field v-model="quantity" type="number" label="数量" />
        <van-field v-model="ProductNotes" label="备注" />
        <div class="btns">
          <van-button @click="cancelClick" color="linear-gradient(to right, #ccc, #666)">取消</van-button>
          <van-button @click="AddClick" color="linear-gradient(to right, #4bb0ff, #6149f6)">添加</van-button>
        </div>
      </el-card>
      <div class="footer">
        <el-button type="primary" plain @click="norepickClick">取消</el-button>
        <el-button type="primary" plain @click="quireClick">确认</el-button>
      </div>
    </div>
  </div>
</template>
    
<script>
import { regionData, CodeToText } from 'element-china-area-data'

import {
  getAddFlowOrder,
  getMaterielList,
  addWarehouseOrder,
  getAddWarehouseEnter,
} from '@/network/deal'
export default {
  name: 'addbill',
  data() {
    return {
      other: '',
      states: '',
      isShowed: false,
      tableData: [],
      timersList: {
        delivery: new Date().getTime(),
      },
      restaurants: [],
      state: '',
      timeout: null,
      product: {
        name: '',
        specifications: '',
        price: '',
      },
      address: [],
      restaurant: [],
      timeout: null,
      shippingValue: '',
      materiel: [],
      Products: '',
      quantity: '',
      ProductNotes: '',
      distributors: [],
      distributor_id: 0,
      shippingData: [],
    }
  },
  activated() {
    this.getAddFlow()
    this.getMateriel()
    if (this.$store.state.timers.timers.delivery != '') {
      this.timersList.delivery = this.$store.state.timers.timers.delivery
    }
    document.querySelectorAll('input').forEach((item) => {
      item.style.border = 'none'
    })
  },
  deactivated() {},
  computed: {
    getAddFlowOrderData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
    getMaterielListData() {
      return {
        company_id: 1,
        _: new Date().getTime(),
      }
    },
    addFlowOrderData() {
      return {
        supplier_id: this.distributor_id,
        commitment_period: this.timersList.delivery,
        remark: this.other,
        warehouse_order_product: this.shippingData,
        token: this.$store.state.token,
      }
    },
  },
  methods: {
    norepickClick() {
      this.blacknext()
    },
    async quireClick() {
      const res = await addWarehouseOrder(this.addFlowOrderData)
      console.log('addWarehouseOrder', res)
      if (res.code == 200) {
        this.blacknext()
      }
    },
    async getAddFlow() {
      const { data } = await getAddWarehouseEnter(this.getAddFlowOrderData)
      console.log('getAddFlowOrder', data)
      this.distributors = data.suppliers
      this.distributors.map((item, index) => {
        let obj = {
          value: item.name,
          address: item.id,
        }
        this.restaurants.push(obj)
      })
    },
    async getMateriel() {
      const { data } = await getAddWarehouseEnter(this.getAddFlowOrderData)
      console.log('getMaterielList', data)
      this.materiel = data.suppliers
      this.materiel.map((item, index) => {
        let obj = {
          value: item.name,
          address: item.id,
        }
        this.restaurant.push(obj)
      })
    },
    AddClick() {
      let addproductdata = {
        goods: this.states,
        model: this.Products,
        nums: this.quantity,
      }
      this.tableData.push(addproductdata)
      let newArr = []
      newArr.push(this.states)
      newArr.push(this.Products)
      newArr.push(this.quantity)
      newArr.push(this.ProductNotes)
      this.shippingData.push(newArr)
      this.states = ''
      this.Products = ''
      this.quantity = ''
      this.ProductNotes = ''
      this.isShowed = false
    },
    cancelClick() {
      this.states = ''
      this.Products = ''
      this.quantity = ''
      this.ProductNotes = ''
      this.isShowed = false
    },
    handleSelects(value) {
      this.distributor_id = value.address
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    addNewProduct() {
      this.isShowed = true
    },
    blacknext() {
      this.state = null
      this.tableData = null
      this.other = null
      this.$router.replace('/deal/aside')
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
    handleSelect(item) {
      this.shippingValue = item.value
      let nums = parseInt(item.address)
      console.log(nums)
      // 循环产品数组取出对应数据
      this.materiel.map((item, index) => {
        if (index == nums) {
          // 型号 specification
          this.Products = item.specification
        }
      })
    },
  },
}
</script>
    
<style lang="scss" scoped>
#addbill {
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
      .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f8f7f5;
        padding: 1rem 1.428571rem;

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
    .footer {
      margin-top: 1.428571rem;
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
}
</style>
