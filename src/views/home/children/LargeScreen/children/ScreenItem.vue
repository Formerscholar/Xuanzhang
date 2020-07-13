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
          <!-- <van-circle
            v-model="currentRate"
            :rate="parseInt((itemData.number - itemData.surplus_number ) / itemData.number * 100) || 0"
            :speed="100"
            text="发货进度"
          />-->
          <dv-percent-pond :config="config" style="width:14.285714rem; height:7.142857rem;" />
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
      <!-- <a-card :bordered="false" style="width: 100%">
        <p v-if="itemData.order_number">{{itemData.order_number}}</p>
        <p v-if="itemData.product_name">产品名称:{{itemData.product_name}}</p>
        <p v-if="itemData.product_model">产品型号:{{itemData.product_model}}</p>
        <p v-if="itemData.production_specification">生产型号:{{itemData.production_specification}}</p>
        <p v-if="itemData.surplus_number">待产数量:{{itemData.surplus_number}}</p>
        <p v-if="itemData.commitment_period">承诺交期:{{itemData.commitment_period}}</p>
        <p v-if="itemData.task_remark">生产备注:{{itemData.task_remark}}</p>
        <p>
          <el-progress
            :format="progressnum"
            :text-inside="true"
            :stroke-width="26"
            :percentage="parseInt((itemData.number - itemData.surplus_number ) / itemData.number * 100) || 0"
          ></el-progress>
        </p>
      </a-card>-->
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
      config: {
        value: [55],
        textColor: '#74b9ff',
        localGradient: true
      }
    }
  },
  activated() {
    this.active = this.$route.query.active
    this.itemData = this.$route.query.data
    // this.calcpercentValue()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    this.active = 0
    this.itemData = {}
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  methods: {
    calcpercentValue() {
      let numA = this.itemData.number - this.itemData.surplus_number
      let numB = numA / this.itemData.number
      let num = parseInt(numB * 100)
      this.config.value = [num]
      console.log(this.config)
    },
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
