<template>
  <div id="Payrollsummary">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>工资汇总</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll-wrapper" ref="scroll" :probe-type="3" :pull-up-load="true">
      <div
        class="items_box"
        v-for="item in state.monthWages"
        :key="item.id"
      >{{item.year}}年{{item.month}}月{{item.name}}{{item.wages_money}}元{{item.operator_name}}{{item.remark}}</div>
    </scroll>
  </div>
</template>

<script>
import { reactive, computed } from '@vue/composition-api'
import { getMonthWagesList } from '@/network/home'
export default {
  setup(props, { root }) {
    const state = reactive({
      monthWages: [],
    })

    function onClickLeft() {
      root.$router.replace('/home')
    }

    const MonthList = computed(() => {
      return {
        token: root.$store.state.token,
        page: 1,
        offset: 20,
        user_id: 0,
        year: null,
        month: null,
        _: new Date().getTime(),
      }
    })

    async function getMonthList() {
      const { data } = await getMonthWagesList(MonthList.value)
      state.monthWages = [...state.monthWages, ...data.monthWages]
      console.log('getMonthList', state.monthWages)
    }

    getMonthList()

    return {
      state,
      onClickLeft,
    }
  },
}
</script>

<style lang="scss" scoped>
#Payrollsummary {
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
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
}
</style>