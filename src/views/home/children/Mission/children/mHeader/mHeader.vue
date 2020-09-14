<template>
  <div id="mHeader">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>任务中心</span>
      </div>
      <div slot="right"></div>
    </navbar>
  </div>
</template>
    
<script>
export default {
  name: 'mHeader',
  components: {},
  methods: {
    blackhome() {
      this.$router.replace('/home')
    },
  },
}
</script>
    
<style scoped lang="scss">
#mHeader {
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      margin-left: -2.071429rem;
      span {
        font-size: 1.571429rem;
      }
    }
  }
}
</style>
