<template>
  <div id="invoicelist">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>收据</span>
      </div>
      <div class="right" slot="right">
        <span>收入￥{{allmonty.toFixed(2)}}</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper">
      <div class="content_box">
        <van-swipe-cell v-for="(item,index) in deliveryRecordList" :key="index">
          <div class="row">
            <div class="left_box">
              <div class="top_img">
                <img src="@/assets/image/smol_picter.png" />
              </div>
            </div>
            <div class="right_content">
              <div class="childrow">
                <div class="left">
                  <span>
                    票号:
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
                    <em>{{item.order_number}}</em>
                  </span>
                </div>
                <div class="right"></div>
              </div>
              <div class="childrow">
                <div class="left">
                  <span class="black">{{item.name}}</span>
                </div>
                <div class="right">
                  <span>￥{{item.amount_of_invoice}}</span>
                </div>
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              @click="PrintClick(item)"
              square
              text="打印"
              type="info"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
      </div>
    </scroll>
    <van-overlay :show="isShow" @click="closeOverlay">
      <div class="wrapr">
        <myVqr :Content="textContent"></myVqr>
      </div>
    </van-overlay>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import scroll from '@/components/common/scroll/scroll'
import { getCollectInvoiceRecordList } from '@/network/deal'
import { bestURL, crosURl } from '@/network/baseURL'
import myVqr from '@/components/common/my_vqr/myVqr'

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
  components: { navbar, scroll, myVqr },
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
      const { data } = await getCollectInvoiceRecordList(
        this.getDeliverGoodData
      )
      console.log('getCollectInvoiceRecordList', data)
      this.deliveryRecordList = data.invoiceRecordList
      this.deliveryRecordList.map((item, index) => {
        this.allmonty += parseFloat(item.amount_of_invoice)
      })
    },
    PrintClick(item) {
      console.log(item)
      if (item.print_html != null) {
        this.isShow = true
        this.textContent = item.print_html
        console.log(this.textContent)
      } else {
        this.$message({
          showClose: true,
          message: '暂未生成',
          type: 'error'
        })
      }
    },
    closeOverlay() {
      this.isShow = false
    }
  }
}
</script>
    



<style scoped lang="scss">
#invoicelist {
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
        padding: 0.714286rem 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .left_box {
          width: 40px;
          .top_img {
            width: 2.142857rem;
            height: 4.714286rem;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 2.142857rem;
              height: 4.714286rem;
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
  .wrapr {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
