<template>
  <div id="clientDetails">
    <!-- header -->
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="callbackbtn">
        <i class="el-icon-back"></i>
      </div>
      <div class="center" slot="center">
        <span>客户详情</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <!-- body -->
    <div class="body">
      <el-card class="box-card">
        <div class="clientName">
          <span>{{clientName | SetClientName}}</span>
        </div>
        <div class="clientIdCard">
          <span>{{clientIdCard | SetClientId}}</span>
        </div>
        <div class="clientAderss">
          <span>{{clientAderss | SetClientAderss}}</span>
        </div>
        <div class="clientSales">
          <span>{{clientSales | SetClientSales}}</span>
        </div>
        <div class="clientTable">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="联系人" width="70"></el-table-column>
            <el-table-column prop="job" label="职务" width="80"></el-table-column>
            <el-table-column prop="phone" label="电话" width="100"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-card class="box-card" v-if="typeShow">
        <div>开票资料</div>
        <div>{{name | SetName}}</div>
        <div>{{TaxID | SetTaxID}}</div>
        <div>{{address | SetAddress}}</div>
        <div>{{phone | SetPhone}}</div>
        <div>{{Bank | SetBank}}</div>
        <div>{{account | SetAccount}}</div>
        <div>{{representative | SetRepresentativet}}</div>
      </el-card>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'clientDetails',
  data() {
    return {
      paramsData: {},
      typeShow: false,
      clientName: '',
      clientIdCard: '',
      clientAderss: '',
      clientSales: '',
      tableData: [],
      name: '',
      TaxID: '',
      address: '',
      phone: '',
      Bank: '',
      account: '',
      representative: '',
    }
  },
  components: {},
  filters: {
    SetClientName(value) {
      return '个人名称:' + value
    },
    SetClientId(value) {
      return '身份证号:' + value
    },
    SetClientAderss(value) {
      return '地址:' + value
    },
    SetClientSales(value) {
      return '销售负责人:' + value
    },
    SetName(value) {
      return '名称:' + value
    },
    SetTaxID(value) {
      return '税号:' + value
    },
    SetAddress(value) {
      return '地址:' + value
    },
    SetPhone(value) {
      return '电话:' + value
    },
    SetBank(value) {
      return '开户行:' + value
    },
    SetAccount(value) {
      return '账号:' + value
    },
    SetRepresentativet(value) {
      return '法人代表:' + value
    },
  },
  activated() {
    this.paramsData = this.$route.query.data
    if (this.paramsData.status == 2) {
      this.typeShow = false
      this.dataOfClient()
    } else if (this.paramsData.status == 1) {
      this.typeShow = true
      this.dataOfClient()
      this.dataOfSupplier()
    }
  },
  deactivated() {
    this.paramsData = {}
    this.typeShow = false
    this.clientName = ''
    this.clientIdCard = ''
    this.clientAderss = ''
    this.clientSales = ''
    this.tableData = []
    this.name = ''
    this.TaxID = ''
    this.address = ''
    this.phone = ''
    this.Bank = ''
    this.account = ''
    this.representative = ''
  },
  methods: {
    callbackbtn() {
      this.$router.go(-1)
    },
    dataOfClient() {
      this.clientName = this.paramsData.name
      this.clientIdCard = this.paramsData.name_alias
      this.clientAderss =
        this.paramsData.country +
        ' ' +
        this.paramsData.province +
        ' ' +
        this.paramsData.city +
        ' ' +
        this.paramsData.contacts_address

      this.clientSales = this.paramsData.uname
      this.paramsData.contacts.map((item) => {
        this.tableData.push({
          date: item.contacts,
          job: item.contacts_post,
          phone: item.contacts_tel,
          email: item.contacts_email,
        })
      })
    },
    dataOfSupplier() {
      this.name = this.paramsData.invoice_name
      this.TaxID = this.paramsData.invoice_tax_number
      this.address = this.paramsData.invoice_address
      this.phone = this.paramsData.invoice_tel
      this.Bank = this.paramsData.invoice_opening_bank
      this.account = this.paramsData.invoice_account
      this.representative = this.paramsData.invoice_legal_person
    },
  },
}
</script>
    
<style scoped lang="scss">
#clientDetails {
  padding-top: 5.428571rem;
  .p_root_box {
    .left {
      padding-left: 1.071429rem;
      .el-icon-back {
      }
    }
    .center {
      position: relative;
      left: -1.071429rem;
      span {
        font-size: 1.571429rem;
      }
    }
  }
}
</style>
