<template>
  <div class="options_profile_item d-flex">
    <div class="image_options">
      <svg class="icon icons" aria-hidden="true">
        <use xlink:href="#icon-zichanyijiaoguanlixitong" />
      </svg>
    </div>
    <div class="right_box d-flex">
      <div class="title_options">
        <span>可用余额</span>
      </div>
      <div class="icon_options">
        <span>{{state.balance}}元</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
    
<script>
import { reactive, computed } from '@vue/composition-api'
import { getUserIndex } from '@/network/home'
export default {
  setup(props, { root }) {
    const state = reactive({
      balance: '0.00',
    })

    const IndexNewsData = computed(() => {
      return {
        token: root.$store.state.token,
        _: new Date().getTime(),
      }
    })

    async function getUserIndexNews() {
      const { data } = await getUserIndex(IndexNewsData.value)
      state.balance = data.userNews.balance
    }
    getUserIndexNews()
    return {
      state,
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
        font-size: 1.285714rem;
      }
    }
    .icon_options {
      position: relative;
      display: flex;
      align-items: center;
      color: #9e9e9e;
      span {
        font-size: 1rem;
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
