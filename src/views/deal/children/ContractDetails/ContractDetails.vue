<template>
  <div id="ContractDetails">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>合同详情</span>
      </div>
      <div class="right" slot="right">
        <span></span>
      </div>
    </navbar>
    <div class="content">
      <div class="text_arr">
        <div class="row">
          <span>
            客户信息:
            <em>{{contractOrder.distributor_name}}</em>
          </span>
        </div>
        <div class="row">
          <span>
            合同编号:
            <em>{{contractOrder.order_number}}</em>
          </span>
        </div>
        <div class="row">
          <span>
            对应合同:
            <em>{{contractOrder.platform}}</em>
          </span>
        </div>
        <div class="row">
          <span>
            公司联系人:{{contractOrder.self_lxr}}
            <em>{{contractOrder.self_lxr_tel}}</em>
          </span>
        </div>
        <div class="row">
          <span>
            客户联系人:{{contractOrder.kehu_lxr}}
            <em>{{contractOrder.kehu_lxr_tel}}</em>
          </span>
        </div>
      </div>
      <el-card class="box-card" v-for="item in contractOrder.contractOrderProduct" :key="item.id">
        <div class="context">
          <div class="left">
            <img src="@/assets/image/logo.png" />
          </div>
          <div class="right">
            <div class="text_row">
              <div class="left_title">{{item.product_name}}</div>
              <div class="right_txt">￥{{item.unit_price}}*{{item.number}}</div>
            </div>
            <div class="text_row">
              <div class="left_title">{{item.product_model}}</div>
              <div class="right_txt"></div>
            </div>
            <div class="text_row">
              <div class="left_title"></div>
              <div class="right_txt">￥{{item.total_price}}</div>
            </div>
          </div>
        </div>
      </el-card>
      <div class="operationList">
        <div class="listitem">
          付款方式
          <em>{{contractOrder.pay_method_content}}</em>
        </div>
        <div class="listitem">
          交货日期
          <em>{{contractOrder.updated_at}}</em>
        </div>
        <div class="listitem">
          质量要求
          <em></em>
        </div>
        <div class="listitem">
          技术参数
          <em></em>
        </div>
        <div class="listitem">
          其他要素
          <em>{{contractOrder.remark}}</em>
        </div>
      </div>
    </div>
    <div class="btns">
      <van-button plain type="primary" @click="keepmoney">收款</van-button>
      <van-button plain type="primary" @click="toShop">发货</van-button>
      <van-button plain type="primary">开票</van-button>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import { getEditContractOrder } from '@/network/deal'
import { bestURL, crosURl } from '@/network/baseURL'

export default {
  data() {
    return {
      iid: 0,
      contractOrder: {},
      editData: {},
      isShow: false,
      imgData: ''
    }
  },
  components: { navbar },
  activated() {
    this.iid = this.$route.params.id
    this.getEditContractOrders()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    this.iid = 0
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  computed: {
    getEditContractOrderData() {
      return {
        id: this.iid,
        token: this.$store.state.tonken,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    keepmoney() {
      this.$router.push({
        path: '/keepmoneypage',
        query: {
          data: this.contractOrder
        }
      })
    },
    toShop() {
      this.$router.push({
        path: '/listShop',
        query: {
          data: this.editData
        }
      })
    },
    blacknext() {
      this.$router.go(-1)
    },
    async getEditContractOrders() {
      const { data } = await getEditContractOrder(this.getEditContractOrderData)
      console.log('getEditContractOrder', data)
      this.editData = data
      this.contractOrder = data.contractOrder
    }
  }
}
</script>
    
<style lang="scss" scoped>
#ContractDetails {
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
      font-size: 1.285714rem;
      color: #030303;
    }
    .right {
      margin-right: 1.071429rem;
      font-size: 0.714286rem;
    }
  }
  .content {
    padding: 0.571429rem 0.714286rem;
    background-color: #f5f5f5;

    .text_arr {
      .row {
        margin-bottom: 0.285714rem;
        span {
          em {
          }
        }
      }
    }
    .box-card {
      margin-bottom: 0.571429rem;
      .context {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .left {
          width: 2.857143rem;
          img {
            width: 2.857143rem;
          }
        }
        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
          .text_row {
            margin-left: 0.571429rem;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .left_title {
            }
            .right_txt {
            }
          }
        }
      }
    }
    .operationList {
      .listitem {
        margin-bottom: 0.357143rem;
      }
    }
  }
  .btns {
    position: fixed;
    bottom: 0.357143rem;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    .van-button {
      margin-right: 0.357143rem;
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
