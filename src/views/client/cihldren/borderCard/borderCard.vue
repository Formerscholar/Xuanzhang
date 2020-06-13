<template>
  <div id="borderCard">
    <van-tabs v-model="active" class="border-card" @click="handleClick">
      <van-tab title="客户列表" class="CustomerList">
        <slot name="search"></slot>
        <slot name="card"></slot>
      </van-tab>
      <van-tab title="供应商列表" class="SupplierList">
        <slot name="Supplisearch"></slot>
        <slot name="Supplicard"></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>
    
<script>
export default {
  name: 'borderCard',
  components: {},
  data() {
    return {
      active: 0
    }
  },
  methods: {
    handleClick(title) {
      this.$emit('tabListTach', title)
    }
  }
}
</script>
    
<style scoped lang="scss">
#borderCard {
  .border-card {
    .CustomerList {
    }
    .SupplierList {
    }
  }
}
</style>
