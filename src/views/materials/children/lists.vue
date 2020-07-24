<template>
  <div id="lists" @click="handleClick">
    <span class="list_name">{{name}}</span>
    <div class="list_data">
      <span>{{data}}</span>
      <van-icon name="arrow" />
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
    item: {
      type: Object,
      default: {},
    },
  },
  methods: {
    handleClick() {
      this.$router.push({
        path: '/editMaterialItem',
        query: {
          data: { ...this.item },
        },
      })
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
    span {
      color: #3a3a3a;
    }
    .van-icon {
      margin-left: 2rem;
      color: #e1e1e1;
    }
  }
}
</style>
