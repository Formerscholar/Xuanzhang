<template>
  <div id="Options">
    <van-tabs v-model="active" @click="handleClick">
      <van-tab title="全部合同">
        <slot name="entire"></slot>
      </van-tab>
      <van-tab title="报价合同">
        <slot name="Quote"></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>
    
<script>
export default {
  name: 'Options',
  components: {},
  data() {
    return {
      active: 0
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$emit('selectIndex', tab)
    }
  }
}
</script>
    
<style  lang="scss" >
#Options {
}
</style>
