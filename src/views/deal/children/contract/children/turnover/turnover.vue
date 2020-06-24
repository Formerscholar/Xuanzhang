<template>
  <div id="turnover">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <i class="el-icon-back"></i>
      </div>
      <div class="center" slot="center">
        <span>{{distributorNew.name}}</span>
      </div>
      <div class="right" slot="right">
        <van-icon @click="newAccount" name="orders-o" />
      </div>
    </navbar>
    <scroll class="scroll-wrapper">
      <div class="coutent">
        <div class="card topcard">
          <el-card class="box-card">
            <ul>
              <li>
                <span>总金额</span>
                <em>{{distributorNew.actualNotInvoiceMoney}}</em>
              </li>
              <li>
                <span>总欠款</span>
                <em>{{distributorNew.actualNotSettlementMoney}}</em>
              </li>
              <li>
                <span>已结算</span>
                <em>{{distributorNew.settlementMoney}}</em>
              </li>
              <li>
                <span>已开票</span>
                <em>{{distributorNew.invoiceMoney}}</em>
              </li>
            </ul>
          </el-card>
        </div>
        <el-card class="box-card items" v-for="(item,index) in orderList" :key="index">
          <div class="coutent">
            <div class="leftbox">
              <img src="@/assets/image/logo.png" />
            </div>
            <div class="rightbox">
              <div class="timer">
                <div class="leftitem">{{item.order_number}}</div>
                <div class="rightitem">{{item.apply_time}}</div>
              </div>
              <div class="article">
                <div class="leftitem">{{item.product_name}}</div>
                <div class="rightitem">
                  ￥{{item.unit_price}}
                  <em>×{{item.weight}}×{{item.number}}</em>
                </div>
              </div>
              <div class="literature">
                <div class="leftitem">{{item.product_model}}</div>
                <div class="rightitem">￥{{item.total_funds}}</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </scroll>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import { getDistributorDetail } from '@/network/deal'
import scroll from '@/components/common/scroll/scroll'

export default {
  name: 'turnover',
  data() {
    return {
      active: 0,
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
        order_type: 'flow',
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
    newAccount() {
      console.log('----------------')
    },
    async getDistributor() {
      const { data } = await getDistributorDetail(this.getDistributorDate)
      console.log('getDistributor', data)
      this.distributorNew = data.distributorNew
      this.orderList = data.orderList
    }
  }
}
</script>
    
<style scoped lang="scss">
#turnover {
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
        font-size: 1.142857rem;
      }
    }
    .right {
      margin-right: 1.071429rem;
      .newbtn {
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
  }
  .coutent {
    padding: 0.571429rem 1rem;
    .card {
      .box-card {
        margin-bottom: 0.571429rem;
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
    .items {
      margin-bottom: 0.571429rem;
      .coutent {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .leftbox {
        width: 5.928571rem;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .rightbox {
        flex: 1;
        margin-left: 1rem;
        .timer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          font-size: 1rem;
          .leftitem {
            color: #fd9500;
            font-weight: 700;
          }
          .rightitem {
          }
        }
        .article {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin: 1.057143rem 0;
          .leftitem {
            font-weight: 700;
            font-size: 1rem;
            color: #9a9a9a;
          }
          .rightitem {
            font-size: 1rem;
            em {
              font-size: 0.571429rem;
            }
          }
        }
        .literature {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .leftitem {
            font-size: 1rem;
            color: #aeaeae;
          }
          .rightitem {
            font-size: 1.142857rem;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
