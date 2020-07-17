<template>
  <div id="purchase">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <van-tabs v-model="active" @click="handleClick">
        <van-tab title="进行中" class="first">
          <el-card class="box-card" v-for="(item,index) in outsourcingOrderList" :key="index">
            <div
              class="info"
              @click.stop="listClick(item)"
              @touchstart.prevent="touchin"
              @touchend.prevent="cleartime"
            >
              <span>
                {{item.order_number}}
                <em>{{item.salesperson_name | setSalespersonName}}</em>
              </span>
              <i @click="Retrieves(item.distributor_id)">{{item.distributor_name}}</i>
            </div>
            <div class="schedule">
              <div class="item">
                <el-progress
                  :format="formatOne"
                  :status="item.warehousing_progress<100?null:'warning'"
                  :text-inside="true"
                  :stroke-width="16"
                  :show-text="item.warehousing_progress<30?false:true"
                  :percentage="item.warehousing_progress *1"
                ></el-progress>
              </div>
              <div class="item">
                <el-progress
                  :format="formatTwo"
                  :status="item.delivery_schedule<100?null:'warning'"
                  :text-inside="true"
                  :show-text="item.delivery_schedule<30?false:true"
                  :stroke-width="16"
                  :percentage="item.delivery_schedule*1"
                ></el-progress>
              </div>
            </div>
            <el-row class="timer">
              <div class="Delivery">{{item.amount_of_discount | setAmountOfDiscount}}</div>
              <div class="Settlement">{{item.commitment_period | setCommitmentPeriode}}</div>
            </el-row>
          </el-card>
        </van-tab>
        <van-tab title="已完工" class="second">
          <el-card class="box-card" v-for="(item,index) in outsourcingOrderListed" :key="index">
            <div class="info">
              <span>
                {{item.order_number}}
                <em>{{item.salesperson_name | setSalespersonName}}</em>
              </span>
              <i>{{item.distributor_name}}</i>
            </div>
            <el-row class="schedule">
              <div class="item">
                <el-progress
                  :format="formatOne"
                  :status="item.warehousing_progress<100?null:'warning'"
                  :text-inside="true"
                  :show-text="item.warehousing_progress<30?false:true"
                  :stroke-width="16"
                  :percentage="item.warehousing_progress*1"
                ></el-progress>
              </div>
              <div class="item">
                <el-progress
                  :format="formatTwo"
                  :show-text="item.delivery_schedule<30?false:true"
                  :status="item.delivery_schedule<100?null:'warning'"
                  :text-inside="true"
                  :stroke-width="16"
                  :percentage="item.delivery_schedule*1"
                ></el-progress>
              </div>
            </el-row>
            <el-row class="timer">
              <div class="Delivery">{{item.commitment_period | setCommitmentPeriode}}</div>
              <div class="Settlement">{{item.amount_of_discount | setAmountInDiscount}}</div>
            </el-row>
          </el-card>
        </van-tab>
      </van-tabs>
    </scroll>
    <i class="el-icon-plus" @click="toOme"></i>
    <van-overlay :show="show" @click="show = false" lock-scroll>
      <div id="wrapper-click">
        <div id="block">
          <div class="propDivItem" @click="toShipPages">发货</div>
          <div class="propDivItem" @click="printClick">打印</div>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="isShow" @click="isShow = false">
      <div class="wrapper-qrCode">
        <myVqr :Content="textContent"></myVqr>
      </div>
    </van-overlay>
  </div>
</template>
    
<script>
import {
  getUndischargedOemOrderList,
  getLiquidatedOemOrderList
} from '@/network/deal'
import scroll from '@/components/common/scroll/scroll'
import myVqr from '@/components/common/my_vqr/myVqr'
import { bestURL } from '@/network/baseURL'

export default {
  name: 'purchase',
  components: { scroll, myVqr },
  data() {
    return {
      Loop: null,
      active: 0,
      outsourcingOrderList: [],
      outsourcingOrderListed: [],
      indexTab: 0,
      indexPage: 1,
      listIsShow: false,
      isShow: false,
      textContent: '',
      show: false,
      item: {},
      distributor_id: null
    }
  },
  activated() {
    this.indexPage = 1
    this.getOrderList()
    this.getLiquidated()
  },
  deactivated() {
    this.distributor_id = null
    this.outsourcingOrderList = []
    this.outsourcingOrderListed = []
    this.textContent = ''
  },
  computed: {
    getOrderListData() {
      return {
        token: this.$store.state.token,
        page: this.indexPage,
        offset: 20,
        is_contract: 1,
        distributor_id: this.distributor_id,
        order_number: null,
        other_order_number: null,
        _: new Date().getTime()
      }
    }
  },
  filters: {
    setSalespersonName(value) {
      return '负责人:' + value
    },
    setCommitmentPeriode(value) {
      return '交期:' + value
    },
    setAmountOfDiscount(value) {
      return '预设价格:' + value
    },
    setAmountInDiscount(value) {
      return '成交价格:' + value
    }
  },
  methods: {
    printClick() {
      this.show = false
      this.isShow = true
      this.textContent = `${bestURL}/Vt/view?id=${this.item.id}&order_type=oem`
    },
    Retrieves(id) {
      this.indexPage = 1
      this.distributor_id = id
      this.outsourcingOrderList = []
      this.getOrderList()
    },
    toShipPages() {
      this.$router.push({
        path: '/IncomDelivery/oem',
        query: {
          data: this.item
        }
      })
    },
    touchin() {
      clearInterval(this.Loop)
      this.Loop = setTimeout(() => {
        this.listIsShow = true
      }, 500)
    },
    cleartime() {
      clearInterval(this.Loop)
    },
    listClick(item) {
      this.item = item
      if (!this.listIsShow) {
        this.listIsShow = false
      } else {
        this.listIsShow = false
        this.show = true
      }
    },
    formatOne(percentage) {
      return `入库 ${percentage}%`
    },
    formatTwo(percentage) {
      return `发货 ${percentage}%`
    },
    loadMore() {
      this.indexPage += 1
      if (!this.indexTab) {
        this.getOrderList()
      } else {
        this.getLiquidated()
      }
      this.$refs.scroll.finishPullUp()
    },
    handleClick(tab, event) {
      console.log(tab, event)
      this.indexTab = tab
    },
    async getOrderList() {
      const { data } = await getUndischargedOemOrderList(this.getOrderListData)
      data.oemOrderList.map(item => {
        this.outsourcingOrderList.push(item)
      })
    },
    async getLiquidated() {
      const { data } = await getLiquidatedOemOrderList(this.getOrderListData)
      data.oemOrderList.map(item => {
        this.outsourcingOrderListed.push(item)
      })
    },
    toOme() {
      this.indexPage = 1
      this.$router.push('/oem')
    }
  }
}
</script>
    
<style scoped lang="scss">
#purchase {
  #wrapper-click {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100% !important;
    #block {
      width: 14.285714rem;
      background-color: #fff;
      .propDivItem {
        width: 100%;
        height: 33.33%;
        line-height: 4.857143rem;
        text-align: center;
        font-size: 1.428571rem;
        color: #888;
      }
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.214286rem;
    width: 100%;
    overflow: hidden;
  }
  .van-tabs {
    padding: 0 1rem;
    .first,
    .second {
      .box-card {
        margin-bottom: 0.571429rem;
        .info {
          font-size: 0.714286rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          span {
            color: #cc9933;
            font-weight: 700;
            font-size: 0.857143rem;
            em {
              font-size: 0.857143rem;
              color: #666666;
              font-weight: normal;
            }
          }

          i {
            font-size: 1rem;
            font-weight: 700;
          }
        }
        .schedule {
          display: flex;
          margin-top: 0.452857rem;
          .item {
            flex: 1;
            padding: 0 0.857143rem;

            span {
              position: relative;
              z-index: 99;
              left: 1rem;
              top: 1.085714rem;
              color: #fff;
              font-size: 0.857143rem;
            }
            &:first-child {
              padding-left: 0;
            }
            &:last-child {
              padding-right: 0;
            }
          }
        }
        .timer {
          overflow: auto;
          font-size: 0.857143rem;

          .Delivery {
            float: left;
            color: #666666;
          }
          .Settlement {
            float: right;
            color: #666666;
          }
        }
      }
    }
    .first {
    }
    .second {
      .timer {
        .Settlement {
          color: red !important;
        }
      }
    }
  }
  .el-icon-plus {
    position: fixed;
    bottom: 7.142857rem;
    right: 3.357143rem;
    padding: 0.571429rem;
    z-index: 999;
    font-size: 2.714286rem;
    background-color: #2a7bd0;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
