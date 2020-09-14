<template>
  <div id="clientDetails">
    <!-- header -->
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="callbackbtn">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>客户详情</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <!-- body -->
    <scroll class="scroll-wrapper" :probeType="3" :pullUpLoad="true" @scroll="pullingUp">
      <div class="body">
        <div class="title_warp">
          <div class="left">
            <svg class="icon icons" aria-hidden="true">
              <use xlink:href="#icon-jinrongleiicontubiao-33" />
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
            <div class="info">{{tariff}}%</div>
          </div>
          <div class="right">
            <div class="title">最近交易</div>
            <div class="info">2020-09-11</div>
          </div>
        </div>
        <div class="tos_text">
          <div class="blue_box" v-for="item in distributorContractScheme" :key="item.id">
            <div class="left_title">{{item.order_type | setOrderType}}</div>
            <van-notice-bar
              class="right_info"
              v-if="item.pay_method_type == 1"
              scrollable
              background="#f2f7fd"
              :text="'按月付款，付款金额允许不包含最近' +item.pay_method_content+'个月的发货款'"
            />
            <van-notice-bar
              class="right_info"
              v-if="item.pay_method_type == 2"
              scrollable
              background="#f2f7fd"
              :text="'按月循环付款，每次付总货款的'+item.pay_method_content.split(',')[0]+'%,允许不包含最近'+item.pay_method_content.split(',')[1]+'个月的发货款'"
            />
            <van-notice-bar
              class="right_info"
              v-if="item.pay_method_type == 3"
              scrollable
              background="#f2f7fd"
              :text="'即时付款，允许最大欠款金额为'+item.pay_method_content+'元'"
            />
          </div>
        </div>
        <div class="list_box">
          <div class="item_box">
            <div class="left_box">
              <div class="icon_box">
                <svg class="icon icons" aria-hidden="true">
                  <use xlink:href="#icon-jinrongleiicontubiao-26" />
                </svg>
              </div>
              <div class="text">总账款</div>
            </div>
            <div class="right_box">123324.00</div>
          </div>
          <div class="item_box">
            <div class="left_box">
              <div class="icon_box">
                <svg class="icon icons" aria-hidden="true">
                  <use xlink:href="#icon-jinrongleiicontubiao-16" />
                </svg>
              </div>
              <div class="text">合约应收款</div>
            </div>
            <div class="right_box" style="color:red;">123324.00</div>
          </div>
        </div>

        <!-- <div class="clientTable">
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="联系人" width="70"></el-table-column>
            <el-table-column prop="job" label="职务" width="80"></el-table-column>
            <el-table-column prop="phone" label="电话" width="100"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
          </el-table>
        </div>-->
        <div class="box-card botcard">
          <div class="title_box">发票抬头</div>
          <div class="info_box">
            <div class="title_info_box">名称</div>
            <div class="title_text">{{name}}</div>
          </div>
          <div class="info_box">
            <div class="title_info_box">税号</div>
            <div class="title_text">{{TaxID}}</div>
          </div>
          <div class="info_box">
            <div class="title_info_box">单位地址</div>
            <div class="title_text">{{address}}</div>
          </div>
          <div class="info_box">
            <div class="title_info_box">电话号码</div>
            <div class="title_text">{{phone}}</div>
          </div>
          <div class="info_box">
            <div class="title_info_box">开户银行</div>
            <div class="title_text">{{Bank}}</div>
          </div>
          <div class="info_box">
            <div class="title_info_box">银行账户</div>
            <div class="title_text">{{account}}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
    
<script>
import { getEditDistributor, getEditSupplier } from '@/network/client'
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
      iid: '',
      tariff: '',
      phone: '',
      Bank: '',
      account: '',
      representative: '',
      distributorContractScheme: [],
      type: '',
    }
  },
  activated() {
    this.type = this.$route.params.type
    this.iid = this.$route.params.id
    if (this.type == 'distributor') {
      this.getEditDistributors()
    } else {
      this.getSupplierss()
    }
  },
  filters: {
    setOrderType(value) {
      if (value == 'contract') {
        return '销售合同'
      } else if (value == 'flow') {
        return '流水订单'
      } else if (value == 'oem') {
        return '来料加工'
      } else if (value == 'outsourcing') {
        return '委外订单'
      } else if (value == 'warehousingM') {
        return '物料入库'
      }
    },
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
    pullingUp() {
      this.getEditDistributors()
    },
    async getSupplierss() {
      const { data } = await getEditSupplier({
        id: this.iid,
        token: this.$store.state.token,
        _: new Date().getTime(),
      })
      const { supplier, supplierContractScheme } = data
      this.paramsData = { ...supplier }
      this.distributorContractScheme = [...supplierContractScheme]
      this.dataOfClient()
      this.dataOfSupplier()
    },
    async getEditDistributors() {
      const { data } = await getEditDistributor({
        id: this.iid,
        token: this.$store.state.token,
        _: new Date().getTime(),
      })
      console.log('getEditDistributor', data)
      const { distributor, distributorContractScheme } = data
      this.paramsData = { ...distributor }
      this.distributorContractScheme = [...distributorContractScheme]
      this.dataOfClient()
      this.dataOfSupplier()
    },
    callbackbtn() {
      this.$router.go(-1)
    },
    dataOfClient() {
      this.clientName = this.paramsData.name
      this.clientIdCard = this.paramsData.name_alias
      this.clientAderss = this.paramsData.contacts_address
      this.tariff = this.paramsData.invoice_tax_rate
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
      .el-icon-arrow-left {
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
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .body {
    .title_warp {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 1.857143rem 1.428571rem;
      padding-bottom: 0;
      .left {
        margin-right: 0.857143rem;
        .icons {
          width: 3.571429rem;
          height: 3.571429rem;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .clientName {
          font-size: 1.285714rem;
        }
        .clientAderss {
          font-size: 1rem;
          color: #b3b3b3;
        }
      }
    }
    .info_three {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.857143rem;
      margin-top: 1.428571rem;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        .title {
          color: #b3b3b3;
        }
        .info {
          font-size: 1.142857rem;
        }
      }
      .con_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        border-left: 1px solid #f0f0f0;
        border-right: 1px solid #f0f0f0;
        .title {
          color: #b3b3b3;
        }
        .info {
          font-size: 1.142857rem;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        .title {
          color: #b3b3b3;
        }
        .info {
          font-size: 1.142857rem;
        }
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
        margin-bottom: 0.357143rem;
        .left_title {
          width: 4.285714rem;
          color: #029aff;
          margin-right: 1rem;
          font-size: 1rem;
        }
        .right_info {
          color: #9a9a9c;
          flex: 1;
          font-size: 0.857143rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding: 0 !important;
        }
        /deep/.van-notice-bar {
          height: 1.428571rem !important;
        }
      }
    }
    .list_box {
      padding: 1.214286rem 1.928571rem;
      padding-bottom: 0.571429rem;
      border-bottom: 0.857143rem solid #f2f2f2;
      .item_box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.714286rem;
        border-bottom: 1px solid #f4f4f4;
        margin-bottom: 0.714286rem;
        &:last-child {
          margin-bottom: 0;
        }
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
      font-size: 1.285714rem;
      .title_box {
        font-size: 1.285714rem;
        height: 2.928571rem;
        line-height: 2.928571rem;
        background-color: #f2f7fd;
        margin: 0.714286rem;
        border: 1px solid #f2f2f2;
        text-align: center;
      }
      .info_box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 0 1.785714rem;
        font-size: 1rem;
        padding: 0.428571rem 0;
        &:last-child {
          padding-bottom: 1.714286rem;
          border-bottom: 1px solid #f4f4f4;
        }
        .title_info_box {
          width: 5.714286rem;

          color: #707070;
          margin-right: 1.285714rem;
        }
        .title_text {
          flex: 1;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
