<template>
  <div id="ContractDetails">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>销售合同</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <div class="content_wrap">
        <div class="timers">
          <div class="icons"></div>
          <span>{{contractOrder.commitment_period | setTimerTypes}}</span>
        </div>
        <div class="seller">
          <div class="lefttTitle">卖方</div>
          <div class="rightbox">
            <div class="Companies">{{$store.state.userInfo[0].user_compser_name}}</div>
            <div class="infos">
              <div class="name">{{contractOrder.self_lxr}}</div>
              <div class="phonle">{{contractOrder.self_lxr_tel}}</div>
            </div>
          </div>
        </div>

        <div class="buyer">
          <div class="lefttTitle">买方</div>
          <div class="rightbox">
            <div class="Companies">{{contractOrder.distributor_name}}</div>
            <div class="infos">
              <div class="name">{{contractOrder.kehu_lxr}}</div>
              <div class="phonle">{{contractOrder.kehu_lxr_tel}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="product_box">
        <div class="product_title">产品信息</div>

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

        <div
          class="product_price"
          v-if="contractOrder.contract_amount != contractOrder.amount_of_discount"
        >
          <div class="total_price">
            <div class="title">合计</div>
            <span>￥{{contractOrder.contract_amount}}</span>
          </div>
          <div class="After_price">
            <div class="title">折后</div>
            <span>
              ￥
              <em>{{contractOrder.amount_of_discount.split('.')[0]}}</em>
              .{{contractOrder.amount_of_discount.split('.')[1]}}
            </span>
          </div>
        </div>
        <div class="product_price" v-else>
          <div class="After_price">
            <div class="title">合计</div>
            <span>
              ￥
              <em>{{contractOrder.contract_amount.split('.')[0]}}</em>
              .{{contractOrder.contract_amount.split('.')[1]}}
            </span>
          </div>
        </div>
      </div>
      <div class="content_wrap">
        <div class="informations">合同信息</div>
        <div class="informations_item">
          <div class="title">付款方式</div>
          <span>{{contractOrder.pay_method_content | SetPayMethodContent}}</span>
        </div>
        <div class="informations_item">
          <div class="title">合同交期</div>
          <span>{{contractOrder.updated_at }}</span>
        </div>
        <div class="informations_item">
          <div class="title">其他要素</div>
          <span>{{contractOrder.remark }}</span>
        </div>
      </div>
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
      return ' ' + value
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
      console.log('ContractDetails')
      const { code, data, msg } = await getEditContractOrder(
        this.getEditContractOrderData
      )
      if (code == 200) {
        console.log('getEditContractOrder', data)
        this.editData = data
        this.contractOrder = data.contractOrder
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
        this.blacknext()
      }
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
    bottom: 5.428571rem;
    width: 100%;
    overflow: hidden;
    padding: 0.714286rem 0.857143rem;
    background-color: #f3f4f9;

    .content_wrap {
      padding: 0.714286rem 1.071429rem;
      padding-bottom: 0;
      margin-top: 0.357143rem;
      margin-bottom: 0.357143rem;
      background-color: #fff;
      .informations {
        font-size: 1.142857rem;
        color: #000;
        border-bottom: 1px solid #d5d5d5;
        padding-bottom: 0.714286rem;
        margin-bottom: 0.428571rem;
      }
      .informations_item {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 0.428571rem;
        .title {
          width: 4rem;
          font-size: 1rem;
          color: #acacac;
          margin-right: 1rem;
        }
        span {
          flex: 1;
          font-size: 1rem;
          font-family: 'Microsoft YaHei';
          color: #000;
        }
      }
      .timers {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #d5d5d5;
        padding-bottom: 0.714286rem;
        margin-bottom: 0;
        .icons {
          width: 1.285714rem;
          height: 1.285714rem;
          background-color: black;
          margin-right: 0.714286rem;
        }
        span {
          font-size: 1.285714rem;
          color: #666;
        }
      }
      .seller,
      .buyer {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .lefttTitle {
          width: 3.071429rem;
          height: 1.571429rem;
          line-height: 1.571429rem;
          background-color: #4aa0ed;
          color: #fff;
          text-align: center;
          font-size: 1.142857rem;
          margin-right: 1.714286rem;
          border-radius: 0.357143rem;
        }
        .rightbox {
          flex: 1;
          padding: 0.714286rem 0;
          .Companies {
            font-size: 1rem;
            color: #000;
          }
          .infos {
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
            .name {
              font-size: 1.142857rem;
              color: #000;
              margin-right: 0.714286rem;
            }
            .phonle {
              font-size: 1rem;
              color: #666;
            }
          }
        }
      }
      .buyer {
        padding: 0;
        .lefttTitle {
          background-color: #f48a31;
        }
        .rightbox {
        }
      }
      .seller {
        .rightbox {
          border-bottom: 1px solid #d5d5d5;
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
