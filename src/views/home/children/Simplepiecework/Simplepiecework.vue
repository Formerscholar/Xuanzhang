<template>
  <div id="PieceworkList">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>简易计件</span>
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
          <div :class="item.status == 1? 'item_warp' :'item_warp warp_color'">
            <div class="items">
              <span>员工</span>
              <em>{{item.user_name}}</em>
            </div>
            <div class="items">
              <span>计件物料</span>
              <em>{{item.materiel_name}}</em>
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
    <i class="el-icon-plus" @click="addClick"></i>
  </div>
</template>
    
<script>
import { reactive, computed, onActivated } from '@vue/composition-api'
import { getSimplePieceWorkWagesList } from '@/network/home'
export default {
  setup(props, { root }) {
    const state = reactive({
      userValuationWagesList: [],
      allpage: 1,
    })
    onActivated(() => {
      root.$Jurisdiction('168', root.$store.state.catearr, () => {
        root.$router.replace('/home')
        root.$toast('您的账号无该模块权限!')
      })
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
      const { data } = await getSimplePieceWorkWagesList(getUserValuaData.value)
      console.log('getSimplePieceWorkWagesList', data)
      const { simplePieceWorkWages } = data
      state.userValuationWagesList = [
        ...state.userValuationWagesList,
        ...simplePieceWorkWages,
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
    function addClick() {
      this.$router.push('/Simplework')
    }

    getUserValuaList()
    return {
      state,
      onClickLeft,
      clickScroll,
      loadMore,
      addClick,
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
  .el-icon-plus {
    position: fixed;
    bottom: 3.357143rem;
    right: 3.357143rem;
    padding: 0.571429rem;
    z-index: 999;
    font-size: 2.714286rem;
    background-color: rgb(66, 147, 200);
    color: #fff;
    border-radius: 50%;
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
        border-left: 0.857143rem solid red;
        margin-bottom: 0.714286rem;
        background-color: #fff;
        .items {
          padding: 0 0.714286rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.142857rem;
          em {
            color: #b0b0b0;
          }
        }
      }
      .warp_color {
        border-color: rgb(66, 147, 200);
      }
    }
  }
}
</style>
