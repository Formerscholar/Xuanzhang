<template>
  <div id="MySalary">
    <navbar class="Controlled_root">
      <i class="el-icon-arrow-left text-primary" slot="left" @click="callBack"></i>
      <div class="title text-black" slot="center">
        <span>我的工资</span>
      </div>
    </navbar>
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="scroll"
      @pullingUp="pullingUp"
    >
      <div class="context_box">
        <div v-for="item in state.monthWages" :key="item.id">
          <div v-if="!item.deleted_at" :class="[item.deleted_at?'items_box bg_delect':'items_box']">
            <div class="top_box">
              <div class="timers">{{item.year}}年{{item.month}}月</div>
              <div class="pierpoe">{{item.name}}</div>
              <div class="money">{{item.wages_money}}元</div>
            </div>
            <div class="bot_box">
              <div class="caozuo">操作人:{{item.operator_name}}</div>
              <div class="remarks">
                <div
                  v-for="items in item.auditRecord"
                  :key="items.user_id"
                  :class="items.status == 0 ? 'examines-bg examines-bg-pramiry' : 'examines-bg examines-bg-info'"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      allPage: 1,
    })

    function callBack() {
      root.$router.replace('/profile')
    }

    const getMonthData = computed(() => {
      return {
        token: root.$store.state.token,
        page: state.allPage,
        offset: 20,
        user_id: root.$store.state.userInfo[0].id,
        year: null,
        month: null,
        _: new Date().getTime(),
      }
    })

    async function getMonthList() {
      const { data } = await getMonthWagesList(getMonthData.value)
      console.log('getMonthList', data)
      state.monthWages = [...state.monthWages, ...data.monthWages]
    }

    function scroll() {
      state.allPage = 1
      state.monthWages = []
      getMonthList()
    }

    function pullingUp() {
      state.allPage++
      getMonthList()
    }

    getMonthList()

    return {
      state,
      callBack,
      scroll,
      pullingUp,
    }
  },
}
</script>

<style lang="scss" scoped>
#MySalary {
  padding-top: 5.428571rem;
  .Controlled_root {
    font-size: 1.285714rem;
    border: none;
    font-weight: 700;

    .el-icon-arrow-left {
      color: #fff;
      display: block;
      font-size: 1.714286rem;
      margin-left: 0.714286rem;
    }
    .title {
      margin-left: -1.285714rem;
      color: #fff;
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
    .context_box {
      padding: 0.357143rem;
      .items_box {
        margin: 0 0.571429rem;
        min-height: 3.5rem;
        margin-bottom: 0.857143rem;
        animation: breathe 2700ms ease-in-out infinite alternate;
        font-size: 1.142857rem;
        padding: 0.357143rem 0.714286rem;
        .top_box,
        .bot_box {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .top_box {
          .timers {
            flex: 1;
            text-align: left;
          }
          .pierpoe {
            text-align: center;
            flex: 1;
          }
          .money {
            text-align: right;
            flex: 1;
          }
        }
        .bot_box {
          margin-top: 0.857143rem;
          .remarks {
            margin-left: 0.357143rem;
            display: flex;
            .examines-bg {
              width: 0.857143rem;
              height: 0.857143rem;
              margin-right: 0.357143rem;
            }
            .examines-bg-pramiry {
              background-color: #ccc;
            }
            .examines-bg-info {
              background-color: rgb(66, 147, 200);
            }
          }
        }
      }
      .bg_delect {
        background-color: #b2bec3;
        color: #dfe6e9;
        animation: normal;
      }
    }
  }
  @keyframes breathe {
    0% {
      opacity: 0.6;
      box-shadow: 0 0.071429rem 0.071429rem #353b48;
    }
    100% {
      opacity: 1;
      box-shadow: 0 0.071429rem 1rem #2f3640;
    }
  }
}
</style>