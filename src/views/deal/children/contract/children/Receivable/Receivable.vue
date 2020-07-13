<template>
  <div id="Receivable">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>订单收款</span>
      </div>
      <div class="right" slot="right">
        <span></span>
      </div>
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
          <el-row class="customerName line">
            <em>订单模式</em>
            <div>
              <el-autocomplete
                v-model="Orderstate"
                :fetch-suggestions="querySearchAsyncOrder"
                placeholder="请输入内容"
                @select="Orderinputchanges"
              ></el-autocomplete>
            </div>
          </el-row>
          <el-row class="customerName line">
            <em>合同号</em>
            <div>
              <el-autocomplete
                v-model="contractstate"
                :fetch-suggestions="contractquerySearchAsync"
                placeholder="请输入内容"
                @select="contractinputchanges"
              ></el-autocomplete>
            </div>
          </el-row>
          <el-row class="customerName line">
            <em>选择渠道</em>
            <div>
              <el-autocomplete
                v-model="channelstate"
                :fetch-suggestions="querySearchAsyncchannel"
                placeholder="请输入内容"
                @select="channelinputchanges"
              ></el-autocomplete>
            </div>
          </el-row>
          <el-row class="customerName line">
            <em>结算渠道</em>
            <div>
              <el-autocomplete
                v-model="Settlementstate"
                :fetch-suggestions="SettlementquerySearchAsync"
                placeholder="请输入内容"
                @select="Settlementinputchanges"
              ></el-autocomplete>
            </div>
          </el-row>
          <van-field v-model="Products" type="number" label="入账金额" />
          <timers
            class="DeliveryDate"
            type="DeliveryDate"
            title="入账日期"
            :valueData="timersList.DeliveryDate"
          />
          <van-field v-model="DeliveryNotes" type="text" label="备注" />
        </el-card>
      </div>
    </scroll>
    <div class="footer">
      <el-button type="primary" plain @click="SubmitNow">立即提交</el-button>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import scroll from '@/components/common/scroll/scroll'
import timers from '@/components/content/timers/timers'
import { setTimerType } from '@/common/utils.ts'
import {
  getAddSettlementRecordDistributors,
  addSettlementRecord,
  getSettlementVariable
} from '@/network/deal'
export default {
  data() {
    return {
      restaurants: [],
      restaurantss: [],
      restaurantsss: [
        { value: '现金余额', address: 0 },
        { value: '银行账户', address: 1 }
      ],
      restaurantsssss: [],
      deliveryRecordItem: {},
      state: '',
      Orderstate: '',
      contractstate: '',
      channelstate: '',
      Settlementstate: '',
      Products: 0,
      timersList: {
        DeliveryDate: setTimerType(new Date().getTime())
      },
      DeliveryNotes: '',
      settlement_type: '',
      variable_id: 0,
      distributor_id: '',
      order_type: ''
    }
  },
  components: {
    navbar,
    scroll,
    timers
  },
  activated() {
    this.getAddSettlementRecord()
    this.deliveryRecordItem = this.$route.query.data
    console.log(this.deliveryRecordItem)
    const {
      distributor_id,
      distributor_name,
      order_number,
      operator_name
    } = this.deliveryRecordItem
    this.state = distributor_name
    this.contractstate = order_number
    this.Settlementstate = operator_name
    this.distributor_id = distributor_id
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
    document.querySelectorAll('input').forEach(item => {
      item.style.border = 'none'
    })
  },
  deactivated() {
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  computed: {
    getAddSettlementData() {
      return {
        _: new Date().getTime()
      }
    },
    getSettlementVariableData() {
      return {
        settlement_type: 'user',
        token: this.$store.state.token,
        _: new Date().getTime()
      }
    },
    getSettlementVariableDatas() {
      return {
        settlement_type: 'bank',
        token: this.$store.state.token,
        _: new Date().getTime()
      }
    },
    addSettlementRecordData() {
      let from = new FormData()
      from.append('token', this.$store.state.token)
      from.append('settlement_type', this.settlement_type)
      from.append('variable_id', this.variable_id)
      from.append('settlement_money', this.Products)
      from.append('apply_time', this.timersList.DeliveryDate)
      from.append('distributor_id', this.distributor_id)
      from.append('order_type', this.order_type)
      from.append('order_id', this.contractstate)
      from.append('remark', this.DeliveryNotes)
      return from
    }
  },
  methods: {
    async getAddSettlementRecord() {
      const { data } = await getAddSettlementRecordDistributors(
        this.getAddSettlementData
      )
      console.log('getAddSettlementRecordDistributors', data)
      let arr = [
        {
          value: data.companyOrderType.contract,
          address: 'contract'
        },
        {
          value: data.companyOrderType.flow,
          address: 'flow'
        },
        {
          value: data.companyOrderType.oem,
          address: 'oem'
        },
        {
          value: data.companyOrderType.settlement,
          address: 'settlement'
        },
        {
          value: data.companyOrderType.standard,
          address: 'standard'
        }
      ]
      this.restaurants = arr
    },
    async SubmitNow() {
      const { data } = await addSettlementRecord(this.addSettlementRecordData)
      console.log('addSettlementRecord', data)
    },
    blacknext() {
      this.$router.replace('/deal/contract')
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurant
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    querySearchAsyncOrder(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    contractquerySearchAsync(queryString, cb) {
      var restaurants = this.restaurantss
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    querySearchAsyncchannel(queryString, cb) {
      var restaurants = this.restaurantsss
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    SettlementquerySearchAsync(queryString, cb) {
      var restaurants = this.restaurantsssss
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    inputchanges(value) {
      this.distributors.map((item, index) => {
        if (index == value.address * 1) {
          this.distributor_id = item.id
        }
      })
    },
    Orderinputchanges(value) {
      this.order_type = value.address
    },
    contractinputchanges(value) {
      this.distributors.map((item, index) => {
        if (index == value.address * 1) {
          this.distributor_id = item.id
        }
      })
    },
    async channelinputchanges(value) {
      console.log(value.address)
      if (value.address == 0) {
        this.settlement_type = 'user'
        const { data } = await getSettlementVariable(
          this.getSettlementVariableData
        )
        console.log('getSettlementVariable', data)
        data.variable.map(item => {
          this.restaurantsssss.push({
            value: item.user_name,
            address: item.user_id
          })
        })
        this.variable_id = data.variable[0].user_id
      } else {
        this.settlement_type = 'bank'
        const { data } = await getSettlementVariable(
          this.getSettlementVariableDatas
        )
        console.log('getSettlementVariable', data)
      }
    },
    Settlementinputchanges(value) {
      console.log(value)

      this.variable_id = value.address * 1
    }
  }
}
</script>
    
<style scoped lang="scss">
#Receivable {
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
      background-color: #f8f7f5;
      min-height: calc(100vh - 5.428571rem);

      .item1 {
        margin-bottom: 0.714286rem;
        .btns {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          .van-button {
            margin-right: 10px;
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
