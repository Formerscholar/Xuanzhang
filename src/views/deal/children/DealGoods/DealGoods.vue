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
          @editlists="editlists"
          @VoidList="VoidList"
          @printList="printList"
        />
        <DealGoodsItem
          slot="Quote"
          :goodsLists="QuoteList"
          @editlists="editlists"
          @VoidList="VoidList"
          @printList="printList"
        />
        <DealGoodsItem
          slot="MyContract"
          :goodsLists="contractOrderList"
          @editlists="editlists"
          @VoidList="VoidList"
          @printList="printList"
        />
        <DealGoodsItem
          slot="MyOffer"
          :goodsLists="MyOfferList"
          @editlists="editlists"
          @VoidList="VoidList"
          @printList="printList"
        />
        <DealGoodsItems
          slot="DeliveryList"
          :goodsLists="DeliveryList"
          @editlists="editlists"
          @VoidList="VoidList"
          @printList="printList"
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
import DealGoodsItem from './DealGoodsItem'
import DealGoodsItems from './DealGoodsItems'
import Options from '@/views/deal/children/Options/Options'
import { throttle } from '@/common/utils'

import {
  getContractOrderList,
  deleteContractOrder,
  getEditContractOrder,
  getUserContractOrderList,
  getDeliverGoodsList,
} from '@/network/deal'
import myVqr from '@/components/common/my_vqr/myVqr'

export default {
  name: 'DealGoods',
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
    }
  },
  components: {
    DealGoodsItem,
    DealGoodsItems,
    Options,
    myVqr,
  },
  activated() {
    if (this.pageIndex == 0) {
      this.getOrderList(1)
    } else if (this.pageIndex == 1) {
      this.getOrderList(0)
    } else if (this.pageIndex == 2) {
      this.getUserContractOrderss()
    } else if (this.pageIndex == 3) {
      this.getUserContractOrders()
    } else if (this.pageIndex == 4) {
      this.getDeliverGoodsLists()
    }
  },
  deactivated() {
    this.timer = null
    this.goodsLists = []
    this.QuoteList = []
    this.contractOrderList = []
    this.MyOfferList = []
    this.DeliveryList = []
    this.pageIndex = 0
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
      console.log('getUserContractOrderList', data)
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
      console.log('getUserContractOrderList', data)
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
        if (this.pageIndex == 0) {
          this.getOrderList(1)
        } else if (this.pageIndex == 1) {
          this.getOrderList(0)
        } else if (this.pageIndex == 2) {
          this.getUserContractOrderss()
        } else if (this.pageIndex == 3) {
          this.getUserContractOrders()
        } else if (this.pageIndex == 4) {
          this.getDeliverGoodsLists()
        }
      }, 500)
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
      console.log('getContractOrderList', data)
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
