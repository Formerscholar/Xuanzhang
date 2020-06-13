<template>
  <div id="Outsourcing">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <van-tabs v-model="active" @click="handleClick">
        <van-tab class="first" title="进行中">
          <el-card class="box-card" v-for="(item,index) in outsourcingOrderList" :key="index">
            <div class="info">
              <span>
                {{item.order_number}}
                <em>负责人：{{item.salesperson_name}}</em>
              </span>
              <i>{{item.name}}</i>
            </div>
            <el-row class="schedule">
              <div class="item">
                <span>发货</span>

                <el-progress
                  :status="item.delivery_schedule<100?null:'warning'"
                  :text-inside="true"
                  :stroke-width="20"
                  :show-text="item.delivery_schedule<30?false:true"
                  :percentage="item.delivery_schedule * 1"
                ></el-progress>
              </div>
              <div class="item">
                <span>入库</span>

                <el-progress
                  :status="item.warehousing_progress<100?null:'warning'"
                  :text-inside="true"
                  :stroke-width="20"
                  :show-text="item.warehousing_progress<30?false:true"
                  :percentage="item.warehousing_progress * 1"
                ></el-progress>
              </div>
            </el-row>
            <el-row class="timer">
              <div class="Delivery">交期:{{item.commitment_period}}</div>
              <div class="Settlement">预设价格:{{item.amount_of_discount}}</div>
            </el-row>
          </el-card>
        </van-tab>
        <van-tab class="second" title="已完工">
          <el-card class="box-card" v-for="(item,index) in outsourcingOrderListed" :key="index">
            <div class="info">
              <span>
                {{item.order_number}}
                <em>负责人：{{item.salesperson_name}}</em>
              </span>
              <i>{{item.name}}</i>
            </div>
            <el-row class="schedule">
              <div class="item">
                <span>发货</span>

                <el-progress
                  :status="item.delivery_schedule<100?null:'warning'"
                  :text-inside="true"
                  :show-text="item.delivery_schedule<30?false:true"
                  :stroke-width="20"
                  :percentage="item.delivery_schedule * 1"
                ></el-progress>
              </div>
              <div class="item">
                <span>入库</span>

                <el-progress
                  :status="item.warehousing_progress<100?null:'warning'"
                  :text-inside="true"
                  :stroke-width="20"
                  :show-text="item.warehousing_progress<30?false:true"
                  :percentage="item.warehousing_progress * 1"
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
    <i class="el-icon-plus" @click="tooutsource"></i>
  </div>
</template>
    
<script>
import {
  getUndischargedOutsourcingOrderList,
  getLiquidatedOutsourcingOrderList
} from '@/network/deal'
import scroll from '@/components/common/scroll/scroll'

export default {
  name: 'Outsourcing',
  components: { scroll },
  data() {
    return {
      active: 0,
      outsourcingOrderList: [],
      outsourcingOrderListed: [],
      indexTab: 0,
      allPage: 1,
      processing: 1,
      Completed: 1
    }
  },
  activated() {
    this.indexTab = 0
    this.allPage = 1
    this.processing = 1
    this.Completed = 1
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
        page: this.allPage,
        offset: 20,
        supplier_id: null,
        order_number: null,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    loadMore() {
      if (!this.indexTab) {
        this.processing += 1
        this.allPage = this.processing
        this.getOrderList()
      } else {
        this.Completed += 1
        this.allPage = this.Completed
        this.getOrderList()
      }
      this.$refs.scroll.finishPullUp()
    },
    handleClick(tab, event) {
      console.log(tab, event)
      this.indexTab = tab
    },
    async getOrderList() {
      const { data } = await getUndischargedOutsourcingOrderList(
        this.getOrderListData
      )
      data.outsourcingOrderList.map(item => {
        this.outsourcingOrderList.push(item)
      })
    },
    async getLiquidated() {
      const { data } = await getLiquidatedOutsourcingOrderList(
        this.getOrderListData
      )
      data.outsourcingOrderList.map(item => {
        this.outsourcingOrderListed.push(item)
      })
    },
    tooutsource() {
      this.$router.push('/outsource')
    }
  }
}
</script>
    
<style scoped lang="scss">
#Outsourcing {
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
            font-size: 1rem;
            color: #cc9933;
            font-weight: 700;

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
          margin-top: 0.142857rem;
          .item {
            flex: 1;
            padding: 0 0.857143rem;
            position: relative;
            top: -1.071429rem;
            span {
              position: relative;
              z-index: 99;
              left: 1rem;
              top: 1.235714rem;
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
