<template>
  <div id="RecordDetail">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>账单详情</span>
      </div>
    </navbar>
    <scroll
      class="scroll_wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
    >
      <div class="title_info">
        <div class="title_icon">
          <svg class="icon icons" aria-hidden="true">
            <use xlink:href="#icon-baogao" />
          </svg>
        </div>
        <div class="context">{{ state.DetailData.remark }}</div>
        <div class="moneys">{{ fmoney(state.DetailData.money) }}</div>
        <span class="text">交易成功</span>
      </div>
      <div class="info_card">
        <div class="channel item_box">
          <span class="title">渠道</span>
          <span class="text">{{
            state.DetailData.money_type == 'user' ? '现金余额' : '银行卡'
          }}</span>
        </div>
        <div class="channel item_box">
          <span class="title">资金账户</span>
          <span class="text">{{ state.DetailData.variable_account }}</span>
        </div>
        <div class="channel item_box">
          <span class="title">账户所属人</span>
          <span class="text">{{ state.DetailData.happen_user_name }}</span>
        </div>
        <div class="channel item_box">
          <span class="title">流水单号</span>
          <span class="text">{{ state.DetailData.id }}</span>
        </div>
      </div>
      <div class="footer_card">
        <div class="item_box">
          <div class="title">类别</div>
          <div class="text">{{ state.types[state.DetailData.type] }}</div>
        </div>
        <div class="item_box">
          <div class="title">操作人</div>
          <div class="text">{{ state.DetailData.action_user_name }}</div>
        </div>
        <div class="item_box">
          <div class="title">创建日期</div>
          <div class="text">{{ state.DetailData.created_at }}</div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { reactive, onActivated } from '@vue/composition-api'
import { fmoney } from '@/common/utils'
export default {
  setup(props, { root }) {
    const state = reactive({
      DetailData: {},
      types: {
        contract: '合同订单',
        flow: '流水订单',
        oemOrder: '代工订单',
        outsourcingOrder: '委外订单',
        procurement: '采购合同',
        quickWages: '快捷工资',
        reimb: '报销',
        settlement: '普通收款',
        standardOrder: '标准订单',
        transfer: '转账',
        wages: '月总工资',
        warehousingM: '入库单',
        withdraw: '提现',
      },
    })

    onActivated(() => {
      state.DetailData = {
        ...root.$route.query.data,
      }
    })

    function goBack() {
      root.$router.go(-1)
    }
    return {
      state,
      goBack,
      fmoney,
    }
  },
}
</script>

<style lang="scss" scoped>
#RecordDetail {
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

  .scroll_wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background-color: #f5f5f5;

    .title_info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2.142857rem 0;

      .title_icon {
        .icons {
          width: 3.142857rem;
          height: 3.142857rem;
          border-radius: 50%;
          border: 0.214286rem solid #fff;
        }
      }

      .context {
        font-size: 1.285714rem;
      }

      .moneys {
        font-size: 2.857143rem;
      }

      .text {
        font-size: 1.285714rem;
      }
    }

    .info_card {
      margin: 0 1rem;
      background-color: #fff;
      border-radius: 0.357143rem;
      padding: 1.714286rem;
      margin-bottom: 0.714286rem;
      .item_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.214286rem;
        .title {
          color: #999999;
        }
      }
    }
    .footer_card {
      margin: 0 1rem;
      background-color: #fff;
      border-radius: 0.357143rem;
      padding: 1.714286rem;
      .item_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.214286rem;
        .text {
          color: #999999;
        }
      }
    }
  }
}
</style>
