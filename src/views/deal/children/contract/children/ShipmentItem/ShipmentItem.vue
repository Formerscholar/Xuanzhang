<template>
  <div id="ShipmentItem">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>详情</span>
      </div>
      <div class="right" slot="right">
        <span></span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper">
      <div class="body">
        <div>{{deliveryRecordItem.order_number | setOrderNumber}}</div>
        <div>{{deliveryRecordItem.operator_name | setOperatorName}}</div>
        <div>{{deliveryRecordItem.name | setRecordItemName}}</div>
        <div>{{deliveryRecordItem.total_money | setRecordItemTotalMoney}}</div>
        <div>{{deliveryRecordItem.created_at | setRecordItemCreated}}</div>
        <div class="btns">
          <van-button type="warning" @click="deleteDeliver">作废</van-button>
          <van-button type="info" @click="editShip">编辑</van-button>
        </div>
      </div>
    </scroll>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import scroll from '@/components/common/scroll/scroll'

import { deleteDeliverRecord } from '@/network/deal'
export default {
  name: 'ShipmentItem',
  data() {
    return {
      deliveryRecordItem: {}
    }
  },
  components: { navbar, scroll },
  activated() {
    this.deliveryRecordItem = this.$route.query.data
    console.log(this.deliveryRecordItem)
  },
  deactivated() {},
  filters: {
    setOrderNumber(value) {
      return '合同号:' + value
    },
    setOperatorName(value) {
      return '操作人:' + value
    },
    setRecordItemName(value) {
      return '公司:' + value
    },
    setRecordItemTotalMoney(value) {
      return '金额:' + value
    },
    setRecordItemCreated(value) {
      return '时间:' + value
    }
  },
  computed: {
    deleteDeliverData() {
      let from = new FormData()
      from.append('token', this.$store.state.token)
      from.append('id', this.deliveryRecordItem.id)
      from.append('order_type', 'flow')
      return from
    }
  },
  methods: {
    editShip() {
      this.$router.push({
        path: '/editShipItem',
        query: {
          data: this.deliveryRecordItem
        }
      })
    },
    blacknext() {
      this.$router.go(-1)
    },
    async deleteDeliver() {
      const { code } = await deleteDeliverRecord(this.deleteDeliverData)
      if (code == 200) {
        this.blacknext()
      }
    }
  }
}
</script>
    
<style scoped lang="scss">
#ShipmentItem {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      font-size: 1.285714rem;
      color: #030303;
    }
    .right {
      margin-right: 1.071429rem;
      font-size: 0.714286rem;
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
}
</style>
