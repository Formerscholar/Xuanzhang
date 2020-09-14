<template>
  <div id="Balancies">
    <navbar class="Controlled_root">
      <i class="el-icon-arrow-left text-primary" slot="left" @click="callBack"></i>
      <div class="title text-black" slot="center">
        <span>余额</span>
      </div>
    </navbar>
    <div class="content_box">
      <div class="top_blue_box bg-primary">
        <div class="title">可以余额(元)</div>
        <div class="money">
          {{state.balance.split('.')[0]}}
          <em>.{{state.balance.split('.')[1]}}</em>
        </div>
        <div class="active_money">待审余额{{state.Pendbalance}}</div>
      </div>
      <div class="list_warp">
        <div class="list_item">
          <div class="left_icon">
            <svg class="icon icons" aria-hidden="true">
              <use xlink:href="#icon-baogao" />
            </svg>
          </div>
          <div class="cont_text">现金账户</div>
          <div class="right_icon">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="bg"></div>
        <div class="list_item">
          <div class="left_icon">
            <svg class="icon icons" aria-hidden="true">
              <use xlink:href="#icon-baogao" />
            </svg>
          </div>
          <div class="cont_text">农业银行(8516)</div>
          <div class="right_icon">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="list_item">
          <div class="left_icon">
            <svg class="icon icons" aria-hidden="true">
              <use xlink:href="#icon-baogao" />
            </svg>
          </div>
          <div class="cont_text">中国银行(0001)</div>
          <div class="right_icon">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { reactive, watch } from '@vue/composition-api'
import { getUserIndex } from '@/network/home'
import { fmoney } from '@/common/utils'

export default {
  setup(props, { root }) {
    const state = reactive({
      balance: '',
      Pendbalance: '',
    })

    function callBack() {
      root.$router.replace('/profile')
    }

    watch(
      [() => state.balance, () => state.Pendbalance],
      ([balance, Pendbalance], [prevbalance, prevPendbalance]) => {
        state.balance = setNums(balance)
        state.Pendbalance = setNums(Pendbalance)
      }
    )

    function setNums(num) {
      return num.indexOf('-') == -1 ? fmoney(num) : '-' + fmoney(num.substr(1))
    }

    async function getUserIndexNews() {
      const { data } = await getUserIndex({
        token: root.$store.state.token,
        _: new Date().getTime(),
      })
      state.balance = data.userNews.balance
      state.Pendbalance = data.userNews.toExamineMoney
    }

    getUserIndexNews()

    return {
      state,
      callBack,
      fmoney,
    }
  },
}
</script>
    
<style lang="scss" scoped>
#Balancies {
  padding-top: 5.428571rem;
  .Controlled_root {
    font-size: 1.285714rem;
    border: none;
    font-weight: 700;

    .el-icon-arrow-left {
      color: #fff;
      display: block;
      font-size: 1.714286rem;
      margin-left: 0.714286rem;
    }
    .title {
      margin-left: -1.285714rem;
      color: #fff;
    }
  }
  .content_box {
    .top_blue_box {
      color: #fff;
      padding-bottom: 1.714286rem;
      padding-left: 1.428571rem;
      .title {
        font-size: 1rem;
        margin-bottom: 2.5rem;
      }
      .money {
        font-size: 3.428571rem;
        font-weight: 700;
        margin-left: -0.357143rem;
        margin-bottom: 1.428571rem;
        em {
          font-size: 1.714286rem;
          font-weight: normal;
          margin-left: -0.357143rem;
        }
      }
      .active_money {
        font-size: 1.142857rem;
      }
    }
    .list_warp {
      .bg {
        border-bottom: 1.428571rem solid #f5f5f5;
      }
      .list_item {
        height: 3.357143rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.428571rem;
        .left_icon {
          margin-right: 1.428571rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .icons {
            width: 1.571429rem;
            height: 1.571429rem;
          }
        }
        .cont_text {
          flex: 1;
          font-size: 1.214286rem;
          color: #000;
        }
        .right_icon {
          font-size: 1.428571rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #d2d2d2;
        }
      }
    }
  }
}
</style>
