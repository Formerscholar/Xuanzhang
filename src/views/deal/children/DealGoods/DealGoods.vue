<template>
  <div class="goodslist">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <Options @selectIndex="selectIndex">
        <DealGoodsItem
          slot="entire"
          :goodsLists="goodsLists"
          @isMaskShow="isMaskShow"
          @pushData="pushData"
        />
        <DealGoodsItem
          slot="Quote"
          :goodsLists="QuoteList"
          @isMaskShow="isMaskShow"
          @pushData="pushData"
        />
      </Options>
    </scroll>
    <i class="el-icon-plus" @click="createContract"></i>
    <van-overlay :show="show" @click="show = false" lock-scroll>
      <div id="wrapper-click">
        <div id="block">
          <div class="propDivItem" @click="editlists">编辑</div>
          <div class="propDivItem" @click="VoidList">作废</div>
          <div class="propDivItem" @click="printList">打印</div>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="isShow" @click="closeOverlay">
      <div class="wrapper-qrCode">
        <myVqr :Content="textContent"></myVqr>
      </div>
    </van-overlay>
  </div>
</template>
    
<script>
import DealGoodsItem from './DealGoodsItem.vue'
import Options from '@/views/deal/children/Options/Options'
import { throttle } from '@/common/utils.ts'
import scroll from '@/components/common/scroll/scroll'
import {
  getContractOrderList,
  deleteContractOrder,
  getEditContractOrder
} from '@/network/deal'
import myVqr from '@/components/common/my_vqr/myVqr'

export default {
  name: 'DealGoods',
  data() {
    return {
      timer: null,
      goodsLists: [],
      QuoteList: [],
      pageIndex: 0,
      editData: {},
      allPage: 1,
      isShow: false,
      imgData: '',
      entire: 1,
      Quote: 1,
      request: true,
      show: false,
      textContent: '',
      print_html: ''
    }
  },
  components: {
    DealGoodsItem,
    Options,
    scroll,
    myVqr
  },
  created() {
    this.getOrderList(1)
    this.getOrderList(0)
  },
  activated() {
    this.getOrderList(1)
    this.getOrderList(0)
  },
  deactivated() {
    this.goodsLists = []
    this.QuoteList = []
    this.pageIndex = 0
    this.allPage = 1
    this.entire = 1
    this.Quote = 1
  },
  computed: {
    deleteContractOrderData() {
      const form = new FormData()
      form.append('token', this.$store.state.tonken)
      form.append('id', this.iid)
      return form
    }
  },
  methods: {
    printList() {
      if (this.print_html != '') {
        this.show = false
        this.isShow = true
        this.textContent = this.print_html
        document.querySelector('#tab-bar').style.height = '59px'
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
    },
    async isMaskShow(datas) {
      this.show = datas.showed
      const { data } = await getEditContractOrder({
        id: datas.data.id,
        token: this.$store.state.tonken,
        _: new Date().getTime()
      })
      this.print_html = data.contractOrder.print_html
    },
    async VoidList() {
      this.show = false
      document.querySelector('#tab-bar').style.height = '59px'
      const { msg } = await deleteContractOrder(this.deleteContractOrderData)
      this.$toast(msg)
    },
    pushData(editData) {
      this.editData = editData
    },
    editlists() {
      this.$router.push({
        path: '/edit-contract',
        query: {
          data: this.editData
        }
      })
      this.show = false
      document.querySelector('#tab-bar').style.height = '59px'
    },
    selectIndex(i) {
      this.pageIndex = i
    },
    loadMore() {
      console.log('loadMore', this.pageIndex)
      switch (this.pageIndex) {
        case 0:
          if (this.request) {
            this.allPage = ++this.entire
            this.getOrderList(1)
          } else {
            this.$toast('没有更多数据了')
          }
          break
        case 1:
          if (this.request) {
            this.allPage = ++this.Quote
            this.getOrderList(0)
          } else {
            this.$toast('没有更多数据了')
          }
          break
        default:
          break
      }
      this.$refs.scroll.finishPullUp()
    },
    getOrderData(id) {
      return {
        token: this.$store.state.token,
        page: this.allPage,
        offset: 20,
        distributor_id: '',
        order_number: '',
        is_contract: id,
        _: new Date().getTime()
      }
    },
    async getOrderList(id) {
      const { data } = await getContractOrderList(this.getOrderData(id))
      console.log('getContractOrderList', data)
      if (id == 1) {
        if (data.contractOrderList.length != 0) {
          data.contractOrderList.forEach(item => {
            this.goodsLists.push({
              id: item.id,
              contract: item.order_number,
              Amount: item.amount_of_discount,
              Company: item.name_alias,
              Delivery: item.contract_date,
              name: item.operator_name,
              distributor_id: item.distributor_id,
              schedule: {
                Settlement: item.settlement_progress * 1,
                Ship: item.delivery_schedule * 1,
                invoice: item.invoice_progress * 1
              }
            })
          })
        } else {
          this.request = false
        }
      } else if (id == 0) {
        data.contractOrderList.forEach(item => {
          this.QuoteList.push({
            contract: item.order_number,
            Amount: item.amount_of_discount,
            Company: item.name_alias,
            Delivery: item.contract_date,
            name: item.operator_name,
            id: item.distributor_id,
            schedule: {
              Settlement: item.settlement_progress * 1,
              Ship: item.delivery_schedule * 1,
              invoice: item.invoice_progress * 1
            }
          })
        })
      }
    },
    createContract() {
      this.$router.push('/create-contract')
    }
  }
}
</script>
    
<style lang="scss" scoped>
.goodslist {
  min-height: calc(100vh - 9.642857rem);
  #wrapper-click {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100% !important;
    #block {
      width: 14.285714rem;
      height: 14.285714rem;
      background-color: #fff;
      .propDivItem {
        width: 100%;
        height: 33.33%;
        line-height: 4.857143rem;
        text-align: center;
        font-size: 1.428571rem;
        color: #888;
      }
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.214286rem;
    width: 100%;
    overflow: hidden;
  }
  .el-icon-plus {
    position: fixed;
    bottom: 7.142857rem;
    right: 3.357143rem;
    padding: 0.571429rem;
    z-index: 999;
    font-size: 2.714286rem;
    background-color: #2a7bd0;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
