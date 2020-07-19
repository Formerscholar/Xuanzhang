<template>
  <div id="clientedit">
    <!-- header -->
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="callbackbtn">
        <i class="el-icon-back"></i>
      </div>
      <div class="center" slot="center">
        <span>{{titleText}}</span>
      </div>
      <div slot="right" class="right" @click="comitBlack">
        <span>保存</span>
      </div>
    </navbar>
    <!-- body -->
    <scroll class="scroll-wrapper">
      <div>
        <!-- firm -->
        <el-card class="firm_box-card jl_box">
          <van-field v-model="companyName" label="姓名" />
          <van-field v-model="Abbreviation" label="身份证号" />
          <el-row class="country content d-flex van-cell">
            国家
            <el-cascader
              class="item2"
              size="large"
              :options="options"
              v-model="countryOptions"
              @change="handleChange"
              style="margin-left:5px;"
            ></el-cascader>
          </el-row>
          <van-field v-model="Address" label="详细地址" />
          <el-row class="marketer content van-cell">
            <div>
              销售负责人
              <div>
                <van-tag
                  v-for=" (item,index) in tagsName"
                  :key="index"
                  v-show="tagsName"
                  size="medium"
                  type="primary"
                  style="margin-right:.714286rem;"
                  @close="closes(index)"
                >{{item}}</van-tag>
              </div>
              <div>
                <van-tag
                  v-for="(tag,index) in tags "
                  v-show="tags"
                  :key="index"
                  style="margin-right:.714286rem;"
                  size="medium"
                  type="primary"
                  @click="close(index)"
                >{{tag.name}}</van-tag>
              </div>
            </div>
            <div class="d-flex" style="justify-content: space-between;align-items: flex-end;">
              <el-autocomplete
                v-model="SalesHeader"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
              <van-button type="primary" @click="addSalesHeader">添加</van-button>
            </div>
          </el-row>
        </el-card>
        <el-card class="phone_card jl_box">
          <van-button class="addContact" type="info" @click="addContactClick">添加联系方式</van-button>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="name" label="联系人" width="60"></el-table-column>
            <el-table-column prop="jobe" label="职务" width="60"></el-table-column>
            <el-table-column prop="phone" label="电话" width="100"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="170"></el-table-column>
          </el-table>
        </el-card>
        <el-card class="phone_card jl_box" v-show="ContactIsShow">
          <van-form @submit="closeDrawer">
            <van-field id="A1" v-model="form.name" label="联系人" />
            <van-field v-model="form.jobe" label="职务" />
            <van-field
              v-model="form.phone"
              :rules="[{ required: true, pattern:/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/, message: '请填写正确电话' }]"
              type="tel"
              label="电话"
            />
            <van-field
              v-model="form.email"
              :rules="[{ required: true,pattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, message: '请填写正确邮箱' }]"
              label="邮箱"
            />
            <div class="demo-drawer__footer">
              <el-button @click="cancelForm">取 消</el-button>
              <van-button type="primary" native-type="submit">'确 定</van-button>
            </div>
          </van-form>
        </el-card>
      </div>
    </scroll>
  </div>
</template>
    
<script>
import { regionData, CodeToText } from 'element-china-area-data'

import {
  getDistributorUser,
  addDistributor,
  editDistributor,
  addSupplier,
  getEditSupplier,
  editSupplier,
  getEditDistributor,
  getAddContractOrder
} from '@/network/client'
import { getAddOutsourcingOrder } from '@/network/deal'

export default {
  name: 'clientedit',

  data() {
    return {
      tagsName: [],
      titleText: '个人客户',
      companyName: '',
      Abbreviation: '',
      countryOptions: '',
      tariff: '',
      Address: '',
      SalesHeader: '',
      ContactIsShow: false,
      gokhlist: [],
      enterprise: '',
      cutting: '',
      options: regionData,
      selectedOptions: [],
      SalesOptions: [],
      contacts: [],
      id_number: '',
      tax: 0,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      drawer: false,
      tableData: [],
      form: {
        name: '',
        jobe: '',
        phone: '',
        email: ''
      },
      formLabelWidth: '80px',
      timer: null,
      table: false,
      loading: false,
      Billing: {
        name: '',
        taxnum: 0,
        address: '',
        phone: '',
        Bank: '',
        account: '',
        legal: ''
      },
      tags: [],
      restaurants: [],
      tasIDs: [],
      timeout: null,
      title: '',
      typeIndex: false,
      iid: 0,
      isQuire: false
    }
  },
  computed: {
    addDistributorDatas() {
      return {
        id: this.iid,
        name: this.companyName,
        status: 2,
        id_number: this.Abbreviation,
        name_alias: '',
        country_id: '1', //国编号
        province_id: '33', //省编号
        city_id: '947', //市编号
        county_id: '', //区编号
        region: this.Address,
        consignee: '',
        consignee_tel: '',
        consignee_address: '',
        invoice_name: '',
        invoice_tax_number: '',
        invoice_tax_rate: '',
        invoice_tel: '',
        invoice_address: '',
        invoice_opening_bank: '',
        invoice_account: '',
        invoice_legal_person: '',
        big_tax_rate: '',
        big_type: '',
        big_content: '',
        contacts: this.contacts,
        salesperson_ids: this.tasIDs,
        contacts_address: this.Address
      }
    },
    addDistributorData() {
      let NewArr = []
      this.tags.map(item => {
        NewArr.push(item.id)
      })

      return {
        name: this.companyName,
        status: 2,
        id_number: this.Abbreviation,
        name_alias: '',
        country_id: '1', //国编号
        province_id: '33', //省编号
        city_id: '947', //市编号
        county_id: '', //区编号
        region: this.Address,
        consignee: '',
        consignee_tel: '',
        consignee_address: '',
        invoice_name: '',
        invoice_tax_number: '',
        invoice_tax_rate: '',
        invoice_tel: '',
        invoice_address: '',
        invoice_opening_bank: '',
        invoice_account: '',
        invoice_legal_person: '',
        big_tax_rate: '',
        big_type: '',
        big_content: '',
        contacts: this.contacts,
        salesperson_ids: NewArr,
        contacts_address: this.Address
      }
    },
    getEditDistrData() {
      return {
        id: this.iid,
        token: this.$store.state.token,
        _: new Date().getTime()
      }
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
    closes(i) {
      this.tagsName.splice(this.tagsName.indexOf(i), 1)
    },
    close(i) {
      this.tags.splice(this.tags.indexOf(i), 1)
      this.tasIDs.splice(this.tagsName.indexOf(i), 1)
    },
    loadAll() {
      return this.SalesOptions
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
    handleSelect(item) {
      console.log(item)
    },
    addSalesHeader() {
      this.SalesOptions.map(item => {
        if (item.value == this.SalesHeader) {
          this.tags.push({
            name: item.value,
            id: item.address
          })
          this.tasIDs.push(item.address)
        }
      })
    },
    messageShow(code, msg) {
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        })
        this.$router.go(-1)
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        })
      }
    },
    async comitBlack() {
      this.isQuire = false
      if (this.title == 'client') {
        const { data, code } = await getAddContractOrder({
          token: this.$store.state.token
        })
        data.distributors.map(item => {
          if (item.name == this.companyName) {
            this.messageShow(400, '名称不能重复')
            this.isQuire = true
          }
        })
        if (!this.isQuire) {
          if (this.typeIndex) {
            const { code, msg } = await editDistributor(
              this.addDistributorDatas
            )
            this.messageShow(code, msg)
          } else {
            const { code, msg } = await addDistributor(this.addDistributorData)
            this.messageShow(code, msg)
          }
        }
      } else if (this.title == 'supplier') {
        const { data } = await getAddOutsourcingOrder({
          token: this.$store.state.token
        })
        data.suppliers.map(item => {
          if (item.name == this.companyName) {
            this.messageShow(400, '名称不能重复')
            this.isQuire = true
          }
        })
        if (!this.isQuire) {
          if (this.typeIndex) {
            const { code, msg } = await editSupplier(this.addDistributorDatas)
            this.messageShow(code, msg)
          } else {
            const { code, msg } = await addSupplier(this.addDistributorData)
            this.messageShow(code, msg)
          }
        }
      }
    },
    async getDistributor() {
      const { data } = await getDistributorUser()
      console.log('getDistributorUser', data)
      this.id_number = data.userInfo[0].id_number
      data.users.map(item => {
        if ((item.id = data.userInfo[0].id)) {
          this.SalesHeader = item.name
        }
        this.SalesOptions.push({
          address: item.id,
          value: item.name
        })
      })
    },
    addContactClick() {
      this.ContactIsShow = true
      location.href = '#A1'
      this.$router.go(-1)
    },
    callbackbtn() {
      this.$router.go(-1)
    },
    handleChange() {
      var loc = ''
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]]
      }
      console.log(loc)
      console.log(this.countryOptions)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    cancelForm() {
      this.ContactIsShow = false
      clearTimeout(this.timer)
      this.form = {}
    },
    closeDrawer(formName) {
      const { name, jobe, phone, email } = this.form
      this.tableData.push({
        name,
        jobe,
        phone,
        email
      })
      this.contacts.push([name, jobe, phone, email])
      this.ContactIsShow = false
      this.form = {}
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    async getEditDistr() {
      const { data } = await getEditDistributor(this.getEditDistrData)
      console.log('getEditDistributor', data)
      const list = data.distributor
      this.companyName = list.name
      this.Abbreviation = list.id_number
      this.Address = list.contacts_address
      list.contacts.map(item => {
        this.tableData.push({
          name: item.contacts,
          jobe: item.contacts_post,
          phone: item.contacts_tel,
          email: item.contacts_email
        })
        this.contacts.push([
          item.contacts,
          item.contacts_post,
          item.contacts_tel,
          item.contacts_email
        ])
      })
      list.salesperson.map(item => {
        this.tags.push({
          address: item.user_id,
          name: item.user_name
        })
        this.tasIDs.push(item.user_id)
      })
    },
    async getEditSupplie() {
      const { data } = await getEditSupplier(this.getEditDistrData)
      console.log('getEditSupplier', data)
      const list = data.supplier
      this.companyName = list.name
      this.Abbreviation = list.id_number
      this.Address = list.contacts_address
      list.contacts.map(item => {
        this.tableData.push({
          name: item.contacts,
          jobe: item.contacts_post,
          phone: item.contacts_tel,
          email: item.contacts_email
        })
        this.contacts.push([
          item.contacts,
          item.contacts_post,
          item.contacts_tel,
          item.contacts_email
        ])
      })
      list.salesperson.map(item => {
        this.tagsName.push(item.user_name)
        this.tasIDs.push(item.user_id)
      })
    }
  },
  activated() {
    this.title = this.$route.params.name
    if (this.$route.params.id != 0) {
      if (this.$route.params.name == 'client') {
        this.typeIndex = true
        this.titleText = '个人客户编辑'
        this.iid = this.$route.params.id
        this.getEditDistr()
      } else if (this.$route.params.name == 'supplier') {
        this.typeIndex = true
        this.titleText = '个人供应商编辑'
        this.iid = this.$route.params.id
        this.getEditSupplie()
      }
    }

    this.getDistributor()

    this.gokhlist = this.$store.state.gokhlist
    this.enterprise = this.gokhlist.name
    this.cutting = this.gokhlist.name_alias
    this.Billing.name = this.gokhlist.name
    this.Billing.address =
      this.gokhlist.country +
      this.gokhlist.province +
      this.gokhlist.city +
      this.gokhlist.contacts_address +
      this.gokhlist.county
  },
  deactivated() {
    this.isQuire = false
    this.contacts = []
    this.tagsName = []
    this.tasIDs = []
    this.iid = 0
    this.titleText = '个人客户'
    this.typeIndex = false
    this.companyName = ''
    this.Abbreviation = ''
    this.countryOptions = ''
    this.tariff = ''
    this.Address = ''
    this.SalesHeader = ''
    this.tags = []
    this.SalesOptions = []
    this.tableData = []
    this.form = {}
  }
}
</script>

    
<style scoped lang="scss">
#clientedit {
  padding-top: 5.428571rem;
  height: calc(100vh - 8.214285rem);

  .jl_box {
    margin: 0.714286rem 1.071429rem;
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .p_root_box {
    .left {
      padding-left: 1.071429rem;
      .el-icon-back {
      }
    }
    .center {
      span {
        font-size: 1.571429rem;
      }
    }
    .right {
      margin-right: 0.357143rem;
      span {
        font-size: 1.285714rem;
      }
    }
  }

  .firm_box-card {
    .content {
      .item1 {
        margin-right: 1.071429rem;
      }
      .item2 {
        flex: 1;
      }
    }

    .enterpriseName {
      justify-content: space-between;
      .el-tag {
        width: 3rem;
      }
      .el-input {
      }
    }
    .cuttingName {
      justify-content: space-between;
      .el-tag {
        width: 3rem;
      }
      .el-input {
      }
    }
    .country {
      .el-tag {
        width: 3rem;
      }
      .el-cascader {
      }
    }
    .tax {
      .el-tag {
        width: 3rem;
      }
      .el-input {
        width: 8rem;
      }
    }
    .marketer {
      margin: 0;
      flex-direction: column;
      .el-tag + .el-tag {
        margin-left: 0.714286rem;
      }
      .button-new-tag {
        margin-left: 0.714286rem;
        height: 2.285714rem;
        line-height: 2.142857rem;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 6.428571rem;
        margin-left: 0.714286rem;
        vertical-align: bottom;
      }
      .item2 {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .phone_card {
    .addContact {
      margin-bottom: 1.071429rem;
    }
  }

  .Billing_card {
    .el-collapse {
      .el-collapse-item {
        .content {
          margin-bottom: 1.071429rem;
        }
        .itemtext {
          width: 80px;
        }
        .Billingname {
          display: flex;

          span {
          }
          .el-input {
          }
        }
        .Billingtaxnum {
          span {
          }
          .el-input {
          }
        }
        .Billingaddress {
          span {
          }
          .el-input {
          }
        }
        .Billingphone {
          span {
          }
          .el-input {
          }
        }
        .BillingBank {
          span {
          }
          .el-input {
          }
        }
        .Billingaccount {
          span {
          }
          .el-input {
          }
        }
        .Billinglegal {
          span {
          }
          .el-input {
          }
        }
      }
    }
  }

  .bto_box {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    border-top: 1px solid #ccc;
    right: 0;
    height: 39px;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .demo-drawer__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
