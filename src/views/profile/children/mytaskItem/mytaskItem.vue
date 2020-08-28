<template>
  <div class="options_profile_item d-flex" @click="gomission">
    <div class="image_options">
      <svg class="icon icons" aria-hidden="true">
        <use xlink:href="#icon-xiangmurenwu" />
      </svg>
    </div>
    <div class="right_box d-flex">
      <div class="title_options">
        <span>我的任务</span>
      </div>
      <div class="icon_options">
        <span>{{state.doQuantity}}条待办</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
    
<script>
import { reactive, computed } from '@vue/composition-api'
import { getUserDesignatedTasks } from '@/network/home'
export default {
  setup(props, { root }) {
    const state = reactive({
      doQuantity: 0,
    })

    const getUserDesignatedData = computed(() => {
      return {
        token: root.$store.state.token,
        page: 1,
        offset: 20,
        _: new Date().getTime(),
      }
    })

    async function getUserDesignated() {
      const { data } = await getUserDesignatedTasks(getUserDesignatedData.value)
      state.doQuantity = data.designatedTasksList.length
    }

    function gomission() {
      root.$router.push('/mission')
    }
    getUserDesignated()

    return {
      state,
      gomission,
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
  border-bottom: 0.714286rem solid #f5f5f5;

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
