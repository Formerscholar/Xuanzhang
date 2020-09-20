<template>
  <div id="selfConcordat">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>{{ distributorNew.name }}</span>
      </div>
      <div class="right" slot="right" @click="tike">
        <i class="el-icon-circle-check"></i>
      </div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <div class="content_box">
        <div class="assetsInfo">
          <div class="card">
            <el-card class="box-card">
              <ul>
                <li>
                  <span>总金额</span>
                  <em>{{ distributorNew.orderMoney }}</em>
                </li>
                <li @click="goShipped">
                  <span>已发货</span>
                  <em>{{ distributorNew.deliveryMoney }}</em>
                </li>
                <li @click="goSettlement">
                  <span>已结算</span>
                  <em>{{ distributorNew.settlementMoney }}</em>
                </li>
                <li @click="goInvoice">
                  <span>已开票</span>
                  <em>{{ distributorNew.invoiceMoney }}</em>
                </li>
              </ul>
            </el-card>
          </div>
        </div>
        <div class="cards">
          <van-swipe-cell v-for="(item, index) in orderList" :key="index">
            <div class="goodsListItem" @click.stop="listClick(item)">
              <div class="itemTop">
                <div class="topLeft layout">
                  <div class="contract">
                    <em style="color:#E6A23C;">{{ item.contract }}</em>
                    <span style="margin-left:.714286rem;">
                      <i>{{ item.name }}</i>
                    </span>
                  </div>
                </div>
                <div class="topRight layout">
                  <div
                    v-for="(item1, index1) in item.auditRecord"
                    :key="index1"
                    :class="
                      item1.status == 0 ? 'glyphicon pramary' : 'glyphicon info'
                    "
                  ></div>
                </div>
              </div>
              <div class="itemDown">
                <div class="Downitem">
                  <el-progress
                    :format="formatOne"
                    :text-inside="true"
                    :stroke-width="16"
                    :percentage="item.settlement_progress * 1"
                    :status="
                      item.settlement_progress * 1 < 100 ? null : 'warning'
                    "
                  ></el-progress>
                </div>
                <div class="Downitem">
                  <el-progress
                    :format="formatTwo"
                    :text-inside="true"
                    :stroke-width="16"
                    :percentage="item.delivery_schedule * 1"
                    :status="
                      item.delivery_schedule * 1 < 100 ? null : 'warning'
                    "
                  ></el-progress>
                </div>
                <div class="Downitem">
                  <el-progress
                    :format="formatThree"
                    :text-inside="true"
                    :stroke-width="16"
                    :percentage="item.invoice_progress * 1"
                    :status="item.invoice_progress * 1 < 100 ? null : 'warning'"
                  ></el-progress>
                </div>
              </div>
              <div class="itemdondon">
                <div class="tags">
                  <van-tag plain :type="item.business_status | tagsType">{{
                    item.business_status | setbusiness_status
                  }}</van-tag>
                  <van-tag
                    plain
                    :type="item.che_status ? 'success' : 'warning'"
                    >{{ item.che_status ? '整装待发' : '生产中' }}</van-tag
                  >
                </div>
                <div class="topLeft layout">
                  <div class="Amount">
                    <i>{{ item.amount_of_discount | SetAmount }}</i>
                  </div>
                </div>
                <div class="topRight layout"></div>
                <div class="topRight layout">
                  <div class="Delivery">
                    <i>{{ item.commitment_period | SetDelivery }}</i>
                  </div>
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
                square
                type="warning"
                text="编辑"
                @click="editlists(item)"
              />
              <van-button
                style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
                square
                type="danger"
                text="作废"
                @click="VoidList(item)"
              />
              <van-button
                style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
                square
                type="primary"
                text="打印"
                @click="printList(item)"
              />
              <van-button
                v-if="item.to_examine != undefined && item.to_examine == 0"
                style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
                square
                type="info"
                text="受控"
                @click="ControlledDelay(item.id)"
              />
              <van-button
                v-if="item.to_examine != undefined && item.to_examine == 1"
                style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
                square
                type="danger"
                text="解锁"
                @click="PREUNLOCK(item.id)"
              />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getDistributorDetail } from '@/network/deal'

export default {
  data() {
    return {
      iid: 0,
      distributorNew: {},
      orderList: [],
    }
  },
  created() {
    this.iid = this.$route.params.id
    this.getDistributor()
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
        _: new Date().getTime(),
      }
    },
  },
  filters: {
    SetName(value) {
      return '销售:' + value
    },
    SetAmount(value) {
      return '￥' + value
    },
    SetDelivery(value) {
      return '交期:' + value
    },
    setbusiness_status(value) {
      if (value == 0) {
        return '洽谈中'
      } else if (value == 1) {
        return '启动生产'
      } else if (value == 2) {
        return '准许发货'
      } else if (value == 3) {
        return '无状态'
      }
    },
    tagsType(value) {
      if (value == 0) {
        return 'danger'
      } else if (value == 1) {
        return 'warning'
      } else if (value == 2) {
        return 'success'
      } else if (value == 3) {
        return 'primary'
      }
    },
  },
  methods: {
    listClick(item) {
      this.iid = item.id
      this.listIsShow = false
      this.$router.push(`/contractdetails/${this.iid}`)
    },
    formatOne(percentage) {
      return `结算 ${percentage}%`
    },
    formatTwo(percentage) {
      return `发货 ${percentage}%`
    },
    formatThree(percentage) {
      return `开票 ${percentage}%`
    },
    blackhome() {
      this.$router.go(-1)
    },
    tike() {},
    async getDistributor() {
      const { data } = await getDistributorDetail(this.getDistributorDate)

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
    },
  },
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
        padding: 0.714286rem 0.714286rem 0 0.714286rem;
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
        padding: 0 0.714286rem;
        overflow: hidden;
        .goodsListItem {
          background-color: #fff;
          border-radius: 0.357143rem;
          padding: 0 0.714286rem;
          padding-bottom: 0.571429rem;
          margin: 0.714286rem 0;
          .scroll-wrapper {
            position: absolute;
            left: 0;
            top: 5.428571rem;
            bottom: 4.214286rem;
            width: 100%;
            overflow: hidden;
          }
          .layout {
            display: flex;
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
            }

            .topRight {
              .glyphicon {
                width: 0.857143rem;
                height: 0.857143rem;
                margin-right: 0.357143rem;
              }
              .pramary {
                background-color: #e3e3e3;
              }
              .info {
                background-color: rgb(66, 147, 200);
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
              /deep/.el-progress-bar__innerText {
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
              /deep/.el-progress-bar__outer {
                border-radius: 3px;
                /deep/.el-progress-bar__inner {
                  border-radius: 3px;
                }
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
            .tags {
              .van-tag {
                height: 1rem;
                font-size: 0.857143rem;
                margin-right: 0.214286rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
