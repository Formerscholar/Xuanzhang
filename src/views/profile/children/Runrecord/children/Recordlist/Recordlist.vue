<template>
  <div id="Recordlist">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>账单</span>
      </div>
    </navbar>
    <div class="ScreenClassification">
      <div class="leftbox">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="state.value1"
            :options="state.option1"
            @change="dropdownOneChange"
          />
          <van-dropdown-item v-model="state.value2" :options="state.option2" />
        </van-dropdown-menu>
      </div>
      <div class="rightbox" @click="searchClick">
        <span>搜索</span>
      </div>
    </div>
    <scroll
      class="scroll_wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="clickscroll"
      @pullingUp="loadMore"
    >
      <div class="Screentotal">
        <div class="screen">本月</div>
        <div class="total_box">
          <div class="price">
            <div class="expenditure">支出￥0.00</div>
            <div class="income">收入￥0.00</div>
          </div>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="contentlist">
        <div
          class="contentitem"
          v-for="item in state.userMoneyLogLists"
          :key="item.id"
          @click="goRecordDetail(item)"
        >
          <div class="leftimage">
            <svg class="icon icons" aria-hidden="true">
              <use xlink:href="#icon-zichanyijiaoguanlixitong" />
            </svg>
          </div>
          <div class="right_box">
            <div class="TypeAmount">
              <div class="type">
                {{ item.money_type == 'bank' ? '银行卡' : '现金余额' }}-{{
                  state.types[item.type]
                }}
              </div>
              <div
                class="Amount"
                :style="
                  item.sign == '+' ? { color: 'green' } : { color: 'red' }
                "
              >
                {{ item.sign }}{{ fmoney(item.money, 2) }}
              </div>
            </div>
            <div class="CategoryReason">{{ item.remark }}</div>
            <div class="timers">{{ item.created_at }}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { reactive, computed } from '@vue/composition-api'
import {
  getMyMoneyLogLists,
  getUserMoneyLogAccountsList,
} from '@/network/Profile'
import { fmoney } from '@/common/utils'

export default {
  setup(props, { root }) {
    const state = reactive({
      value1: 0,
      value2: 0,
      option1: [
        { text: '银行卡', value: 1 },
        { text: '现金余额', value: 2 },
      ],
      option2: [],
      userMoneyLogLists: [],
      types: {},
      listPage: 1,
    })

    const getMyMoneyLogListData = computed(() => {
      let money_type
      if (state.value1 == 0) {
        money_type == 0
      } else if (state.value1 == 1) {
        money_type == 'bank'
      } else if (state.value1 == 2) {
        money_type == 'user'
      }
      return {
        token: root.$store.state.token,
        start_time: null,
        end_time: null,
        money_type,
        variable_id: state.value2,
        keyword: null,
        operator_id: 0,
        offset: 20,
        page: state.listPage,
        _: new Date().getTime(),
      }
    })

    async function getMyMoneyList() {
      const { data } = await getMyMoneyLogLists(getMyMoneyLogListData.value)

      state.userMoneyLogLists = [
        ...state.userMoneyLogLists,
        ...data.userMoneyLogLists,
      ]
      state.types = data.type
    }

    function goBack() {
      root.$router.go(-1)
    }

    function clickscroll() {
      state.value1 = 0
      state.value2 = 0
      state.listPage = 1
      getMyMoneyList()
    }

    function loadMore() {
      state.listPage++
      getMyMoneyList()
    }

    const getUserMoneyData = computed(() => {
      let type
      if (state.value1 == 1) {
        type = 'bank'
      } else if (state.value1 == 2) {
        type = 'user'
      }

      return {
        token: root.$store.state.token,
        type,
        _: new Date().getTime(),
      }
    })

    async function getUserMoneyList() {
      const { data } = await getUserMoneyLogAccountsList(getUserMoneyData.value)

      const { customerBankList } = data
      state.option2 = []
      state.option2 = customerBankList.map((item, index) => {
        if (state.value1 == 0) {
          return {}
        } else if (state.value1 == 1) {
          return { text: item.bank_account, value: item.id }
        } else if (state.value1 == 2) {
          return { text: item.user_name, value: item.user_id }
        }
      })
    }

    function dropdownOneChange(value) {
      getUserMoneyList()
    }

    function searchClick() {
      state.userMoneyLogLists = []
      getMyMoneyList()
    }

    function goRecordDetail(item) {
      root.$router.push({
        path: '/RecordDetail',
        query: {
          data: item,
        },
      })
    }

    getUserMoneyList()

    getMyMoneyList()
    return {
      state,
      goBack,
      fmoney,
      clickscroll,
      loadMore,
      dropdownOneChange,
      searchClick,
      goRecordDetail,
    }
  },
}
</script>

<style scoped lang="scss">
#Recordlist {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -2.071429rem;
      font-size: 1.285714rem;
    }
  }
  .ScreenClassification {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.714286rem;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .leftbox {
      /deep/.van-dropdown-menu__bar {
        height: 2.714286rem;
        box-shadow: none;
        .van-dropdown-menu__item {
          width: 7.071429rem;
          &:last-child {
            margin-left: 2rem;
          }
          .van-ellipsis {
            font-size: 0.928571rem;
          }
        }
      }
      /deep/.van-dropdown-item {
        top: 8.213143rem !important;
      }
    }
    .rightbox {
      margin-right: 0.571429rem;
      font-size: 0.928571rem;
      span {
        border-left: 1px solid #eee;
        padding-left: 1rem;
      }
    }
  }
  .scroll_wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 8.285714rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;

    .Screentotal {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.357143rem 0.714286rem;
      background-color: #f5f5f5;
      border-bottom: 1px solid #eee;
      .screen {
        width: 4.642857rem;
        height: 1.785714rem;
        padding-right: 0.714286rem;
        border-radius: 1.071429rem;
        background-color: #fff;
        font-size: 0.857143rem;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &::after {
          position: absolute;
          top: 50%;
          right: 0.857143rem;
          margin-top: -0.357143rem;
          border: 0.214286rem solid;
          border-color: transparent transparent #dcdee0 #dcdee0;
          transform: rotate(-45deg);
          opacity: 0.8;
          content: '';
        }
      }
      .total_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #a7a7a7;
        font-size: 0.857143rem;
        .price {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          margin-right: 1.142857rem;
        }
        .van-icon {
          margin-right: 0.571429rem;
        }
      }
    }
    .contentlist {
      padding: 0.714286rem 0;
      .contentitem {
        display: flex;

        justify-content: flex-start;
        align-items: flex-start;
        padding: 0 1.285714rem;
        margin-bottom: 0.571429rem;
        .leftimage {
          margin-right: 0.928571rem;
          .icons {
            width: 2.285714rem;
            height: 2.285714rem;
            border-radius: 50%;
            overflow: hidden;
          }
        }
        .right_box {
          flex: 1;
          border-bottom: 1px solid #f9f9f9;
          padding: 0 1.214286rem 1rem 0.214286rem;
          .TypeAmount {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .type {
              font-size: 1.142857rem;
            }
            .Amount {
              font-size: 1.285714rem;
            }
          }
          .CategoryReason {
            font-size: 0.857143rem;
          }
          .timers {
            font-size: 0.857143rem;
            color: #9e9e9e;
          }
        }
      }
    }
  }
}
</style>
