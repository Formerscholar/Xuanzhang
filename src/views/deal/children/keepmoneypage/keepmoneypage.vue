<template>
  <div id="keepmoneypage">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>收款</span>
      </div>
      <div class="right" slot="right">
        <span></span>
      </div>
    </navbar>
    <div class="content">
      <el-card class="box-card item1">
        <van-field v-model="clientName" label="客户名称" />
        <el-row class="customerName line">
          <em>订单模式</em>
          <div>
            <el-autocomplete
              v-model="OrderModel"
              :fetch-suggestions="querySearchAsyncs"
              placeholder="请输入内容"
              @select="handleSelects"
            ></el-autocomplete>
          </div>
        </el-row>
        <el-row class="customerName line">
          <em>合同号</em>
          <div>
            <el-autocomplete
              v-model="Contract"
              :fetch-suggestions="querySearchAsyncs"
              placeholder="请输入内容"
              @select="handleSelects"
            ></el-autocomplete>
          </div>
        </el-row>
        <el-row class="customerName line">
          <em>选择渠道</em>
          <div>
            <el-autocomplete
              v-model="channel"
              :fetch-suggestions="querySearchAsyncs"
              placeholder="请输入内容"
              @select="handleSelects"
            ></el-autocomplete>
          </div>
        </el-row>
        <el-row class="customerName line">
          <em>结算渠道</em>
          <div>
            <el-autocomplete
              v-model="Settlement"
              :fetch-suggestions="querySearchAsyncs"
              placeholder="请输入内容"
              @select="handleSelects"
            ></el-autocomplete>
          </div>
        </el-row>
        <van-field v-model="CreditAmount" type="digit" label="入账金额" />
        <timers class="Sign" type="CreditDate" title="入账日期" :valueData="timersList.CreditDate" />
        <van-field v-model="Remarks" rows="1" autosize label="备注" type="textarea" />
      </el-card>
      <div class="btns">
        <van-button type="info">提交</van-button>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      paramsData: {},
      clientName: '',
      OrderModel: '',
      Contract: '',
      channel: '',
      Settlement: '',
      Remarks: '',
      restaurant: [],
      CreditAmount: 0,
      timersList: {
        CreditDate: new Date().getTime(),
      },
    }
  },

  activated() {
    if (this.$store.state.timers.timers.CreditDate != '') {
      this.timersList.CreditDate = this.$store.state.timers.timers.CreditDate
    }
    document.querySelectorAll('input').forEach((item) => {
      item.style.border = 'none'
    })
    this.paramsData = this.$route.query.data
    console.log('this.paramsData', this.paramsData)
  },
  deactivated() {
    this.paramsData = {}
  },
  methods: {
    blacknext() {
      this.$router.go(-1)
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
    handleSelects(val) {
      console.log(val)
      this.selectedID = val.address
    },
  },
}
</script>


<style  >
.van-cell {
  padding: 0 !important;
}
</style>



<style scoped  lang="scss">
#keepmoneypage {
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
  .content {
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
    .btns {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      width: 100%;
      position: fixed;
      bottom: 0.357143rem;
      .van-button {
        margin-right: 0.714286rem;
      }
    }
  }
}
</style>
