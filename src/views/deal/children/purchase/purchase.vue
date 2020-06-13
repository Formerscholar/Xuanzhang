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
            <div class="info">
              <span>
                {{item.order_number}}
                <em>负责:{{item.salesperson_name}}</em>
              </span>
              <i>{{item.name_alias}}</i>
            </div>
            <div class="schedule">
              <div class="item">
                <span>入库</span>
                <el-progress
                  :status="item.warehousing_progress<100?null:'warning'"
                  :text-inside="true"
                  :stroke-width="16"
                  :show-text="item.warehousing_progress<30?false:true"
                  :percentage="item.warehousing_progress *1"
                ></el-progress>
              </div>
              <div class="item">
                <span>发货</span>
                <el-progress
                  :status="item.delivery_schedule<100?null:'warning'"
                  :text-inside="true"
                  :show-text="item.delivery_schedule<30?false:true"
                  :stroke-width="16"
                  :percentage="item.delivery_schedule*1"
                ></el-progress>
              </div>
            </div>
            <el-row class="timer">
              <div class="Delivery">预设价格:{{item.amount_of_discount}}</div>
              <div class="Settlement">交期:{{item.commitment_period}}</div>
            </el-row>
          </el-card>
        </van-tab>
        <van-tab title="已完工" class="second">
          <el-card class="box-card" v-for="(item,index) in outsourcingOrderListed" :key="index">
            <div class="info">
              <span>
                {{item.order_number}}
                <em>负责人：{{item.salesperson_name}}</em>
              </span>
              <i>{{item.name_alias}}</i>
            </div>
            <el-row class="schedule">
              <div class="item">
                <span>入库</span>
                <el-progress
                  :status="item.warehousing_progress<100?null:'warning'"
                  :text-inside="true"
                  :show-text="item.warehousing_progress<30?false:true"
                  :stroke-width="16"
                  :percentage="item.warehousing_progress*1"
                ></el-progress>
              </div>
              <div class="item">
                <span>发货</span>

                <el-progress
                  :show-text="item.delivery_schedule<30?false:true"
                  :status="item.delivery_schedule<100?null:'warning'"
                  :text-inside="true"
                  :stroke-width="16"
                  :percentage="item.delivery_schedule*1"
                ></el-progress>
              </div>
            </el-row>
            <el-row class="timer">
              <div class="Delivery">交期:{{item.commitment_period}}</div>
              <div class="Settlement">成交价格:{{item.amount_of_discount}}</div>
            </el-row>
          </el-card>
        </van-tab>
      </van-tabs>
    </scroll>
    <i class="el-icon-plus" @click="toOme"></i>
  </div>
</template>
    
<script>
import {
  getUndischargedOemOrderList,
  getLiquidatedOemOrderList
} from '@/network/deal'
import scroll from '@/components/common/scroll/scroll'

export default {
  name: 'purchase',
  components: { scroll },
  data() {
    return {
      active: 0,
      outsourcingOrderList: [],
      outsourcingOrderListed: [],
      indexTab: 0,
      indexPage: 1
    }
  },
  activated() {
    this.indexPage = 1
    this.getOrderList()
    this.getLiquidated()
  },
  deactivated() {
    this.outsourcingOrderList = []
    this.outsourcingOrderListed = []
  },
  computed: {
    getOrderListData() {
      return {
        token: this.$store.state.token,
        page: this.indexPage,
        offset: 20,
        is_contract: 1,
        distributor_id: null,
        order_number: null,
        _: new Date().getTime()
      }
    }
  },
  methods: {
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
            position: relative;
            top: -1.071429rem;
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
          position: relative;
          top: -0.714286rem;
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
