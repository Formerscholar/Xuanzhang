<template>
  <div id="lists" @click="listhandleClick">
    <span class="list_name">{{name}}</span>
    <div class="list_data">
      <span>{{data}}</span>
      <div class="vaticons" v-if="route == 'WPrice' || route == 'DPrice' || route == 'BOMPrice'"></div>
      <van-icon name="arrow" v-else />
    </div>
  </div>
</template>
    
<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    data: {
      type: String,
      default: '',
    },
    route: {
      type: String,
      default: '',
    },
  },
  methods: {
    listhandleClick() {
      let data = {
        name: this.name,
        data: this.data,
        route: this.route,
      }
      this.$emit('listhandleClick', data)
    },
  },
}
</script>
    
<style scoped lang="scss">
#lists {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  .list_name {
    font-size: 1.142857rem;
    color: #9d9d9d;
  }
  .list_data {
    font-size: 1.142857rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #3a3a3a;
    }
    .van-icon,
    .vaticons {
      margin-left: 2rem;
      color: #e1e1e1;
    }
    .vaticons {
      width: 1.142857rem;
    }
  }
}
</style>
