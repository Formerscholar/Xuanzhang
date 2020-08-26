<template>
  <div class="options_profile_item d-flex">
    <div class="image_options">
      <svg class="icon icons" aria-hidden="true">
        <use xlink:href="#icon-zhihuigongdixitong" />
      </svg>
    </div>
    <div class="right_box d-flex">
      <div class="title_options">
        <span>版本号</span>
      </div>
      <div class="icon_options" @click="goSetup">
        <span>{{state.version}}</span>
        <i class="el-icon-arrow-right"></i>
        <div class="redicon" v-if="state.isShow"></div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { reactive, onActivated } from '@vue/composition-api'
import { getAppVersion } from '@/network/login'
import { version } from '@/AppConfig'

export default {
  setup(props, { root }) {
    const state = reactive({
      version,
      isShow: false,
    })
    onActivated(() => {
      getNativeVersion()
    })

    async function getNativeVersion() {
      const { code, data, msg } = await getAppVersion()
      if (code == 200) {
        if (state.version !== data.version) {
          state.isShow = true
        } else {
          state.isShow = false
        }
      }
    }

    function goSetup() {
      root.$router.push('/Setup')
    }
    return {
      state,
      goSetup,
    }
  },
}
</script>
    
<style  lang="scss" scoped>
.options_profile_item {
  height: 3.285714rem;
  justify-content: space-between;
  align-items: center;
  margin: 0.357143rem 0;
  padding: 0.357143rem 1.428571rem;
  .image_options {
    width: 2.142857rem;
    margin-right: 1.428571rem;
    .icons {
      width: 1.785714rem;
      height: 1.785714rem;
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
        font-size: 1.428571rem;
      }
    }
    .icon_options {
      position: relative;
      display: flex;
      align-items: center;
      color: #9e9e9e;
      .redicon {
        position: absolute;
        right: 1.857143rem;
        top: 0;
        width: 0.571429rem;
        height: 0.571429rem;
        border-radius: 50%;
        background-color: red;
      }
      span {
        font-size: 1.142857rem;
      }
      i {
        font-size: 1.285714rem;
        width: 2.142857rem;
        margin-left: 0.357143rem;
      }
    }
  }
}
</style>
