<template>
  <div id="machining"></div>
</template>
    
<script>
export default {
  activated() {
    this.$Jurisdiction('29', localStorage.getItem('catearr'), () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
  },
}
</script>
    
<style scoped>
</style>
