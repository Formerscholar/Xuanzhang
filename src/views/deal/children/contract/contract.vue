<template>
  <div id="contract">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @scroll="clickscroll"
    >
      <van-tabs v-model="active" animated @click="tacheClick">
        <van-tab title="发货清单" v-if="isDelivery" class="Delivery">
          <div v-for="(item, index) in deliveryRecordList" :key="item.id">
            <van-swipe-cell v-if="item.to_examine != undefined  && item.type == 0">
              <el-card class="box-card">
                <div
                  @click="gocontractList(deliveryRecordList[index])"
                  :class="item.deleted_at && 'color_break ' "
                >
                  <div class="title">
                    <div class="title_text">
                      <span
                        :class="item.deleted_at ? 'color_break model' :' model'"
                      >{{ item.order_number }}</span>
                      <span
                        :class="item.deleted_at ? 'color_break name' :' name'"
                        @click.stop="gotodetails(item.distributor_id)"
                      >{{item.name}}</span>
                    </div>

                    <div class="ControlledDelaybox">
                      <span
                        v-for="(item,index) in item.auditRecord"
                        :key="index"
                        :class="item.status == 0 ? 'glyphicon pramary' : 'glyphicon info'"
                      ></span>
                    </div>
                  </div>
                  <div class="itemlist" v-if="item.detail.length">
                    <div class="items">
                      <selection :selectionList="item.detail" />
                    </div>
                    <div class="right_box">
                      <em :class="item.deleted_at && 'color_break ' ">共</em>
                      <em :class="item.deleted_at && 'color_break ' ">{{item.detail.length}}</em>
                      <em :class="item.deleted_at && 'color_break ' ">种</em>
                    </div>
                  </div>
                  <div class="time_box">
                    <span
                      :class="item.deleted_at ? 'color_break timer_text' :' timer_text'"
                    >{{item.created_at | setCommitmentPeriod}}</span>
                    <span :class="item.deleted_at ? 'color_break time_pircle' :' time_pircle'">
                      <el-tag
                        :class="item.deleted_at ? 'color_break ' :' '"
                        :type="item.type == 0 ? '' : 'danger'"
                        effect="plain"
                      >{{item.type == 0 ? '正常' : '待审'}}</el-tag>
                      <em
                        :class="item.deleted_at ? 'color_break ' : item.total_funds.indexOf('-') == -1 ? 'black' : 'red'"
                      >￥{{item.total_funds}}</em>
                    </span>
                  </div>
                </div>
              </el-card>
              <template #right>
                <van-button
                  v-if="item.to_examine == 0 "
                  square
                  type="primary"
                  style="height:100%; margin:0 auto;width:2.142857rem;line-height:1.714286rem;"
                  text="受控"
                  @click.stop="ControlledDelay(item.id)"
                />
                <van-button
                  v-if="item.to_examine == 1 "
                  style="height:100%; margin:0 auto;width:2.142857rem;line-height:1.714286rem;"
                  square
                  type="danger"
                  text="解锁"
                  @click.stop="unlockyoursidekick(item.id)"
                />
              </template>
            </van-swipe-cell>
            <el-card class="box-card" v-else>
              <div
                @click="gocontractList(deliveryRecordList[index])"
                :class="item.deleted_at && 'color_break ' "
              >
                <div class="title">
                  <div class="title_text">
                    <span
                      :class="item.deleted_at ? 'color_break model' :' model'"
                    >{{ item.order_number }}</span>
                    <span
                      :class="item.deleted_at ? 'color_break name' :' name'"
                      @click.stop="gotodetails(item.distributor_id)"
                    >{{item.name}}</span>
                  </div>
                  <div class="ControlledDelaybox">
                    <span
                      v-for="(item,index) in item.auditRecord"
                      :key="index"
                      :class="item.status == 0 ? 'glyphicon pramary' : 'glyphicon info'"
                    ></span>
                  </div>
                </div>
                <div class="itemlist" v-if="item.detail.length">
                  <div class="items">
                    <selection :selectionList="item.detail" />
                  </div>
                  <div class="right_box">
                    <em :class="item.deleted_at && 'color_break ' ">共</em>
                    <em :class="item.deleted_at && 'color_break ' ">{{item.detail.length}}</em>
                    <em :class="item.deleted_at && 'color_break ' ">种</em>
                  </div>
                </div>
                <div class="time_box">
                  <span
                    :class="item.deleted_at ? 'color_break timer_text' :' timer_text'"
                  >{{item.created_at | setCommitmentPeriod}}</span>
                  <span :class="item.deleted_at ? 'color_break time_pircle' :' time_pircle'">
                    <el-tag
                      :class="item.deleted_at ? 'color_break ' :' '"
                      :type="item.type == 0 ? '' : 'danger'"
                      effect="plain"
                    >{{item.type == 0 ? '正常' : '待审'}}</el-tag>
                    <em
                      :class="item.deleted_at ? 'color_break ' : item.total_funds.indexOf('-') == -1 ? 'black' : 'red'"
                    >￥{{item.total_funds}}</em>
                  </span>
                </div>
              </div>
            </el-card>
          </div>
        </van-tab>
        <van-tab title="订单列表" class="Detailed">
          <el-card class="box-card items" v-for="(item,index) in flowOrderList" :key="index">
            <van-swipe-cell>
              <div class="coutent">
                <div class="leftbox">
                  <img src="@/assets/image/Default.png" />
                </div>
                <div class="rightbox">
                  <div class="timer">
                    <div class="leftitem">{{item.order_number}}</div>
                    <div
                      class="rightitem"
                      @click="RetrieveData(item.distributor_id)"
                    >{{item.distributor_name}}</div>
                  </div>
                  <div class="timers">
                    <div class="rightitem">{{item.created_at |setCommitmentPeriod}}</div>
                  </div>
                  <div class="article">
                    <div class="leftitem">{{item.product_name}}</div>
                  </div>
                  <div class="literature">
                    <div class="leftitem">{{item.product_model}}</div>
                    <div class="rightitem">{{item.number | setNumber}}</div>
                  </div>
                </div>
              </div>
              <template #right style=" display: flex;">
                <div style=" display: flex;height:100%;">
                  <van-button
                    square
                    text="作废"
                    style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
                    type="danger"
                    class="delete-button"
                    @click="goDetailItem(item.id)"
                  />
                  <van-button
                    square
                    style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
                    text="收款"
                    type="warning"
                    class="delete-button"
                    @click="toReceivables(item)"
                  />
                </div>
              </template>
            </van-swipe-cell>
          </el-card>
        </van-tab>
      </van-tabs>
    </scroll>
    <van-action-sheet
      v-model="show"
      @click-overlay="closedClick"
      @cancel="closedClick"
      :close-on-click-action="true"
      :round="false"
      :close-on-popstate="true"
      @select="onSelect"
      @open="openClick"
      :actions="actions"
      cancel-text="取消"
      safe-area-inset-bottom
    />
    <i class="el-icon-plus" @click="show = !show" v-if="isShow && isNewlyBuild" slot="reference"></i>
    <i class="el-icon-plus" @click="createAddbill" v-else-if="isNewOrder"></i>
  </div>
</template>

<script>
import {
  getDeliverGoodsList,
  getFlowOrderList,
  deleteFlowOrderProduct,
  toExamineDeliveryRecord,
  cancelToExamineDeliveryRecord,
  getleft,
} from '@/network/deal'

import { throttle } from '@/common/utils.ts'
import selection from '@/views/deal/children/selection_cont/selection_cont'

export default {
  data() {
    return {
      active: 0,
      deliveryRecordList: [],
      flowOrderList: [],
      isShow: true,
      visible: false,
      show: false,
      actions: [],
      DeliverList: 1,
      FlowOrderList: 1,
      distributor_id: null,
      leftBtn: [],
      selectionList: [{ id: 0 }],
    }
  },
  components: {
    selection,
  },
  computed: {
    getDeliverGoodsListData() {
      return {
        token: this.$store.state.token,
        page: this.DeliverList,
        offset: 20,
        order_type: 'flow',
        distributor_id: null,
        _: new Date().getTime(),
      }
    },
    getFlowOrderListData() {
      return {
        token: this.$store.state.token,
        page: this.FlowOrderList,
        offset: 20,
        distributor_id: this.distributor_id,
        order_number: null,
        _: new Date().getTime(),
      }
    },
    isDelivery: {
      get() {
        return (
          this.leftBtn.findIndex((value) => {
            return value.id == '78'
          }) + 1
        )
      },
      set(newValue) {
        console.log(newValue)
      },
    },
    isDetailed: {
      get() {
        return (
          this.leftBtn.findIndex((value) => {
            return value.id == '81'
          }) + 1
        )
      },
      set(newValue) {
        console.log(newValue)
      },
    },
    isNewOrder: {
      get() {
        return (
          this.leftBtn.findIndex((value) => {
            return value.id == '82'
          }) + 1
        )
      },
      set(newValue) {
        console.log(newValue)
      },
    },
    isNewlyBuild: {
      get() {
        return (
          this.leftBtn.findIndex((value) => {
            return value.id == '79'
          }) +
          this.leftBtn.findIndex((value) => {
            return value.id == '80'
          })
        )
      },
      set(newValue) {
        console.log(newValue)
      },
    },
  },
  filters: {
    setOperatorName(value) {
      return '操作:' + value
    },
    setTotalFundse(value) {
      return '￥' + value
    },
    setCreated(value) {
      return '发货时间:' + value
    },
    setCommitmentPeriod(value) {
      return '创建:' + value
    },
    setNumber(value) {
      return '×' + value
    },
  },
  created() {
    this.getlefts()
    this.getDeliverListss()
    this.getFlowOrderLists()
  },
  destroyed() {
    this.deliveryRecordList = []
    this.DeliverList = 1
    this.flowOrderList = []
    this.distributor_id = null
    this.FlowOrderList = 1
  },
  methods: {
    clickscroll() {
      if (!this.active) {
        this.deliveryRecordList = []
        this.getDeliverListss()
      } else {
        this.flowOrderList = []
        this.getFlowOrderLists()
      }
    },
    async getlefts() {
      const { data } = await getleft({
        token: this.$store.state.token,
        left: 28,
      })
      this.leftBtn = data
      console.log('getleft', this.leftBtn)
      this.leftBtn.map((item) => {
        if (item.id == '79') {
          this.actions.push({
            name: item.title,
          })
        }
        if (item.id == '80') {
          this.actions.push({
            name: item.title,
          })
        }
      })
      //
    },
    async unlockyoursidekick(iid) {
      const { code, msg } = await cancelToExamineDeliveryRecord({
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
        this.deliveryRecordList = []
        this.getDeliverListss()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async ControlledDelay(iid) {
      const { code, msg } = await toExamineDeliveryRecord({
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
        this.deliveryRecordList = []
        this.getDeliverListss()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    RetrieveData(id) {
      this.distributor_id = id
      this.flowOrderList = []
      this.getFlowOrderLists()
    },
    loadMore() {
      if (this.isShow) {
        this.DeliverList += 1
        this.getDeliverListss()
      } else {
        this.FlowOrderList += 1
        this.getFlowOrderLists()
      }
    },
    toReceivables(item) {
      this.$router.push({
        path: '/Receivable',
        query: {
          data: item,
        },
      })
    },
    async goDetailItem(id) {
      let from = new FormData()
      from.append('token', this.$store.state.token)
      from.append('id', id)
      const { code, data, msg } = await deleteFlowOrderProduct(from)
      console.log('deleteFlowOrderProduct', data)
      if (code == 200) {
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    },
    gocontractList(deliveryRecordList) {
      this.$router.push(`/ShipmentItem/${deliveryRecordList.id}`)
    },
    onSelect(item) {
      this.show = false
      setTimeout(() => {
        if (item.name == '新建发货') {
          this.$router.push('/Ship')
        } else if (item.name == '新建退货') {
          this.$router.push('/returnedPurchase')
        }
      }, 10)
      this.closedClick()
    },
    gotodetails(id) {
      this.$router.push(`/turnover/${id}`)
    },

    async getDeliverListss() {
      const { data } = await getDeliverGoodsList(this.getDeliverGoodsListData)
      data.deliveryRecordList.map((item) => {
        this.deliveryRecordList.push(item)
      })
    },
    createAddbill() {
      this.$router.push('/addbill')
    },
    async getFlowOrderLists() {
      const { data } = await getFlowOrderList(this.getFlowOrderListData)
      console.log('getFlowOrderList', data)
      data.flowOrderList.map((item) => {
        this.flowOrderList.push(item)
      })
    },
    tacheClick(name, title) {
      if (name) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    openClick() {},
    closedClick() {},
  },
}
</script>


<style scoped lang="scss">
#contract {
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.214286rem;
    width: 100%;
    overflow: hidden;
  }
  .van-tabs {
    .Delivery {
      padding: 0.571429rem 1rem;

      .box-card {
        margin-bottom: 0.571429rem;
        .color_break {
          color: #ccc !important;
          border-color: #ccc !important;
          filter: grayscale(100%);
        }
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.357143rem;

          .title_text {
            display: flex;
            font-size: 1rem;
            .model {
              color: rgb(66, 147, 200);
              margin-right: 0.714286rem;
            }
            .name {
            }
          }
          .ControlledDelaybox {
            display: flex;
            .glyphicon {
              width: 0.857143rem;
              height: 0.857143rem;
              margin-right: 0.357143rem;
            }
            .pramary {
              background-color: #e3e3e3;
            }
            .info {
              background-color: rgb(66, 147, 200);
            }
          }
        }
        .itemlist {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.357143rem;
          white-space: nowrap;
          position: relative;
          .items {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: 1;
            overflow: hidden;
          }
          .right_box {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #818181;
            background-color: rgba(255, 255, 255, 0.6);
          }
        }
        .time_box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.857143rem;
          color: #818181;
          .timer_text {
            white-space: nowrap;
            overflow: hidden;
          }
          .time_pircle {
            display: flex;
            justify-content: center;
            align-items: center;
            /deep/.el-tag--plain {
              color: rgb(66, 147, 200);
            }
            /deep/.el-tag--danger {
              color: #f56c6c;
            }
            .black {
              color: #000000;
            }
            .red {
              color: red;
            }
            em {
              color: #acacac;
            }
          }
        }
      }
    }

    .Detailed {
      padding: 0.571429rem 1rem;
      .box-card {
        margin-bottom: 0.571429rem;
        ul {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          li {
            width: 50%;
            height: 5.571429rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding: 1.014286rem;
            span {
              color: #9b9b9b;
            }
            em {
              font-weight: 700;
              font-style: normal;
              font-size: 1.142857rem;
            }
          }
        }
      }
      .items {
        margin-bottom: 0.571429rem;

        .coutent {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-right: 0.357143rem;
          .goods-card {
            margin: 0;
          }

          .delete-button {
            height: 100%;
          }
        }
        .leftbox {
          width: 5.928571rem;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            border-radius: 5px;
          }
        }
        .rightbox {
          flex: 1;
          margin-left: 1rem;
          font-size: 1rem;
          white-space: nowrap;
          overflow: hidden;
          .timer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            .leftitem {
              color: rgb(66, 147, 200);
              font-weight: 700;
            }
            .rightitem {
            }
          }
          .timers {
            color: #9a9a9a;
            .leftitem {
            }
            .rightitem {
              margin-right: 2rem;
            }
          }
          .article {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-right: 2rem;
            .leftitem {
            }
            .rightitem {
              em {
                font-size: 0.571429rem;
              }
            }
          }
          .literature {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 0.857143rem;

            .leftitem {
              color: #aeaeae;
            }
            .rightitem {
            }
          }
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
