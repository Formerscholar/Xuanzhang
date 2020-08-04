<template>
  <div id="contract">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <van-tabs v-model="active" animated @click="tacheClick">
        <van-tab title="发货清单" class="Delivery">
          <el-card class="box-card" v-for="(item, index) in deliveryRecordList" :key="index">
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
                >创建时间:{{item.created_at}}</span>
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
              <template #right>
                <van-button
                  square
                  text="作废"
                  type="danger"
                  class="delete-button"
                  @click="goDetailItem(item.id)"
                />
                <van-button
                  square
                  text="收款"
                  type="warning"
                  class="delete-button"
                  @click="toReceivables(item)"
                />
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
      :close-on-popstate="true"
      @select="onSelect"
      @open="openClick"
      :actions="actions"
      cancel-text="取消"
      safe-area-inset-bottom
    />
    <i class="el-icon-plus" @click="show = !show" v-if="isShow" slot="reference"></i>
    <i class="el-icon-plus" @click="createAddbill" v-else></i>
  </div>
</template>

<script>
import {
  getDeliverGoodsList,
  getFlowOrderList,
  deleteFlowOrderProduct,
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
      actions: [{ name: '发货' }, { name: '退货' }],
      DeliverList: 1,
      FlowOrderList: 1,
      distributor_id: null,
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
  activated() {
    this.getDeliverLists()
    this.getFlowOrderLists()
  },
  deactivated() {
    this.deliveryRecordList = []
    this.DeliverList = 1
    this.flowOrderList = []
    this.distributor_id = null
    this.FlowOrderList = 1
  },
  methods: {
    RetrieveData(id) {
      this.distributor_id = id
      this.flowOrderList = []
      this.getFlowOrderLists()
    },
    loadMore() {
      if (this.isShow) {
        this.DeliverList += 1
        this.getDeliverLists()
      } else {
        this.FlowOrderList += 1
        this.getFlowOrderLists()
      }
      this.$refs.scroll.finishPullUp()
    },
    toReceivables(item) {
      console.log('--------toReceivables------', item)
      this.$router.push({
        path: '/Receivable',
        query: {
          data: item,
        },
      })
    },
    async goDetailItem(id) {
      console.log('-----------作废-----------', id)
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
      console.log('--------gocontractList-------------', deliveryRecordList)
      this.$router.push(`/ShipmentItem/${deliveryRecordList.id}`)
    },
    onSelect(item) {
      this.show = false
      setTimeout(() => {
        if (item.name == '发货') {
          this.$router.push('/Ship')
        } else if (item.name == '退货') {
          this.$router.push('/returnedPurchase')
        }
      }, 10)
      this.closedClick()
    },
    gotodetails(id) {
      this.$router.push(`/turnover/${id}`)
    },
    async getDeliverLists() {
      const { data } = await getDeliverGoodsList(this.getDeliverGoodsListData)
      console.log('getDeliverGoodsList', data)
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
      console.log(name)
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
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 0.357143rem;
          .img_box {
            width: 1.857143rem;
            height: 1.857143rem;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 1.142857rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .title_text {
            display: flex;
            font-size: 1rem;
            .model {
              color: #2a88ff;
              margin-right: 0.714286rem;
            }
            .name {
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
          .time_pircle {
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

      // .box-card {
      //   margin-bottom: 0.571429rem;
      //   .topbox {
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: flex-end;
      //     span {
      //       font-size: 0.857143rem;
      //       color: #ff9d17;
      //       font-weight: 700;
      //       em {
      //         color: #acacac;
      //         padding-left: 0.571429rem;
      //         font-weight: normal;
      //       }
      //     }
      //     i {
      //       font-size: 1rem;
      //       font-weight: 700;
      //       color: #000;
      //     }
      //   }
      //   .botbox {
      //     display: flex;
      //     justify-content: space-between;
      //     align-items: flex-end;
      //     font-size: 0.857143rem;
      //     margin-top: 0.714286rem;
      //     span {
      //       font-weight: 700;
      //     }
      //     .black {
      //       color: #000000;
      //     }
      //     .red {
      //       color: red;
      //     }
      //     em {
      //       color: #acacac;
      //     }
      //   }
      // }
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

          .timer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            .leftitem {
              color: #2a88ff;
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
              white-space: nowrap;
              overflow: hidden;
            }
          }
          .article {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-right: 2rem;
            .leftitem {
              white-space: nowrap;
              overflow: hidden;
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
              white-space: nowrap;
              overflow: hidden;
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
    background-color: #2a7bd0;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
