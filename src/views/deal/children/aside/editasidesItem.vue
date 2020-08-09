<template>
  <div id="editShipItem">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>采购编辑</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll-wrapper">
      <div class="body">
        <el-card class="box-card item1">
          <van-field
            v-model="state"
            label="客户名称"
            @focus="focusClick"
            lass="newStyle"
            @click-right-icon="focusClick"
            placeholder="点击检索客户名称"
            right-icon="arrow"
          />
        </el-card>
        <el-card class="box-card item1">
          <el-row class="tanle line">
            <div class="product_box" v-for="(item,index) in tableData" :key="index">
              <van-swipe-cell>
                <div class="wrap_item">
                  <div class="wrap_left">
                    <img
                      v-if="item.product_img && item.product_img != 0 "
                      class="img"
                      :src="item.product_img | getUrl"
                    />
                    <img
                      v-else-if="item.img_url_lin && item.img_url_lin != 0 "
                      class="img"
                      :src="item.img_url_lin  | getUrl"
                    />
                    <img src="@/assets/image/Default.png" class="img" v-else />
                    <div class="text">
                      <div class="title">
                        <p>{{item.goods}}</p>
                      </div>
                      <p class="model">{{item.model}}</p>
                      <div class="wrap_right">
                        <span
                          class="wrap_right_text"
                        >({{item.price}}×{{item.weight}}+{{item.process_cost}})×{{item.nums}}</span>
                        <span class="funds_box">
                          <span>￥</span>
                          <span class="funds">{{item.totalPrice}}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <template #right>
                  <van-button class="delect" type="danger" @click="tableClick(index)" text="删除" />
                </template>
              </van-swipe-cell>
            </div>
          </el-row>

          <el-row class="AddProduct line">
            <div @click="addNewProduct" class="coutent">
              <i class="iconfont icon-copy"></i>
              <em>添加产品</em>
            </div>
          </el-row>
        </el-card>

        <el-card class="box-card item1">
          <el-row class="DeliveryDate">
            <span class="lable">日期</span>
            <span class="time" @click="tiemrClick">{{DeliveryDate}}</span>
          </el-row>
          <!-- <van-uploader
            style="padding: .714286rem 1.142857rem;"
            v-model="fileList"
            multiple
            @delete="filedelete"
            :after-read="afterRead"
          />-->
          <van-field
            v-model="DeliveryNotes"
            autosize
            type="textarea"
            label="采购备注"
            placeholder="(选填)简要描述产品说明"
            class="newStyle"
          />
        </el-card>
      </div>
    </scroll>

    <myBtns :commitFun="SubmitNow" :cancelFun="blacknext">
      <span slot="cancel-btn">取消</span>
      <span slot="commit-btn">
        <span>立即提交</span>
      </span>
    </myBtns>

    <van-overlay :show="isShow" @click="closeOverlay">
      <div class="wrapper-qrCode">
        <myVqr :Content="textContent"></myVqr>
      </div>
    </van-overlay>

    <van-datetime-picker
      class="datetime"
      v-if="isDatetime"
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirms"
      @cancel="cancel"
    />
  </div>
</template>
    
<script>
import { regionData, CodeToText } from 'element-china-area-data'

import {
  getAddDeliverGoodsDistributors,
  addAutonomousDeliverRecord,
  getMateriel,
  editAutonomousDeliverRecord,
  getEditWarehouseEnter,
  editWarehouseOut,
} from '@/network/deal'
import { uploadImg } from '@/network/materials'
import myVqr from '@/components/common/my_vqr/myVqr'

import { setTimerType } from '@/common/filter'
import { TotalPriceCalc } from '@/common/utils'
import { bestURL, crosURl } from '@/network/baseURL'
import myBtns from '@/components/common/my_btns/my_btns'

export default {
  data() {
    return {
      isDatetime: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      Shipment: 0,
      Amounts: 0,
      number: '',
      fileList: [],
      img_url_Arr: [],
      DeliveryDate: setTimerType(new Date().getTime()),
      distributors: [],
      materiel: [],
      restaurants: [],
      restaurant: [],
      state: '',
      states: '',
      timeout: null,
      radio: '0',
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
      isShow: false,
      textContent: '',
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
  components: {
    myVqr,
    myBtns,
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
      // this.getAddDeliverGood()
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
  },
  computed: {
    getAddDeliverData() {
      return {
        token: this.$store.state.token,
        id: this.iid,
        _: new Date().getTime(),
      }
    },
    addAutonomousData() {
      console.log(this.isFlowingShow)
      console.log('this.FlowingProducts', this.FlowingProducts)
      return {
        apply_time: this.DeliveryDate,
        id: this.iid,
        supplier_id: this.distributor_id,
        materiel_warehouse_enter_data: this.shippingData,
        token: this.$store.state.token,
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
    cancel() {
      this.isDatetime = false
    },
    confirms(value) {
      this.DeliveryDate = setTimerType(value)
      this.isDatetime = false
    },
    tiemrClick() {
      this.isDatetime = true
    },
    filedelete(file, detail) {
      this.img_url_Arr.splice(detail.index, 1)
    },
    async afterRead(file) {
      console.log(file)
      lrz(file.content, {
        quality: 0.6,
        fieldName: 'user_file',
      }).then(async (rst) => {
        const { data } = await uploadImg({
          user_image: rst.base64,
          token: this.$store.state.token,
        })
        console.log(data.url)
        this.img_url_Arr.push(data.url)
      })
    },
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
      const { data, code, msg } = await getEditWarehouseEnter(
        this.getEditDeliveData
      )
      if (code !== 200) {
        this.$message.error(msg)
        this.$router.replace('/deal/contract')
      } else {
        console.log('getEditWarehouseEnter', data)
        this.flowDelivery = data.warehouseAccess
        const {
          name,
          warehouseAccessDetail,
          total_funds,
          total_money,
          apply_time,
          supplier_id,
          remark,
        } = this.flowDelivery
        this.distributor_id = supplier_id
        this.state = name
        warehouseAccessDetail.forEach((item, index) => {
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
            goods: item.materiel_name,
            model: item.materiel_model,
            nums: item.number,
            price: item.unit_price,
            totalPrice: unit_price,
            weight: item.weight,
            process_cost: item.process_cost,
            product_img: '',
            img_url_lin: item.img_url_lin,
          })
          let newArr = []
          newArr.push(item.materiel_id)
          newArr.push(item.materiel_name)
          newArr.push(item.materiel_model)
          newArr.push(item.number)
          newArr.push(item.unit_price)
          newArr.push(item.remark)
          newArr.push(item.weight)
          newArr.push(0) // 零时库
          newArr.push(item.process_cost) //加工费
          newArr.push(item.img_url_lin) // 一张图片URL
          newArr.push(item.extra)
          this.shippingData.push(newArr)
        })
        this.Shipment = total_funds
        this.Amounts = total_money
        this.DeliveryDate = apply_time
        this.DeliveryNotes = remark
        this.distributors = data.suppliers
        this.materiel = data.materiel
        if (data.customerProductExtraField.length > 0) {
          this.isFlowingShow = data.customerProductExtraField
        }
        // data.flowDeliveryImg.forEach((item) => {
        //   let url = item.img_url
        //   if (item.img_url.indexOf(bestURL) == -1) {
        //     url = bestURL + item.img_url
        //   }
        //   let obj = {
        //     url,
        //   }
        //   this.fileList.push(obj)
        //   this.img_url_Arr.push(url)
        //   console.log(this.img_url_Arr)
        // })
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
        if (typeof item == 'string') {
          this.state = item
        } else {
          this.state = item.name
          this.distributor_id = item.id
        }
      })
    },
    async getAddDeliverGood() {
      const { data } = await getEditWarehouseEnter(this.getAddDeliverData)
      console.log('getEditWarehouseEnter', data)
      if (data.customerProductExtraField.length > 0) {
        this.isFlowingShow = data.customerProductExtraField
      }
      if (data?.customerProductField?.weight == 1) {
        this.isWeightShow = true
      }
      this.distributors = data.distributors
      this.materiel = data.materiel
    },
    blacknext() {
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
      this.img_url_Arr = []
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
      let iid = data.id
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
          .finally(() => {
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
            newArr.push(iid)
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
          })
      } else {
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
        newArr.push(iid)
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
      }
    },
    closeOverlay() {
      this.isShow = false
      this.blacknext()
    },
    async SubmitNow() {
      const { code, msg, data } = await editWarehouseOut(this.addAutonomousData)
      console.log('editWarehouseOut', data)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.isShow = true
        this.textContent = `http://219.83.161.11:8030/view/html/run/print.php?id=${data.flowId}&orderType=flow`
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
      margin-left: -1.071429rem;
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
      .DeliveryDate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .lable {
          width: 6.2em;
          padding: 0 0.714286rem;
          text-align: justify;
          text-align-last: justify;
          color: black;
          border-right: 1px solid #e7e7e7;
        }
        .time {
          flex: 1;
          text-align: right;
          padding: 0 1rem;
        }
      }
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
        flex-direction: column;
        border-bottom: 1px solid #f8f7f5;
        padding: 0.714286rem 1.142857rem;
        .delect {
          height: 100%;
          line-height: 6.571429rem;
        }
        .product_box {
          .wrap_item {
            padding: 0.357143rem;

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
                  align-items: flex-end;
                  color: #ccc;
                  .wrap_right_text {
                    font-size: 0.857143rem;
                  }
                  .funds_box {
                    font-size: 1.142857rem;
                    color: black;
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
          width: 6.357143rem;
          text-align: left;
        }
        div {
          display: block;
          font-size: 1.142857rem;
          text-align: left;
          flex: 1;
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
  .datetime {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
