<template>
  <div id="ContractDetails">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>合同详情</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper">
      <el-card class="content_wrap">
        <div class="Company">{{contractOrder.platform | SetPlatform}}</div>
        <div class="Company">
          <span>{{contractOrder.distributor_name }}</span>
          <span>{{contractOrder.order_number }}</span>
        </div>
        <div class="Company itembox">
          <span>{{contractOrder.self_lxr | SetSelfLxr}}</span>
          <span>{{contractOrder.self_lxr_tel}}</span>
        </div>
        <div class="itembox">
          <span>{{contractOrder.kehu_lxr |SetKehuLxr}}</span>
          <span>{{contractOrder.kehu_lxr_tel}}</span>
        </div>
      </el-card>

      <el-card class="product_box">
        <div
          class="wrap_item"
          v-for="(item,index) in contractOrder.contractOrderProduct"
          :key="index"
        >
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
                  <span>{{item.total_price}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="content_wrap">
        <div class="Company">{{contractOrder.pay_method_content | SetPayMethodContent}}</div>
        <div class="Company">
          <span>{{contractOrder.updated_at | SetUpdatedAt}}</span>
        </div>
        <div class="itembox">
          <span>{{contractOrder.remark | SetRemark}}</span>
        </div>
      </el-card>
    </scroll>

    <div class="btns">
      <div class="deleteDeliver" @click="keepmoney"></div>
      <div class="deleteDelivers" @click="keepmoney">收款</div>
      <div class="printShip" @click="toShop">发货</div>
      <div class="editShips">开票</div>
      <div class="editShip"></div>
      <img class="Print" src="@/assets/image/Print.png" alt="Print" @click="toShop" />
    </div>
  </div>
</template>
    
<script>
import { getEditContractOrder } from '@/network/deal'

export default {
  data() {
    return {
      iid: 0,
      contractOrder: {},
      editData: {},
      isShow: false,
      imgData: '',
    }
  },
  activated() {
    this.iid = this.$route.params.id
    this.getEditContractOrders()
  },
  filters: {
    SetPlatform(value) {
      return '编号:' + value
    },
    SetSelfLxr(value) {
      return '公司联系:' + value
    },
    SetKehuLxr(value) {
      return '客户联系:' + value
    },
    SetUnitPrice(value) {
      return '￥:' + value + '*'
    },
    SetPayMethodContent(value) {
      return '付款方式 ' + value
    },
    SetUpdatedAt(value) {
      return '交货日期 ' + value
    },
    SetRemark(value) {
      return '其他要素 ' + value
    },
  },
  computed: {
    getEditContractOrderData() {
      return {
        id: this.iid,
        token: this.$store.state.tonken,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    cleartime(materiel_id) {
      clearInterval(this.Loop)
      if (this.touch) {
        this.touch = false
        this.$router.push(`/editMaterial/${materiel_id}`)
      }
    },
    touchin() {
      clearInterval(this.Loop)
      this.Loop = setTimeout(() => {
        this.touch = true
      }, 800)
    },
    keepmoney() {
      this.$router.push({
        path: '/keepmoneypage',
        query: {
          data: this.contractOrder,
        },
      })
    },
    toShop() {
      this.$router.push({
        path: '/listShop',
        query: {
          data: this.editData,
        },
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
    },
  },
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
      margin-left: -1.071429rem;
      font-size: 1.285714rem;
      color: #030303;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    padding: 1.428571rem 0.714286rem;
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
