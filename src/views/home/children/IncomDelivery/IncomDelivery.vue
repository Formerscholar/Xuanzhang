<template>
  <div id="TotalShipment">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>来料发货</span>
      </div>
      <div slot="right" class="right" @click="primaryClick">
        <span>提交</span>
      </div>
    </navbar>
    <div class="content">
      <el-card>
        <el-row class="van-cell">
          <el-col :span="8">
            <span>客户名称</span>
          </el-col>
          <el-col :span="16">
            <el-autocomplete
              style="width:100%;"
              v-model="inputvalue"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入客户名称"
              @select="handleSelect"
            ></el-autocomplete>
          </el-col>
        </el-row>
        <el-row class="van-cell">
          <el-col :span="8">
            <span>合同号</span>
          </el-col>
          <el-col :span="16">
            <el-select
              style="width:100%;"
              v-model="ContractNum"
              placeholder="请选择"
              @change="ContractChange"
            >
              <el-option
                style="width:100%;"
                v-for="item in Contractoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="table_box">
          <table style="width: 100%;">
            <tr class="title">
              <td>名称</td>
              <td>规格</td>
              <td>发货数量</td>
              <td>重量</td>
              <td>单价</td>
              <td>操作</td>
            </tr>
            <tr v-for="(item,index) in tableData" :key="index" class="contentbox">
              <td>{{item.name}}</td>
              <td>{{item.specification}}</td>
              <td>
                <van-field v-model="num[index]" type="digit" @input="numschange" />
              </td>
              <td>{{item.weight}}</td>
              <td>{{item.price}}</td>
              <td>
                <i @click="deleteItem(index)">删</i>
              </td>
            </tr>
          </table>
        </el-row>
        <el-row>
          <van-field v-model="Shipmentprice" type="number" label="发货金额" />
          <timers class="Sign" type="Shipdata" title="日期" :valueData="timersList.Shipdata" />
          <van-field v-model="Shipmentmessage" rows="1" autosize label="发货备注" type="textarea" />
        </el-row>
      </el-card>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import timers from '@/components/content/timers/timers'
import { setTimerType } from '@/common/utils.js'

import {
  getAddDeliverGoodsDistributors,
  getAddDeliverGoods,
  getAddDeliverGoodsProduct,
  addDeliverRecord
} from '@/network/deal'

export default {
  data() {
    return {
      timersList: {
        Shipdata: setTimerType(new Date().getTime())
      },
      restaurants: [],
      Contractoptions: [],
      orderProducts: [],
      tableData: [],
      inputvalue: '',
      ContractNum: '',
      Shipmentmessage: '',
      Shipmentprice: 0,
      selectionId: 0,
      num: [],
      distributor: 0,
      digit: 0,
      pageType: '',
      itemList: {}
    }
  },
  components: {
    navbar,
    timers
  },
  computed: {
    getAddDeliverGoodData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    async primaryClick() {
      let Arr = []
      this.orderProducts.map((item, index) => {
        Arr.push([item.oem_order_id, item.id, this.num[index]])
      })
      const { code, msg } = await addDeliverRecord({
        distributor_id: this.distributor,
        shipping_details: Arr,
        token: this.$store.state.token,
        order_type: this.pageType,
        order_id: this.orderProducts[0].oem_order_id,
        total_funds: this.Shipmentprice
      })
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        })
        this.$router.go(-1)
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        })
      }
    },
    deleteItem(i) {
      this.num.splice(i, 1)
      this.tableData.splice(i, 1)
      this.calcnums()
    },
    numschange(value) {
      if (value != '') {
        this.calcnums()
      }
    },
    calcnums() {
      let numbs = 0
      this.num.map((item, index) => {
        numbs += item * this.tableData[index].price
      })
      this.Shipmentprice = numbs
    },
    async ContractChange(value) {
      const { data } = await getAddDeliverGoodsProduct({
        token: this.$store.state.token,
        distributor_id: this.distributor,
        order_type: this.pageType,
        order_id: value,
        _: new Date().getTime()
      })
      console.log('getAddDeliverGoodsProduct', data)
      this.tableData = []
      this.orderProducts = data.orderProducts
      data.orderProducts.map(item => {
        this.tableData.push({
          name: item.product_name,
          specification: item.product_model,
          weight: item.weight,
          price: item.unit_price
        })
      })
    },
    async getAddDeliverGood() {
      const { data } = await getAddDeliverGoodsDistributors(
        this.getAddDeliverGoodData
      )
      console.log('getAddDeliverGoodsDistributors', data)
      data.distributors.map(item => {
        this.restaurants.push({
          address: item.id,
          value: item.name
        })
      })
    },

    blacknext() {
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
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    async handleSelect(item) {
      this.distributor = item.address * 1
      const { data } = await getAddDeliverGoods({
        token: this.$store.state.token,
        distributor_id: item.address * 1,
        order_type: this.pageType,
        _: new Date().getTime()
      })
      console.log('getAddDeliverGoods', data)
      data.orderList.map(item => {
        this.Contractoptions.push({
          value: item.id,
          label: item.order_number
        })
      })
    }
  },
  activated() {
    if (this.$store.state.timers.Shipdata != '') {
      this.timersList.Shipdata = this.$store.state.timers.Shipdata
    }
    this.getAddDeliverGood()
    this.pageType = this.$route.params.type
    if (this.$route.query.data != null) {
      this.itemList = this.$route.query.data
      console.log(this.itemList, this.pageType)
      this.inputvalue = this.itemList.name
      this.distributor = this.itemList.distributor_id
      this.handleSelect({ address: this.distributor })
      this.ContractNum = this.itemList.order_number
      this.ContractChange(this.itemList.id)
    }
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
    document.querySelectorAll('input').forEach(item => {
      item.style.border = 'none'
    })
  },
  deactivated() {
    this.pageType = ''
    this.restaurants = []
    this.Contractoptions = []
    this.tableData = []
    this.itemList = {}
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  }
}
</script>
<style lang="scss">
.van-cell {
  padding: 0.571429rem 0.857143rem;
}
</style>

    
<style scoped lang="scss">
#TotalShipment {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: 1.071429rem;
      font-size: 1.285714rem;
      font-weight: 700;
      color: #030303;
    }
    .right {
      font-size: 1.142857rem;
      margin-right: 1.071429rem;
    }
  }
  .content {
    .el-row {
      margin-bottom: 0.357143rem;
    }
    .table_box {
      width: 100%;
      margin-bottom: 0.428571rem;
      .title,
      .contentbox {
        display: flex;
        align-items: center;
        justify-content: center;
        td {
          flex: 1;
          text-align: center;
          i {
            text-decoration: none;
            color: red;
          }
        }
      }
    }
  }
}
</style>
