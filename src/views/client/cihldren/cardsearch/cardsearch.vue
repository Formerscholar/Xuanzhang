<template>
  <div id="cardsearch">
    <div class="search">
      <el-autocomplete
        v-model="inputvalue"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入客户名称"
        prefix-icon="el-icon-search"
        @select="handleSelect"
        @change="handleChange"
      ></el-autocomplete>
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
  watch: {
    inputvalue: (newQuestion, oldQuestion) => {
      console.log('newQuestion', newQuestion)
      console.log('oldQuestion', oldQuestion)
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
      this.handleChange()
    },
    async handleChange(value) {
      const { data } = await getDistributors(this.getDistributorsData)
      this.$emit('Rendering', data.distributor)
      this.inputvalue = ''
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
    padding: 0.714286rem;
    justify-content: space-between;
    .el-autocomplete {
      flex: 1;
      margin-right: 0.571429rem;
    }
    .search_btn {
      width: 5rem;
    }
  }
}
</style>
