<template>
  <div class="goodslist">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @scroll="clickscroll"
    >
      <Options @selectIndex="selectIndex">
        <DealGoodsItem
          slot="entire"
          :goodsLists="goodsLists"
          @editlists="editlists"
          @VoidList="VoidList"
          @printList="printList"
          @ControlledDelay="ControlledDelay"
        />
        <DealGoodsItem
          slot="Quote"
          v-if="isQuoteList"
          :goodsLists="QuoteList"
          @editlists="editlists"
          @VoidList="VoidList"
          @printList="printList"
          @ControlledDelay="ControlledDelay"
        />
        <DealGoodsItem
          slot="MyContract"
          v-if="iscontractOrderList"
          :goodsLists="contractOrderList"
          @editlists="editlists"
          @VoidList="VoidList"
          @printList="printList"
          @ControlledDelay="ControlledDelay"
        />
        <DealGoodsItem
          slot="MyOffer"
          :goodsLists="MyOfferList"
          @editlists="editlists"
          @VoidList="VoidList"
          @printList="printList"
          @ControlledDelay="ControlledDelay"
        />
        <DealGoodsItems
          slot="DeliveryList"
          :goodsLists="DeliveryList"
          @editlists="editlists"
          @VoidList="VoidList"
          @printList="printList"
          @ControlledDelay="ControlledDelay"
        />
      </Options>
    </scroll>
    <i class="el-icon-plus" @click="createContract"></i>
    <van-overlay :show="isShow" @click="closeOverlay">
      <div class="wrapper-qrCode">
        <myVqr :Content="textContent"></myVqr>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { throttle } from '@/common/utils'

import {
  getContractOrderList,
  deleteContractOrder,
  getEditContractOrder,
  getUserContractOrderList,
  getDeliverGoodsList,
} from '@/network/deal'

export default {
  data() {
    return {
      timer: null,
      goodsLists: [],
      QuoteList: [],
      contractOrderList: [],
      MyOfferList: [],
      DeliveryList: [],
      pageIndex: 0,
      editData: {},
      allPage: 1,
      isShow: false,
      imgData: '',
      entire: 1,
      Quote: 1,
      MyContract: 1,
      MyOffer: 1,
      Delivery: 1,
      request: true,
      show: false,
      textContent: '',
      print_html: '',
      isQuoteList: true,
      iscontractOrderList: true,
    }
  },
  components: {
    DealGoodsItem: () => import('./DealGoodsItem'),
    DealGoodsItems: () => import('./DealGoodsItems'),
    Options: () => import('@/views/deal/children/Options/Options'),
    myVqr: () => import('@/components/common/my_vqr/myVqr'),
  },
  created() {
    this.goodsLists = []
    this.getOrderList(1)
    this.QuoteList = []
    this.getOrderList(0)
    this.contractOrderList = []
    this.getUserContractOrderss()
    this.MyOfferList = []
    this.getUserContractOrders()
    this.DeliveryList = []
    this.getDeliverGoodsLists()
  },
  activated() {
    this.$Jurisdiction('27', localStorage.getItem('catearr'), () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
    this.$Jurisdiction('72', localStorage.getItem('catearr'), () => {
      this.isQuoteList = false
    })
    this.$Jurisdiction('73', localStorage.getItem('catearr'), () => {
      this.iscontractOrderList = false
    })
  },
  destroyed() {
    this.timer = null
    this.goodsLists = []
    this.QuoteList = []
    this.contractOrderList = []
    this.MyOfferList = []
    this.DeliveryList = []
    this.editData = {}
    this.allPage = 1
    this.isShow = false
    this.imgData = ''
    this.entire = 1
    this.MyContract = 1
    this.MyOffer = 1
    this.Delivery = 1
    this.Quote = 1
    this.request = true
    this.show = false
    this.textContent = ''
    this.print_html = ''
  },
  computed: {
    getUserContractOrderListData() {
      return {
        token: this.$store.state.token,
        page: this.allPage,
        offset: 20,
        distributor_id: null,
        order_number: null,
        is_contract: 1,
        _: new Date().getTime(),
      }
    },
    getUserContractOrderListDatas() {
      return {
        token: this.$store.state.token,
        page: this.allPage,
        offset: 20,
        distributor_id: null,
        order_number: null,
        is_contract: 0,
        _: new Date().getTime(),
      }
    },
    getDeliverGoodsListData() {
      return {
        token: this.$store.state.token,
        page: this.allPage,
        offset: 20,
        order_type: 'contract',
        distributor_id: null,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    clickscroll() {
      throttle(() => {
        if (this.pageIndex == 0) {
          this.entire = 0
          this.allPage = this.entire
          this.goodsLists = []
          this.getOrderList(1)
        } else if (this.pageIndex == 1) {
          this.Quote = 0
          this.allPage = this.Quote
          this.QuoteList = []
          this.getOrderList(0)
        } else if (this.pageIndex == 2) {
          this.MyContract = 0
          this.allPage = this.MyContract
          this.contractOrderList = []
          this.getUserContractOrderss()
        } else if (this.pageIndex == 3) {
          this.MyOffer = 0
          this.allPage = this.MyOffer
          this.MyOfferList = []
          this.getUserContractOrders()
        } else if (this.pageIndex == 4) {
          this.Delivery = 0
          this.allPage = this.Delivery
          this.DeliveryList = []
          this.getDeliverGoodsLists()
        }
      }, 500)
    },
    ControlledDelay() {
      if (this.pageIndex == 0) {
        this.goodsLists = []
        this.getOrderList(1)
      } else if (this.pageIndex == 1) {
        this.QuoteList = []
        this.getOrderList(0)
      } else if (this.pageIndex == 2) {
        this.contractOrderList = []
        this.getUserContractOrderss()
      } else if (this.pageIndex == 3) {
        this.MyOfferList = []
        this.getUserContractOrders()
      } else if (this.pageIndex == 4) {
        this.DeliveryList = []
        this.getDeliverGoodsLists()
      }
    },
    async getDeliverGoodsLists() {
      const { data } = await getDeliverGoodsList(this.getDeliverGoodsListData)
      if (data.deliveryRecordList.length != 0) {
        data.deliveryRecordList.forEach((item) => {
          this.DeliveryList.push({
            contract: item.order_number,
            Amount: item.total_funds,
            Company: item.name,
            Delivery: item.apply_time,
            name: item.operator_name,
            distributor_id: item.distributor_id,
            che_status: item.che_status,
            business_status: item.business_status,
            to_examine: item.to_examine,
            auditRecord: item.auditRecord,
          })
        })
      } else {
        this.request = false
      }
    },
    async getUserContractOrders() {
      const { data } = await getUserContractOrderList(
        this.getUserContractOrderListDatas
      )

      if (data.contractOrderList.length != 0) {
        data.contractOrderList.forEach((item) => {
          this.MyOfferList.push({
            isIndex: 1,
            id: item.id,
            contract: item.order_number,
            Amount: item.amount_of_discount,
            Company: item.name_alias,
            Delivery: item.contract_date,
            name: item.operator_name,
            distributor_id: item.distributor_id,
            che_status: item.che_status,
            business_status: item.business_status,
            schedule: {
              Settlement: item.settlement_progress * 1,
              Ship: item.delivery_schedule * 1,
              invoice: item.invoice_progress * 1,
            },
            to_examine: item.to_examine,
            auditRecord: item.auditRecord,
          })
        })
      } else {
        this.request = false
      }
    },
    async getUserContractOrderss() {
      const { data } = await getUserContractOrderList(
        this.getUserContractOrderListData
      )

      if (data.contractOrderList.length != 0) {
        data.contractOrderList.forEach((item) => {
          this.contractOrderList.push({
            isIndex: 1,
            id: item.id,
            contract: item.order_number,
            Amount: item.amount_of_discount,
            Company: item.name_alias,
            Delivery: item.contract_date,
            name: item.operator_name,
            distributor_id: item.distributor_id,
            che_status: item.che_status,
            business_status: item.business_status,
            schedule: {
              Settlement: item.settlement_progress * 1,
              Ship: item.delivery_schedule * 1,
              invoice: item.invoice_progress * 1,
            },
            to_examine: item.to_examine,
            auditRecord: item.auditRecord,
          })
        })
      } else {
        this.request = false
      }
    },
    async printList(datas) {
      this.show = datas.showed
      const { code, data, msg } = await getEditContractOrder({
        id: datas.data.id,
        token: this.$store.state.tonken,
        _: new Date().getTime(),
      })
      if (code == 200) {
        this.isShow = true
        this.textContent = data.contractOrder.print_html
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    closeOverlay() {
      this.isShow = false
    },
    async VoidList(datas) {
      const form = new FormData()
      form.append('token', this.$store.state.tonken)
      form.append('id', datas.data.id)
      const { msg } = await deleteContractOrder(form)
      this.$toast(msg)
    },
    editlists(datas) {
      this.$router.push({
        path: '/edit-contract',
        query: {
          data: datas.data,
        },
      })
    },
    selectIndex(i) {
      throttle(() => {
        this.pageIndex = i
        this.allPage = 1
      }, 500)
    },
    loadMore() {
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
        case 2:
          if (this.request) {
            this.allPage = ++this.MyContract
            this.getUserContractOrderss()
          } else {
            this.$toast('没有更多数据了')
          }
          break
        case 3:
          if (this.request) {
            this.allPage = ++this.MyOffer
            this.getUserContractOrders()
          } else {
            this.$toast('没有更多数据了')
          }
          break
        case 4:
          if (this.request) {
            this.allPage = ++this.Delivery
            this.getDeliverGoodsLists()
          } else {
            this.$toast('没有更多数据了')
          }
          break
        default:
          break
      }
    },
    getOrderData(id) {
      return {
        token: this.$store.state.token,
        page: this.allPage,
        offset: 20,
        distributor_id: '',
        order_number: '',
        is_contract: id,
        salesperson_id: null,
        _: new Date().getTime(),
      }
    },
    async getOrderList(id) {
      const { data } = await getContractOrderList(this.getOrderData(id))

      if (id == 0) {
        if (data.contractOrderList.length != 0) {
          data.contractOrderList.forEach((item) => {
            this.QuoteList.push({
              isIndex: 1,
              id: item.id,
              contract: item.order_number,
              Amount: item.amount_of_discount,
              Company: item.name_alias,
              Delivery: item.contract_date,
              name: item.operator_name,
              distributor_id: item.distributor_id,
              che_status: item.che_status,
              business_status: item.business_status,
              schedule: {
                Settlement: item.settlement_progress * 1,
                Ship: item.delivery_schedule * 1,
                invoice: item.invoice_progress * 1,
              },
              to_examine: item.to_examine,
              auditRecord: item.auditRecord,
            })
          })
        } else {
          this.request = false
        }
      } else if (id == 1) {
        data.contractOrderList.forEach((item) => {
          this.goodsLists.push({
            isIndex: 1,
            id: item.id,
            contract: item.order_number,
            Amount: item.amount_of_discount,
            Company: item.name_alias,
            Delivery: item.contract_date,
            name: item.operator_name,
            distributor_id: item.distributor_id,
            che_status: item.che_status,
            business_status: item.business_status,
            schedule: {
              Settlement: item.settlement_progress * 1,
              Ship: item.delivery_schedule * 1,
              invoice: item.invoice_progress * 1,
            },
            to_examine: item.to_examine,
            auditRecord: item.auditRecord,
          })
        })
      }
    },
    createContract() {
      this.$router.push('/create-contract')
    },
  },
}
</script>

<style lang="scss" scoped>
.goodslist {
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
    background-color: rgb(66, 147, 200);
    color: #fff;
    border-radius: 50%;
  }
}
</style>
