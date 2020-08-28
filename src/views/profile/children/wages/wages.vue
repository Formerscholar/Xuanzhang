<template>
  <div class="options_profile_item d-flex">
    <div class="image_options">
      <svg class="icon icons" aria-hidden="true">
        <use xlink:href="#icon-baogao" />
      </svg>
    </div>
    <div class="right_box d-flex">
      <div class="title_options">
        <span>工资</span>
      </div>
      <div class="icon_options">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
    
<script>
import { reactive } from '@vue/composition-api'

export default {
  setup(props, { root }) {
    const state = reactive({})

    return {
      state,
    }
  },
}
</script>
    
<style  lang="scss" scoped>
.options_profile_item {
  height: 3.357143rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.428571rem;
  .image_options {
    margin-right: 1.428571rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .icons {
      width: 1.571429rem;
      height: 1.571429rem;
    }
  }
  .right_box {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #fafafa;
    height: 100%;
    .title_options {
      display: flex;
      align-items: center;
      span {
        font-size: 1.214286rem;
      }
    }
    .icon_options {
      position: relative;
      display: flex;
      align-items: center;
      color: #9e9e9e;
      span {
        font-size: 0.928571rem;
      }
      i {
        font-size: 1.214286rem;
        margin-left: 0.357143rem;
      }
    }
  }
}
</style>
