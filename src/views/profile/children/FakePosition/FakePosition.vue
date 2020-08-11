<template>
  <div class="options_profile_item d-flex">
    <div class="image_options">
      <img src="@/assets/image/options_logo.png" />
    </div>
    <div class="right_box d-flex">
      <div class="title_options">
        <span>我的位置</span>
      </div>
      <div class="icon_options" @click="goControlled">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
    
<script>
import { computed } from '@vue/composition-api'
export default {
  setup(props, { root }) {
    function goControlled() {
      root.$router.push('/minimap')
    }
    return {
      goControlled,
    }
  },
}
</script>
    
<style  lang="scss">
.options_profile_item {
  height: 3.285714rem;
  justify-content: center;
  align-items: center;
  margin: 0.357143rem 0;
  padding: 0.357143rem 1.071429rem;
  .image_options {
    width: 2.142857rem;
    margin-right: 1.071429rem;
    img {
      width: 2.142857rem;
      height: 2.142857rem;
    }
  }
  .right_box {
    flex: 1;
    border-bottom: 1px solid #fafafa;
    height: 100%;
    .title_options {
      flex: 1;
      display: flex;
      align-items: center;
      span {
        font-size: 1.142857rem;
      }
    }
    .icon_options {
      display: flex;
      align-items: center;
      width: 2.142857rem;
      i {
        font-size: 1.571429rem;
        color: #c8c8c8;
      }
    }
  }
}
</style>
