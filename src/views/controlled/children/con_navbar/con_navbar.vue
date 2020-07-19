<template>
  <navbar class="Controlled_root">
    <i class="el-icon-arrow-left text-primary" slot="left" @click="callBack"></i>
    <div class="title text-black" slot="center">
      <span>受控账户</span>
    </div>
    <i slot="right"></i>
  </navbar>
</template>
    
<script>
 

export default {
  name: 'con_navbar',
  methods: {
    callBack() {
      this.$router.go(-1)
    }
  }
}
</script>
    
<style lang="scss">
.Controlled_root {
  font-size: 1.285714rem;
  background-color: #fff;
  box-shadow: 0 0 15px 3px #fff;
  border: none;
  font-weight: 700;

  .el-icon-arrow-left {
    display: block;
    font-size: 1.714286rem;
    margin-left: 0.714286rem;
  }
  .title {
    margin-left: -0.714286rem;
  }
}
</style>
