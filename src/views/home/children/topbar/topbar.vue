<template>
  <navbar class="root_box">
    <div class="top_search d-flex" slot="left">
      <i class="el-icon-search"></i>
      <el-input placeholder="搜索" v-model="input" clearable></el-input>
      <i class="el-icon-mic"></i>
    </div>
    <i class="el-icon-user" slot="center"></i>
    <i class="el-icon-plus" slot="right"></i>
  </navbar>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'

export default {
  name: 'topbar',
  components: {
    navbar
  },
  data() {
    return {
      input: ''
    }
  }
}
</script>
    
<style lang="scss">
.root_box {
  i {
    display: block;
    width: 1.428571rem;
    font-size: 1.428571rem;
  }
  .left {
    flex: 1;
    .top_search {
      position: relative;
      left: 1.357143rem;
      top: 0.357143rem;
      height: 100%;
      width: 100%;
      margin-right: 0.714286rem;
      justify-content: center;
      align-items: center;
      .el-icon-search {
        color: #ccc;
        position: absolute;
        left: 0.214286rem;
        z-index: 9999;
      }
      input {
        padding: 0 1.714286rem;
      }
      .el-icon-mic {
        color: #ccc;
        position: relative;
        right: 2.071429rem;
        z-index: 9999;
      }
    }
  }
  .center {
    width: 2.5rem;
    height: 100%;
    position: relative;
    top: 0.428571rem;
  }
  .right {
    width: 2.5rem;
    height: 100%;
    position: relative;
    top: 0.428571rem;
  }
}
</style>
