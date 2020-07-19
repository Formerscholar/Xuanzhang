<template>
  <navbar class="top_content d-flex">
    <div class="left_box" slot="left"></div>
    <div class="header_title" slot="center">财富</div>
    <i class="el-icon-search my_search" slot="right"></i>
  </navbar>
</template>
    
<script>
 

export default {
  name: 'oTopbar',
  components: {
  }
}
</script>
    
<style lang="scss">
.top_content {
  justify-content: space-between !important ;
  font-size: 1.428571rem;
  .left_box,
  .header_title,
  .my_search {
    margin-top: 0.357143rem;
  }
  .left_box {
    width: 3rem;
  }
  .header_title {
    width: 5rem;
    line-height: 3.214286rem;
  }
  .my_search {
    display: block;
    width: 3rem;
  }
}
</style>
