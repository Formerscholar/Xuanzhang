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
        <div>合同号:{{deliveryRecordItem.order_number}}</div>
        <div>操作人:{{deliveryRecordItem.operator_name}}</div>
        <div>公司:{{deliveryRecordItem.name}}</div>
        <div>金额:{{deliveryRecordItem.total_money}}</div>
        <div>时间:{{deliveryRecordItem.created_at}}</div>
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
  deactivated() {
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
