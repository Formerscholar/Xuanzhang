<template>
  <div id="ScreenItem">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>{{itemData.order_number}}</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="content">
      <a-card :title="'编号:'+itemData.id" :bordered="false" style="width: 100%">
        <p v-if="itemData.order_number">合同号:{{itemData.order_number}}</p>
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
      </a-card>
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
      itemData: {}
    }
  },
  activated() {
    this.active = this.$route.query.active
    this.itemData = JSON.parse(this.$route.query.data)
    console.log(this.active, this.itemData)
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
}
</style>
