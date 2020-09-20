<template>
  <div id="aside">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @scroll="clickScroll"
    >
      <van-tabs v-model="active" animated>
        <van-tab title="入库清单" v-if="isDelivery" class="Delivery">
          <div v-for="(item, index) in warehouseAccessList" :key="item.id">
            <van-swipe-cell v-if="item.to_examine != undefined && item.type == 0">
              <el-card class="box-card">
                <div
                  @click="gocontractList(warehouseAccessList[index])"
                  :class="item.deleted_at && 'color_break ' "
                >
                  <div class="title">
                    <div class="title_text">
                      <span
                        :class="item.deleted_at ? 'color_break model' :' model'"
                      >{{ item.order_number }}</span>
                      <span
                        :class="item.deleted_at ? 'color_break name' :' name'"
                        @click.stop="gotodetails(item.supplier_id)"
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
                        :class="item.deleted_at ? 'color_break ' : item.total_price.indexOf('-') == -1 ? 'black' : 'red'"
                      >￥{{item.total_price.indexOf('-') == -1? fmoney(item.total_price): '-' + fmoney(item.total_price.substr(1))}}</em>
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
                @click="gocontractList(warehouseAccessList[index])"
                :class="item.deleted_at && 'color_break ' "
              >
                <div class="title">
                  <div class="title_text">
                    <span
                      :class="item.deleted_at ? 'color_break model' :' model'"
                    >{{ item.order_number }}</span>
                    <span
                      :class="item.deleted_at ? 'color_break name' :' name'"
                      @click.stop="gotodetails(item.supplier_id)"
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
                      :class="item.deleted_at ? 'color_break ' : item.total_price.indexOf('-') == -1 ? 'black' : 'red'"
                    >￥{{item.total_price.indexOf('-') == -1? fmoney(item.total_price): '-' + fmoney(item.total_price.substr(1))}}</em>
                  </span>
                </div>
              </div>
            </el-card>
          </div>
        </van-tab>
        <van-tab title="明细列表" v-if="isDetailed" class="Detailed">
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
                    >{{item.name_alias}}</div>
                  </div>
                  <div class="timers">
                    <div class="rightitem">{{item.created_at |setCommitmentPeriod}}</div>
                  </div>
                  <div class="article">
                    <div class="leftitem">{{item.materiel_name}}</div>
                  </div>
                  <div class="literature">
                    <div class="leftitem">{{item.materiel_model}}</div>
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
  getWarehouseLists,
  getWarehouseDetailList,
  delWarehouseRecord,
  toExamineWarehouseRecord,
  cancelToExamineWarehouseRecord,
} from '@/network/deal'

import { bestURL } from '@/network/baseURL'
import { fmoney } from '@/common/utils.ts'
export default {
  components: {
    selection: () =>
      import('@/views/deal/children/selection_cont/selection_cont'),
  },
  data() {
    return {
      isDelivery: true,
      isDetailed: true,
      active: 0,
      warehouseAccessList: [],
      flowOrderList: [],
      isShow: true,
      visible: false,
      show: false,
      actions: [{ name: '入库' }, { name: '退货' }],
      allIndex: 1,
      Library: 1,
      detail: 1,
      overlayShow: false,
      listIsShow: false,
      myVqrShow: false,
      textContent: '',
      iid: 0,
      fmoney,
    }
  },
  computed: {
    getDeliverGoodsListData() {
      return {
        token: this.$store.state.token,
        page: this.allIndex,
        offset: 20,
        supplier_id: null,
        _: new Date().getTime(),
      }
    },
    deleteContractOrderData() {
      const form = new FormData()
      form.append('token', this.$store.state.tonken)
      form.append('id', this.iid)
      return form
    },
  },
  filters: {
    setOperatorName(value) {
      return '操作:' + value
    },
    setApplyTime(value) {
      return '发货时间:' + value
    },
    setCommitmentPeriod(value) {
      return '创建:' + value
    },
    setApply(value) {
      return '交期:' + value
    },
    setNumber(value) {
      return '×' + value
    },
  },
  created() {
    this.allIndex = 1
    this.Library = 1
    this.detail = 1
    this.getDeliverLists()
    this.getFlowOrderLists()
  },
  activated() {
    this.$Jurisdiction('69', localStorage.getItem('catearr'), () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
    this.$Jurisdiction('87', localStorage.getItem('catearr'), () => {
      this.isDelivery = false
    })
    this.$Jurisdiction('88', localStorage.getItem('catearr'), () => {
      this.isDetailed = false
    })
  },
  destroyed() {
    this.warehouseAccessList = []
    this.flowOrderList = []
    this.iid = 0
    this.textContent = ''
  },
  methods: {
    clickScroll() {
      if (!this.active) {
        this.getDeliverLists()
      } else {
        this.flowOrderList = []
        this.getFlowOrderLists()
      }
    },
    async unlockyoursidekick(iid) {
      const { code, msg } = await cancelToExamineWarehouseRecord({
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
        this.getDeliverLists()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async ControlledDelay(iid) {
      const { code, msg } = await toExamineWarehouseRecord({
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
        this.getDeliverLists()
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
    gocontractList(deliveryRecordList) {
      console.log(deliveryRecordList)
      this.$router.push(`/asidesItem/${deliveryRecordList.id}`)
    },
    editlists() {
      this.$router.push(`/editwarehouse/${this.iid}`)
      this.show = false
    },
    async VoidList() {
      this.show = false
      const { msg } = await delWarehouseRecord(this.deleteContractOrderData)
      this.$toast(msg)
    },
    printList() {
      this.overlayShow = false
      this.myVqrShow = true
      this.textContent = `${bestURL}/view/html/run/warehouse_print.php?id=${this.iid}`
    },
    listClick(item) {
      this.iid = item.id
      if (!this.listIsShow) {
        this.listIsShow = false
      } else {
        this.listIsShow = false
        console.log(item)
        this.overlayShow = true
      }
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
    loadMore() {
      if (this.isShow) {
        this.Library += 1
        this.allIndex = this.Library
        this.getDeliverListssss()
      } else {
        this.detail += 1
        this.allIndex = this.detail
        this.getFlowOrderLists()
      }
    },
    onSelect(item) {
      this.show = false
      setTimeout(() => {
        if (item.name == '入库') {
          this.$router.push('/warehouse')
        } else if (item.name == '退货') {
          this.$router.push('/warehouseRet')
        }
      }, 10)
      this.closedClick()
    },
    gotodetails(id) {
      this.$router.push(`/storageCom/${id}`)
    },
    async getDeliverListssss() {
      const { data } = await getWarehouseLists(this.getDeliverGoodsListData)
      console.log('getWarehouseLists', data)
      data.warehouseAccessList.map((item) => {
        this.warehouseAccessList.push(item)
      })
    },
    async getDeliverLists() {
      const { data } = await getWarehouseLists(this.getDeliverGoodsListData)
      console.log('getWarehouseLists', data)
      this.warehouseAccessList = data.warehouseAccessList
    },
    createAddbill() {
      this.$router.push('/addbillwl')
    },
    async getFlowOrderLists() {
      const { data } = await getWarehouseDetailList(
        this.getDeliverGoodsListData
      )
      console.log('getFlowOrderList', data)
      data.warehouseAccessList.map((item) => {
        this.flowOrderList.push(item)
      })
    },
  },
}
</script>
    
<style scoped lang="scss">
#aside {
  #wrapper-click {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100% !important;
    #block {
      width: 14.285714rem;
      height: 14.285714rem;
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
            height: 100%;
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
          .article {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-right: 2rem;
            .leftitem {
            }
            .rightitem {
              font-size: 1rem;
              em {
                font-size: 0.571429rem;
              }
            }
          }
          .literature {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
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
