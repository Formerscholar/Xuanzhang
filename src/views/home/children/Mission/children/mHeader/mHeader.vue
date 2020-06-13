<template>
  <div id="mHeader">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <i class="el-icon-back"></i>
      </div>
      <div class="center" slot="center">
        <span>任务中心</span>
      </div>
      <div class="right" slot="right" @click="tike">
        <i class="el-icon-circle-plus-outline"></i>
      </div>
    </navbar>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'

export default {
  name: 'mHeader',
  components: {
    navbar
  },
  methods: {
    blackhome() {
      this.$router.go(-1)
    },
    tike() {
      this.$emit('tike')
    }
  }
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
      margin-left: 0.928571rem;
      span {
        font-size: 1.571429rem;
      }
    }
    .right {
      margin-right: 1.071429rem;
      height: 100%;
      i {
      }
    }
  }
}
</style>
