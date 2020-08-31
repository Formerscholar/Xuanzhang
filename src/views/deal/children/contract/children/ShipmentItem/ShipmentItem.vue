<template>
  <div id="ShipmentItem">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>{{deliveryRecordItem.order_number | setOrderNumber }}</span>
      </div>
      <div class="right" slot="right">
        <span></span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <el-card class="content_wrap">
        <div class="Company">
          <span>{{deliveryRecordItem.name }}</span>
        </div>
        <!-- <div class="Numbers">{{deliveryRecordItem.order_number | setOrderNumber }}</div> -->
        <div class="itembox">
          <span>{{deliveryRecordItem.created_at | setRecordItemCreated}}</span>
          <span>{{deliveryRecordItem.operator_name |setOperatorName }}</span>
        </div>
      </el-card>
      <el-card class="product_box">
        <div class="product_title">产品信息</div>

        <div class="wrap_item" v-for="(item,index) in deliverGoodsDetail" :key="index">
          <div class="wrap_left">
            <div @touchstart="touchin" @touchend="cleartime(item.materiel_id)">
              <img
                v-if="item.img_url && item.img_url != 0 "
                class="img"
                :src="item.img_url  | getUrl"
              />
              <img
                v-else-if="item.img_url_lin && item.img_url_lin != 0 "
                class="img"
                :src="item.img_url_lin  | getUrl"
              />
              <img src="@/assets/image/Default.png" class="img" v-else />
            </div>
            <div class="text">
              <div class="title">
                <p>{{item.product_name}}</p>
              </div>
              <p class="model">{{item.product_model}}</p>
              <div class="wrap_right">
                <span>({{item.unit_price}}×{{item.weight}}+{{item.process_cost}})×{{item.number}}</span>
                <div class="funds">
                  <span>￥</span>
                  <span>{{item.total_funds}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="product_price"
          v-if="deliveryRecordItem.total_money != deliveryRecordItem.total_funds"
        >
          <div class="total_price">
            <div class="title">合计</div>
            <span>￥{{deliveryRecordItem.total_money}}</span>
          </div>
          <div class="After_price">
            <div class="title">折后</div>
            <span>
              ￥
              <em>{{deliveryRecordItem.total_funds.split('.')[0]}}</em>
              .{{deliveryRecordItem.total_funds.split('.')[1]}}
            </span>
          </div>
        </div>
        <div class="product_price" v-else>
          <div class="After_price">
            <div class="title">合计</div>
            <span>
              ￥
              <em>{{deliveryRecordItem.total_money.split('.')[0]}}</em>
              .{{deliveryRecordItem.total_money.split('.')[1]}}
            </span>
          </div>
        </div>
      </el-card>
    </scroll>
    <div class="btns">
      <div class="deleteDeliver" @click="deleteDeliver"></div>
      <div class="deleteDelivers" @click="deleteDeliver">作废</div>
      <div class="printShip" @click="printShip">打印</div>
      <div class="editShips" @click="editShip">编辑</div>
      <div class="editShip" @click="editShip"></div>
      <img class="Print" src="@/assets/image/Print.png" alt="Print" @click="printShip" />
    </div>
    <van-overlay :show="isShow" @click="isShow = false">
      <div class="wrapper-qrCode">
        <myVqr :Content="textContent"></myVqr>
      </div>
    </van-overlay>
  </div>
</template>
    
<script>
import myVqr from '@/components/common/my_vqr/myVqr'
import { bestURL, crosURl } from '@/network/baseURL'

import { deleteDeliverRecord, getFlowDeliverDetail } from '@/network/deal'
export default {
  name: 'ShipmentItem',
  data() {
    return {
      deliveryRecordItem: {},
      iid: 0,
      isShow: false,
      touch: false,
      textContent: '',
      Loop: null,
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
    this.touch = false
    this.Loop = null
    this.textContent = ''
    this.deliverGoodsDetail = []
  },
  activated() {
    this.iid = this.$route.params.id
    this.getFlowDeliverD()
  },
  filters: {
    setOrderNumber(value) {
      return '单号:' + value
    },
    setOperatorName(value) {
      return '制单:' + value
    },
    setRecordItemTotalMoney(value) {
      return '￥' + value
    },
    setRecordItemCreated(value) {
      return '创建:' + value
    },
    getUrl(value) {
      if (value.indexOf(bestURL) == -1) {
        return bestURL + value
      } else {
        return value
      }
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
    touchin() {
      clearInterval(this.Loop)
      this.Loop = setTimeout(() => {
        this.touch = true
      }, 300)
    },
    cleartime(materiel_id) {
      clearInterval(this.Loop)
      if (this.touch) {
        this.touch = false
        this.$router.push(`/editMaterial/${materiel_id}`)
      }
    },
    printShip() {
      this.textContent = `http://219.83.161.11:8030/view/html/run/print.php?id=${this.deliveryRecordItem.id}&orderType=flow`
      this.isShow = true
    },
    async getFlowDeliverD() {
      const { data } = await getFlowDeliverDetail(this.getFlowDeliverData)
      console.log('getFlowDeliverDetail', data)
      this.deliverGoodsDetail = data.deliverGoodsDetail
      this.deliveryRecordItem = data.deliver
      console.log(this.deliveryRecordItem)

      // data.deliver
      this.$once('hook:destroyed', () => {
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
      const { code, msg } = await deleteDeliverRecord(this.deleteDeliverData)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.blacknext()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
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
    bottom: 5.428571rem;
    width: 100%;
    overflow: hidden;
    padding: 0 0.714286rem;
    .content_wrap {
      padding: 0.714286rem 1.071429rem;
      margin-top: 0.357143rem;
      margin-bottom: 0.357143rem;
      .Company {
        margin-bottom: 0.714286rem;
        font-size: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        em {
          font-size: 0.714286rem;
        }
      }
      .Numbers {
        margin-bottom: 0.357143rem;
        font-size: 0.857143rem;
        color: #5b534d;
      }
      .itembox {
        font-size: 0.857143rem;
        color: #5b534d;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
        }
      }
    }
    .product_box {
      background-color: #fff;
      .product_title {
        margin: 0 0.357143rem;
        padding: 0.714286rem 0;
        font-size: 1.142857rem;
        color: #000;
        border-bottom: 1px solid #ededed;
      }
      .wrap_item {
        padding: 0.357143rem 0.714286rem;

        .wrap_left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 1px solid #ededed;
          padding-bottom: 0.357143rem;
          .img {
            width: 6.785714rem;
            height: 6.785714rem;
            background-color: #655d55;
            border-radius: 0.357143rem;
            margin-right: 0.714286rem;
          }
          .text {
            flex: 1;
            font-size: 1rem;
            color: #000;
            overflow: hidden;
            white-space: nowrap;

            .title {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 1rem;
            }
            .model {
              color: #ccc;
            }
            p {
              margin-bottom: 0.357143rem;
            }
            .wrap_right {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #ccc;
              font-size: 0.857143rem;
              .funds {
                font-size: 1rem;
                color: black;
              }
            }
          }
        }
      }
      .product_price {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 0.714286rem 1.285714rem;
        .total_price {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          font-size: 1rem;
          color: #000;
        }
        .After_price {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          margin-left: 1.857143rem;
          .title {
            font-size: 1rem;
            color: #000;
          }
          span {
            color: #f48a31;
            margin-bottom: -0.214286rem;
            em {
              font-size: 1.571429rem;
            }
          }
        }
      }
    }
  }
  .btns {
    height: 3.5rem;
    width: 100%;
    padding: 0.357143rem 2.142857rem;
    position: fixed;
    bottom: 1.428571rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .deleteDeliver,
    .deleteDelivers,
    .printShip,
    .editShips,
    .editShip {
      height: 2.785714rem;
      line-height: 2.785714rem;
    }

    .deleteDeliver,
    .editShip {
      width: 2.785714rem;
      border-radius: 50%;
    }

    .deleteDeliver,
    .deleteDelivers,
    .printShip {
      background-color: #000;
    }
    .deleteDelivers,
    .printShip {
      color: #fff;
    }
    .deleteDelivers {
      text-align: left;
      margin-left: -1.428571rem;
      flex: 3;
      font-size: 1rem;
    }
    .printShip {
      flex: 14;
      margin-left: 0.214286rem;
      text-align: right;
      padding-right: 3.214286rem;
    }
    .editShips {
      flex: 3;
      text-align: right;
      margin-right: -1.428571rem;
      z-index: 2;
      background-color: #f2c659;
      color: #000;
      font-size: 1rem;
    }
    .editShip {
      background-color: #f2c659;
    }
    .Print {
      width: 6.428571rem;
      height: 6.428571rem;
      position: fixed;
      bottom: 0.714286rem;
      left: 30%;
    }
  }
}
</style>
