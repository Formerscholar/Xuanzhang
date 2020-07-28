<template>
  <div id="cardsearch">
    <div class="bg"></div>
    <div class="search">
      <div class="product-head">
        <van-icon name="arrow-left" @click="blacknext" />
        <div id="form">
          <form class="filterform" action="#">
            <input class="filterinput" id="forms" v-model="value" type="text" />
            <van-icon name="close" @click="closeClick" />
          </form>
        </div>
      </div>
      <ul id="demo-list">
        <li v-for="item in listItem" :key="item.id" @click="handleClick(item)">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
    
<script>
import { filterList } from '@/common/my_search'
import {
  getSuppliers,
  getDistributors,
  getAddContractOrder,
} from '@/network/client'
import { getAddOutsourcingOrder } from '@/network/deal'

export default {
  data() {
    return {
      listItem: [],
      value: '',
      itemData: {},
      iid: 0,
      inputID: 0,
    }
  },
  activated() {
    this.iid = this.$route.query.searchID
    console.log(this.iid, this.listItem)
    if (!this.iid) {
      this.getAddContract()
    } else {
      this.getAddOutsourcing()
    }
    filterList(
      document.getElementById('form'),
      document.getElementById('demo-list')
    )
  },
  deactivated() {
    this.listItem = []
    this.value = ''
    this.itemData = {}
    this.iid = 0
    this.inputID = 0
  },
  computed: {
    getDistributorsData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        id: this.inputID,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    async getAddOutsourcing() {
      const { data } = await getAddOutsourcingOrder({
        token: this.$store.state.token,
      })
      data.suppliers.map((item) => {
        this.listItem.push({
          id: item.id,
          name: item.name,
        })
      })
    },
    async getAddContract() {
      const { data } = await getAddContractOrder({
        token: this.$store.state.token,
      })
      data.distributors.map((item) => {
        this.listItem.push({
          id: item.id,
          name: item.name,
        })
      })
    },
    async handleChange() {
      const { data } = await getSuppliers(this.getDistributorsData)
      console.log(data.supplier)
      this.$bus.$emit('cardsearch', data.supplier)
      this.blacknext()
    },
    async handleChanges() {
      const { data } = await getDistributors(this.getDistributorsData)
      console.log(data.distributor)
      this.$bus.$emit('cardsearch', data.distributor)
      this.blacknext()
    },
    closeClick() {
      this.value = ''
    },
    handleClick(item) {
      this.itemData = { ...item }
      this.value = item.name
      this.inputID = item.id
      console.log(item)
      if (!this.iid) {
        this.handleChanges()
      } else {
        this.handleChange()
      }
    },
    blacknext() {
      this.listItem = []
      this.value = ''
      this.itemData = {}
      this.iid = 0
      this.inputID = 0
      this.$router.go(-1)
    },
  },
}
</script>
    
<style scoped lang="scss">
#cardsearch {
  .bg {
    height: 1.571429rem;
    width: 100%;
    background-color: #ccc;
  }
  .search {
    position: relative;
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    border: 1px solid #ddd;
    .product-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.571429rem 1rem;
      background-color: #f1f1f1;
      .van-icon {
        font-size: 1.571429rem;
      }
      #form {
        flex: 1;
        margin-left: 0.714286rem;
        .filterform {
          border: 1px solid #999;
          border-radius: 1.071429rem;
          padding: 0.285714rem 0.857143rem;
          background-color: #fff;
          position: relative;
          .filterinput {
            font-size: 1rem;
            padding: 0;
            border: 0;
            outline: none;
            width: 100%;
          }
          .van-icon {
            font-size: 1rem;
            position: absolute;
            right: 0.714286rem;
            top: 0.5rem;
          }
        }
      }
    }
    #demo-list li {
      padding: 8px;
      list-style: none;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #fff;
      span {
        color: #000;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11px;
        text-decoration: none;
      }
    }
  }
}
</style>
