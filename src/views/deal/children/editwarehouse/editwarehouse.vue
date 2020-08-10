<template>
  <div id="Ship">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>入库编辑</span>
      </div>
      <div slot="right" class="right" @click="SubmitNow">
        <span>提交</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper">
      <div class="body">
        <el-card class="box-card item1">
          <el-row class="customerName line">
            <em>供货单位</em>
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
              <em>选择零件</em>
            </div>
          </el-row>
        </el-card>

        <el-card class="box-card item1" v-show="isShowed">
          <el-row class="SigningDate line">
            <em>名称</em>
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
          <van-field v-model="Products" label="规格" />
          <van-field
            v-model="FlowingProducts[index+1]"
            v-for="(item,index) in isFlowingShow"
            :key="index"
            :data-id="index+1"
            label="字段"
          />
          <van-field v-model="productPrice" type="number" label="价格" />
          <van-field v-model="productWeight" v-if="isWeightShow" type="number" label="变量" />
          <van-field v-model="quantity" type="number" label="数量" />
          <van-field v-model="LocationSubtotal" type="number" label="库位号" />
          <van-field v-model="ProductSubtotal" type="number" label="编码" />
          <van-field v-model="ProductNotes" label="备注" />
          <div class="btns">
            <van-button @click="cancelClick" color="linear-gradient(to right, #ccc, #666)">取消</van-button>
            <van-button @click="AddClick" color="linear-gradient(to right, #4bb0ff, #6149f6)">添加</van-button>
          </div>
        </el-card>

        <el-card class="box-card item1">
          <van-field v-model="DeliveryNotes" type="text" label="单据明细" />
        </el-card>
      </div>
    </scroll>
  </div>
</template>
    
<script>
import { regionData, CodeToText } from 'element-china-area-data'

import { Dialog } from 'vant'

import {
  getAddWarehouseEnter,
  getMaterielList,
  addWarehouseEnter,
  getMateriel,
  getEditWarehouseEnter,
  editWarehouseOut,
} from '@/network/deal'

export default {
  data() {
    return {
      LocationSubtotal: '',
      Products: '',
      productPrice: '',
      productWeight: '',
      FlowingProducts: [null],
      quantity: '',
      ProductSubtotal: '',
      ProductNotes: '',
      Shipment: 0,
      Amounts: 0,
      number: '',
      timersList: {
        DeliveryDate: new Date().getTime(),
      },
      distributors: [],
      materiel: [],
      restaurants: [],
      restaurant: [],
      state: '',
      states: '',
      timeout: null,
      radio: '0',
      table: false,
      dialog: false,
      Addresslog: false,
      productlog: false,
      loading: false,

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
      tableData: [],
      isShowed: false,
      distributor_id: 0,
      shippingValue: '',
      shippingData: [],
      DeliveryNotes: '',
      isFlowingShow: 0,
      isWeightShow: false,
      isTemporary: '0',
      iid: 0,
      supplier_id: 0,
    }
  },

  activated() {
    this.iid = this.$route.params.id
    this.distributor_id = this.iid
    this.getEditWarehouse()
    this.getAddDeliverGood()
    this.getMaterielLists()
    if (this.$store.state.timers.timers.DeliveryDate != '') {
      this.timersList.DeliveryDate = this.$store.state.timers.timers.DeliveryDate
    }
    document.querySelectorAll('input').forEach((item) => {
      item.style.border = 'none'
    })
  },
  deactivated() {
    this.iid = 0
    this.state = ''
    this.DeliveryNotes = ''
    this.tableData = []
    this.shippingData = []
    this.supplier_id = 0
  },
  computed: {
    getAddDeliverData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
    addAutonomousData() {
      return {
        id: this.distributor_id,
        supplier_id: this.supplier_id,
        detailed: this.DeliveryNotes,
        materiel_warehouse_enter_data: this.shippingData,
        token: this.$store.state.token,
      }
    },

    getMaterieldata() {
      return {
        token: this.$store.state.token,
        product_name: this.states,
        product_model: this.Products,
        _: new Date().getTime(),
      }
    },
    getMaterielListData() {
      return {
        company_id: this.$store.state.userInfo[0].user_compser_id,
        _: new Date().getTime(),
      }
    },
    getEditWarehousData() {
      return {
        token: this.$store.state.token,
        id: this.iid,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    async getEditWarehouse() {
      const { data } = await getEditWarehouseEnter(this.getEditWarehousData)
      console.log('getEditWarehouseEnter', data)
      this.state = data.warehouseAccess.name
      this.DeliveryNotes = data.warehouseAccess.remark
      this.supplier_id = data.warehouseAccess.supplier_id
      data.warehouseAccess.warehouseAccessDetail.map((item) => {
        let obj = {
          goods: item.materiel_name,
          model: item.materiel_model,
          nums: item.number,
          price: item.unit_price,
          totalPrice: item.total_price,
        }
        this.tableData.push(obj)
        let arr = [
          item.materiel_id,
          item.materiel_name,
          item.materiel_model,
          item.number,
          item.unit_price,
          item.remark,
          item.weight,
          item.extra,
        ]
        this.shippingData.push(arr)
      })
    },
    async getMaterielLists() {
      const { data } = await getMaterielList(this.getMaterielListData)
      this.materiel = data
      this.materiel.map((item, index) => {
        let obj = {
          value: item.name,
          address: item.id,
        }
        this.restaurant.push(obj)
      })
    },
    inputchanges(value) {
      this.distributor_id = value.address
    },
    async getAddDeliverGood() {
      const { data } = await getAddWarehouseEnter(this.getAddDeliverData)
      console.log('getAddWarehouseEnter', data)
      if (data.customerProductExtraField.length > 0) {
        this.isFlowingShow = data.customerProductExtraField
      }
      if (data?.customerProductField?.weight == 1) {
        this.isWeightShow = true
      }
      this.distributors = data.suppliers
      this.distributors.map((item, index) => {
        let obj = {
          value: item.name,
          address: item.id,
        }
        this.restaurants.push(obj)
      })
    },
    blacknext() {
      this.loading = false
      this.dialog = false
      this.Addresslog = false
      this.productlog = false
      this.radio = '0'
      clearTimeout(this.timer)
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
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(value) {
      this.shippingValue = value.address
      console.log(this.shippingValue)

      this.materiel.map((item, index) => {
        if (item.id == this.shippingValue) {
          this.Products = item.specification
          this.productPrice = item.out_price
          this.ProductSubtotal = item.scope_of_business
          this.LocationSubtotal = item.warehouse_position
        }
      })
    },
    handchange(value) {
      this.shippingValue = value
      console.log(this.shippingValue)
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
      console.log(data)

      if (data.isExistence == 0) {
        Dialog.confirm({
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
      }
      let adderssnum = this.productPrice * this.quantity
      let addproductdata = {
        goods: this.states,
        model: this.Products,
        nums: this.quantity,
        price: this.productPrice,
        totalPrice: adderssnum,
      }
      this.tableData.push(addproductdata)
      let newArr = []
      newArr.push(this.shippingValue)
      newArr.push(this.states)
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
      const res = await editWarehouseOut(this.addAutonomousData)
      console.log('editWarehouseOut', res)
      if (res.code == 200) {
        this.blacknext()
      }
    },
  },
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
      font-size: 1.285714rem;
      margin-left: 1.428571rem;
      color: #030303;
    }
    .right {
      font-size: 1.285714rem;
      margin-right: 1.071429rem;
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
