<template>
  <div id="pageTop">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>个人信息</span>
      </div>
      <div slot="right"></div>
    </navbar>
  </div>
</template>
    
<script>
 

export default {
  name: 'pageTop',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
    
<style lang="scss" scoped>
#pageTop {
  padding-top: 5.428571rem;

  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -1.071429rem;
      font-size: 1.285714rem;
    }
  }
}
</style>
