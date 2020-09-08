<template>
  <div id="PieceworkList">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>计价列表</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <van-search v-model="value" show-action placeholder="请输入搜索关键词" />
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="clickScroll"
      @pullingUp="loadMore"
    >
      <div class="context">
        <van-swipe-cell v-for="item in state.userValuationWagesList" :key="item.id">
          <div class="item_warp">
            <div class="items">
              <span>员工</span>
              <em>{{item.user_name}}</em>
            </div>
            <div class="items">
              <span>模式</span>
              <em>{{item.valuation_name}}</em>
            </div>
            <div class="items">
              <span>工资</span>
              <em>{{item.money}}</em>
            </div>
            <div class="items">
              <span>日期</span>
              <em>{{item.apply_time}}</em>
            </div>
            <div class="items">
              <span>操作人</span>
              <em>{{item.operator_name}}</em>
            </div>
            <div class="items">
              <span>备注</span>
              <em>{{item.remark}}</em>
            </div>
          </div>
          <template #right>
            <van-button style="height:100%;" square type="danger" text="编辑" />
          </template>
        </van-swipe-cell>
      </div>
    </scroll>
  </div>
</template>
    
<script>
import { reactive, computed } from '@vue/composition-api'
import { getUserValuationWagesList } from '@/network/home'
export default {
  setup(props, { root }) {
    const state = reactive({
      userValuationWagesList: [],
      allpage: 1,
    })
    function onClickLeft() {
      root.$router.replace('/home')
    }
    const getUserValuaData = computed(() => {
      return {
        token: root.$store.state.token,
        page: state.allpage,
        offset: 20,
        user_id: 0,
        start_time: null,
        end_time: null,
        _: new Date().getTime(),
      }
    })

    async function getUserValuaList() {
      const { data } = await getUserValuationWagesList(getUserValuaData.value)
      console.log('getUserValuationWagesList', data)
      const { userValuationWagesList } = data
      state.userValuationWagesList = [
        ...state.userValuationWagesList,
        ...userValuationWagesList,
      ]
      console.log(state.userValuationWagesList)
    }

    function clickScroll() {
      state.allpage = 1
      state.userValuationWagesList = []
      getUserValuaList()
    }
    function loadMore() {
      state.allpage++
      getUserValuaList()
    }

    getUserValuaList()
    return {
      state,
      onClickLeft,
      clickScroll,
      loadMore,
    }
  },
}
</script>
    
<style scoped lang="scss">
#PieceworkList {
  padding-top: 5.428571rem;
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
        font-size: 1.428571rem;
      }
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 9.285714rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .context {
      padding: 0.714286rem;
      background-color: #eeeef0;
      .item_warp {
        border-left: 0.857143rem solid #ef9235;
        margin-bottom: 0.714286rem;
        background-color: #fff;
        .items {
          padding: 0 0.714286rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.142857rem;
          em {
            color: #5b87dd;
          }
        }
      }
    }
  }
}
</style>
