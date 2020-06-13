<template>
  <div id="cardsearch">
    <div class="search">
      <el-button type="primary" plain class="addcustomer" @click="addcus">添加客户</el-button>
      <el-autocomplete
        v-model="inputvalue"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入客户名称"
        @select="handleSelect"
      ></el-autocomplete>
      <el-button class="search_btn" type="info" plain @click="searchClick">搜索</el-button>
    </div>
  </div>
</template>
    
<script>
import { getDistributors } from '@/network/client'
export default {
  data() {
    return {
      inputvalue: '',
      inputID: '',
      restaurants: [],
      timeout: null
    }
  },
  computed: {
    getDistributorsData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        id: this.inputID,
        _: new Date().getTime()
      }
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    loadAll() {
      return this.options
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      this.inputID = item.address
    },
    async searchClick() {
      const { data } = await getDistributors(this.getDistributorsData)
      this.$emit('Rendering', data.distributor)
    },
    addcus() {
      this.$store.state.gokhlist = []
      this.$emit('addcus')
    }
  },
  props: {
    options: {
      type: Array,
      default: []
    }
  }
}
</script>
    
<style scoped lang="scss">
#cardsearch {
  .search {
    display: flex;
    padding: 0.714286rem 0;
    justify-content: space-between;
    .addcustomer {
      width: 6rem;
    }
    .el-input {
      flex: 1;
      margin: 0 0.714286rem;
    }
    .search_btn {
      width: 5rem;
    }
  }
}
</style>
