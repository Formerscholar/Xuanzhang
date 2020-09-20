<template>
  <div id="clientedit">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="callbackbtn">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>{{ titleText }}</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <div class="firm_box-card jl_box">
        <van-field class="newStyle" v-model="companyName" label="姓名" />
        <van-field class="newStyle" v-model="Abbreviation" label="身份证号" />
        <van-field class="newStyle" v-model="Address" label="详细地址" />
        <van-field
          class="newStyle"
          readonly
          v-model="Director"
          label="负责人"
          right-icon="close"
          @click-input="SalesDirectorClick"
          @click-right-icon="SalesDirectorClear"
        />
      </div>
      <div class="firm_box-card jl_box">
        <van-swipe-cell v-for="(item, index) in tableData" :key="index">
          <div class="contacts">
            <div class="namejob">
              <div class="name">{{ item.name }}</div>
              <div class="job">{{ item.jobe }}</div>
            </div>
            <div class="telemail">
              <div class="phone">{{ item.phone }}</div>
              <div class="email">{{ item.email }}</div>
            </div>
          </div>
          <template #right>
            <van-button
              @click="delecTable(index)"
              square
              type="danger"
              style="height:100%;"
              text="删除"
            />
          </template>
        </van-swipe-cell>
        <div class="addusersClick" @click="popupshow = true">添加联系方式</div>
      </div>
    </scroll>
    <myBtns :commitFun="comitBlack" :cancelFun="callbackbtn">
      <span slot="cancel-btn">取消</span>
      <span slot="commit-btn">
        <span>提交</span>
      </span>
    </myBtns>

    <van-picker
      class="valuepicker"
      v-if="ISSalesDirector"
      title="销售负责人"
      show-toolbar
      :columns="SalesOptions"
      @confirm="SalesDirectorConfirm"
      @cancel="ISSalesDirector = false"
    />

    <van-popup
      class="popup"
      v-model="popupshow"
      position="bottom"
      :style="{ height: '30%' }"
      @close="popupClose"
    >
      <van-field v-model="form.name" label="联系人" />
      <van-field v-model="form.jobe" label="职务" />
      <van-field v-model="form.phone" label="电话" />
      <van-field v-model="form.email" label="邮箱" />
    </van-popup>
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
  getAddContractOrder,
  addPersonDistributor,
  editPersonDistributor,
  editPersonSupplier,
  addPersonSupplier,
} from '@/network/client'
import { getAddOutsourcingOrder } from '@/network/deal'

export default {
  components: {
    myBtns: () => import('@/components/common/my_btns/my_btns'),
  },
  data() {
    return {
      tagsName: [],
      titleText: '个人客户',
      companyName: '',
      Abbreviation: '',
      countryOptions: '',
      tariff: '',
      ISSalesDirector: false,
      popupshow: false,
      Address: '',
      SalesHeader: '',
      ContactIsShow: false,
      gokhlist: [],
      user: [],
      enterprise: '',
      Director: '',
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
        email: '',
      },
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
        legal: '',
      },
      tags: [],
      restaurants: [],
      tasIDs: [],
      timeout: null,
      title: '',
      typeIndex: false,
      iid: 0,
      isQuire: false,
    }
  },
  computed: {
    addDistributorDatas() {
      return {
        id: this.iid,
        token: this.$store.state.token,
        name: this.companyName,
        id_number: this.Abbreviation,
        country_id: '1',
        province_id: '33',
        city_id: '947',
        county_id: null,
        contacts_address: this.Address,
        contacts: this.contacts,
        salesperson_ids: this.tasIDs,
        payment_method: [],
      }
    },
    addDistributorData() {
      return {
        token: this.$store.state.token,
        name: this.companyName,
        id_number: this.Abbreviation,
        country_id: '1',
        province_id: '33',
        city_id: '947',
        county_id: null,
        contacts_address: this.Address,
        contacts: this.contacts,
        salesperson_ids: this.tasIDs,
        payment_method: [],
      }
    },
    getEditDistrData() {
      return {
        id: this.iid,
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    delecTable(i) {
      this.tableData.splice(i, 1)
      this.contacts.splice(i, 1)
    },
    popupClose() {
      const { name, jobe, phone, email } = this.form
      this.tableData.push({
        name,
        jobe,
        phone,
        email,
      })
      this.contacts.push([name, jobe, phone, email])
      this.form = {}
    },
    SalesDirectorClear() {
      this.Director = ''
      this.tasIDs = []
      this.ISSalesDirector = false
    },
    SalesDirectorConfirm(value, index) {
      this.Director += value + ','
      this.tasIDs.push(this.user[index].id)
      this.ISSalesDirector = false
    },
    SalesDirectorClick() {
      this.ISSalesDirector = true
    },
    onSubmit(values) {},
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
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {},
    addSalesHeader() {
      this.SalesOptions.map((item) => {
        if (item.value == this.SalesHeader) {
          this.tags.push({
            name: item.value,
            id: item.address,
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
          type: 'success',
        })
        this.$router.go(-1)
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async comitBlack() {
      this.isQuire = false
      if (this.title == 'client') {
        if (this.typeIndex) {
          const { code, msg } = await editPersonDistributor(
            this.addDistributorDatas
          )
          this.messageShow(code, msg)
        } else {
          const { data, code } = await getAddContractOrder({
            token: this.$store.state.token,
          })
          data.distributors.map((item) => {
            if (item.name == this.companyName) {
              this.messageShow(400, '名称不能重复')
              this.isQuire = true
            }
          })
          if (!this.isQuire) {
            const { code, msg } = await addPersonDistributor(
              this.addDistributorData
            )
            this.messageShow(code, msg)
          }
        }
      } else if (this.title == 'supplier') {
        if (this.typeIndex) {
          const { code, msg } = await editPersonSupplier(
            this.addDistributorDatas
          )
          this.messageShow(code, msg)
        } else {
          const { data } = await getAddOutsourcingOrder({
            token: this.$store.state.token,
          })
          data.suppliers.map((item) => {
            if (item.name == this.companyName) {
              this.messageShow(400, '名称不能重复')
              this.isQuire = true
            }
          })
          if (!this.isQuire) {
            const { code, msg } = await addPersonSupplier(
              this.addDistributorData
            )
            this.messageShow(code, msg)
          }
        }
      }
    },
    async getDistributor() {
      const { data } = await getDistributorUser()

      this.id_number = data.userInfo[0].id_number
      this.user = data.users
      data.users.map((item) => {
        if ((item.id = data.userInfo[0].id)) {
          this.SalesHeader = item.name
        }
        this.SalesOptions.push(item.name)
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
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick((_) => {
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
        email,
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

      const list = data.distributor
      this.companyName = list.name
      this.Abbreviation = list.id_number
      this.Address = list.contacts_address
      list.contacts.map((item) => {
        this.tableData.push({
          name: item.contacts,
          jobe: item.contacts_post,
          phone: item.contacts_tel,
          email: item.contacts_email,
        })
        this.contacts.push([
          item.contacts,
          item.contacts_post,
          item.contacts_tel,
          item.contacts_email,
        ])
      })
      list.salesperson.map((item) => {
        this.tags.push({
          address: item.user_id,
          name: item.user_name,
        })
        this.tasIDs.push(item.user_id)
      })
    },
    async getEditSupplie() {
      const { data } = await getEditSupplier(this.getEditDistrData)

      const list = data.supplier
      this.companyName = list.name
      this.Abbreviation = list.id_number
      this.Address = list.contacts_address
      list.contacts.map((item) => {
        this.tableData.push({
          name: item.contacts,
          jobe: item.contacts_post,
          phone: item.contacts_tel,
          email: item.contacts_email,
        })
        this.contacts.push([
          item.contacts,
          item.contacts_post,
          item.contacts_tel,
          item.contacts_email,
        ])
      })
      list.salesperson.map((item) => {
        this.tagsName.push(item.user_name)
        this.tasIDs.push(item.user_id)
      })
    },
  },
  created() {
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
  destroyed() {
    this.tagsName = []
    this.companyName = ''
    this.Abbreviation = ''
    this.countryOptions = ''
    this.tariff = ''
    this.ISSalesDirector = false
    this.popupshow = false
    this.Address = ''
    this.SalesHeader = ''
    this.ContactIsShow = false
    this.gokhlist = []
    this.user = []
    this.enterprise = ''
    this.Director = ''
    this.cutting = ''
    this.selectedOptions = []
    this.SalesOptions = []
    this.contacts = []
    this.id_number = ''
    this.tax = 0
    this.dynamicTags = []
    this.inputVisible = false
    this.inputValue = ''
    this.drawer = false
    this.tableData = []
    this.form = {}
    this.timer = null
    this.table = false
    this.loading = false
    this.Billing = {}
    this.tags = []
    this.restaurants = []
    this.tasIDs = []
    this.timeout = null
    this.title = ''
    this.typeIndex = false
    this.iid = 0
    this.isQuire = false
  },
}
</script>

<style scoped lang="scss">
#clientedit {
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
  .scroll-wrapper {
    background-color: #f3f4f5;
    padding: 0.571429rem;
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.214286rem;
    width: 100%;
    overflow: hidden;
    .firm_box-card {
      background-color: #fff;
      padding: 0.571429rem;
      margin-bottom: 0.357143rem;
      .addusersClick {
        border-top: 0.357143rem solid #f3f4f5;
        margin-top: 0.357143rem;
        text-align: center;
        font-size: 1.142857rem;
        color: black;
        height: 2.785714rem;
        line-height: 2.785714rem;
      }
      .contacts {
        .namejob,
        .telemail {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1rem;
        }
      }
    }
  }
  .valuepicker {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .popup {
    padding: 0.357143rem;
  }
}
</style>
