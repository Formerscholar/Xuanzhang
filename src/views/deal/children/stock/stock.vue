<template>
  <div id="stock"></div>
</template>
    
<script>
export default {
  activated() {
    this.$Jurisdiction('30', localStorage.getItem('catearr'), () => {
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
