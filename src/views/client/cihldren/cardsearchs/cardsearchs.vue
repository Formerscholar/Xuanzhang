<template>
  <div id="cardsearch">
    <div class="search">
      <el-button type="primary" plain class="addcustomer" @click="addcus">添加供应商</el-button>
      <el-autocomplete
        v-model="inputvalue"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入供应商名称"
        @select="handleSelect"
      ></el-autocomplete>
      <el-button class="search_btn" type="info" plain @click="searchClick">搜索</el-button>
    </div>
  </div>
</template>
    
<script>
import { getSuppliers } from '@/network/client'
export default {
  data() {
    return {
      inputvalue: '',
      inputID: '',
      restaurants: [],
      timeout: null
    }
  },
  props: {
    optionss: {
      type: Array,
      default: []
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
      return this.optionss
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
      const { data } = await getSuppliers(this.getDistributorsData)
      this.$emit('Rendering', data.supplier)
    },
    addcus() {
      this.$store.state.gokhlist = []
      this.$emit('addcus')
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
