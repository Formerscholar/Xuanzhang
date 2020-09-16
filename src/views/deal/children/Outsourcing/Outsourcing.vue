<template>
  <div id="Outsourcing">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @scroll="clickScroll"
    >
      <van-tabs v-model="active">
        <van-tab class="first" title="进行中">
          <van-swipe-cell v-for="(item,index) in outsourcingOrderList" :key="index">
            <el-card class="box-card">
              <div @click.stop="mkvongoing(item)">
                <div class="info">
                  <span>
                    {{item.order_number}}
                    <em>{{item.salesperson_name | setSalespersonName}}</em>
                  </span>
                  <div class="ControlledDelaybox">
                    <span
                      v-for="(item,index) in item.auditRecord"
                      :key="index"
                      :class="item.status == 0 ? 'glyphicon pramary' : 'glyphicon infos'"
                    ></span>
                    <i @click="Retrieve(item.supplier_id)">{{item.name}}</i>
                  </div>
                </div>
                <el-row class="schedule">
                  <div class="item">
                    <el-progress
                      :format="formatTwo"
                      :status="item.delivery_schedule<100?null:'warning'"
                      :text-inside="true"
                      :stroke-width="16"
                      :show-text="item.delivery_schedule<30?false:true"
                      :percentage="item.delivery_schedule * 1"
                    ></el-progress>
                  </div>
                  <div class="item">
                    <el-progress
                      :format="formatOne"
                      :status="item.warehousing_progress<100?null:'warning'"
                      :text-inside="true"
                      :stroke-width="16"
                      :show-text="item.warehousing_progress<30?false:true"
                      :percentage="item.warehousing_progress * 1"
                    ></el-progress>
                  </div>
                </el-row>
                <el-row class="timer">
                  <div class="Delivery">{{item.commitment_period | setCommitmentPeriode}}</div>
                  <div class="Settlement">{{item.amount_of_discount | setAmountOfDiscount}}</div>
                </el-row>
              </div>
            </el-card>
            <template #right>
              <div class="btns">
                <van-button
                  v-if="item.warehousing_progress == 100"
                  @click="completions(item)"
                  square
                  type="primary"
                  text="完工"
                />
                <van-button v-else @click="createGoods(item)" square type="danger" text="收货" />
              </div>
            </template>
          </van-swipe-cell>
        </van-tab>
        <van-tab class="second" title="已完工">
          <el-card class="box-card" v-for="(item,index) in outsourcingOrderListed" :key="index">
            <div class="info">
              <span>
                {{item.order_number}}
                <em>{{item.salesperson_name | setSalespersonName}}</em>
              </span>

              <div class="ControlledDelaybox">
                <span
                  v-for="(item,index) in item.auditRecord"
                  :key="index"
                  :class="item.status == 0 ? 'glyphicon pramary' : 'glyphicon infos'"
                ></span>
                <i>{{item.name}}</i>
              </div>
            </div>
            <el-row class="schedule">
              <div class="item">
                <el-progress
                  :format="formatTwo"
                  :status="item.delivery_schedule<100?null:'warning'"
                  :text-inside="true"
                  :show-text="item.delivery_schedule<30?false:true"
                  :stroke-width="16"
                  :percentage="item.delivery_schedule * 1"
                ></el-progress>
              </div>
              <div class="item">
                <el-progress
                  :format="formatOne"
                  :status="item.warehousing_progress<100?null:'warning'"
                  :text-inside="true"
                  :stroke-width="16"
                  :show-text="item.warehousing_progress<30?false:true"
                  :percentage="item.warehousing_progress * 1"
                ></el-progress>
              </div>
            </el-row>
            <el-row class="timer">
              <div class="Delivery">{{item.commitment_period | setCommitmentPeriode}}</div>
              <div class="Settlement">{{item.amount_of_discount | setAmountOfDiscount}}</div>
            </el-row>
          </el-card>
        </van-tab>
      </van-tabs>
    </scroll>
    <i class="el-icon-plus" @click="tooutsource" v-if="istooutsource"></i>
  </div>
</template>
    
<script>
import {
  getUndischargedOutsourcingOrderList,
  getLiquidatedOutsourcingOrderList,
} from '@/network/deal'

import myVqr from '@/components/common/my_vqr/myVqr'
import { bestURL } from '@/network/baseURL'
import { throttle, fmoney } from '@/common/utils'

export default {
  name: 'Outsourcing',
  components: { myVqr },
  data() {
    return {
      Loop: null,
      active: 0,
      outsourcingOrderList: [],
      outsourcingOrderListed: [],
      indexTab: 0,
      allPage: 1,
      processing: 1,
      isShow: false,
      textContent: '',
      Completed: 1,
      listIsShow: false,
      istooutsource: true,
      show: false,
      item: {},
      supplier_id: null,
    }
  },
  created() {
    this.indexTab = 0
    this.allPage = 1
    this.processing = 1
    this.Completed = 1
    this.getLiquidated()
    this.getOrderList()
  },
  activated() {
    this.$Jurisdiction('31', this.$store.state.catearr, () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
    this.$Jurisdiction('95', this.$store.state.catearr, () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
    this.$Jurisdiction('139', this.$store.state.oparr, () => {
      this.istooutsource = false
    })
  },
  destroyed() {
    this.Loop = null
    this.active = 0
    this.outsourcingOrderList = []
    this.outsourcingOrderListed = []
    this.indexTab = 0
    this.allPage = 1
    this.processing = 1
    this.isShow = false
    this.textContent = ''
    this.Completed = 1
    this.listIsShow = false
    this.show = false
    this.item = {}
    this.supplier_id = null
  },
  computed: {
    getOrderListData() {
      return {
        token: this.$store.state.token,
        page: this.allPage,
        offset: 20,
        supplier_id: this.supplier_id,
        order_number: null,
        _: new Date().getTime(),
      }
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
  },
  methods: {
    clickScroll() {
      this.supplier_id = null
      if (!this.active) {
        this.outsourcingOrderList = []
        this.processing = 1
        this.allPage = this.processing
        this.getOrderList()
      } else {
        this.outsourcingOrderListed = []
        this.Completed = 1
        this.allPage = this.Completed
        this.getLiquidated()
      }
    },
    createGoods(item) {
      this.$router.push({
        path: '/createGoodpage',
        query: {
          data: item,
        },
      })
    },
    completions(item) {
      this.$router.push(`/completions/${item.id}`)
    },
    mkvongoing(item) {
      this.$router.push(`/engravDetail/${item.id}`)
    },
    printClick() {
      this.show = false
      this.isShow = true
      this.textContent = `${bestURL}/Vt/view?id=${this.item.id}&order_type=outsourcing`
    },
    Retrieve(id) {
      this.allPage = 1
      this.supplier_id = id
      this.outsourcingOrderList = []
      this.getOrderList()
    },
    formatOne(percentage) {
      return `入库 ${percentage}%`
    },
    formatTwo(percentage) {
      return `发货 ${percentage}%`
    },
    toShipPages() {
      this.$router.push({
        path: '/Outsourc/outsourcing',
        query: {
          data: this.item,
        },
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
    loadMore() {
      if (!this.indexTab) {
        this.processing += 1
        this.allPage = this.processing
        this.getOrderList()
      } else {
        this.Completed += 1
        this.allPage = this.Completed
        this.getLiquidated()
      }
    },
    handleClick(tab, event) {
      throttle(() => {
        console.log(tab, event)
        this.indexTab = tab
        if (this.indexTab) {
          this.outsourcingOrderListed = []
          this.Completed = 1
          this.allPage = this.Completed
          this.getLiquidated()
        } else {
          this.outsourcingOrderList = []
          this.processing = 1
          this.allPage = this.processing
          this.getOrderList()
        }
      }, 500)
    },
    async getOrderList() {
      const { data } = await getUndischargedOutsourcingOrderList(
        this.getOrderListData
      )
      this.outsourcingOrderList = data.outsourcingOrderList.map((item) => item)
    },
    async getLiquidated() {
      const { data } = await getLiquidatedOutsourcingOrderList(
        this.getOrderListData
      )
      this.outsourcingOrderListed = data.outsourcingOrderList.map(
        (item) => item
      )
    },
    tooutsource() {
      this.$router.push('/outsource')
    },
  },
}
</script>
    
<style scoped lang="scss">
#Outsourcing {
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
