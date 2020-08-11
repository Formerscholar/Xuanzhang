<template>
  <div id="createContract">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>新增合同</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper" ref="scroll">
      <div class="body">
        <el-card class="box-card item1">
          <van-field
            v-model="state"
            label="客户名称"
            @focus="focusClick"
            class="newStyle"
            @click-right-icon="focusClick"
            placeholder="点击检索客户名称"
            right-icon="arrow"
          />
          <van-field v-model="PartyContract" label="对方合同" placeholder="请输入内容" class="newStyle" />
          <el-row class="DeliveryDate van-cell">
            <span class="lable">签约日期</span>
            <span class="time" @click="tiemrClick">{{Sign}}</span>
          </el-row>
          <el-row class="DeliveryDate van-cell">
            <span class="lable">承诺交期</span>
            <span class="time" @click="tiemrClicks">{{committed}}</span>
          </el-row>
          <van-field v-model="CompanyContact" label="公司联系" placeholder="请输入内容" class="newStyle" />
          <van-field
            v-model="CompanyNumber"
            type="digit"
            label="联系号码"
            placeholder="请输入内容"
            class="newStyle"
          />
          <van-field v-model="CustomerContact" label="客户联系" placeholder="请输入内容" class="newStyle" />
          <van-field
            v-model="CustomerNumber"
            type="digit"
            label="联系号码"
            placeholder="请输入内容"
            class="newStyle"
          />
        </el-card>

        <el-card class="box-card item1">
          <el-row class="tanle line" style="border-bottom: .714286rem solid #f2f2f2;">
            <div class="product_box" v-for="(item,index) in tableData" :key="index">
              <van-swipe-cell>
                <div class="wrap_item">
                  <div class="wrap_left">
                    <img
                      v-if="item.product_img && item.product_img != 0 "
                      class="img"
                      :src="item.product_img | getUrl"
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
          <van-field v-model="contractAmount" class="newStyle" type="number" label="合同金额" />
          <van-field v-model="DiscountedAmount" class="newStyle" type="number" label="折后金额" />
          <van-field v-model="TermsPaymentInput" class="newStyle" type="number" label="付款方式" />

          <el-row
            class="ContractField1 line"
            v-for="(item,index) in ContractField1Input"
            :key="index"
          >
            <em>{{item.field_name}}</em>
            <div>
              <van-field v-model="item.field_content" class="newStyle" />
            </div>
          </el-row>
          <van-field v-model="TransportationAssume" class="newStyle" type="number" label="运输承担" />
          <van-field v-model="WarrantyTime" class="newStyle" type="number" label="质保时间" />
          <van-field
            v-model="OtherInstructions"
            autosize
            type="textarea"
            label="其他说明"
            placeholder="(选填)简要描述其他说明"
            class="newStyle"
          />
        </el-card>
        <el-card class="box-card item1">
          <el-row class="contractAttachment line">
            <van-uploader :after-read="afterRead" v-model="fileList" multiple>
              <van-button icon="photo" type="primary">上传附件</van-button>
            </van-uploader>
          </el-row>
        </el-card>
        <el-card class="box-card item1" v-if="addressData.name ">
          <div class="address" @click.stop="addressClick">
            <div class="lefticon">
              <span>收</span>
            </div>
            <div class="cententbox">
              <div class="nametell">
                <span>{{addressData.name}}</span>
                <em>{{addressData.tel}}</em>
              </div>
              <div class="NEWSaddress">
                <span>{{addressData.address}}</span>
              </div>
            </div>
            <div class="righticon">
              <span>地址簿</span>
            </div>
          </div>
        </el-card>
      </div>
    </scroll>

    <myBtns :commitFun="formalClick" :cancelFun="quoteclick">
      <span slot="cancel-btn">报价合同</span>
      <span slot="commit-btn">
        ￥{{DiscountedAmount}}
        <span>正式合同</span>
      </span>
    </myBtns>

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
    <van-datetime-picker
      class="datetime"
      v-if="isDatetimes"
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirmss"
      @cancel="cancel"
    />
    <!-- <van-overlay :show="overlayshow">
      <div class="overlaywrapper">
        <div class="overlayblock" id="block">
          <div class="title">
            <span></span>
            <span class="title_text">选择地址</span>
            <van-icon name="cross" @click.stop="overlayshow = false" />
          </div>
          <div
            class="items"
            v-for="item in listData"
            :key="item.id"
            @click="addressItemClick(item)"
          >
            <div class="info">
              <div class="adderss_top">
                <span>{{item.consignee_address}}</span>
              </div>
              <div class="infos_bto">
                <span class="name">{{item.consignee}}</span>
                <span class="phone">{{item.consignee_tel}}</span>
              </div>
            </div>
            <van-icon name="edit" class="edit" @click.stop="editAddress(item.id)" />
          </div>

          <div class="btn" @click.stop="newAddress">
            <van-icon name="add-o" class="add" />
            <span>新增收货地址</span>
          </div>
        </div>
      </div>
    </van-overlay>-->
  </div>
</template>
    
<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { setTimerType } from '@/common/filter'
import myBtns from '@/components/common/my_btns/my_btns'

import {
  getAddContractOrder,
  uploadFile,
  getReceivingInformationList,
  getContractOrder,
  addContractOrder,
  getMaterielList,
} from '@/network/deal'

export default {
  name: 'createContract',
  data() {
    return {
      isDatetime: false,
      isDatetimes: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      MaterielList: [],
      selectedID: '',
      restaurants: [],
      overlayshow: false,
      contractOrder: {},
      state: '',
      timeout: null,
      TermsPaymentInput: '',
      ContractField1Input: [],
      Sign: setTimerType(new Date().getTime()),
      committed: setTimerType(new Date().getTime()),
      ContractField2Input: '',
      TransportationAssume: '',
      WarrantyTime: '',
      PartyContract: '',
      OtherInstructions: '',
      CompanyContact: '',
      CompanyNumber: '',
      CustomerContact: '',
      distributors: '',
      CustomerNumber: '',
      contractAmount: 0,
      DiscountedAmount: 0,
      radio: '0',
      fileList: [],
      table: false,
      dialog: false,
      Addresslog: false,
      productlog: false,
      loading: false,
      form: {
        companyName: '',
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
      addressData: {
        id: '0',
        name: '',
        tel: '',
        address: '',
      },
      timersList: {
        Sign: new Date().getTime(),
        committed: new Date().getTime(),
      },
      imgUrl: '',
      listData: [],
      isShowed: false,
      states: '',
      restaurant: [],
      shippingValue: '',
      Products: '',
      productPrice: '',
      productWeight: '',
      FlowingProducts: [null],
      isFlowingShow: [],
      isWeightShow: false,
      quantity: '',
      ProductNotes: '',
      shippingData: [],
    }
  },
  components: {
    myBtns,
  },
  activated() {
    this.getAddContract()
  },
  computed: {
    getAddContractOrderData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
    getReceiveDate() {
      return {
        token: this.$store.state.token,
        id: this.selectedID,
        type: 'distributor',
        _: new Date().getTime(),
      }
    },
    getContractOrderData() {
      let from = new FormData()
      from.append('token', this.$store.state.token)
      from.append('distributor_id', this.selectedID)
      return from
    },
    addContractOrderData() {
      return {
        distributor_id: this.selectedID,
        contract_date: this.Sign,
        commitment_period: this.committed,
        pay_method: 0,
        pay_method_content: this.TermsPaymentInput,
        template_set: 0,
        receiving_id: this.addressData.id,
        contract_amount: this.contractAmount,
        amount_of_discount: this.DiscountedAmount,
        remark: this.OtherInstructions,
        is_contract: 0,
        contract_order_product: this.shippingData,
        token: this.$store.state.token,
        user_id: 0,
        other_order_number: this.PartyContract,
        self_lxr: this.CompanyContact,
        self_lxr_id: 0,
        self_lxr_tel: this.CompanyNumber,
        kehu_lxr_id: 0,
        kehu_lxr: this.CustomerContact,
        kehu_lxr_tel: this.CustomerNumber,
        fujian: this.imgUrl,
        fujian_name: 'NewArr',
      }
    },
    addContractOrderDatas() {
      return {
        distributor_id: this.selectedID,
        contract_date: this.Sign,
        commitment_period: this.committed,
        pay_method: 0,
        pay_method_content: this.TermsPaymentInput,
        template_set: 0,
        receiving_id: this.addressData.id,
        contract_amount: this.contractAmount,
        amount_of_discount: this.DiscountedAmount,
        remark: this.OtherInstructions,
        is_contract: 1,
        contract_order_product: this.shippingData,
        token: this.$store.state.token,
        user_id: 0,
        other_order_number: this.PartyContract,
        self_lxr: this.CompanyContact,
        self_lxr_id: 0,
        self_lxr_tel: this.CompanyNumber,
        kehu_lxr_id: 0,
        kehu_lxr: this.CustomerContact,
        kehu_lxr_tel: this.CustomerNumber,
        fujian: this.imgUrl,
        fujian_name: 'NewArr',
      }
    },
    getMaterielListData() {
      return {
        company_id: this.$store.state.userInfo[0].user_compser_id,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    editAddress(iid) {
      console.log(iid, this.contractOrder.distributor_id)
    },
    newAddress() {
      this.$router.push(`/addressEdit/${this.contractOrder.distributor_id}`)
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
    cancel() {
      this.isDatetime = false
      this.isDatetimes = false
    },
    confirms(value) {
      this.Sign = setTimerType(value)
      this.isDatetime = false
      this.isDatetimes = false
    },
    confirmss(value) {
      this.committed = setTimerType(value)
      this.isDatetime = false
      this.isDatetimes = false
    },
    tiemrClick() {
      this.isDatetime = true
    },
    tiemrClicks() {
      this.isDatetimes = true
    },
    AddClick() {
      let adderssnum = this.productPrice * this.quantity
      let addproductdata = {
        goods: this.states,
        model: this.Products,
        nums: this.quantity,
        price: this.productPrice,
        totalPrice: adderssnum,
      }
      this.contractAmount += adderssnum
      this.DiscountedAmount += adderssnum
      this.tableData.push(addproductdata)
      let newArr = []
      newArr.push(this.shippingValue)
      newArr.push(this.Products)
      newArr.push(this.quantity)
      newArr.push(this.productPrice)
      newArr.push(this.ProductNotes)
      newArr.push(this.productWeight)
      newArr.push(this.FlowingProducts)
      this.shippingData.push(newArr)
    },
    handchange(value) {
      console.log('shippingValue', value)
      this.shippingValue = value
    },
    async getMateriel() {
      const { data } = await getMaterielList(this.getMaterielListData)
      this.MaterielList = data
      this.MaterielList.map((item, index) => {
        let obj = {
          value: item.name,
          address: index,
        }
        this.restaurant.push(obj)
      })
    },
    querySearchAsyncs(queryString, cb) {
      var restaurants = this.restaurant
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    async quoteclick() {
      const { code, msg } = await addContractOrder(this.addContractOrderData)
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
    async formalClick() {
      const { code, msg } = await addContractOrder(this.addContractOrderDatas)
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
    async afterRead(file) {
      let from = new FormData()
      from.append('user_file', file.file)
      from.append('token', this.$store.state.token)
      const { data } = await uploadFile(from)
      this.imgUrl = data.url
    },
    addressClick() {
      console.log('跳转合同操作页面')
      this.$router.push(`/addressList/${this.selectedID}`)
      this.$bus.$off('waitNoChange')
      this.$bus.$on(
        'waitNoChange',
        ({ consignee, consignee_tel, consignee_address }) => {
          this.addressData = {}
          this.addressData.name = consignee
          this.addressData.tel = consignee_tel
          this.addressData.address = consignee_address
        }
      )
    },
    addressItemClick(item) {
      this.addressData = {}
      this.addressData.name = item.consignee
      this.addressData.tel = item.consignee_tel
      this.addressData.address = item.consignee_address
      this.overlayshow = false
    },
    handleChange() {
      var loc = ''
      for (let i = 0; i < this.form.selectedOptions.length; i++) {
        loc += CodeToText[this.form.selectedOptions[i]]
      }
      console.log(loc)
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-3)
    },
    blacknext() {
      this.isDatetime = false
      this.isDatetimes = false
      this.currentDate = new Date()
      this.MaterielList = []
      this.selectedID = ''
      this.restaurants = []
      this.state = ''
      this.timeout = null
      this.TermsPaymentInput = ''
      this.ContractField1Input = []
      this.Sign = setTimerType(new Date().getTime())
      this.committed = setTimerType(new Date().getTime())
      this.ContractField2Input = ''
      this.TransportationAssume = ''
      this.WarrantyTime = ''
      this.PartyContract = ''
      this.OtherInstructions = ''
      this.CompanyContact = ''
      this.CompanyNumber = ''
      this.CustomerContact = ''
      this.distributors = ''
      this.CustomerNumber = ''
      this.contractAmount = 0
      this.DiscountedAmount = 0
      this.radio = '0'
      this.fileList = []
      this.table = false
      this.dialog = false
      this.Addresslog = false
      this.productlog = false
      this.loading = false
      this.form = {}
      this.Address = {}
      this.product = {}
      this.options = regionData
      this.address = []
      this.tableData = []
      this.addressData = {}
      this.timersList = {}
      this.imgUrl = ''
      this.listData = []
      this.isShowed = false
      this.states = ''
      this.restaurant = []
      this.shippingValue = ''
      this.Products = ''
      this.productPrice = ''
      this.productWeight = ''
      this.FlowingProducts = [null]
      this.isFlowingShow = []
      this.isWeightShow = false
      this.quantity = ''
      this.ProductNotes = ''
      this.shippingData = []
      this.$router.replace('/deal/sales')
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
          this.selectedID = item.id
          this.getReceiving()
          this.getContractOrders()
          this.getMateriel()
        }
      })
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(val) {
      this.selectedID = val.address
      this.getReceiving()
      this.getContractOrders()
      this.getMateriel()
    },
    handleSelects(value) {
      this.shippingValue = value.value
      this.MaterielList.map((item, index) => {
        if (index == value.address * 1) {
          this.Products = item.specification
          this.productPrice = item.out_price
        }
      })
    },
    async getContractOrders() {
      const { data } = await getContractOrder(this.getContractOrderData)
      console.log('getContractOrder', data)
      this.contractOrder = { ...data.contractOrder }
      this.CompanyContact = this.contractOrder.self_lxr
      this.CompanyNumber = this.contractOrder.self_lxr_tel
      this.CustomerContact = this.contractOrder.kehu_lxr
      this.CustomerNumber = this.contractOrder.kehu_lxr_tel
      this.ContractField1Input = this.contractOrderExtra
    },
    async getReceiving() {
      const { data } = await getReceivingInformationList(this.getReceiveDate)
      console.log('getReceivingInformationList', data)
      this.listData = data.receivingInformationList
      this.addressData.name = this.listData[0].consignee
      this.addressData.id = this.listData[0].id
      this.addressData.tel = this.listData[0].consignee_tel
      this.addressData.address = this.listData[0].consignee_address
    },
    handleClose(done) {
      if (this.loading) {
        return
      }
      if (this.form.companyName != '' && this.form.DetailedAddress != '') {
        this.restaurants.push({
          value: this.form.companyName,
          address: this.form.DetailedAddress,
        })
      }
      if (this.Address.DetailedAddress != '') {
        let addinfo = `${this.Address.contact} ${this.Address.phone}`
        this.address.push(addinfo)
        this.radio = this.address.length - 1
      }

      if (
        this.product.name != '' &&
        this.product.specifications != '' &&
        this.product.number != '' &&
        this.product.price != ''
      ) {
        let addproductdata = {
          goods: this.product.name,
          model: this.product.specifications,
          nums: this.product.number,
          price: this.product.price,
          totalPrice: this.product.price * this.product.number,
        }
        this.tableData.push(addproductdata)
      }

      this.loading = true
      this.Addresslog = false
      this.productlog = false
      this.timer = setTimeout(() => {
        done()
        setTimeout(() => {
          this.loading = false
        }, 400)
      }, 2000)
      document.querySelector('#createContract .nav-bar').style.display = 'flex'
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
      this.Addresslog = false
      this.productlog = false
      this.radio = '0'
      clearTimeout(this.timer)
      document.querySelector('#createContract .nav-bar').style.display = 'flex'
    },
    addNewCustomers() {
      this.$router.push('/addNewCustomerslist')
    },
    addNewAddress() {
      document.querySelector('#createContract .nav-bar').style.display = 'none'
      this.Addresslog = true
      this.Address = {}
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
        this.$refs.scroll.finishPullUp()
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
    async getAddContract() {
      const { data } = await getAddContractOrder(this.getAddContractOrderData)
      console.log('getAddContractOrder', data)
      this.distributors = data.distributors
      // this.CompanyContact = data.userInfo[0].name
      if (data.customerProductField.weight == '1') {
        this.isWeightShow = true
      } else {
        this.isWeightShow = false
      }
      this.isFlowingShow = data.customerProductExtraField
    },
  },
}
</script>
    
<style lang="scss" scoped>
#createContract {
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
      color: #030303;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.642857rem;
    width: 100%;
    overflow: hidden;
  }
  .footer {
    height: 3.785714rem;
    z-index: 9999;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .body {
    background-color: #f8f7f5;
    min-height: calc(100vh - 5.428571rem);
    overflow: hidden;

    .item1 {
      margin-bottom: 0.714286rem;
      .DeliveryDate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .lable {
          width: 4.928571rem;
          text-align: justify;
          text-align-last: justify;
          color: black;
          padding-right: 0.714286rem;
          border-right: 1px solid #e7e7e7;
        }
        .time {
          flex: 1;
          text-align: right;
          padding: 0 1rem;
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
      }

      .address {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.714286rem 1rem;
        .lefticon {
          width: 1.714286rem;
          height: 1.714286rem;
          border-radius: 0.357143rem;
          background-color: black;
          font-size: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
        }
        .cententbox {
          text-align: left;
          margin-left: 0.857143rem;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          .nametell {
            font-size: 1.142857rem;
            margin-bottom: 0.714286rem;
            em {
              margin-left: 0.357143rem;
            }
          }
          .NEWSaddress {
            span {
              font-size: 1rem;
              color: #686868;
            }
          }
          .title {
            span {
              font-size: 0.642857rem;
              color: #d85c26;
            }
          }
        }
        .righticon {
          font-size: 1rem;
          color: #717171;
          padding: 0.571429rem 0;
          padding-left: 0.857143rem;
          border-left: 1px solid #f5f5f5;
          margin-left: 0.357143rem;
        }
      }
      // .line {
      //   display: flex;
      //   justify-content: space-between;
      //   align-items: center;
      //   border-bottom: 1px solid #f8f7f5;
      //   padding: 0.428571rem 1.428571rem;
      //   em {
      //     display: block;
      //     font-size: 1rem;
      //     color: #585858;
      //     width: 6.357143rem;
      //     text-align: left;
      //   }
      //   div {
      //     display: block;
      //     font-size: 1.142857rem;
      //     text-align: left;
      //     flex: 1;
      //   }
      // }
      .AddProduct {
        display: flex;
        justify-content: center;
        align-items: center;
        .coutent {
          display: flex;
          justify-content: center;
          align-items: center;
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
  .overlaywrapper {
    height: 100%;
    .overlayblock {
      width: 100%;
      border-top-left-radius: 1.785714rem;
      border-top-right-radius: 1.785714rem;
      background-color: #fff;
      padding-bottom: 1rem;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;

      .title {
        height: 4rem;
        font-size: 1.285714rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        margin-bottom: 0.714286rem;
        .title_text {
          margin-left: 2.857143rem;
          color: #0d0d0d;
        }
      }
      .items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.071429rem;
        white-space: nowrap;
        margin-top: 0.714286rem;
        border-bottom: 1px solid #f8f7f5;
        padding-bottom: 0.714286rem;
        .info {
          overflow: hidden;
          margin-right: 0.714286rem;
          .adderss_top {
            span {
              font-size: 1.285714rem;
            }
          }
          .infos_bto {
            font-size: 1.142857rem;
            .name {
              margin-right: 1.071429rem;
            }
            .phone {
            }
          }
        }
        .edit {
          font-size: 1.428571rem;
        }
      }
      .btn {
        margin: 0 0.714286rem;
        margin-top: 4.642857rem;
        font-size: 1.428571rem;
        display: flex;
        height: 2.785714rem;
        justify-content: center;
        align-items: center;
        border-radius: 0.357143rem;
        background-color: #f5f5f5;
        .add {
          margin-right: 1rem;
          color: #fcc248;
        }
        span {
          color: #0d0d0d;
        }
      }
    }
  }
}
</style>
