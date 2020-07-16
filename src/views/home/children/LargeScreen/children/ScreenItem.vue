<template>
  <div id="ScreenItem">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>{{'编号:'+itemData.id}}</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="content">
      <el-card class="box-card">
        <div class="titles">
          {{itemData.order_number}}
          <van-circle
            v-model="currentRate"
            :rate="Math.round(((itemData.number - itemData.surplus_number) / itemData.number)*100)"
            :speed="100"
            :color="gradientColor"
            :text="'发货进度:' +  Math.round(((itemData.number - itemData.surplus_number) / itemData.number)*100) + '%'"
          />
        </div>
        <div class="interfes">
          <span v-if="itemData.product_name">{{itemData.product_name}}</span>
          <span v-if="itemData.product_model">{{itemData.product_model}}</span>
          <span v-if="itemData.production_specification">{{itemData.production_specification}}</span>
        </div>
        <div class="status">
          <span v-if="itemData.surplus_number">待产数量:{{itemData.surplus_number}}</span>
          <span v-if="itemData.commitment_period" class="timers">{{itemData.commitment_period}}</span>
        </div>
        <div class="remarks">
          <span v-if="itemData.task_remark">生产备注:{{itemData.task_remark}}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'

export default {
  components: {
    navbar
  },
  data() {
    return {
      active: 0,
      itemData: {},
      currentRate: 0,
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6'
      }
    }
  },
  activated() {
    this.active = this.$route.query.active
    this.itemData = this.$route.query.data
  },
  deactivated() {
    this.active = 0
    this.config.value = [0]
    this.itemData = {}
  },
  methods: {
    blacknext() {
      this.$router.go(-1)
    },
    progressnum(percentage) {
      return `发货进度 ${percentage}%`
    }
  }
}
</script>
    


<style scoped lang="scss">
#ScreenItem {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #fff;
    border: none;
    box-shadow: none;
    z-index: 10;
    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -2.071429rem;
      font-size: 1.285714rem;
    }
  }
  .content {
    padding: 0.357143rem;
    .box-card {
      background-color: #f7f8fa;
      .titles {
        font-size: 1.714286rem;
        color: #e17537;
        padding: 0 0.357143rem;
        margin-bottom: 0.714286rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .interfes {
        color: #57504a;
        font-size: 1.285714rem;
        margin-bottom: 0.714286rem;

        span {
          margin: 0 0.357143rem;
        }
      }
      .status {
        color: #9c9083;
        font-size: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 0.357143rem;
        margin-bottom: 0.428571rem;

        .timers {
          color: #1989fa;
          font-size: 1.142857rem;
        }
      }
      .remarks {
        color: #bfafa2;
        padding: 0 0.357143rem;
        font-size: 1.428571rem;
        margin-bottom: 1.285714rem;
      }
    }
  }
}
</style>
