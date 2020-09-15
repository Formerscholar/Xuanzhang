<template>
  <div id="Client">
    <navbar class="Controlled_root">
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
      @scroll="clickScroll"
    >
      <borderCard
        @tabListTach="tabListTach"
        :allArrearsCount="allArrearsCount"
        :allArrearsCounts="allArrearsCounts"
      >
        <cardbox
          v-if="isdistributor"
          :distributor="distributor"
          @gokhlist="gokhlist"
          :titlename="titlename"
          @refreshList="refreshList"
          slot="card"
        />
        <cardbox
          v-if="issupplier"
          :distributor="supplier"
          @refreshList="refreshLists"
          @gokhlist="gokhlists"
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
import { getlogin, getIndex } from '@/network/login'
import cardbox from '@/views/client/cihldren/cardbox/cardbox'
import {
  getDistributors,
  getSuppliers,
  getAddContractOrder,
} from '@/network/client'
import { getAddOutsourcingOrder } from '@/network/deal'

export default {
  components: {
    clientheader,
    borderCard,
    cardbox,
    MainTabBar,
  },
  data() {
    return {
      isdistributor: true,
      issupplier: true,
      titlename: '客户',
      distributor: [],
      supplier: [],
      options: [],
      allArrearsCount: '',
      allArrearsCounts: '',
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
    clickScroll() {
      if (!this.searchID) {
        this.onePage = 1
        this.allPage = this.onePage
        this.distributor = []
        this.getDistri()
      } else {
        this.twoPage = 1
        this.allPage = this.twoPage
        this.supplier = []
        this.getSupplier()
      }
    },
    async getlogin() {
      var storage = window.localStorage
      const res = await getlogin({
        username: storage.getItem('username'),
        password: storage.getItem('password'),
      })
      if (res.code == 200) {
        this.$store.commit('setLoginDate', JSON.parse(JSON.stringify(res.data)))
        this.gettime()
      }
    },
    async gettime() {
      var storage = window.localStorage
      var form = new FormData()
      form.append('username', storage.getItem('username'))
      form.append('password', storage.getItem('password'))
      form.append('company_id', storage.getItem('ChooseCompany'))
      const res = await getIndex(form)
      if (res.code == 200) {
        console.log('登录次数+1')
        this.$store.commit(
          'setUserInfo',
          JSON.parse(JSON.stringify(res.data.userInfo))
        )
        this.$store.commit('setToken', res.data.token)
        this.$store.commit('setcatearr', res.data.userInfo[0].role.catearr)
        this.$store.commit('setoparr', res.data.userInfo[0].role.oparr)
        if (!window.localStorage) {
          storage.setItem('token', JSON.stringify(this.$store.state.token))
        } else {
          storage.setItem('token', JSON.stringify(this.$store.state.token))
        }
        this.dataInfo = res.data.userInfo[0]
        this.imgUrl = this.dataInfo.img_url.substr(1)
        this.jobName = this.dataInfo.role.display_name
        this.phone = this.formatPhone(this.dataInfo.username)
        this.name = this.dataInfo.name
        this.company = this.dataInfo.user_compser_name
      }
    },
    formatPhone(phone) {
      return phone.substr(0, 3) + '****' + phone.substr(7, 11)
    },
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
      this.$router.push(`/clientdetails/distributor/${item.id}`)
    },
    gokhlists(item) {
      this.$router.push(`/clientdetails/supplier/${item.id}`)
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
      this.allArrearsCount = data.allArrearsCount
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
      this.allArrearsCounts = data.allArrearsCount
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
  created() {
    this.getlogin()
    this.show = false
    if (!this.isSearch) {
      this.getDistri()
      this.getSupplier()
    }
  },
  activated() {
    this.$Jurisdiction('18', this.$store.state.catearr, () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
    this.$Jurisdiction('112', this.$store.state.catearr, () => {
      this.isdistributor = false
    })
    this.$Jurisdiction('113', this.$store.state.catearr, () => {
      this.issupplier = false
    })
  },
  destroyed() {
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

    .title {
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
    background-color: rgb(66, 147, 200);
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
