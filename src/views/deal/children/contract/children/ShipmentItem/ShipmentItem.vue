<template>
  <div id="ShipmentItem">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>详情</span>
      </div>
      <div class="right" slot="right">
        <span></span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper">
      <el-card class="content_wrap">
        <div class="Company">{{deliveryRecordItem.name }}</div>
        <div class="Numbers">{{deliveryRecordItem.order_number | setOrderNumber }}</div>
        <div class="itembox">
          <span>{{deliveryRecordItem.created_at | setRecordItemCreated}}</span>
          <span>{{deliveryRecordItem.operator_name |setOperatorName }}</span>
        </div>
      </el-card>
      <el-card class="product_box">
        <div class="wrap_item" v-for="(item,index) in deliverGoodsDetail" :key="index">
          <div class="wrap_left">
            <img v-if="item.img_url" class="img" :src="item.img_url" />
            <div class="img" v-else></div>

            <div class="text">
              <p>{{item.product_name}}</p>
              <p>{{item.product_model}}</p>
              <div class="wrap_right">
                <span>({{item.unit_price}}×{{item.weight}}+{{item.process_cost}})×{{item.number}}=￥{{item.total_funds}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="wrap_money">{{deliveryRecordItem.total_money | setRecordItemTotalMoney }}</div>
      </el-card>
      <div class="btns">
        <van-button type="warning" @click="deleteDeliver">作废</van-button>
        <van-button type="info" @click="editShip">编辑</van-button>
        <van-button type="primary" @click="printShip">打印</van-button>
      </div>
    </scroll>

    <van-overlay :show="isShow" @click="isShow = false">
      <div class="wrapper-qrCode">
        <myVqr :Content="textContent"></myVqr>
      </div>
    </van-overlay>
  </div>
</template>
    
<script>
import myVqr from '@/components/common/my_vqr/myVqr'

import { deleteDeliverRecord, getFlowDeliverDetail } from '@/network/deal'
export default {
  name: 'ShipmentItem',
  data() {
    return {
      deliveryRecordItem: {},
      iid: 0,
      isShow: false,
      textContent: '',
      deliverGoodsDetail: [],
    }
  },
  components: {
    myVqr,
  },
  deactivated() {
    this.deliveryRecordItem = {}
    this.iid = 0
    this.isShow = false
    this.textContent = ''
    this.deliverGoodsDetail = []
  },
  activated() {
    this.deliveryRecordItem = this.$route.query.data
    this.iid = this.deliveryRecordItem.id
    this.getFlowDeliverD()
    console.log(this.deliveryRecordItem)
  },
  filters: {
    setOrderNumber(value) {
      return '发货单号:' + value
    },
    setOperatorName(value) {
      return '操作人:' + value
    },
    setRecordItemTotalMoney(value) {
      return '总金额:￥' + value
    },
    setRecordItemCreated(value) {
      return '发货时间:' + value
    },
  },
  computed: {
    deleteDeliverData() {
      let from = new FormData()
      from.append('token', this.$store.state.token)
      from.append('id', this.deliveryRecordItem.id)
      from.append('order_type', 'flow')
      return from
    },
    getFlowDeliverData() {
      return {
        id: this.iid,
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
  },

  methods: {
    printShip() {
      this.textContent = `http://219.83.161.11:8030/view/html/run/print.php?id=${this.deliveryRecordItem.id}&orderType=flow`
      this.isShow = true
    },
    async getFlowDeliverD() {
      const { data } = await getFlowDeliverDetail(this.getFlowDeliverData)
      console.log('getFlowDeliverDetail', data)
      this.deliverGoodsDetail = data.deliverGoodsDetail
      this.$once('hook:deactivated', () => {
        this.iid = 0
        this.deliverGoodsDetail = []
      })
    },
    editShip() {
      this.$router.push(`/editShipItem/${this.deliveryRecordItem.id}`)
    },
    blacknext() {
      this.$router.go(-1)
    },
    async deleteDeliver() {
      const { code } = await deleteDeliverRecord(this.deleteDeliverData)
      if (code == 200) {
        this.blacknext()
      }
    },
  },
}
</script>
    
<style scoped lang="scss">
#ShipmentItem {
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
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    padding: 0.714286rem;
    .content_wrap {
      padding: 0.714286rem 1.071429rem;
      margin-bottom: 0.357143rem;
      .Company {
        margin-bottom: 0.714286rem;
        font-size: 1rem;
        font-weight: 700;
        color: #726860;
      }
      .Numbers {
        margin-bottom: 0.357143rem;
        font-size: 0.857143rem;
        font-weight: 700;
        color: #5b534d;
      }
      .itembox {
        font-size: 0.857143rem;
        font-weight: 700;
        color: #5b534d;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
        }
      }
    }
    .product_box {
      .wrap_item {
        padding: 0.357143rem;
        border-bottom: 1px solid #f2f2f2;

        .wrap_left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .img {
            width: 5.928571rem;
            height: 5.928571rem;
            background-color: #655d55;
            margin-right: 0.714286rem;
          }
          .text {
            flex: 1;
            font-size: 1.285714rem;
            color: #675f57;
            p {
              margin-bottom: 0.357143rem;
            }
            .wrap_right {
              width: 100%;
              display: flex;
              justify-content: flex-end;
              span {
                font-size: 1.142857rem;
                color: #786e65;
              }
            }
          }
        }
      }
      .wrap_money {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 0.357143rem;
        font-size: 1.142857rem;
        color: #848484;
      }
    }
  }
}
</style>
