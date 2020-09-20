<template>
  <div id="createGoodpage">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>订单收货</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <div class="body">
        <el-card class="box-card item1">
          <van-field v-model="state" label="供应商" @focus="focusClick" />
          <van-field v-model="contractor" label="合同号" />
        </el-card>
        <el-card class="box-card item1">产品</el-card>
        <el-card class="box-card item1">
          <van-field v-model="removeFromInventory" label="入库金额" />
          <timers
            class="delivery"
            type="delivery"
            title="入库日期"
            :valueData="timersList.delivery"
          />
          <van-field
            v-model="treasuryYields"
            rows="1"
            autosize
            label="入库备注"
            type="textarea"
          />
        </el-card>
      </div>
    </scroll>

    <myBtns :commitFun="quoteclick" :cancelFun="quxiaoClick">
      <span slot="cancel-btn">取消</span>
      <span slot="commit-btn">
        ￥{{ removeFromInventory }}
        <span>立即提交</span>
      </span>
    </myBtns>
  </div>
</template>

<script>
import { getAddStorageRecordSuppliers } from '@/network/deal'

export default {
  data() {
    return {
      state: '',
      selectedID: 0,
      contractor: '',
      treasuryYields: '',
      removeFromInventory: 0,
      distributors: [],
      source: {},
      timersList: {
        delivery: new Date().getTime(),
      },
    }
  },
  components: {
    timers: () => import('@/components/content/timers/timers'),
    myBtns: () => import('@/components/common/my_btns/my_btns'),
  },
  created() {
    this.getAddDeliverGood()
    this.source = { ...this.$route.query.data }

    this.contractor = this.source.order_number
    this.state = this.source.name
    this.selectedID = this.source.supplier_id
  },
  computed: {
    getAddDeliverGoodData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    quoteclick() {},
    quxiaoClick() {},
    async getAddDeliverGood() {
      const { data } = await getAddStorageRecordSuppliers(
        this.getAddDeliverGoodData
      )

      this.distributors = [...data.suppliers]
    },
    focusClick() {
      this.$router.push({
        path: '/outSearch',
        query: {
          data: { ...this.distributors },
        },
      })
      this.$bus.$off('outSupplier')
      this.$bus.$on('outSupplier', (item) => {
        this.state = item.name
        this.selectedID = item.id
      })
    },
    blacknext() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="scss">
#createGoodpage {
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
      margin-left: -2.071429rem;
      font-size: 1.285714rem;
      font-weight: 700;
      color: #030303;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.428571rem;
    width: 100%;
    overflow: hidden;
    .body {
      background-color: #f8f7f5;

      .item1 {
        margin-bottom: 0.714286rem;
      }
    }
  }
}
</style>
