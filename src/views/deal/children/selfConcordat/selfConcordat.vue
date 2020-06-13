<template>
  <div id="selfConcordat">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <i class="el-icon-back"></i>
      </div>
      <div class="center" slot="center">
        <span>{{distributorNew.name}}</span>
      </div>
      <div class="right" slot="right" @click="tike">
        <i class="el-icon-circle-check"></i>
      </div>
    </navbar>
    <scroll class="scroll-wrapper">
      <div class="content_box">
        <div class="assetsInfo">
          <div class="card">
            <el-card class="box-card">
              <ul>
                <li>
                  <span>总金额</span>
                  <em>{{distributorNew.notInvoiceMoney}}</em>
                </li>
                <li @click="goShipped">
                  <span>已发货</span>
                  <em>{{distributorNew.deliveryMoney}}</em>
                </li>
                <li @click="goSettlement">
                  <span>已结算</span>
                  <em>{{distributorNew.settlementMoney}}</em>
                </li>
                <li @click="goInvoice">
                  <span>已开票</span>
                  <em>{{distributorNew.invoiceMoney}}</em>
                </li>
              </ul>
            </el-card>
          </div>
        </div>
        <div class="cards">
          <div class="goodsListItem" v-for="(item,index) in orderList" :key="index">
            <div class="itemTop">
              <div class="topLeft layout">
                <div class="contract">
                  <em style="color:#E6A23C;">{{item.order_number}}</em>
                  <span style="margin-left:5px;">
                    销售员:
                    <i>{{item.operator_name}}</i>
                  </span>
                </div>
              </div>
              <div class="topRight layout">
                <div class="Company">{{item.name_alias}}</div>
              </div>
            </div>
            <div class="itemDown">
              <div class="Downitem">
                <span>结算</span>
                <el-progress
                  :status="item.settlement_progress < 100 ?null: 'warning'"
                  :text-inside="true"
                  :show-text="item.settlement_progress<50?false:true"
                  :stroke-width="16"
                  :percentage="item.settlement_progress * 1"
                ></el-progress>
              </div>
              <div class="Downitem">
                <span>发货</span>
                <el-progress
                  :status="item.delivery_schedule < 100 ?null: 'warning'"
                  :text-inside="true"
                  :show-text="item.delivery_schedule<50?false:true"
                  :stroke-width="16"
                  :percentage="item.delivery_schedule * 1"
                ></el-progress>
              </div>
              <div class="Downitem">
                <span>开票</span>
                <el-progress
                  :status="item.invoice_progress < 100 ?null: 'warning'"
                  :text-inside="true"
                  :show-text="item.invoice_progress<50?false:true"
                  :stroke-width="16"
                  :percentage="item.invoice_progress * 1"
                ></el-progress>
              </div>
            </div>
            <div class="itemdondon">
              <div class="topLeft layout">
                <div class="Amount">
                  总额:
                  <i>{{item.contract_amount}}</i>
                  元
                </div>
              </div>
              <div class="topRight layout"></div>
              <div class="topRight layout">
                <div class="Delivery">
                  交期：
                  <i>{{item.commitment_period}}</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import { getDistributorDetail } from '@/network/deal'
import scroll from '@/components/common/scroll/scroll'

export default {
  name: 'selfConcordat',
  data() {
    return {
      iid: 0,
      distributorNew: {},
      orderList: []
    }
  },
  components: { navbar, scroll },
  activated() {
    this.iid = this.$route.params.id
    this.getDistributor()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },

  computed: {
    getDistributorDate() {
      return {
        token: this.$store.state.token,
        distributor_id: this.iid,
        order_type: 'contract',
        page: 1,
        order_number: null,
        start_time: null,
        end_time: null,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    blackhome() {
      this.$router.go(-1)
    },
    tike() {
      console.log('------tike------')
    },
    async getDistributor() {
      const { data } = await getDistributorDetail(this.getDistributorDate)
      console.log('getDistributor', data)
      this.distributorNew = data.distributorNew
      this.orderList = data.orderList
    },
    goShipped() {
      this.$router.push(`/shippedlist/${this.iid}`)
    },
    goSettlement() {
      this.$router.push(`/settlementlist/${this.iid}`)
    },
    goInvoice() {
      this.$router.push(`/invoicelist/${this.iid}`)
    }
  }
}
</script>
    
<style scoped lang="scss">
#selfConcordat {
  padding-top: 5.428571rem;
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      margin-left: 0.928571rem;
      span {
        font-size: 1.285714rem;
        font-weight: 700;
      }
    }
    .right {
      margin-right: 1.071429rem;
      height: 100%;
      i {
      }
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .content_box {
      .assetsInfo {
        padding: 10px 10px 0 10px;
        background-color: #f5f5f5;
        .card {
          .box-card {
            ul {
              display: flex;
              width: 100%;
              flex-wrap: wrap;
              li {
                width: 50%;
                height: 5.571429rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                padding: 1.014286rem;
                span {
                  color: #9b9b9b;
                }
                em {
                  font-weight: 700;
                  font-style: normal;
                  font-size: 1.142857rem;
                }
              }
            }
          }
        }
      }
      .cards {
        background-color: #f5f5f5;
        padding: 0 1.285714rem;
        overflow: hidden;
        .goodsListItem {
          background-color: #fff;
          border-radius: 5px;
          padding: 0 0.714286rem;
          padding-top: 0.571429rem;
          padding-bottom: 1.142857rem;
          margin: 0.714286rem 0;
          .layout {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 0.571429rem 0;
          }
          .itemTop {
            height: 25%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            i {
              font-style: normal;
            }
            .topLeft {
              text-align: left;

              .contract {
                font-size: 0.857143rem;
                color: #5c5c5c;
                em {
                  font-weight: 700;
                }
                i {
                  color: #858585;
                }
              }
              .Amount {
                font-size: 0.571429rem;
                i {
                  padding-left: 0.357143rem;
                }
              }
            }
            .topRight {
              text-align: right;
              .Company {
                font-size: 1rem;
                font-weight: 700;
              }
            }
          }
          .itemDown {
            display: flex;
            font-size: 0.714286rem;
            .Downitem {
              flex: 1;
              padding: 0 0.414286rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              position: relative;
              .el-progress-bar__innerText {
                font-size: 0.714286rem;
              }
              &:first-child {
                padding-left: 0;
                span {
                  left: 0.314286rem;
                }
              }
              &:last-child {
                padding-right: 0;
              }
              .el-progress {
                .el-progress-bar {
                }
                .el-progress-bar__outer {
                  border-radius: 3px;
                  .el-progress-bar__inner {
                    border-radius: 3px;
                  }
                }
              }
              span {
                text-align: center;
                position: absolute;
                color: #fff;
                z-index: 999;
                left: 0.685714rem;
                top: 0.198714rem;
                font-size: 0.642857rem;
              }
            }
          }
          .itemdondon {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.457143rem;
            font-size: 0.857143rem;
            color: #545454;
            .topLeft,
            .topRight {
              padding: 0;
            }
          }
        }
      }
    }
  }
}
</style>
