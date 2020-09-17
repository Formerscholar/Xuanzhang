<template>
  <div id="turnover">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <van-icon name="arrow-left" />
      </div>
      <div class="center" slot="center">
        <span>合作统计信息</span>
      </div>
      <!-- <div class="right" slot="right">
        <van-icon @click="newAccount" name="orders-o" />
      </div>-->
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <div class="coutent">
        <div class="card topcard">
          <div class="distributor_info">
            <div class="icon_box">
              <svg class="icon icons" aria-hidden="true">
                <use xlink:href="#icon-baogao" />
              </svg>
            </div>
            <div class="text">
              <div class="name">{{distributorNew.name}}</div>
              <div class="timers">最新交易时间:{{apply_time}}</div>
            </div>
          </div>

          <div class="box-card">
            <div class="card_items">
              <span>总发货</span>
              <em>{{OrderStatus.countSales}}</em>
            </div>
            <div class="card_items">
              <span>已结算</span>
              <em>{{distributorNew.settlementMoney}}</em>
            </div>
            <div class="card_items">
              <span>欠款</span>
              <em>{{distributorNew.actualNotSettlementMoney}}</em>
            </div>
            <div class="card_items">
              <span>开票</span>
              <em>{{distributorNew.invoiceMoney}}</em>
            </div>
          </div>
          <img class="bg" src="@/assets/image/liushuiBG.png" alt="liushuiBG" />
          <div class="bor_box">
            <div class="bg_title">
              <div class="bg_content">已发布的招标项目</div>
            </div>
          </div>
        </div>

        <div v-for="(item, index) in orderList" :key="item.id" class="Delivery">
          <van-swipe-cell v-if="item.to_examine != undefined ">
            <el-card class="box-card">
              <div
                @click="gocontractList(orderList[index])"
                :class="item.deleted_at && 'color_break ' "
              >
                <div class="title">
                  <div class="title_text">
                    <span
                      :class="item.deleted_at ? 'color_break model' :' model'"
                    >{{ item.order_number }}</span>
                    <span :class="item.deleted_at ? 'color_break name' :' name'">{{item.name}}</span>
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
                v-if="!item.to_examine"
                square
                type="primary"
                style="height:100%; margin:0 auto;width:2.142857rem;line-height:1.714286rem;"
                text="受控"
                @click.stop="ControlledDelay(item.id)"
              />
              <van-button
                v-else
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
                  <span :class="item.deleted_at ? 'color_break name' :' name'">{{item.name}}</span>
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
      </div>
    </scroll>
  </div>
</template>
    
<script>
import {
  getDistributorDetail,
  toExamineDeliveryRecord,
  cancelToExamineDeliveryRecord,
} from '@/network/deal'
export default {
  components: {
    selection: () =>
      import('@/views/deal/children/selection_cont/selection_cont'),
  },
  data() {
    return {
      active: 0,
      iid: 0,
      distributorNew: {},
      OrderStatus: {},
      orderList: [],
      apply_time: '',
    }
  },
  activated() {
    this.iid = this.$route.params.id
    this.getDistributor()
  },
  computed: {
    getDistributorDate() {
      return {
        token: this.$store.state.token,
        distributor_id: this.iid,
        order_type: 'flow',
        page: 1,
        order_number: null,
        start_time: null,
        end_time: null,
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

  methods: {
    gocontractList(deliveryRecordList) {
      this.$router.push(`/ShipmentItem/${deliveryRecordList.id}`)
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
        this.getDistributor()
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
        this.getDistributor()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    blackhome() {
      this.$router.go(-1)
    },
    newAccount() {
      console.log('----------------')
    },
    async getDistributor() {
      const { data } = await getDistributorDetail(this.getDistributorDate)
      console.log('getDistributor', data)
      this.distributorNew = data.distributorNew
      this.orderList = data.orderList
      this.OrderStatus = data.OrderStatus
      this.apply_time = this.orderList[0].apply_time
    },
  },
}
</script>
    
<style scoped lang="scss">
#turnover {
  padding-top: 5.428571rem;
  .p_root_box {
    background-color: #fff;
    color: #000;
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      margin-left: -2.071429rem;
      span {
        font-size: 1.142857rem;
      }
    }
    // .right {
    //   margin-right: 1.071429rem;
    //   .newbtn {
    //   }
    // }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .coutent {
    .card {
      .distributor_info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 0.857143rem solid #e6e6e6;
        padding: 1.142857rem 1.285714rem;
        .icon_box {
          margin-right: 0.714286rem;
          .icons {
            width: 3.285714rem;
            height: 3.285714rem;
          }
        }
        .text {
          .name {
            font-size: 1.285714rem;
          }
          .timers {
            font-size: 1rem;
            color: #b7b7b7;
          }
        }
      }
      .box-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.071429rem;
        padding-bottom: 0;

        .card_items {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 5.142857rem;
          border-radius: 0.357143rem;
          border: 1px solid #efefef;
          margin-right: 0.714286rem;
          overflow: hidden;
          &:first-child {
            border-color: #e5b27d;
          }
          &:last-child {
            margin-right: 0;
          }
          span {
            font-size: 1rem;
            color: #333333;
          }
          em {
            font-size: 0.857143rem;
            color: #458ff8;
          }
        }
      }
      .bg {
        width: 100%;
        padding: 0 1.071429rem;
      }
      .bor_box {
        padding: 0 1.142857rem;
        margin-bottom: 0.714286rem;
        .bg_title {
          border-bottom: 1px solid #ededed;
          padding: 1.142857rem 0;

          .bg_content {
            border-left: 0.214286rem solid #f77709;
            padding-left: 0.857143rem;
          }
        }
      }
    }

    .Delivery {
      padding: 0 1.071429rem;
      .box-card {
        padding: 0.571429rem 1rem;
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
  }
}
</style>
