<template>
  <div id="createContract">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>编辑合同</span>
      </div>
      <div class="right" slot="right">
        <van-icon name="plus" style="margin-left: 0.714286rem;" @click="addNewCustomers" />
      </div>
    </navbar>
    <scroll class="scroll-wrapper">
      <div class="body">
        <el-card class="box-card item1">
          <el-row class="customerName line">
            <em>客户名称</em>
            <div>
              <el-autocomplete
                v-model="state"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </div>
          </el-row>
          <el-row class="PartyContract line">
            <em>对方合同号</em>
            <div>
              <el-input v-model="PartyContract" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
          <timers class="Sign" type="Sign" title="签约日期" :valueData="timersList.Sign" />
          <timers
            class="committed"
            type="committed"
            title="承诺交期"
            :valueData="timersList.committed"
          />
          <el-row class="CompanyContact line">
            <em>公司联系人</em>
            <div>
              <el-input v-model="CompanyContact" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
          <el-row class="CompanyNumber line">
            <em>联系人电话</em>
            <div>
              <el-input v-model="CompanyNumber" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
          <el-row class="CustomerContact line">
            <em>客户联系人</em>
            <div>
              <el-input v-model="CustomerContact" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
          <el-row class="CustomerNumber line">
            <em>联系人电话</em>
            <div>
              <el-input v-model="CustomerNumber" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
        </el-card>
        <el-card class="box-card item1">
          <!--  -->
          <el-row class="tanle line">
            <el-table :data="tableData" style="width: 100%; font-size: .714286rem;">
              <el-table-column prop="goods" label="品名"></el-table-column>
              <el-table-column prop="model" label="型号"></el-table-column>
              <el-table-column prop="nums" label="数量"></el-table-column>
              <el-table-column prop="price" label="单价"></el-table-column>
              <el-table-column prop="totalPrice" label="总价"></el-table-column>
            </el-table>
          </el-row>
          <el-row class="AddProduct line">
            <div @click="addNewProduct" class="coutent">
              <i class="el-icon-box"></i>
              <em>添加产品</em>
            </div>
          </el-row>
          <div class="box-card item1" v-show="isShowed">
            <el-row class="SigningDate line">
              <em>选择产品</em>
              <div>
                <el-autocomplete
                  v-model="states"
                  :fetch-suggestions="querySearchAsyncs"
                  placeholder="请输入内容"
                  @select="handleSelects"
                  @change="handchange"
                ></el-autocomplete>
              </div>
            </el-row>
            <van-field v-model="Products" label="产品规格" />
            <van-field v-model="productPrice" type="number" label="产品价格" />
            <van-field v-model="productWeight" v-if="isWeightShow" type="number" label="产品重量" />
            <van-field
              v-model="FlowingProducts[index+1]"
              v-for="(item,index) in isFlowingShow"
              :key="index"
              :data-id="index+1"
              label="合同产品"
            />
            <van-field v-model="quantity" type="number" label="产品数量" />
            <van-field v-model="ProductNotes" label="产品备注" />
            <div class="btns">
              <van-button @click="cancelClick" color="linear-gradient(to right, #ccc, #666)">取消</van-button>
              <van-button @click="AddClick" color="linear-gradient(to right, #4bb0ff, #6149f6)">添加</van-button>
            </div>
          </div>
          <el-row class="contractAmount line">
            <em>合同金额</em>
            <div>
              <el-input v-model="contractAmount" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
          <el-row class="DiscountedAmount line">
            <em>折后金额</em>
            <div>
              <el-input v-model="DiscountedAmount" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
          <!-- ------------------- -->
        </el-card>
        <el-card class="box-card item1">
          <el-row class="TermsPayment line">
            <em>付款方式</em>
            <div>
              <el-input v-model="TermsPaymentInput" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
          <el-row
            class="ContractField1 line"
            v-for="(item,index) in ContractField1Input"
            :key="index"
          >
            <em>{{item.field_name}}</em>
            <div>
              <el-input v-model="item.field_content" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
          <el-row class="TransportationAssume line">
            <em>运输承担</em>
            <div>
              <el-input v-model="TransportationAssume" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
          <el-row class="WarrantyTime line">
            <em>质保时间</em>
            <div>
              <el-input v-model="WarrantyTime" placeholder="请输入内容"></el-input>
            </div>
          </el-row>

          <el-row class="OtherInstructions line">
            <em>其他说明</em>
            <div>
              <el-input v-model="OtherInstructions" placeholder="请输入内容"></el-input>
            </div>
          </el-row>
          <el-row class="contractAttachment line">
            <em>合同附件</em>
            <van-uploader :after-read="afterRead" v-model="fileList" multiple>
              <van-button icon="photo" type="primary">上传文件</van-button>
            </van-uploader>
          </el-row>
        </el-card>

        <el-card class="box-card item1">
          <div class="address" @click="addressClick">
            <div class="lefticon">
              <van-icon name="location" />
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
              <van-icon name="arrow" />
            </div>
          </div>
        </el-card>
      </div>
    </scroll>
    <div class="footer">
      <el-button type="primary" plain @click="quoteclick">取消</el-button>
      <el-button type="primary" @click="formalClick" plain>保存</el-button>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import { regionData, CodeToText } from 'element-china-area-data'
import scroll from '@/components/common/scroll/scroll'
import { setTimerType } from '@/common/utils.ts'
import {
  getAddContractOrder,
  uploadFile,
  getReceivingInformationList,
  getContractOrder,
  addContractOrder,
  editContractOrder,
  getMaterielList
} from '@/network/deal'
import timers from '@/components/content/timers/timers'

export default {
  name: 'createContract',
  data() {
    return {
      MaterielList: [],
      selectedID: '',
      restaurants: [],
      state: '',
      timeout: null,
      TermsPaymentInput: '',
      ContractField1Input: [],
      ContractField2Input: '',
      TransportationAssume: '',
      WarrantyTime: '',
      PartyContract: '',
      OtherInstructions: '',
      CompanyContact: '',
      CompanyNumber: '',
      CustomerContact: '',
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
        salesman: ''
      },
      Address: {
        DetailedAddress: '',
        contact: '',
        phone: '',
        weight: '',
        number: '',
        ProductTesting1: '',
        ProductTesting2: '',
        note: ''
      },
      product: {
        name: '',
        specifications: '',
        price: ''
      },
      formLabelWidth: '80px',
      options: regionData,
      address: [],
      tableData: [],
      addressData: {
        id: '0',
        name: '',
        tel: '',
        address: ''
      },
      timersList: {
        Sign: '',
        committed: ''
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
      paramsData: {},
      iid: ''
    }
  },
  components: { navbar, scroll, timers },
  created() {
    this.getAddContract()
  },
  activated() {
    
    document.querySelectorAll('input').forEach(item => {
      item.style.border = 'none'
    })
    this.paramsData = this.$route.query.data
    console.log('paramsData', this.paramsData)
    const {
      id,
      distributor_id,
      distributor_name,
      other_order_number,
      contract_date,
      commitment_period,
      self_lxr,
      self_lxr_tel,
      kehu_lxr,
      kehu_lxr_tel,
      contract_amount,
      amount_of_discount,
      pay_method_content,
      receiving,
      contractOrderExtra,
      receivingList
    } = this.paramsData.contractOrder
    this.iid = id
    this.selectedID = distributor_id
    this.state = distributor_name
    this.PartyContract = other_order_number
    this.timersList.Sign = contract_date
    this.timersList.committed = commitment_period
    this.CompanyContact = self_lxr
    this.CompanyNumber = self_lxr_tel
    this.CustomerContact = kehu_lxr
    this.CustomerNumber = kehu_lxr_tel
    this.paramsData.contractOrder.contractOrderProduct.map((item, index) => {
      let obj = {
        goods: item.product_name,
        model: item.product_model,
        nums: item.surplus_number,
        price: item.unit_price,
        totalPrice: item.total_price
      }
      let Arr = []
      Arr.push(item.product_name)
      Arr.push(item.product_model)
      Arr.push(item.surplus_number)
      Arr.push(item.unit_price)
      Arr.push(item.remark)
      Arr.push(item.weight)
      Arr.push(item.extra)
      this.shippingData.push(Arr)
      this.tableData.push(obj)
    })
    this.contractAmount = contract_amount
    this.DiscountedAmount = amount_of_discount
    this.TermsPaymentInput = pay_method_content
    this.addressData.name = receiving.consignee
    this.addressData.tel = receiving.consignee_tel
    this.addressData.address = receiving.consignee_address
    this.ContractField1Input = contractOrderExtra
    this.listData = receivingList
  },
  deactivated() {
    this.paramsData = {}
    this.selectedID = ''
    this.state = ''
    this.PartyContract = ''
    this.timersList.Sign = ''
    this.timersList.committed = ''
    this.CompanyContact = ''
    this.CompanyNumber = ''
    this.CustomerContact = ''
    this.CustomerNumber = ''
    this.tableData = []
    this.contractAmount = ''
    this.DiscountedAmount = ''
    this.TermsPaymentInput = ''
    this.addressData.name = ''
    this.addressData.tel = ''
    this.addressData.address = ''
    this.listData = []
    this.shippingData = []
    this.ContractField1Input = []
    this.iid = ''
   
  },
  computed: {
    getAddContractOrderData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime()
      }
    },
    getReceiveDate() {
      return {
        token: this.$store.state.token,
        id: this.selectedID,
        type: 'distributor',
        _: new Date().getTime()
      }
    },
    getContractOrderData() {
      let from = new FormData()
      from.append('token', this.$store.state.token)
      from.append('distributor_id', this.selectedID)
      return from
    },
    addContractOrderData() {
      let NewArr = [null]
      this.ContractField1Input.map((item, index) => {
        NewArr.push(item.field_content)
      })
      return {
        distributor_id: this.selectedID,
        contract_date: this.timersList.Sign,
        commitment_period: this.timersList.committed,
        pay_method: this.TermsPaymentInput,
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
        order_field: NewArr
      }
    },
    addContractOrderDatas() {
      let NewArr = [null]
      this.ContractField1Input.map((item, index) => {
        NewArr.push(item.field_content)
      })
      return {
        distributor_id: this.selectedID,
        contract_date: this.timersList.Sign,
        commitment_period: this.timersList.committed,
        pay_method: this.TermsPaymentInput,
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
        id: this.iid,
        other_order_number: this.PartyContract,
        self_lxr: this.CompanyContact,
        self_lxr_id: 0,
        self_lxr_tel: this.CompanyNumber,
        kehu_lxr_id: 0,
        kehu_lxr: this.CustomerContact,
        kehu_lxr_tel: this.CustomerNumber,
        fujian: this.imgUrl,
        order_field: NewArr
      }
    },
    getMaterielListData() {
      return {
        company_id: 1,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    AddClick() {
      let adderssnum = this.productPrice * this.quantity
      let addproductdata = {
        goods: this.states,
        model: this.Products,
        nums: this.quantity,
        price: this.productPrice,
        totalPrice: adderssnum
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
      this.cancelClick()
    },
    handchange(value) {
      console.log('shippingValue', value)
      this.shippingValue = value
    },
    // this.restaurant 请求初始化产品数据 点击公司后请求
    async getMateriel() {
      const { data } = await getMaterielList(this.getMaterielListData)
      this.MaterielList = data
      this.MaterielList.map((item, index) => {
        let obj = {
          value: item.name,
          address: index
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
    cancelClick() {
      this.states = ''
      this.Products = ''
      this.productPrice = ''
      this.productWeight = ''
      this.FlowingProducts = []
      this.quantity = ''
      this.ProductSubtotal = ''
      this.ProductNotes = ''
      this.isShowed = false
    },
    async quoteclick() {
      this.state = ''
      this.PartyContract = ''
      this.CompanyNumber = ''
      this.CustomerContact = ''
      this.CustomerNumber = ''
      this.tableData = []
      this.contractAmount = 0
      this.DiscountedAmount = 0
      this.TermsPaymentInput = ''
      this.TransportationAssume = ''
      this.WarrantyTime = ''
      this.OtherInstructions = ''
      this.fileList = []
      this.addressData = {}
      this.$router.replace('/deal/sales')
    },
    async formalClick() {
      const { code } = await editContractOrder(this.addContractOrderDatas)
      if (code == 200) {
        this.state = ''
        this.PartyContract = ''
        this.CompanyNumber = ''
        this.CustomerContact = ''
        this.CustomerNumber = ''
        this.tableData = []
        this.contractAmount = 0
        this.DiscountedAmount = 0
        this.TermsPaymentInput = ''
        this.TransportationAssume = ''
        this.WarrantyTime = ''
        this.OtherInstructions = ''
        this.fileList = []
        this.addressData = {}
        this.$router.replace('/deal/sales')
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
      this.$router.push({
        name: 'addressList',
        params: {
          data: this.listData
        }
      })
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
      this.$router.go(-1)
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
      return state => {
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
      this.CompanyContact = data.contractOrder.self_lxr
      this.CompanyNumber = data.contractOrder.self_lxr_tel
      this.CustomerContact = data.contractOrder.kehu_lxr
      this.CustomerNumber = data.contractOrder.kehu_lxr_tel
      this.PartyContract = data.contractOrder.order_number
      this.ContractField1Input = data.contractOrderExtra
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
          address: this.form.DetailedAddress
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
          totalPrice: this.product.price * this.product.number
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
      this.isShowed = true
    },
    async getAddContract() {
      const { data } = await getAddContractOrder(this.getAddContractOrderData)
      console.log('getAddContractOrder', data)
      data.distributors.map((item, index) => {
        this.restaurants.push({
          value: item.name,
          address: item.id
        })
      })
      if (data.customerProductField.weight == '1') {
        this.isWeightShow = true
      } else {
        this.isWeightShow = false
      }
      this.isFlowingShow = data.customerProductExtraField
    }
  }
}
</script>
    
<style lang="scss" scoped>
#createContract {
  padding-top: 5.428571rem;
  padding-bottom: 3.785714rem;
  min-height: 100vh;

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
      margin-left: 0.928571rem;
      font-size: 1.285714rem;
      color: #030303;
    }
    .right {
      margin-right: 1.071429rem;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 3.785714rem;
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
      .btns {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        .van-button {
          margin-right: 0.714286rem;
        }
      }
      &:first-child {
        margin-top: 0.714286rem;
      }

      .address {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.642857rem 1.142857rem;
        .lefticon {
          width: 1.714286rem;
          height: 1.714286rem;
          border-radius: 50%;
          background-color: #ff4400;
          display: flex;
          justify-content: center;
          align-items: center;
          .van-icon {
            color: #fff;
            font-size: 0.857143rem;
          }
        }
        .cententbox {
          text-align: left;
          margin: 0 0.714286rem;
          flex: 1;
          .nametell {
            span {
              font-size: 0.857143rem;
              color: #333333;
            }
            em {
              font-size: 0.571429rem;
              color: #999;
              margin-left: 0.357143rem;
            }
          }
          .NEWSaddress {
            margin: 0.607143rem 0;
            span {
              font-size: 0.642857rem;
              color: #333333;
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
          .van-icon {
            color: #ccc;
          }
        }
      }
      .line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f8f7f5;
        padding: 0.428571rem 1.428571rem;
        em {
          display: block;
          font-size: 1rem;
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
          em {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
