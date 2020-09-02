<template>
  <div id="shipments">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>等待发货</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll_wrapper" ref="scrollss" :probe-type="3" :pull-up-load="true">shipments</scroll>
  </div>
</template>
    
<script>
import { reactive } from '@vue/composition-api'
export default {
  setup(props, { root }) {
    const state = reactive({})

    function blacknext() {
      root.$router.replace('/home')
    }

    return {
      state,
      blacknext,
    }
  },
}
</script>
    
<style scoped lang="scss">
#shipments {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #fff;
    border: none;
    box-shadow: none;
    z-index: 10;
    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -2.071429rem;
      font-size: 1.285714rem;
    }
  }
  .scroll_wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
}
</style>
