<template>
  <div id="LargeScreen">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>生产任务</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="content">
      <van-tabs v-model="active" @click="tabsClick">
        <van-tab title="合同订单">
          <scroll
            class="scroll_wrapper"
            ref="scrolls"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMores"
          >
            <el-card
              class="box-card"
              v-for="(item,index) in ProductList"
              :key="index"
              style="margin-bottom:.357143rem;"
            >
              <div class="titleBox" @click="pageHandleClick(item)">
                <div @click.stop="changeProduct(item.id)">
                  <van-tag v-if="item.status == 0" type="warning" color="#FFCC33">备用状态</van-tag>
                  <van-tag v-else type="success">备用状态</van-tag>
                </div>
                <div @click.stop="changeProduct(item.id)">
                  <van-tag v-if="item.status == 0" type="warning" color="#FFCC33">正在生产</van-tag>
                  <van-tag v-else type="success">整装待发</van-tag>
                </div>
                <div class="titleItem">{{item.order_number}}</div>
                <div class="titleItem">{{item.commitment_period}}</div>
              </div>
            </el-card>
          </scroll>
        </van-tab>
        <van-tab title="流水订单" class="scroll_content">
          <scroll
            class="scroll_wrapper"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMore"
          >
            <el-card
              class="box-card"
              v-for="(item,index) in ProductLists"
              :key="index"
              style="margin-bottom:.357143rem;"
            >
              <div class="titleBox" @click="pageHandleClick(item)">
                <div @click.stop="changeProduct(item.id)">
                  <van-tag v-if="item.status == 0" type="warning" color="#FFCC33">正在生产</van-tag>
                  <van-tag v-else type="success">整装待发</van-tag>
                </div>
                <div class="titleItem">{{item.order_number}}</div>
                <div class="titleItem">{{item.commitment_period}}</div>
              </div>
            </el-card>
          </scroll>
        </van-tab>
        <van-tab title="代工订单">
          <scroll
            class="scroll_wrapper"
            ref="scrollss"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="loadMoress"
          >
            <el-card
              class="box-card"
              v-for="(item,index) in ProductListss"
              :key="index"
              style="margin-bottom:.357143rem;"
            >
              <div class="titleBox" @click="pageHandleClick(item)">
                <div @click.stop="changeProduct(item.id)">
                  <van-tag v-if="item.status == 0" type="warning" color="#FFCC33">正在生产</van-tag>
                  <van-tag v-else type="success">整装待发</van-tag>
                </div>
                <div class="titleItem">{{item.order_number}}</div>
                <div class="titleItem">{{item.commitment_period}}</div>
              </div>
            </el-card>
          </scroll>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import scroll from '@/components/common/scroll/scroll'

import { getlargeAcreenOrderProduct, changeProductStatus } from '@/network/home'

export default {
  data() {
    return {
      active: 0,
      deactivated: 0,
      allpage: 1,
      Opage: 1,
      Tpage: 1,
      Spage: 1,
      ProductList: [],
      ProductLists: [],
      ProductListss: [],
      IsTpage: true,
      IsTpages: true,
      IsTpagess: true
    }
  },
  components: {
    navbar,
    scroll
  },
  activated() {
    this.allpage = 1
    if (this.Opage == 1) {
      this.getlargeAcreen()
    }
    if (this.Tpage == 1) {
      this.getlargeAcreens()
    }
    if (this.Spage == 1) {
      this.getlargeAcreenss()
    }

    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    /*
      this.deactivated = 0
      this.allpage = 1
      this.Opage = 1
      this.Tpage = 1
      this.Spage = 1
      this.IsTpage = true
      this.ProductList = []
      this.ProductLists = []
      this.ProductListss = []
    */
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  computed: {
    getlargeAcreenOrderData() {
      return {
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        order_type: 'contract',
        _: new Date().getTime()
      }
    },
    getlargeAcreenOrderDatas() {
      return {
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        order_type: 'flow',
        _: new Date().getTime()
      }
    },
    getlargeAcreenOrderDatass() {
      return {
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        order_type: 'oem',
        _: new Date().getTime()
      }
    }
  },
  methods: {
    async changeProduct(id) {
      let order_type
      if (this.deactivated == 0) {
        order_type = 'contract'
      }
      if (this.deactivated == 1) {
        order_type = 'flow'
      }
      if (this.deactivated == 2) {
        order_type = 'oem'
      }
      const { code } = await changeProductStatus({
        token: this.$store.state.token,
        order_type,
        id,
        _: new Date().getTime()
      })
      if (code == 200) {
        console.log(this.deactivated)
        if (this.deactivated == 0) {
          this.getlargeAcreen()
        }
        if (this.deactivated == 1) {
          this.getlargeAcreens()
        }
        if (this.deactivated == 2) {
          this.getlargeAcreenss()
        }
      }
    },
    loadMoress() {
      if (this.IsTpagess) {
        this.Spage += 1
        this.allpage = this.Spage
        this.getlargeAcreenss()
        this.$refs.scrollss.finishPullUp()
      } else {
        this.$toast('没有更多数据了')
        this.$refs.scrollss.finishPullUp()
      }
    },
    loadMores() {
      if (this.IsTpages) {
        this.Opage += 1
        this.allpage = this.Opage
        this.getlargeAcreen()
        this.$refs.scrolls.finishPullUp()
      } else {
        this.$toast('没有更多数据了')
        this.$refs.scrolls.finishPullUp()
      }
    },
    loadMore() {
      if (this.IsTpage) {
        this.Tpage += 1
        this.allpage = this.Tpage
        this.getlargeAcreens()
        this.$refs.scroll.finishPullUp()
      } else {
        this.$toast('没有更多数据了')
        this.$refs.scroll.finishPullUp()
      }
    },
    pageHandleClick(data) {
      this.$router.push({
        path: '/ScreenItem',
        query: {
          active: this.active,
          data: JSON.parse(JSON.stringify(data))
        }
      })
    },
    blacknext() {
      this.$router.replace('/home')
      this.deactivated = 0
      this.active = 0
      this.allpage = 1
      this.Opage = 1
      this.Tpage = 1
      this.Spage = 1
      this.IsTpage = true
      this.IsTpages = true
      this.IsTpagess = true
    },
    tabsClick(name) {
      this.deactivated = name
    },
    async getlargeAcreen() {
      const { data } = await getlargeAcreenOrderProduct(
        this.getlargeAcreenOrderData
      )
      // data.companyOrderType
      console.log('getlargeAcreenOrderProduct', data.unfinishedOrderProductList)
      if (this.Opage > 1) {
        if (!data.unfinishedOrderProductList.length) {
          this.IsTpages = false
          this.$toast('没有更多数据了')
        } else {
          this.ProductList.push(data.unfinishedOrderProductList)
        }
      } else {
        this.ProductList = data.unfinishedOrderProductList
      }
    },
    async getlargeAcreens() {
      const { data } = await getlargeAcreenOrderProduct(
        this.getlargeAcreenOrderDatas
      )
      console.log('getlargeAcreenOrderProduct', data.unfinishedOrderProductList)
      if (this.Tpage > 1) {
        if (!data.unfinishedOrderProductList.length) {
          this.IsTpage = false
          this.$toast('没有更多数据了')
        } else {
          this.ProductLists.push(data.unfinishedOrderProductList)
        }
      } else {
        this.ProductLists = data.unfinishedOrderProductList
      }
    },
    async getlargeAcreenss() {
      const { data } = await getlargeAcreenOrderProduct(
        this.getlargeAcreenOrderDatass
      )
      console.log('getlargeAcreenOrderProduct', data.unfinishedOrderProductList)

      if (this.Spage > 1) {
        if (!data.unfinishedOrderProductList.length) {
          this.IsTpIsTpagessages = false
          this.$toast('没有更多数据了')
        } else {
          this.ProductListss.push(data.unfinishedOrderProductList)
        }
      } else {
        this.ProductListss = data.unfinishedOrderProductList
      }
    }
  }
}
</script>
    
<style scoped lang="scss">
#LargeScreen {
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
    .scroll_wrapper {
      position: absolute;
      left: 0;
      right: 0;
      top: 3.142857rem;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      height: calc(100vh - 8.571429rem);
    }
    .titleBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .titleItem {
        height: 100%;
        padding: 0 0.357143rem;
        min-width: 4.714286rem;
        color: #636e72;
        font-size: 0.857143rem;
      }
    }
  }
}
</style>
