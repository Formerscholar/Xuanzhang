<template>
  <div id="LargeScreen">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>大平台</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="content">
      <van-tabs v-model="active" @click="tabsClick">
        <van-tab title="合同订单">
          <el-card
            class="box-card"
            v-for="(item,index) in ProductList"
            :key="index"
            style="margin-bottom:.357143rem;"
          >
            <div class="titleBox">
              <div class="titleItem">合同号:{{item.order_number}}</div>
              <div class="titleItem">名称:{{item.product_name}}</div>
              <div class="titleItem">产品型号:{{item.product_model}}</div>
              <div class="titleItem">生产型号:{{item.production_specification}}</div>
            </div>
            <div class="titleBox">
              <div class="titleItem">待产数量:{{item.surplus_number}}</div>
              <div class="titleItem">
                <span>发货进度:</span>
                <el-progress
                  :text-inside="true"
                  :stroke-width="26"
                  :percentage="parseInt((item.number - item.surplus_number ) / item.number * 100) "
                ></el-progress>
              </div>
              <div class="titleItem">承诺交期:{{item.commitment_period}}</div>
              <div class="titleItem">备注:{{item.task_remark}}</div>
            </div>
          </el-card>
        </van-tab>
        <van-tab title="流水订单">
          <el-card
            class="box-card"
            v-for="(item,index) in ProductLists"
            :key="index"
            style="margin-bottom:.357143rem;"
          >
            <div class="titleBox">
              <div class="titleItem">合同号:{{item.order_number}}</div>
              <div class="titleItem">名称:{{item.product_name}}</div>
              <div class="titleItem">产品型号:{{item.product_model}}</div>
              <div class="titleItem">生产型号:{{item.production_specification}}</div>
            </div>
            <div class="titleBox">
              <div class="titleItem">待产数量:{{item.surplus_number}}</div>
              <div class="titleItem">
                <span>发货进度:</span>
                <el-progress
                  :text-inside="true"
                  :stroke-width="26"
                  :percentage="parseInt((item.number - item.surplus_number ) / item.number * 100) "
                ></el-progress>
              </div>
              <div class="titleItem">承诺交期:{{item.commitment_period}}</div>
              <div class="titleItem">备注:{{item.task_remark}}</div>
            </div>
          </el-card>
        </van-tab>
        <van-tab title="代工订单">
          <el-card
            class="box-card"
            v-for="(item,index) in ProductListss"
            :key="index"
            style="margin-bottom:.357143rem;"
          >
            <div class="titleBox">
              <div class="titleItem">合同号:{{item.order_number}}</div>
              <div class="titleItem">名称:{{item.product_name}}</div>
              <div class="titleItem">产品型号:{{item.product_model}}</div>
              <div class="titleItem">生产型号:{{item.production_specification}}</div>
            </div>
            <div class="titleBox">
              <div class="titleItem">待产数量:{{item.surplus_number}}</div>
              <div class="titleItem">
                <span>发货进度:</span>
                <el-progress
                  :text-inside="true"
                  :stroke-width="26"
                  :percentage="parseInt((item.number - item.surplus_number ) / item.number * 100) "
                ></el-progress>
              </div>
              <div class="titleItem">承诺交期:{{item.commitment_period}}</div>
              <div class="titleItem">备注:{{item.task_remark}}</div>
            </div>
          </el-card>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import { getlargeAcreenOrderProduct } from '@/network/home'

export default {
  data() {
    return {
      active: 0,
      deactivated: 0,
      allpage: 0,
      Opage: 0,
      Tpage: 0,
      Spage: 0,
      ProductList: [],
      ProductLists: [],
      ProductListss: []
    }
  },
  components: {
    navbar
  },
  activated() {
    this.getlargeAcreen()
    this.getlargeAcreens()
    this.getlargeAcreenss()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    this.active = 0
    this.deactivated = 0
    this.allpage = 0
    this.Opage = 0
    this.Tpage = 0
    this.Spage = 0
    this.ProductList = []
    this.ProductLists = []
    this.ProductListss = []
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  computed: {},
  methods: {
    blacknext() {
      this.$router.replace('/home')
    },
    tabsClick(name) {
      this.deactivated = name
    },
    async getlargeAcreen() {
      const { data } = await getlargeAcreenOrderProduct({
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        order_type: 'contract',
        _: new Date().getTime()
      })
      console.log('getlargeAcreenOrderProduct', data.unfinishedOrderProductList)
      this.ProductList = data.unfinishedOrderProductList
    },
    async getlargeAcreens() {
      const { data } = await getlargeAcreenOrderProduct({
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        order_type: 'flow',
        _: new Date().getTime()
      })
      console.log('getlargeAcreenOrderProduct', data.unfinishedOrderProductList)
      this.ProductLists = data.unfinishedOrderProductList
    },
    async getlargeAcreenss() {
      const { data } = await getlargeAcreenOrderProduct({
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        order_type: 'oem',
        _: new Date().getTime()
      })
      console.log('getlargeAcreenOrderProduct', data.unfinishedOrderProductList)
      this.ProductListss = data.unfinishedOrderProductList
    }
  }
}
</script>
    
<style scoped lang="scss">
#LargeScreen {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;
    z-index: 10;
    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -3.071429rem;
      font-size: 1.285714rem;
      color: #030303;
    }
  }
  .content {
    .titleBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .titleItem {
        height: 100%;
        padding: 0 0.357143rem;
      }
    }
  }
}
</style>
