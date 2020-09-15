<template>
  <div id="stock"></div>
</template>
    
<script>
export default {
  name: 'stock',
  components: {},
  activated() {
    this.$Jurisdiction('30', this.$store.state.catearr, () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
  },
}
</script>
    
<style scoped lang="scss">
#stock {
}
</style>
