<template>
  <div id="ContractCollection">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>合同收款</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="search">
      <van-search
        v-model="state.searchValue"
        show-action
        placeholder="请输入搜索公司名"
        @focus="focusClick"
        @cancel="onCancel"
      />
    </div>
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="clickScroll"
      @pullingUp="pullingUp"
    >
      <div v-for="(item ) in state.settlementRecordList" :key="item.id">
        <van-swipe-cell v-if="item.to_examine != undefined ">
          <div class="box-card">
            <div :class="item.deleted_at && 'color_break ' ">
              <div class="title">
                <div class="title_text">
                  <span
                    :class="item.deleted_at ? 'color_break model' :' model'"
                  >{{ item.order_number }}</span>
                  <div class="ControlledDelaybox">
                    <span
                      v-for="(item,index) in item.auditRecord"
                      :key="index"
                      :class="item.status == 0 ? 'glyphicon pramary' : 'glyphicon info'"
                    ></span>
                  </div>
                </div>
              </div>
              <span :class="item.deleted_at ? 'color_break name' :' name'">{{item.name}}</span>
              <div class="time_box">
                <span
                  :class="item.deleted_at ? 'color_break timer_text' :' timer_text'"
                >{{item.created_at }}</span>
                <span :class="item.deleted_at ? 'color_break time_pircle' :' time_pircle'">
                  <em
                    :class="item.deleted_at ? 'color_break ' : 'orgin' "
                  >￥{{fmoney(item.settlement_money,2)}}</em>
                </span>
              </div>
            </div>
          </div>
          <template #right v-if="!item.deleted_at">
            <van-button
              v-if="item.to_examine == 0 "
              square
              type="primary"
              style="height:100%; margin:0 auto;width:5.14286rem;line-height:1.714286rem;"
              text="受控"
              @click.stop="ControlledDelay(item.id)"
            />
            <van-button
              v-if="item.to_examine == 1 "
              style="height:100%; margin:0 auto;width:5.14286rem;line-height:1.714286rem;"
              square
              type="danger"
              text="解锁"
              @click.stop="unlockyoursidekick(item.id)"
            />
            <van-button
              v-if="setIsDelete(item.auditRecord)"
              style="height:100%; margin:0 auto;width:5.14286rem;line-height:1.714286rem;"
              square
              type="danger"
              text="作废"
              @click.stop="deleteClick(item.id)"
            />
            <van-button
              square
              type="primary"
              style="height:100%; margin:0 auto;width:5.14286rem;line-height:1.714286rem;"
              text="打印"
              @click.stop="printClick(item.id)"
            />
          </template>
        </van-swipe-cell>
        <div class="box-card" v-else>
          <div :class="item.deleted_at && 'color_break ' ">
            <div class="title">
              <div class="title_text">
                <span
                  :class="item.deleted_at ? 'color_break model' :' model'"
                >{{ item.order_number }}</span>
                <div class="ControlledDelaybox">
                  <span
                    v-for="(item,index) in item.auditRecord"
                    :key="index"
                    :class="item.status == 0 ? 'glyphicon pramary' : 'glyphicon info'"
                  ></span>
                </div>
              </div>
            </div>
            <span :class="item.deleted_at ? 'color_break name' :' name'">{{item.name}}</span>
            <div class="time_box">
              <span
                :class="item.deleted_at ? 'color_break timer_text' :' timer_text'"
              >{{item.created_at}}</span>
              <span :class="item.deleted_at ? 'color_break time_pircle' :' time_pircle'">
                <em
                  :class="item.deleted_at ? 'color_break ' : 'orgin'"
                >￥{{ fmoney(item.settlement_money,2)}}</em>
              </span>
            </div>
          </div>
        </div>
      </div>
    </scroll>

    <van-overlay :show="state.isShow" @click="state.isShow = false">
      <div class="wrapper-qrCode">
        <myVqr :Content="state.textContent"></myVqr>
      </div>
    </van-overlay>
    <i class="el-icon-plus" @click="goSellAccept"></i>
  </div>
</template>
    
<script>
import myVqr from '@/components/common/my_vqr/myVqr'
import { fmoney } from '@/common/utils'
import { reactive, computed, onActivated } from '@vue/composition-api'
import {
  getSettlementRecordList,
  toExamineSettlementRecord,
  cancelToExamineSettlementRecord,
  delSettlementRecord,
  getAddSettlementRecordDistributors,
} from '@/network/deal'

export default {
  components: {
    myVqr,
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
  setup(props, { root }) {
    const state = reactive({
      settlementRecordList: [],
      isShow: false,
      textContent: '',
      page: 1,
      isNetWork: true,
      searchValue: '',
      distributors: [],
      distributor_id: '',
    })

    function onClickLeft() {
      root.$router.replace('/home')
    }
    const getSettlementListData = computed(() => {
      return {
        token: root.$store.state.token,
        page: state.page,
        offset: 20,
        order_type: 0,
        distributor_id: state.distributor_id,
        start_date: null,
        end_date: null,
        _: new Date().getTime(),
      }
    })

    async function getSettlementList() {
      const { data } = await getSettlementRecordList(
        getSettlementListData.value
      )
      if (data.settlementRecordList.length && state.isNetWork) {
        state.settlementRecordList = [
          ...state.settlementRecordList,
          ...data.settlementRecordList,
        ]
      } else {
        state.isNetWork = false
      }
    }

    async function ControlledDelay(iid) {
      const { code, msg } = await toExamineSettlementRecord({
        id: [iid],
        token: root.$store.state.token,
        order_type: 'contract',
      })
      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        clickScroll()
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }

    async function unlockyoursidekick(iid) {
      const { code, msg } = await cancelToExamineSettlementRecord({
        id: [iid],
        token: root.$store.state.token,
        order_type: 'contract',
      })
      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        clickScroll()
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }
    function clickScroll() {
      state.searchValue = ''
      state.distributor_id = '0'
      state.page = 1
      state.isNetWork = true
      state.settlementRecordList = []
      getSettlementList()
    }

    async function deleteClick(iid) {
      const { code, msg } = await delSettlementRecord({
        token: root.$store.state.token,
        id: iid,
        order_type: 'contract',
      })
      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        clickScroll()
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }

    function printClick(iid) {
      state.isShow = true
      state.textContent = `http://219.83.161.11:8030/view/html/accountment/sell_print.php?id=${iid}&order_type=contract`
    }

    function pullingUp() {
      if (state.isNetWork) {
        state.page++
        getSettlementList()
      } else {
        root.$toast('没有更多数据了')
      }
    }

    async function getAddSettlement() {
      const { data } = await getAddSettlementRecordDistributors({
        _: new Date().getTime(),
      })
      if (data.companyOrderType['contract'] === undefined) {
        root.$router.replace('/home')
        root.$dialog({ message: '您无该模块权限!' })
      } else {
        state.distributors = [...data.distributors]
      }
    }

    function setIsDelete(data) {
      return data.findIndex((item) => item.status == 1) == 0 ? false : true
    }
    function onCancel() {
      console.log('onCancel')
      state.searchValue = ''
      state.distributor_id = '0'
      state.page = 1
      state.isNetWork = true
      state.settlementRecordList = []
      getSettlementList()
    }

    function focusClick() {
      console.log('focusClick')
      root.$router.push({
        path: '/nameSearch',
        query: {
          data: { ...state.distributors },
        },
      })
      root.$bus.$off('nameSupplier')
      root.$bus.$on('nameSupplier', (item) => {
        console.log(item)
        if (typeof item == 'string') {
          state.searchValue = item
        } else {
          state.searchValue = item.name
          state.distributor_id = item.id
          state.page = 1
          state.settlementRecordList = []
          getSettlementList()
        }
      })
    }

    function goSellAccept() {
      root.$router.push('/sellAccept')
    }

    onActivated(() => {
      getAddSettlement()
    })

    getSettlementList()

    return {
      state,
      onClickLeft,
      ControlledDelay,
      unlockyoursidekick,
      clickScroll,
      deleteClick,
      printClick,
      pullingUp,
      setIsDelete,
      fmoney,
      onCancel,
      focusClick,
      goSellAccept,
    }
  },
}
</script>
    
<style scoped lang="scss">
#ContractCollection {
  padding-top: 5.428571rem;
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      margin-left: -2.071429rem;
      span {
        font-size: 1.428571rem;
      }
    }
  }
  .search {
    border-bottom: 1rem solid #e6e6e6;
  }
  .el-icon-plus {
    position: fixed;
    bottom: 3.357143rem;
    right: 3.357143rem;
    padding: 0.571429rem;
    z-index: 999;
    font-size: 2.714286rem;
    background-color: rgb(66, 147, 200);
    color: #fff;
    border-radius: 50%;
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 10.285714rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;

    /deep/.content {
      padding: 0.571429rem 1.714286rem;
    }
    .box-card {
      margin-bottom: 0.571429rem;
      border-bottom: 1px solid #ccc;
      padding-bottom: 0.857143rem;
      margin-bottom: 0.857143rem;
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
}
</style>
