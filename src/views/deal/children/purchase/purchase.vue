<template>
  <div id="purchase">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @scroll="clickScroll"
    >
      <van-tabs v-model="active">
        <van-tab title="进行中" class="first" v-if="isOngoing">
          <van-swipe-cell v-for="(item,index) in outsourcingOrderList" :key="index">
            <el-card class="box-card">
              <div class="info">
                <span>
                  {{item.order_number}}
                  <em>{{item.operator_name | setSalespersonName}}</em>
                </span>

                <div class="ControlledDelaybox">
                  <span
                    v-for="(item,index) in item.auditRecord"
                    :key="index"
                    :class="item.status == 0 ? 'glyphicon pramary' : 'glyphicon infos'"
                  ></span>
                  <i @click="Retrieves(item.distributor_id)">{{item.distributor_name}}</i>
                </div>
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
            <template #right>
              <van-button
                style="height: 100%;margin: 0px auto;width: 2.785714rem;line-height: 1.71429rem;"
                square
                type="primary"
                text="发货"
                @click="toShipPages(item)"
              />
              <van-button
                style="height: 100%;margin: 0px auto;width: 2.785714rem;line-height: 1.71429rem;"
                square
                type="info"
                text="打印"
                @click="printClick(item.id)"
              />
              <van-button
                v-if="item.to_examine == 0"
                square
                type="primary"
                style="height:100%; margin:0 auto;width:2.142857rem;line-height:1.714286rem;"
                text="受控"
                @click.stop="ControlledDelay(item.id)"
              />
              <van-button
                v-if="item.to_examine == 1"
                style="height:100%; margin:0 auto;width:2.142857rem;line-height:1.714286rem;"
                square
                type="danger"
                text="解锁"
                @click.stop="unlockyoursidekick(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-tab>
        <van-tab title="已完工" class="second" v-if="isCompleted">
          <van-swipe-cell v-for="(item,index) in outsourcingOrderListed" :key="index">
            <el-card class="box-card">
              <div class="info">
                <span>
                  {{item.order_number}}
                  <em>{{item.operator_name | setSalespersonName}}</em>
                </span>

                <div class="ControlledDelaybox">
                  <span
                    v-for="(item,index) in item.auditRecord"
                    :key="index"
                    :class="item.status == 0 ? 'glyphicon pramary' : 'glyphicon infos'"
                  ></span>
                  <i @click="Retrieves(item.distributor_id)">{{item.distributor_name}}</i>
                </div>
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
            <template #right>
              <van-button
                style="height: 100%;margin: 0px auto;width: 2.785714rem;line-height: 1.71429rem;"
                square
                type="primary"
                text="发货"
                @click="toShipPages(item)"
              />
              <van-button
                style="height: 100%;margin: 0px auto;width: 2.785714rem;line-height: 1.71429rem;"
                square
                type="info"
                text="打印"
                @click="printClick(item.id)"
              />
              <van-button
                v-if="item.to_examine == 0"
                square
                type="primary"
                style="height:100%; margin:0 auto;width:2.142857rem;line-height:1.714286rem;"
                text="受控"
                @click.stop="ControlledDelay(item.id)"
              />
              <van-button
                v-if="item.to_examine == 1"
                style="height:100%; margin:0 auto;width:2.142857rem;line-height:1.714286rem;"
                square
                type="danger"
                text="解锁"
                @click.stop="unlockyoursidekick(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-tab>
      </van-tabs>
    </scroll>

    <i class="el-icon-plus" @click="toOme" v-if="isInitiateOEM"></i>

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
  getLiquidatedOemOrderList,
  toExamineOemOrder,
  cancelToExamineOemOrder,
  getleft,
} from '@/network/deal'

import { bestURL } from '@/network/baseURL'
import { throttle, fmoney } from '@/common/utils'
export default {
  name: 'purchase',
  components: { myVqr: () => import('@/components/common/my_vqr/myVqr') },
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
      OEMAuthority: [],
      distributor_id: null,
    }
  },
  created() {
    this.getlefts()
    this.getLiquidated()
    this.getOrderList()
  },
  activated() {
    this.$Jurisdiction('32', localStorage.getItem('catearr'), () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
    this.$Jurisdiction('85', localStorage.getItem('catearr'), () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
  },
  deactivated() {},
  destroyed() {
    this.Loop = null
    this.active = 0
    this.outsourcingOrderList = []
    this.outsourcingOrderListed = []
    this.indexTab = 0
    this.indexPage = 1
    this.listIsShow = false
    this.isShow = false
    this.textContent = ''
    this.show = false
    this.item = {}
    this.distributor_id = null
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
        _: new Date().getTime(),
      }
    },
    isOngoing: {
      get() {
        return (
          this.OEMAuthority.findIndex((value) => {
            return value.id == '84'
          }) + 1
        )
      },
      set(newValue) {
        console.log(newValue)
      },
    },
    isCompleted: {
      get() {
        return (
          this.OEMAuthority.findIndex((value) => {
            return value.id == '85'
          }) + 1
        )
      },
      set(newValue) {
        console.log(newValue)
      },
    },
    isInitiateOEM: {
      get() {
        return (
          this.OEMAuthority.findIndex((value) => {
            return value.id == '86'
          }) + 1
        )
      },
      set(newValue) {
        console.log(newValue)
      },
    },
  },
  filters: {
    setSalespersonName(value) {
      return '操作:' + value
    },
    setCommitmentPeriode(value) {
      return '交期:' + value
    },
    setAmountOfDiscount(value) {
      return value.indexOf('-') == -1
        ? '预设价格:' + fmoney(value)
        : '预设价格:-' + fmoney(value.substr(1))
    },
    setAmountInDiscount(value) {
      return '成交价格:' + value
    },
  },
  methods: {
    clickScroll() {
      this.distributor_id = null
      if (!this.active) {
        this.outsourcingOrderList = []
        this.getOrderList()
      } else {
        this.outsourcingOrderListed = []
        this.getLiquidated()
      }
    },
    async getlefts() {
      const { data } = await getleft({
        token: this.$store.state.token,
        left: 32,
      })
      this.OEMAuthority = data
    },
    async unlockyoursidekick(iid) {
      const { code, msg } = await cancelToExamineOemOrder({
        id: [iid],
        token: this.$store.state.token,
        order_type: 'flow',
      })
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        if (this.indexTab) {
          this.getLiquidated()
        } else {
          this.getOrderList()
        }
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async ControlledDelay(iid) {
      const { code, msg } = await toExamineOemOrder({
        id: [iid],
        token: this.$store.state.token,
        order_type: 'flow',
      })
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        if (this.indexTab) {
          this.getLiquidated()
        } else {
          this.getOrderList()
        }
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    printClick(iid) {
      this.isShow = true
      this.textContent = `${bestURL}/Vt/view?id=${iid}&order_type=oem`
    },
    Retrieves(id) {
      throttle(() => {
        this.indexPage = 1
        this.distributor_id = id
        this.outsourcingOrderList = []
        this.getOrderList()
      }, 300)
    },
    toShipPages(item) {
      this.$router.push({
        path: '/IncomDelivery/oem',
        query: {
          data: item,
        },
      })
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
        this.getLiquidateds()
      }
    },
    handleClick(tab, event) {
      throttle(() => {
        console.log(tab, event)
        this.indexTab = tab
        this.indexPage = 1
        if (this.indexTab) {
          this.outsourcingOrderListed = []
          this.getLiquidated()
        } else {
          this.outsourcingOrderList = []
          this.getOrderList()
        }
      }, 500)
    },
    async getOrderList() {
      const { data } = await getUndischargedOemOrderList(this.getOrderListData)
      data.oemOrderList.forEach((item) => {
        this.outsourcingOrderList.push(item)
      })
    },
    async getLiquidateds() {
      const { data } = await getLiquidatedOemOrderList(this.getOrderListData)
      data.oemOrderList.forEach((item) => {
        this.outsourcingOrderListed.push(item)
      })
    },
    async getLiquidated() {
      const { data } = await getLiquidatedOemOrderList(this.getOrderListData)
      this.outsourcingOrderListed = data.oemOrderList
    },
    toOme() {
      this.indexPage = 1
      this.$router.push('/oem')
    },
  },
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
          .ControlledDelaybox {
            display: flex;
            justify-content: center;
            align-items: center;
            .glyphicon {
              width: 0.857143rem;
              height: 0.857143rem;
              margin-right: 0.357143rem;
            }
            .pramary {
              background-color: #e3e3e3;
            }
            .infos {
              background-color: rgb(66, 147, 200);
            }
          }
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
    background-color: rgb(66, 147, 200);
    color: #fff;
    border-radius: 50%;
  }
}
</style>
