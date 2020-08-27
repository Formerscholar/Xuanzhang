<template>
  <div id="listShop">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>发货</span>
      </div>
      <div class="right" slot="right">
        <span></span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <div class="body">
        <el-card class="box-card item1">
          <el-row class="customerName line">
            <em>客户名称</em>
            <div>
              <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
              ></el-autocomplete>
            </div>
          </el-row>
          <el-row class="customerName line">
            <em>订单模式</em>
            <div>
              <el-autocomplete
                v-model="states"
                :fetch-suggestions="querySearchAsyncs"
                placeholder="请输入内容"
                @select="handleSelects"
              ></el-autocomplete>
            </div>
          </el-row>
          <el-row class="PartyContract line">
            <em>合同号</em>
            <div>
              <el-input v-model="PartyContract" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
        </el-card>
        <el-card class="box-card item1">
          <el-table :data="tableData" border style="width: 100%" @row-click="rowClick">
            <el-table-column prop="title" label="标题" width="80"></el-table-column>
            <el-table-column prop="model" label="规格" width="80"></el-table-column>
            <el-table-column prop="nums" label="数量" width="60"></el-table-column>
            <el-table-column prop="addNums" label="待发" width="60"></el-table-column>
            <el-table-column label="发货数量" width="140">
              <van-stepper
                @plus="plustype"
                @minus="minusType"
                disable-input
                v-model="digit"
                integer
                min="0"
              />
            </el-table-column>
          </el-table>
        </el-card>
        <el-card class="box-card item1">
          <el-row class="contractAmount line">
            <em>发货金额</em>
            <div>
              <el-input v-model="contractAmount" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
          <timers class="Sign" type="ShipTimes" title="日期" :valueData="timersList.ShipTimes" />
          <el-row class="OtherInstructions line">
            <em>发货备注</em>
            <div>
              <el-input v-model="OtherInstructions" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
        </el-card>
      </div>
    </scroll>
    <div class="footer">
      <el-button type="primary" plain @click="submitArray">保存</el-button>
    </div>
  </div>
</template>
    
<script>
import {
  getAddDeliverGoodsDistributors,
  addDeliverRecord,
} from '@/network/deal'

export default {
  data() {
    return {
      tableData: [],
      state: '',
      states: '',
      contractAmount: 0,
      timersList: {
        ShipTimes: new Date().getTime(),
      },
      OtherInstructions: '',
      PartyContract: '',
      restaurants: [],
      restaurant: [],
      digit: 0,
      paramsData: {},
      tableIndex: '',
      clickPrice: 0,
      clickPrice: 0,
      tableType: true,
      order_id: '',
      distributor_id: '',
    }
  },
  created() {
    document.querySelectorAll('input').forEach((item) => {
      item.style.border = 'none'
    })
    if (this.$store.state.timers.timers.ShipTimes != '') {
      this.timersList.ShipTimes = this.$store.state.timers.timers.ShipTimes
    }
    this.paramsData = this.$route.query.data
    console.log('this.paramsData', this.paramsData)

    this.state = this.paramsData.contractOrder.distributor_name
    this.PartyContract = this.paramsData.contractOrder.order_number
    this.order_id = this.paramsData.contractOrder.id
    this.distributor_id = this.paramsData.contractOrder.distributor_id
    this.paramsData.contractOrder.contractOrderProduct.map((item, index) => {
      this.tableData.push({
        title: item.product_name,
        model: item.product_model,
        nums: item.number,
        addNums: item.surplus_number,
        price: item.unit_price,
      })
    })
    this.getAddDeliverGoodsDistributor()
  },
  destroyed() {
    this.paramsData = {}
    this.state = ''
    this.PartyContract = ''
    this.order_id = ''
    this.distributor_id = ''
    this.tableData = []
    this.restaurant = []
    this.restaurants = []
  },
  computed: {
    getAddDeliverGoodsDistributorData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
    addDeliverRecordData() {
      let newArr = []
      this.paramsData.contractOrder.contractOrderProduct.map((item, index) => {
        let Arr = [0]
        Arr.push(item.id)
        Arr.push(this.digit)
        Arr.push(item.unit_price)
        newArr.push(Arr)
      })

      return {
        distributor_id: this.distributor_id,
        shipping_details: newArr,
        token: this.$store.state.token,
        order_type: this.selectedID,
        order_id: this.order_id,
        total_funds: this.contractAmount,
      }
    },
  },
  methods: {
    async submitArray() {
      const { code } = await addDeliverRecord(this.addDeliverRecordData)
      if (code == 200) {
        this.$router.replace('/deal/sales')
      }
    },
    rowClick(row) {
      if (this.tableType) {
        this.contractAmount += parseFloat(row.price)
      } else {
        this.contractAmount -= parseFloat(row.price)
      }
    },
    plustype() {
      this.tableType = true
    },
    minusType() {
      this.tableType = false
    },
    async getAddDeliverGoodsDistributor() {
      const { data } = await getAddDeliverGoodsDistributors(
        this.getAddDeliverGoodsDistributorData
      )
      console.log('getAddDeliverGoodsDistributors', data)
      data.distributors.map((item, index) => {
        this.restaurants.push({
          value: item.name,
          address: item.id,
        })
      })
      for (const key in data.companyOrderType) {
        this.restaurant.push({
          value: data.companyOrderType[key],
          address: key,
        })
      }
      this.selectedID = data.customerProductExtraField[0].product_type
    },
    blacknext() {
      this.$router.go(-1)
    },
    handleSelects(val) {
      console.log(val)
      this.selectedID = val.address
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
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
  },
}
</script>
    
<style scoped lang="scss">
#listShop {
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
      font-size: 1.285714rem;
      color: #030303;
    }
    .right {
      margin-right: 1.071429rem;
      font-size: 0.714286rem;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 3.785714rem;
    width: 100%;
    overflow: hidden;
  }
  .footer {
    height: 3.785714rem;
    z-index: 9999;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .body {
    background-color: #f8f7f5;

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
      &:first-child {
        margin-top: 0.714286rem;
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
      .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f8f7f5;
        text-align: right;
        em {
          display: block;
          font-size: 1rem;
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
}
</style>
