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
      <div class="title_warp">
        <div class="left">
          <svg class="icon icons" aria-hidden="true">
            <use xlink:href="#icon-baogao" />
          </svg>
        </div>
        <div class="right">
          <div class="clientName">{{clientName}}</div>
          <div class="clientAderss">{{clientAderss}}</div>
        </div>
      </div>
      <div class="info_three">
        <div class="left">
          <div class="title">简称</div>
          <div class="info">{{clientIdCard}}</div>
        </div>
        <div class="con_box">
          <div class="title">税率</div>
          <div class="info">13%</div>
        </div>
        <div class="right">
          <div class="title">最近交易</div>
          <div class="info">2020-09-11</div>
        </div>
      </div>
      <div class="tos_text">
        <div class="blue_box">
          <div class="left_title">付款方式</div>
          <div class="right_info">付款金额允许不包含最近2个月的发货款</div>
        </div>
      </div>
      <div class="list_box">
        <div class="item_box">
          <div class="left_box">
            <div class="icon_box">
              <svg class="icon icons" aria-hidden="true">
                <use xlink:href="#icon-baogao" />
              </svg>
            </div>
            <div class="text">总账款</div>
          </div>
          <div class="right_box">123324.00</div>
        </div>
      </div>
      <div class="box-card">
        <div class="clientSales">{{clientSales}}</div>
      </div>
      <div class="clientTable">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" label="联系人" width="70"></el-table-column>
          <el-table-column prop="job" label="职务" width="80"></el-table-column>
          <el-table-column prop="phone" label="电话" width="100"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
        </el-table>
      </div>
      <div class="box-card botcard" v-if="typeShow">
        <div>{{name }}</div>
        <div>{{TaxID }}</div>
        <div>{{address }}</div>
        <div>{{phone}}</div>
        <div>{{Bank }}</div>
        <div>{{account }}</div>
        <div>{{representative }}</div>
      </div>
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
      this.clientAderss = this.paramsData.contacts_address
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
  .body {
    .title_warp {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.857143rem 1.428571rem;
      padding-bottom: 0;
      .left {
        margin-right: 0.857143rem;
        .icons {
          width: 3.428571rem;
          height: 3.428571rem;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .clientName {
          font-size: 1.428571rem;
        }
        .clientAderss {
          font-size: 1.142857rem;
          color: #b3b3b3;
        }
      }
    }
    .info_three {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2.857143rem;
      margin-top: 1.428571rem;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
      }
      .con_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
      }
    }
    .tos_text {
      padding: 0.714286rem;
      border-bottom: 0.857143rem solid #f2f2f2;
      .blue_box {
        background-color: #f2f7fd;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0.714286rem;
        .left_title {
          width: 4.285714rem;
          color: #029aff;
          margin-right: 1.428571rem;
        }
        .right_info {
          color: #9a9a9c;
          flex: 1;
        }
      }
    }
    .list_box {
      padding: 1.214286rem 1.928571rem;
      .item_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.714286rem;
        border-bottom: 1px solid #ccc;
        .left_box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .icon_box {
            margin-right: 1rem;
            .icons {
              width: 1.714286rem;
              height: 1.714286rem;
            }
          }
          .text {
            font-size: 1.142857rem;
          }
        }
      }
    }
    .box-card {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 1.285714rem;
      padding: 1.428571rem 0;
      text-align: center;
    }
    .botcard {
      font-size: 1rem;
    }
  }
}
</style>
