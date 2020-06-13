<template>
  <div id="dpageheader">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="goBack">
        <i class="el-icon-back"></i>
      </div>
      <div class="center" slot="center">
        <span>任务详情</span>
      </div>
      <div slot="right"></div>
    </navbar>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'

export default {
  name: 'dpageheader',
  components: { navbar },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
    
<style lang="scss" scoped>
#dpageheader {
  z-index: 99;
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      margin-left: -3.071429rem;
      span {
        font-size: 1.571429rem;
      }
    }
  }
}
</style>
