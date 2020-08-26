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
    <scroll class="scroll_wrapper" ref="scroll" :probe-type="3" :pull-up-load="true">
      <div class="ScreenClassification">
        <div class="leftbox">
          <van-dropdown-menu>
            <van-dropdown-item v-model="state.value1" :options="state.option1" />
            <van-dropdown-item v-model="state.value2" :options="state.option2" />
          </van-dropdown-menu>
        </div>
        <div class="rightbox">
          <span>搜索</span>
        </div>
      </div>
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
        <div class="contentitem" v-for="item in state.userMoneyLogLists" :key="item.id">
          <div class="leftimage">
            <svg class="icon icons" aria-hidden="true">
              <use xlink:href="#icon-zichanyijiaoguanlixitong" />
            </svg>
          </div>
          <div class="right_box">
            <div class="TypeAmount">
              <div
                class="type"
              >{{item.money_type == 'bank' ?'银行卡':'现金余额' }}-{{state.types[item.type]}}</div>
              <div
                class="Amount"
                :style="item.sign == '+' ? {color:'green'} : {color:'red'}"
              >{{item.sign}}{{item.money}}</div>
            </div>
            <div class="CategoryReason">{{item.remark}}</div>
            <div class="timers">{{item.created_at}}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
    
<script>
import { reactive, computed, onActivated } from '@vue/composition-api'
import { getMyMoneyLogLists } from '@/network/Profile'
export default {
  setup(props, { root }) {
    const state = reactive({
      value1: 0,
      value2: 0,
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '默认排序', value: 0 },
        { text: '好评排序', value: 1 },
        { text: '销量排序', value: 2 },
      ],
      userMoneyLogLists: [],
      types: {},
    })

    onActivated(() => {
      getMyMoneyList()
    })

    const getMyMoneyLogListData = computed(() => {
      return {
        token: root.$store.state.token,
        start_time: null,
        end_time: null,
        money_type: 0,
        variable_id: 0,
        keyword: null,
        offset: 20,
        page: 1,
        _: new Date().getTime(),
      }
    })

    async function getMyMoneyList() {
      const { data } = await getMyMoneyLogLists(getMyMoneyLogListData.value)
      console.log('getMyMoneyList', data)
      state.userMoneyLogLists = data.userMoneyLogLists
      state.types = data.type
    }

    function goBack() {
      this.$router.go(-1)
    }

    return {
      state,
      goBack,
    }
  },
}
</script>
    
<style scoped lang="scss">
#Recordlist {
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
  .scroll_wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .ScreenClassification {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.714286rem;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      .leftbox {
        /deep/.van-dropdown-menu__bar {
          box-shadow: none;
          .van-dropdown-menu__item {
            &:last-child {
              margin-left: 2rem;
            }
          }
        }
      }
      .rightbox {
        margin-right: 0.571429rem;
        font-size: 1.142857rem;
        span {
          border-left: 1px solid #eee;
          padding-left: 1rem;
        }
      }
    }
    .Screentotal {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.714286rem;
      background-color: #f5f5f5;
      border-bottom: 1px solid #eee;
      .screen {
        width: 4.642857rem;
        height: 1.785714rem;
        padding-right: 0.714286rem;
        border-radius: 1.071429rem;
        background-color: #fff;
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
            width: 2.857143rem;
            height: 2.857143rem;
            border-radius: 50%;
            overflow: hidden;
          }
        }
        .right_box {
          flex: 1;
          border-bottom: 1px solid #f9f9f9;
          padding: 0 1.214286rem 0.571429rem 0.214286rem;
          .TypeAmount {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .type {
              font-size: 1.214286rem;
            }
            .Amount {
              font-size: 1.214286rem;
            }
          }
          .CategoryReason {
            font-size: 1rem;
            color: #9e9e9e;
          }
          .timers {
            font-size: 1rem;
            color: #9e9e9e;
          }
        }
      }
    }
  }
}
</style>
