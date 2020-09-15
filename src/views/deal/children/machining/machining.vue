<template>
  <div id="machining"></div>
</template>
    
<script>
export default {
  name: 'machining',
  components: {},
  activated() {
    this.$Jurisdiction('29', this.$store.state.catearr, () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
  },
}
</script>
    
<style scoped>
</style>
