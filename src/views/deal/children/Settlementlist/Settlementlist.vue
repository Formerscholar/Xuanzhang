<template>
  <div id="ShippedList">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>结算</span>
      </div>
      <div class="right" slot="right">
        <span>收入￥{{allmonty}}</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper">
      <div class="content_box">
        <van-swipe-cell v-for="(item,index) in deliveryRecordList" :key="index">
          <div class="row">
            <div class="left_box">
              <div class="top_img">
                <img src="@/assets/image/logo.png" />
              </div>
            </div>
            <div class="right_content">
              <div class="childrow">
                <div class="left">
                  <span>
                    单号:
                    <em class="receipt">{{item.order_number}}</em>
                  </span>
                </div>
                <div class="right">
                  <span>
                    日期:
                    <em>{{item.created_at}}</em>
                  </span>
                </div>
              </div>
              <div class="childrow mgdata">
                <div class="left">
                  <span>
                    合同号:
                    <em>{{item.contract_order_number}}</em>
                  </span>
                </div>
                <div class="right"></div>
              </div>
              <div class="childrow">
                <div class="left">
                  <span class="black">{{item.name}}</span>
                </div>
                <div class="right">
                  <span>￥{{item.settlement_money}}</span>
                </div>
              </div>
            </div>
          </div>
          <template #right>
            <van-button @click="PrintClick" square text="打印" type="info" class="delete-button" />
          </template>
        </van-swipe-cell>
      </div>
    </scroll>
    <van-overlay :show="isShow" @click="closeOverlay">
      <!-- @click.stop -->
      <div class="wrapper">
        <div
          id="qrCode"
          class="qrconde"
          ref="qrCodeDiv"
          v-if="imgData==''"
          style="width: 200px;height: 200px"
        ></div>
      </div>
    </van-overlay>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import scroll from '@/components/common/scroll/scroll'
import { getSettlementRecordList } from '@/network/deal'
import { bestURL, crosURl } from '@/network/baseURL'
export default {
  data() {
    return {
      iid: 0,
      allmonty: 0,
      isShow: false,
      imgData: '',
      textContent: '',
      deliveryRecordList: []
    }
  },
  components: { navbar, scroll },
  activated() {
    this.iid = this.$route.params.id
    this.getDeliverGoodsLists()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    this.allmonty = 0
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  computed: {
    getDeliverGoodData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        order_type: 'contract',
        distributor_id: this.iid,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    blacknext() {
      this.$router.go(-1)
    },
    async getDeliverGoodsLists() {
      const { data } = await getSettlementRecordList(this.getDeliverGoodData)
      console.log('getDeliverGoodsList', data)
      this.deliveryRecordList = data.settlementRecordList
      this.deliveryRecordList.map((item, index) => {
        this.allmonty += parseFloat(item.settlement_money)
      })
    },
    PrintClick() {
      this.isShow = true
      this.$nextTick(() => {
        this.bindQRCode()
      })
    },
    bindQRCode() {
      this.textContent = bestURL + '/contract_255.html'
      new this.$qrCode(this.$refs.qrCodeDiv, {
        text: this.textContent,
        width: 200,
        height: 200,
        colorDark: '#333333',
        colorLight: '#ffffff',
        correctLevel: this.$qrCode.CorrectLevel.H
      })
    },
    closeOverlay() {
      this.isShow = false
      this.$refs.qrCodeDiv.innerHTML = ''
    }
  }
}
</script>
    
<style scoped lang="scss">
#ShippedList {
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
      margin-left: 4.928571rem;
      font-size: 1.285714rem;
      color: #030303;
    }
    .right {
      margin-right: 1.071429rem;
      font-size: 0.714286rem;
    }
  }
  .scroll-wrapper {
    padding: 0 1rem;
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .content_box {
      .delete-button {
        height: 88%;
      }
      .row {
        margin-top: 0.571429rem;
        padding: 0.714286rem 1rem;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .left_box {
          width: 40px;
          .top_img {
            width: 2.142857rem;
            height: 2.142857rem;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 2.142857rem;
            }
          }
        }
        .right_content {
          flex: 1;
          border-bottom: 1px solid #c2c2c2;
          padding-bottom: 0.714286rem;
          .childrow {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .left {
              font-size: 0.857143rem;
              .receipt {
                color: #fa9b03;
              }
              .black {
                font-size: 0.714286rem;
              }
            }
            .right {
              font-size: 0.714286rem;
              color: #393939;
            }
          }
          .mgdata {
            margin: 0.571429rem 0;
          }
        }
      }
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
