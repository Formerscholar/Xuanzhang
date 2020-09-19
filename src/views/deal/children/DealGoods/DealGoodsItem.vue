<template>
  <div style="overflow: hidden;" class="rool">
    <van-swipe-cell v-for="(item, index) in goodsLists" :key="index">
      <div class="goodsListItem" @click.stop="listClick(item)">
        <div class="itemTop">
          <div class="topLeft layout">
            <div class="contract">
              <em style="color:#E6A23C;">{{ item.contract }}</em>
              <span style="margin-left:.714286rem;">
                <i>{{ item.name }}</i>
              </span>
              <span
                v-for="(item1,index1) in item.auditRecord"
                :key="index1"
                :class="item1.status == 0 ? 'glyphicon pramary' : 'glyphicon info'"
              ></span>
            </div>
          </div>
          <div class="topRight layout" @click.stop="CompanyBtn(item.distributor_id)">
            <div class="Company">{{ item.Company }}</div>
          </div>
        </div>
        <div class="itemDown">
          <div class="Downitem">
            <el-progress
              :format="formatOne"
              :text-inside="true"
              :stroke-width="16"
              :percentage="item.schedule.Settlement * 1"
              :status="item.schedule.Settlement * 1 < 100 ? null : 'warning'"
            ></el-progress>
          </div>
          <div class="Downitem">
            <el-progress
              :format="formatTwo"
              :text-inside="true"
              :stroke-width="16"
              :percentage="item.schedule.Ship  * 1"
              :status="item.schedule.Ship * 1 < 100 ? null : 'warning'"
            ></el-progress>
          </div>
          <div class="Downitem">
            <el-progress
              :format="formatThree"
              :text-inside="true"
              :stroke-width="16"
              :percentage="item.schedule.invoice * 1"
              :status="item.schedule.invoice * 1 < 100 ? null : 'warning'"
            ></el-progress>
          </div>
        </div>
        <div class="itemdondon">
          <div class="tags">
            <van-tag
              plain
              v-if="item.isIndex"
              :type="item.business_status | tagsType"
            >{{item.business_status | setbusiness_status}}</van-tag>
            <van-tag
              plain
              v-if="item.isIndex"
              :type="item.che_status  ? 'success' : 'warning'"
            >{{item.che_status ? '整装待发' : '生产中'}}</van-tag>
          </div>
          <div class="topLeft layout">
            <div class="Amount">
              <i>{{ item.Amount | SetAmount }}</i>
            </div>
          </div>
          <div class="topRight layout"></div>
          <div class="topRight layout">
            <div class="Delivery">
              <i>{{ item.Delivery | SetDelivery }}</i>
            </div>
          </div>
        </div>
      </div>
      <template #right>
        <van-button
          v-if="iseditlists"
          style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
          square
          type="warning"
          text="编辑"
          @click="editlists(item)"
        />
        <van-button
          v-if="isVoidList"
          style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
          square
          type="danger"
          text="作废"
          @click="VoidList(item)"
        />
        <van-button
          v-if="isprintList"
          style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
          square
          type="primary"
          text="打印"
          @click="printList(item)"
        />
        <van-button
          v-if="item.to_examine != undefined  && item.to_examine == 0 && isControlledDelay"
          style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
          square
          type="info"
          text="受控"
          @click="ControlledDelay(item.id)"
        />
        <van-button
          v-if="item.to_examine != undefined && item.to_examine == 1"
          style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
          square
          type="danger"
          text="解锁"
          @click="PREUNLOCK(item.id)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import {
  getEditContractOrder,
  toExamineContractOrder,
  cancelToExamineContractOrder,
} from '@/network/deal'
import { fmoney } from '@/common/utils'

export default {
  data() {
    return {
      Loop: null,
      iid: 0,
      show: false,
      actions: [{ name: '编辑' }, { name: '作废' }, { name: '打印' }],
      editData: {},
      contractOrder: {},
      listIsShow: false,
      iseditlists: true,
      isControlledDelay: true,
      isVoidList: true,
      isprintList: true,
    }
  },
  props: {
    goodsLists: {
      type: Array,
      default: [],
    },
  },
  created() {
    this.show = false
  },
  activated() {
    this.$Jurisdiction('72', localStorage.getItem('oparr'), () => {
      this.iseditlists = false
    })
    this.$Jurisdiction('73', localStorage.getItem('oparr'), () => {
      this.isControlledDelay = false
    })
    this.$Jurisdiction('225', localStorage.getItem('oparr'), () => {
      this.isVoidList = false
    })
    this.$Jurisdiction('271', localStorage.getItem('oparr'), () => {
      this.isprintList = false
    })
  },
  computed: {
    getEditContractOrderData() {
      return {
        id: this.iid,
        token: this.$store.state.tonken,
        _: new Date().getTime(),
      }
    },
  },
  filters: {
    SetName(value) {
      return '销售:' + value
    },
    SetAmount(value) {
      return value.indexOf('-') == -1
        ? '￥' + fmoney(value)
        : '￥-' + fmoney(value.substr(1))
    },
    SetDelivery(value) {
      return '交期:' + value
    },
    setbusiness_status(value) {
      if (value == 0) {
        return '洽谈中'
      } else if (value == 1) {
        return '启动生产'
      } else if (value == 2) {
        return '准许发货'
      } else if (value == 3) {
        return '无状态'
      }
    },
    tagsType(value) {
      if (value == 0) {
        return 'danger'
      } else if (value == 1) {
        return 'warning'
      } else if (value == 2) {
        return 'success'
      } else if (value == 3) {
        return 'primary'
      }
    },
  },
  methods: {
    async PREUNLOCK(iid) {
      const { code, msg } = await cancelToExamineContractOrder({
        id: [iid],
        token: this.$store.state.token,
      })
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.$emit('ControlledDelay')
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async ControlledDelay(iid) {
      const { code, msg } = await toExamineContractOrder({
        id: [iid],
        token: this.$store.state.token,
      })
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.$emit('ControlledDelay')
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    editlists(item) {
      this.$emit('editlists', {
        data: item,
      })
    },
    VoidList(item) {
      this.$emit('VoidList', {
        data: item,
      })
    },
    printList(item) {
      this.$emit('printList', {
        showed: this.show,
        data: item,
      })
    },
    async getEditContractOrders() {
      console.log('dealgoodsitem')
      const { data } = await getEditContractOrder(this.getEditContractOrderData)
      this.editData = data
      this.contractOrder = data.contractOrder
    },
    listClick(item) {
      this.iid = item.id
      this.listIsShow = false
      this.$router.push(`/contractdetails/${this.iid}`)
    },
    touchin() {
      clearInterval(this.Loop)
      this.Loop = setTimeout(() => {
        this.listIsShow = true
      }, 500)
    },
    cleartime() {
      clearInterval(this.Loop)
    },
    CompanyBtn(id) {
      this.$router.push(`/selfConcordat/${id}`)
    },
    formatOne(percentage) {
      return `结算 ${percentage}%`
    },
    formatTwo(percentage) {
      return `发货 ${percentage}%`
    },
    formatThree(percentage) {
      return `开票 ${percentage}%`
    },
  },
}
</script>



<style lang="scss" scoped>
.goodsListItem {
  background-color: #fff;
  border-radius: 5px;
  padding: 0 0.714286rem;
  padding-bottom: 0.571429rem;
  margin: 0.714286rem 0;
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.214286rem;
    width: 100%;
    overflow: hidden;
  }
  .layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.571429rem 0;
  }
  .itemTop {
    height: 25%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    i {
      font-style: normal;
    }
    .topLeft {
      text-align: left;

      .contract {
        font-size: 0.857143rem;
        color: #5c5c5c;
        display: flex;
        justify-content: center;
        align-items: center;
        .glyphicon {
          width: 0.857143rem;
          height: 0.857143rem;
          margin-left: 0.357143rem;
        }
        .pramary {
          background-color: #e3e3e3;
        }
        .info {
          background-color: rgb(66, 147, 200);
        }
        em {
          font-weight: 700;
        }
        i {
          color: #858585;
        }
      }
    }

    .topRight {
      text-align: right;
      .Company {
        font-size: 1rem;
        font-weight: 700;
      }
    }
  }
  .itemDown {
    display: flex;
    font-size: 0.714286rem;
    .Downitem {
      flex: 1;
      padding: 0 0.414286rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      /deep/.el-progress-bar__innerText {
        font-size: 0.714286rem;
      }
      &:first-child {
        padding-left: 0;
        span {
          left: 0.314286rem;
        }
      }
      &:last-child {
        padding-right: 0;
      }
      /deep/.el-progress-bar__outer {
        border-radius: 3px;
        /deep/.el-progress-bar__inner {
          border-radius: 3px;
        }
      }
    }
  }
  .itemdondon {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.457143rem;
    font-size: 0.857143rem;
    color: #545454;
    .topLeft,
    .topRight {
      padding: 0;
    }
    .tags {
      .van-tag {
        height: 1rem;
        font-size: 0.857143rem;
        margin-right: 0.214286rem;
      }
    }
  }
}
</style>
