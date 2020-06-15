<template>
  <div id="Client">
    <scroll class="scroll-wrapper">
      <borderCard @tabListTach="tabListTach">
        <cardsearch :options="options" slot="search" @Rendering="Rendering" />
        <cardbox
          :distributor="distributor"
          @gokhlist="gokhlist"
          :titlename="titlename"
          @refreshList="refreshList"
          slot="card"
        />
        <cardsearchs :optionss="optionss" slot="Supplisearch" @Rendering="Renderings" />
        <cardbox
          :distributor="supplier"
          @refreshList="refreshLists"
          @gokhlist="gokhlist"
          :titlename="titlename"
          slot="Supplicard"
        />
      </borderCard>
    </scroll>
    <i class="el-icon-plus" @click="btnsclickadd"></i>
    <van-action-sheet
      v-model="show"
      @select="onselect"
      @cancel="onshow"
      @click-overlay="onshow"
      :actions="actions"
      cancel-text="取消"
    />
  </div>
</template>
    
<script>
import clientheader from '@/views/client/cihldren/clientheader/clientheader'
import borderCard from '@/views/client/cihldren/borderCard/borderCard'
import cardsearch from '@/views/client/cihldren/cardsearch/cardsearch'
import cardsearchs from '@/views/client/cihldren/cardsearchs/cardsearchs'
import cardbox from '@/views/client/cihldren/cardbox/cardbox'
import {
  getDistributors,
  getSuppliers,
  getAddContractOrder
} from '@/network/client'
import { getAddOutsourcingOrder } from '@/network/deal'
import scroll from '@/components/common/scroll/scroll'

export default {
  name: 'Client',
  components: {
    clientheader,
    borderCard,
    cardsearch,
    cardsearchs,
    cardbox,
    scroll
  },
  data() {
    return {
      titlename: '客户',
      distributor: [],
      supplier: [],
      options: [],
      optionss: [],
      show: false,
      actions: [{ name: '个人客户' }, { name: '企业客户' }]
    }
  },
  methods: {
    btnsclickadd() {
      this.$store.state.gokhlist = []
      this.show = true
      document.querySelector('#tab-bar').style.height = '0px'
    },
    Rendering(data) {
      this.distributor = data
    },
    Renderings(data) {
      this.supplier = data
    },
    async getAddOutsourcing() {
      const { data } = await getAddOutsourcingOrder({
        token: this.$store.state.token
      })
      data.suppliers.map(item => {
        this.optionss.push({
          address: item.id,
          value: item.name
        })
      })
    },
    async getAddContract() {
      const { data } = await getAddContractOrder({
        token: this.$store.state.token
      })
      data.distributors.map(item => {
        this.options.push({
          address: item.id,
          value: item.name
        })
      })
    },
    refreshList() {
      this.getDistri()
    },
    refreshLists() {
      this.getSupplier()
    },
    onCancel() {
      this.show = false
      console.log('cancel')
    },
    gokhlist(item) {
      this.$router.push({
        path: '/clientdetails',
        query: {
          data: item
        }
      })
    },
    tabListTach(e) {
      if (e == 0) {
        this.titlename = '客户'
      } else if (e == 1) {
        this.titlename = '供应商'
      }
    },
    addcus() {
      this.show = true
      document.querySelector('#tab-bar').style.height = '0px'
    },
    onshow() {
      this.show = false
      document.querySelector('#tab-bar').style.height = '59px'
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
      this.distributor = data.distributor
      console.log('Distri', this.distributor)
    },
    async getSupplier() {
      const { data } = await getSuppliers(this.getDistributorsData)
      this.supplier = data.supplier
      console.log('getSuppliers', this.supplier)
    }
  },
  computed: {
    getDistributorsData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        _: new Date().getTime()
      }
    }
  },
  activated() {
    this.show = false
    this.getDistri()
    this.getSupplier()
    this.getAddContract()
    this.getAddOutsourcing()
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    this.options = []
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
  }
}
</script>
    
<style lang="scss" scoped>
#Client {
  height: calc(100vh - 9.642857rem);
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
    padding: 0 1rem;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 4.214286rem;
    width: 100%;
    overflow: hidden;
  }
}
</style>
