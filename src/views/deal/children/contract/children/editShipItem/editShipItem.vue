<template>
  <div id="editShipItem">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>发货编辑</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll-wrapper">
      <div class="body">
        <el-card class="box-card item1">
          <van-field v-model="state" label="客户名称" @focus="focusClick" />
        </el-card>
        <el-card class="box-card item1">
          <el-row class="tanle line">
            <van-swipe-cell>
              <div class="product_box">
                <div class="wrap_item" v-for="(item,index) in tableData" :key="index">
                  <div class="wrap_left">
                    <img v-if="item.product_img" class="img" :src="item.product_img | getUrl" />
                    <img src="@/assets/image/Default.png" class="img" v-else />
                    <div class="text">
                      <div class="title">
                        <p>{{item.goods}}</p>
                        <div class="funds_box">
                          <span>￥</span>
                          <span class="funds">{{item.totalPrice}}</span>
                        </div>
                      </div>
                      <p class="model">{{item.model}}</p>
                      <div class="wrap_right">
                        <span>({{item.price}}×{{item.weight}}+{{item.process_cost}})×{{item.nums}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <template #right>
                <van-button class="delect" type="danger" @click="tableClick(index)" text="删除" />
              </template>
            </van-swipe-cell>
          </el-row>

          <el-row class="AddProduct line">
            <div @click="addNewProduct" class="coutent">
              <i class="iconfont icon-copy"></i>
              <em>添加产品</em>
            </div>
          </el-row>
        </el-card>

        <el-card class="box-card item1">
          <van-field v-model="Shipment" type="number" label="发货金额" />
          <van-field v-model="Amounts" type="number" label="折后金额" />
          <timers
            class="DeliveryDate"
            type="DeliveryDate"
            title="日期"
            :valueData="timersList.DeliveryDate"
          />
          <van-field v-model="DeliveryNotes" type="text" label="发货备注" />
        </el-card>
      </div>
    </scroll>
    <div class="footer">
      <div class="left_btn" @click="PendingNow">提交待核</div>
      <div class="right_btn" @click="SubmitNow">
        ￥{{Amounts}}
        <span>立即提交</span>
      </div>
    </div>
  </div>
</template>
    
<script>
import { regionData, CodeToText } from 'element-china-area-data'

import {
  getAddDeliverGoodsDistributors,
  addAutonomousDeliverRecord,
  getMateriel,
  getEditDeliverRecord,
  editAutonomousDeliverRecord,
} from '@/network/deal'

import { setTimerType } from '@/common/filter'
import { TotalPriceCalc } from '@/common/utils'
import { bestURL, crosURl } from '@/network/baseURL'

export default {
  data() {
    return {
      Shipment: 0,
      Amounts: 0,
      number: '',
      timersList: {
        DeliveryDate: new Date().getTime(),
      },
      distributors: [],
      materiel: [],
      restaurants: [],
      restaurant: [],
      state: '',
      states: '',
      timeout: null,
      radio: '0',
      fileList: [],
      table: false,
      dialog: false,
      Addresslog: false,
      productlog: false,
      loading: false,
      form: {
        companyName: '',
        Referred: '',
        selectedOptions: [],
        DetailedAddress: '',
        contact: '',
        position: '',
        phone: '',
        email: '',
        salesman: '',
      },
      Address: {
        DetailedAddress: '',
        contact: '',
        phone: '',
        weight: '',
        number: '',
        ProductTesting1: '',
        ProductTesting2: '',
        note: '',
      },
      product: {
        name: '',
        specifications: '',
        price: '',
      },
      options: regionData,
      address: [],
      tableData: [],
      isShowed: false,
      distributor_id: 0,
      shippingValue: '',
      shippingData: [],
      DeliveryNotes: '',
      isFlowingShow: [],
      isWeightShow: false,
      isTemporary: '0',
      processCost: '',
      product_img: '',
      iid: '',
      isEdit: true,
    }
  },
  watch: {
    $route(to, from) {
      const toDepths = to.path
      const fromDepths = from.path
      if (
        fromDepths == '/SelectProducts' ||
        fromDepths == '/nameSearch' ||
        fromDepths == '/productNameSearch' ||
        fromDepths == '/selectTime/DeliveryDate'
      ) {
        this.isEdit = false
      }
    },
  },
  filters: {
    getUrl(value) {
      return bestURL + value
    },
  },
  activated() {
    // 进入只执行一次
    if (this.isEdit) {
      this.getAddDeliverGood()
      this.iid = this.$route.params.id
      this.getEditDelive()
    }

    // this.getAddDeliverGood()
    // this.deliveryRecordItem = this.$route.query.data
    // console.log(this.deliveryRecordItem)
    // const { id, distributor_id } = this.deliveryRecordItem
    // this.distributor_id = distributor_id
    // this.iid = id
    // this.getEditDelive()

    //
    if (this.$store.state.timers.DeliveryDate != '') {
      console.log(this.$store.state.timers.DeliveryDate)
      this.timersList.DeliveryDate = this.$store.state.timers.DeliveryDate
    }
    document.querySelectorAll('input').forEach((item) => {
      item.style.border = 'none'
    })
    document.querySelector('textarea').style.border = 'none'
  },
  computed: {
    getAddDeliverData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
    addAutonomousData() {
      console.log(this.isFlowingShow)
      console.log('this.FlowingProducts', this.FlowingProducts)
      let apply_time = setTimerType(this.timersList.DeliveryDate)
      return {
        id: this.iid,
        distributor_id: this.distributor_id,
        shipping_details: this.shippingData,
        token: this.$store.state.token,
        total_funds: this.Amounts,
        total_money: this.Shipment,
        apply_time,
        type: 0,
        remark: this.DeliveryNotes,
      }
    },
    addAutonomousDatas() {
      console.log(this.isFlowingShow)
      console.log('this.FlowingProducts', this.FlowingProducts)
      let apply_time = setTimerType(this.timersList.DeliveryDate)
      return {
        id: this.iid,
        distributor_id: this.distributor_id,
        shipping_details: this.shippingData,
        token: this.$store.state.token,
        total_funds: this.Amounts,
        total_money: this.Shipment,
        apply_time,
        type: 1,
        remark: this.DeliveryNotes,
      }
    },
    getMaterieldata() {
      return {
        token: this.$store.state.token,
        product_name: this.shippingValue,
        product_model: this.Products,
        _: new Date().getTime(),
      }
    },
    getEditDeliveData() {
      return {
        token: this.$store.state.token,
        id: this.iid,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    tableClick(index) {
      console.log(index)
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否删除产品?',
        })
        .then(() => {
          if (this.tableData.length == 1) {
            this.tableData = []
            this.shippingData = []
          } else {
            this.tableData = this.tableData.splice(index - 1, 1)
            this.shippingData = this.shippingData.splice(index - 1, 1)
          }
          let allmonpement = 0
          this.tableData.forEach((item) => {
            allmonpement += parseFloat(item.totalPrice)
          })
          this.Shipment = allmonpement
          this.Amounts = allmonpement
          console.log(index, this.tableData, this.shippingData)
        })
    },
    async getEditDelive() {
      const { data, code, msg } = await getEditDeliverRecord(
        this.getEditDeliveData
      )
      if (code !== 200) {
        this.$message.error(msg)
        this.$router.replace('/deal/contract')
      } else {
        console.log('getEditDeliverRecord', data)
        this.flowDelivery = data.flowDelivery
        const {
          name,
          deliverGoodsDetail,
          total_funds,
          total_money,
          apply_time,
          distributor_id,
          remark,
        } = this.flowDelivery
        this.distributor_id = distributor_id
        this.state = name
        deliverGoodsDetail.forEach((item, index) => {
          let unit_price = parseFloat(item.unit_price)
          let weight = parseFloat(item.weight)
          let process_cost = parseFloat(item.process_cost)
          let number = parseFloat(item.number)
          if (item.weight != '') {
            unit_price *= weight
          }
          if (process_cost != '') {
            unit_price += process_cost
          }
          unit_price *= number
          unit_price = unit_price.toFixed(2)
          this.tableData.push({
            goods: item.product_name,
            model: item.product_model,
            nums: item.number,
            price: item.unit_price,
            totalPrice: unit_price,
            weight: item.weight,
            process_cost: item.process_cost,
            product_img: item.img_url,
          })
          let newArr = []
          newArr.push(item.product_name)
          newArr.push(item.product_model)
          newArr.push(item.number)
          newArr.push(item.unit_price)
          newArr.push(item.remark)
          newArr.push(item.weight)
          newArr.push(0) // 零时库
          newArr.push(item.process_cost) //加工费
          newArr.push(item.img_url) // 一张图片URL
          newArr.push(item.extra)
          this.shippingData.push(newArr)
        })
        this.Shipment = total_funds
        this.Amounts = total_money
        this.timersList.DeliveryDate = apply_time
        this.DeliveryNotes = remark
        this.distributors = data.distributors
        this.materiel = data.materiel
        if (data.customerProductExtraField.length > 0) {
          this.isFlowingShow = data.customerProductExtraField
        }
      }
    },
    focusClick() {
      this.$router.push({
        path: '/nameSearch',
        query: {
          data: { ...this.distributors },
        },
      })
      this.$bus.$off('nameSupplier')
      this.$bus.$on('nameSupplier', (item) => {
        console.log(item)
        this.state = item.name
        this.distributor_id = item.id
      })
    },
    async getAddDeliverGood() {
      const { data } = await getAddDeliverGoodsDistributors(
        this.getAddDeliverData
      )
      console.log('getAddDeliverGoodsDistributors', data)
      if (data.customerProductExtraField.length > 0) {
        this.isFlowingShow = data.customerProductExtraField
      }
      if (data.customerProductField.weight == 1) {
        this.isWeightShow = true
      }
      this.distributors = data.distributors
      this.materiel = data.materiel
    },
    blacknext() {
      this.isEdit = true
      this.Shipment = 0
      this.Amounts = 0
      this.number = ''
      this.distributors = []
      this.materiel = []
      this.restaurants = []
      this.restaurant = []
      this.state = ''
      this.states = ''
      this.timeout = null
      this.fileList = []
      this.table = false
      this.form = {}
      this.Address = {}
      this.product = {}
      this.options = regionData
      this.address = []
      this.tableData = []
      this.isShowed = false
      this.distributor_id = 0
      this.shippingValue = ''
      this.shippingData = []
      this.DeliveryNotes = ''
      this.isFlowingShow = []
      this.isWeightShow = false
      this.isTemporary = '0'
      this.loading = false
      this.dialog = false
      this.Addresslog = false
      this.productlog = false
      this.radio = '0'
      this.$router.replace('/deal/contract')
    },
    // querySearchAsync(queryString, cb) {
    //   var restaurants = this.restaurants
    //   var results = queryString
    //     ? restaurants.filter(this.createStateFilter(queryString))
    //     : restaurants
    //   clearTimeout(this.timeout)
    //   this.timeout = setTimeout(() => {
    //     cb(results)
    //   }, 3000 * Math.random())
    // },
    // querySearchAsyncs(queryString, cb) {
    //   var restaurants = this.restaurant
    //   var results = queryString
    //     ? restaurants.filter(this.createStateFilter(queryString))
    //     : restaurants
    //   clearTimeout(this.timeout)
    //   this.timeout = setTimeout(() => {
    //     cb(results)
    //   }, 3000 * Math.random())
    // },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      // 转数字类型
      this.shippingValue = item.value
      let nums = parseInt(item.address)
      console.log(nums)
    },
    handchange(value) {
      this.shippingValue = value
    },
    addNewProduct() {
      this.$router.push({
        path: '/SelectProducts',
        query: {
          data: {
            materiel: { ...this.materiel },
            isFlowingShow: this.isFlowingShow,
          },
        },
      })
      this.$bus.$off('SelectProducts')
      this.$bus.$on('SelectProducts', (item) => {
        console.log(item)
        this.shippingValue = item.selectData.productName
        this.Products = item.selectData.productModel
        this.productPrice = item.selectData.productPrice
        this.quantity = item.selectData.quantity
        this.states = item.selectData.productName
        this.ProductNotes = item.selectData.ProductNotes
        this.productWeight = item.selectData.productWeight
        this.FlowingProducts = item.selectData.FlowingProducts
        this.product_img = item.selectData.img_url
        this.processCost = item.selectData.processCost
        this.AddClick()
      })
    },

    async AddClick() {
      const { data } = await getMateriel(this.getMaterieldata)
      if (data.isExistence == 0) {
        this.$dialog
          .confirm({
            title: '提示',
            message: '是否加入临时物料库？',
          })
          .then(() => {
            this.isTemporary = '1'
          })
          .catch(() => {
            this.isTemporary = '0'
            this.tableData.pop()
          })
      }

      let totalPrice = TotalPriceCalc(
        this.productPrice,
        this.productWeight,
        this.processCost,
        this.quantity
      )

      let addproductdata = {
        goods: this.states,
        model: this.Products,
        nums: this.quantity,
        price: this.productPrice,
        totalPrice,
        weight: this.productWeight,
        process_cost: this.processCost,
        product_img: this.product_img,
      }
      this.tableData.push(addproductdata)

      let newArr = []
      newArr.push(this.shippingValue)
      newArr.push(this.Products)
      newArr.push(this.quantity)
      newArr.push(this.productPrice)
      newArr.push(this.ProductNotes)
      newArr.push(this.productWeight)
      newArr.push(this.isTemporary) // 零时库
      newArr.push(this.processCost) //加工费
      newArr.push(this.product_img) // 一张图片URL
      newArr.push(this.FlowingProducts)
      this.shippingData.push(newArr)
      console.log(this.shippingData)
      let allmonpement = 0
      this.tableData.forEach((item) => {
        allmonpement += parseFloat(item.totalPrice)
      })
      this.Shipment = allmonpement
      this.Amounts = allmonpement

      this.states = ''
      this.Products = ''
      this.productPrice = ''
      this.productWeight = ''
      this.FlowingProducts = ''
      this.quantity = ''
      this.ProductSubtotal = ''
      this.ProductNotes = ''
      this.isShowed = false
    },
    async SubmitNow() {
      const { code, msg, data } = await editAutonomousDeliverRecord(
        this.addAutonomousData
      )
      console.log('editAutonomousDeliverRecord', data)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.blacknext()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async PendingNow() {
      const { code, msg, data } = await editAutonomousDeliverRecord(
        this.addAutonomousDatas
      )
      console.log('editAutonomousDeliverRecord', data)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.blacknext()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
  },
}
</script>
    
<style lang="scss" scoped>
#editShipItem {
  padding-top: 5.428571rem;
  padding-bottom: 3.785714rem;
  min-height: 100vh;
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 2.785714rem;
    width: 100%;
    overflow: hidden;
  }
  .drawer_my {
    .demo-drawer__content {
      max-width: 1024px;
      margin: 0 auto;
      margin-top: 1.714286rem;
      padding: 0.357143rem;
      max-height: calc(100vh - 5.428571rem);
      height: calc(100vh - 5.428571rem);
      .demo-drawer__header {
      }
      .demo-drawer__footer {
        width: 100%;
        position: fixed;
        padding: 0.714286rem;
        background-color: #fff;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -3.071429rem;
      font-size: 1.285714rem;
      font-weight: 700;
      color: #030303;
    }
  }
  .body {
    background-color: #f8f7f5;
    min-height: calc(100vh - 5.428571rem);

    .item1 {
      margin-bottom: 0.714286rem;
      .btns {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        .van-button {
          margin-right: 0.714286rem;
        }
      }
      .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f8f7f5;
        padding: 0.714286rem 1.142857rem;
        .delect {
          height: 100%;
          line-height: 6.571429rem;
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
                .title {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  font-size: 1rem;
                  .funds_box {
                    flex: 0;
                  }
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
                  justify-content: flex-start;
                  color: #ccc;
                  span {
                    font-size: 0.857143rem;
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
        em {
          display: block;
          font-size: 1.142857rem;
          color: #585858;
          font-weight: 700;
          width: 6.357143rem;
          text-align: left;
        }
        div {
          display: block;
          font-size: 1.142857rem;
          font-weight: 700;
          text-align: left;
          flex: 1;
        }
        .table {
          .title,
          .bodys {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.357143rem;
            span {
              flex: 1;
              text-align: center;
            }
          }
          .bodys {
            font-weight: normal;
          }
        }
      }
      .AddProduct {
        display: flex;
        justify-content: center;
        align-items: center;
        .coutent {
          display: flex;
          justify-content: center;
          align-items: center;
          .icon-copy {
            font-size: 1.428571rem;
          }
          em {
            text-align: center;
          }
        }
      }
    }
  }
  .footer {
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
    font-weight: 700;
    border-radius: 0.357143rem;
    .left_btn {
      height: 2.785714rem;
      line-height: 2.785714rem;
      color: #fff;
      background: url('../../../../../../assets/image/left_btns.jpg') no-repeat;
      background-size: 100% 100%;
      background-position: 0 0;
      flex: 3;
      margin-right: 0.428571rem;
      text-align: center;
    }
    .right_btn {
      flex: 7;
      text-align: center;
      height: 2.785714rem;
      line-height: 2.785714rem;
      color: #fff;
      background: url('../../../../../../assets/image/right_btns.jpg') no-repeat;
      background-size: 100% 100%;
      background-position: 0 0;
    }
  }
}
</style>
