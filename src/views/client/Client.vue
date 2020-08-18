<template>
  <div id="Client">
    <navbar class="Controlled_root">
      <i slot="left"></i>
      <div class="title text-black" slot="center">
        <span>客户</span>
      </div>
    </navbar>
    <van-search v-model="searchValue" show-action @focus="focusClick" @cancel="onCancel" />
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <borderCard @tabListTach="tabListTach">
        <cardbox
          :distributor="distributor"
          @gokhlist="gokhlist"
          :titlename="titlename"
          @refreshList="refreshList"
          slot="card"
        />
        <cardbox
          :distributor="supplier"
          @refreshList="refreshLists"
          @gokhlist="gokhlist"
          :titlename="titlename"
          slot="Supplicard"
        />
      </borderCard>
    </scroll>
    <van-action-sheet
      v-model="show"
      @select="onselect"
      @cancel="onshow"
      @click-overlay="onshow"
      :actions="actions"
      cancel-text="取消"
    />
    <i class="el-icon-plus" @click="btnsclickadd"></i>
    <MainTabBar />
  </div>
</template>
    
<script>
import MainTabBar from '@/components/content/MainTabBar/MainTabBar'

import clientheader from '@/views/client/cihldren/clientheader/clientheader'
import borderCard from '@/views/client/cihldren/borderCard/borderCard'

import cardbox from '@/views/client/cihldren/cardbox/cardbox'
import {
  getDistributors,
  getSuppliers,
  getAddContractOrder,
} from '@/network/client'
import { getAddOutsourcingOrder } from '@/network/deal'

export default {
  name: 'Client',
  components: {
    clientheader,
    borderCard,
    cardbox,
    MainTabBar,
  },
  data() {
    return {
      titlename: '客户',
      distributor: [],
      supplier: [],
      options: [],
      allPage: 1,
      onePage: 1,
      twoPage: 1,
      isOneNetwork: true,
      isTwoNetwork: true,
      searchValue: '',
      isSearch: false,
      searchID: 0,
      optionss: [],
      show: false,
      actions: [{ name: '个人客户' }, { name: '企业客户' }],
    }
  },
  watch: {
    $route(to, from) {
      const toDepths = to.path
      const fromDepths = from.path
      if (fromDepths === '/client') {
        if (
          toDepths != '/cardsearch' &&
          toDepths != '/clientedit/client/0' &&
          toDepths != '/enterpriseedit/client/0' &&
          toDepths != '/clientedit/supplier/0' &&
          toDepths != '/enterpriseedit/supplier/0'
        ) {
          this.isSearch = false
          this.searchValue = ''
        }
      }
    },
  },
  methods: {
    onCancel() {
      console.log('onCancel')
      this.isSearch = false
      this.searchValue = ''
      if (!this.searchID) {
        console.log('个人客户')

        this.getDistri()
      } else {
        console.log('企业客户')

        this.getSupplier()
      }
    },
    focusClick() {
      this.isSearch = true
      this.$router.push({
        path: '/cardsearch',
        query: {
          searchID: this.searchID,
        },
      })
      this.$bus.$off('cardsearch')
      this.$bus.$on('cardsearch', (item) => {
        console.log(item)
        this.searchValue = item[0].name
        if (!this.searchID) {
          this.distributor = item
        } else {
          this.supplier = item
        }
      })
    },
    btnsclickadd() {
      this.$store.state.gokhlist = []
      this.show = true
    },
    Rendering(data) {
      this.distributor = data
    },
    Renderings(data) {
      this.supplier = data
    },
    refreshList() {
      this.distributor = []
      this.getDistri()
    },
    refreshLists() {
      this.supplier = []
      this.getSupplier()
    },
    gokhlist(item) {
      this.$router.push({
        path: '/clientdetails',
        query: {
          data: item,
        },
      })
    },
    tabListTach(e) {
      console.log(e)
      this.searchID = e
      if (e == 0) {
        this.titlename = '客户'
      } else if (e == 1) {
        this.titlename = '供应商'
      }
    },
    loadMore() {
      if (this.searchID == 0) {
        if (this.isOneNetwork) {
          this.onePage += 1
          this.allPage = this.onePage
          this.getDistri()
          console.log('客户+1')
        } else {
          this.$toast('没有更多数据了')
        }
      } else if (this.searchID == 1) {
        if (this.isTwoNetwork) {
          this.twoPage += 1
          this.allPage = this.twoPage
          this.getSupplier()
          console.log('供应商+1')
        } else {
          this.$toast('没有更多数据了')
        }
      }
    },
    addcus() {
      this.show = true
    },
    onshow() {
      this.show = false
    },
    onselect(index) {
      if (this.titlename == '客户') {
        if (index.name == '个人客户') {
          this.$router.push(`/clientedit/client/0`)
        } else if (index.name == '企业客户') {
          this.$router.push('/enterpriseedit/client/0')
        }
      } else if (this.titlename == '供应商') {
        if (index.name == '个人客户') {
          this.$router.push('/clientedit/supplier/0')
        } else if (index.name == '企业客户') {
          this.$router.push('/enterpriseedit/supplier/0')
        }
      }
      this.onshow()
    },
    async getDistri() {
      const { data } = await getDistributors(this.getDistributorsData)
      if (data.distributor.length) {
        data.distributor.forEach((item) => {
          this.distributor.push(item)
        })
        console.log('Distri', this.distributor)
      } else {
        this.isOneNetwork = false
      }
    },
    async getSupplier() {
      const { data } = await getSuppliers(this.getDistributorsData)

      if (data.supplier.length) {
        data.supplier.forEach((item) => {
          this.supplier.push(item)
        })
        console.log('getSuppliers', this.supplier)
      } else {
        this.isTwoNetwork = false
      }
    },
  },
  computed: {
    getDistributorsData() {
      return {
        token: this.$store.state.token,
        page: this.allPage,
        offset: 20,
        _: new Date().getTime(),
      }
    },
  },
  activated() {
    this.show = false
    if (!this.isSearch) {
      this.getDistri()
      this.getSupplier()
    }
  },
  deactivated() {
    this.distributor = []
    this.supplier = []
    this.options = []
    this.allPage = 1
    this.onePage = 1
    this.twoPage = 1
    this.isOneNetwork = true
    this.isTwoNetwork = true
    this.searchValue = ''
    this.searchID = 0
    this.optionss = []
    this.show = false
  },
}
</script>
    
<style lang="scss" scoped>
#Client {
  padding-top: 5.428571rem;

  .Controlled_root {
    font-size: 1.285714rem;
    box-shadow: 0 0 15px 3px #fff;
    border: none;
    font-weight: 700;
    .el-icon-arrow-left {
      color: #fff;
      display: block;
      font-size: 1.714286rem;
      margin-left: 1.714286rem;
    }
    .title {
      margin-left: 3.285714rem;
      color: #fff;
    }
    .el-icon-circle-plus-outline {
      font-size: 1.714286rem;
      margin-right: 0.714286rem;
      color: #fff;
    }
  }
  .el-icon-plus {
    position: fixed;
    bottom: 7.142857rem;
    right: 3.357143rem;
    padding: 0.571429rem;
    z-index: 999;
    font-size: 2.714286rem;
    background-color: #2a7bd0;
    color: #fff;
    border-radius: 50%;
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 9.142857rem;
    bottom: 4.214286rem;
    width: 100%;
    overflow: hidden;
  }
}
</style>
