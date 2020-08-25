<template>
  <div id="pNavBar">
    <navbar class="p_root_box">
      <div class="left" slot="left"></div>
      <div class="center" style="margin-left: 7.142857rem;" slot="center">
        <span>我的</span>
      </div>
      <div class="right" slot="right" @click="goSetup">
        <span>设置</span>
      </div>
    </navbar>
  </div>
</template>
    
<script>
import { reactive } from '@vue/composition-api'

export default {
  setup(props, { root }) {
    function goSetup() {
      root.$router.push('/Setup')
    }

    return {
      goSetup,
    }
  },
}
</script>
    
<style lang="scss" scoped>
#pNavBar {
  .p_root_box {
    font-size: 1.285714rem !important;
    padding: 0 1.714286rem !important;
    padding-top: 1.428571rem !important;
    .center {
      margin-left: 3.14286rem !important;
    }

    .right {
      font-size: 1rem !important;
    }
    .none {
      display: none;
    }
  }
}
</style>
