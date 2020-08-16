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
            </div>
          </div>
          <div class="topRight layout" @click.stop="CompanyBtn(item.distributor_id)">
            <div class="Company">{{ item.Company }}</div>
          </div>
        </div>
        <div class="itemdondon">
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

      <template #right style="height:100%;">
        <van-button style="height:100%;" square type="warning" text="编辑" @click="editlists(item)" />
        <van-button style="height:100%;" square type="danger" text="作废" @click="VoidList(item)" />
        <van-button style="height:100%;" square type="primary" text="打印" @click="printList(item)" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { getEditContractOrder } from '@/network/deal'

export default {
  name: 'DealGoodsItem',
  data() {
    return {
      Loop: null,
      iid: 0,
      show: false,
      actions: [{ name: '编辑' }, { name: '作废' }, { name: '打印' }],
      editData: {},
      contractOrder: {},
      listIsShow: false,
    }
  },
  props: {
    goodsLists: {
      type: Array,
      default: [],
    },
  },
  components: {},
  activated() {
    this.show = false
    this.getEditContractOrders()
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
      return '￥' + value
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
    editlists(item) {
      console.log(item)
      this.$emit('editlists', {
        data: item,
      })
    },
    VoidList(item) {
      console.log(item)

      this.$emit('VoidList', {
        data: item,
      })
    },
    printList(item) {
      console.log(item)

      this.$emit('printList', {
        showed: this.show,
        data: item,
      })
    },
    async getEditContractOrders() {
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



<style lang="scss">
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
        em {
          font-weight: 700;
        }
        i {
          color: #858585;
        }
      }
      .Amount {
        font-size: 0.571429rem;
        i {
          padding-left: 0.357143rem;
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
      .el-progress-bar__innerText {
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
      .el-progress {
        .el-progress-bar {
        }
        .el-progress-bar__outer {
          border-radius: 3px;
          .el-progress-bar__inner {
            border-radius: 3px;
          }
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
