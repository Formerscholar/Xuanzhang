<template>
  <div id="aside">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <van-tabs v-model="active" animated @click="tacheClick">
        <van-tab title="入库清单" class="Delivery">
          <el-card class="box-card" v-for="(item, index) in warehouseAccessList" :key="index">
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
                  >￥{{item.total_price}}</em>
                </span>
              </div>
            </div>
          </el-card>
          <!-- <div
            v-for="(item, index) in warehouseAccessList"
            :key="index"
            @click="listClick(item)"
            @touchstart.prevent="touchin"
            @touchend.prevent="cleartime"
          >
            <el-card class="box-card">
              <div class="topbox">
                <span>
                  {{ item.order_number }}
                  <em>{{ item.operator_name | setOperatorName}}</em>
                </span>
                <i @click.stop="gotodetails(item.supplier_id)">{{ item.name_alias }}</i>
              </div>
              <div class="botbox">
                <span
                  :class="item.total_price.indexOf('-') == -1 ? 'black' : 'red'"
                >{{ item.total_price }}</span>
                <em>{{ item.apply_time | setApplyTime}}</em>
              </div>
            </el-card>
          </div>-->
        </van-tab>
        <van-tab title="明细列表" class="Detailed">
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
          <!-- <el-card class="box-card items" v-for="(item,index) in flowOrderList" :key="index">
            <div class="coutent">
              <div class="leftbox">
                <img src="@/assets/image/logo.png" />
              </div>
              <div class="rightbox">
                <div class="timer">
                  <div class="leftitem">{{item.order_number}}</div>
                  <div class="rightitem">{{item.name_alias}}</div>
                </div>
                <div class="article">
                  <div class="leftitem">{{item.materiel_name}}</div>
                  <div class="rightitem">{{item.apply_time | setApply}}</div>
                </div>
                <div class="literature">
                  <div class="leftitem">{{item.materiel_model}}</div>
                  <div class="rightitem">{{item.number | setNumber}}</div>
                </div>
              </div>
            </div>
          </el-card>-->
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
    <van-overlay :show="overlayShow" @click="overlayShow = false" lock-scroll>
      <div id="wrapper-click">
        <div id="block">
          <div class="propDivItem" @click="editlists">编辑</div>
          <div class="propDivItem" @click="VoidList">作废</div>
          <div class="propDivItem" @click="printList">打印</div>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="myVqrShow" @click="myVqrShow = false">
      <div class="wrapper-qrCode">
        <myVqr :Content="textContent"></myVqr>
      </div>
    </van-overlay>
  </div>
</template>
    
<script>
import {
  getWarehouseLists,
  getWarehouseDetailList,
  delWarehouseRecord,
} from '@/network/deal'

import myVqr from '@/components/common/my_vqr/myVqr'
import { bestURL } from '@/network/baseURL'
import { throttle } from '@/common/utils.ts'
import selection from '@/views/deal/children/selection_cont/selection_cont'
export default {
  components: { selection, myVqr },
  data() {
    return {
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
  activated() {
    this.allIndex = 1
    this.Library = 1
    this.detail = 1
    if (this.isShow) {
      this.getDeliverLists()
    } else {
      this.getFlowOrderLists()
    }
  },
  deactivated() {
    this.warehouseAccessList = []
    this.flowOrderList = []
    this.iid = 0
    this.textContent = ''
  },
  methods: {
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
        this.getDeliverLists()
      } else {
        this.detail += 1
        this.allIndex = this.detail
        this.getFlowOrderLists()
      }
      this.$refs.scroll.finishPullUp()
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
    async getDeliverLists() {
      const { data } = await getWarehouseLists(this.getDeliverGoodsListData)
      console.log('getWarehouseLists', data)
      data.warehouseAccessList.map((item) => {
        this.warehouseAccessList.push(item)
      })
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
    tacheClick(name, title) {
      console.log(name)
      if (name) {
        this.isShow = false
        this.getFlowOrderLists()
      } else {
        this.isShow = true
        this.getDeliverLists()
      }
    },
    openClick() {},
    closedClick() {},
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
          font-size: 1rem;
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
              color: #2a88ff;
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
    background-color: #2a7bd0;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
