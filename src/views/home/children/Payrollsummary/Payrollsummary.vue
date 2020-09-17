<template>
  <div id="Payrollsummary">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>工资汇总</span>
      </div>
      <div class="right" slot="right" @click="state.isPicker = true">
        <van-icon name="bookmark-o" />
      </div>
    </navbar>
    <van-dropdown-menu>
      <van-dropdown-item
        title="员工"
        v-model="state.value1"
        :options="state.option1"
        @change="dropChange"
      />
      <van-dropdown-item title="日期" ref="item" @close="dropClose">
        <van-field v-model="state.dropdownYear" type="digit" placeholder="请输入年份" />
        <van-field v-model="state.dropdownMonth" type="digit" placeholder="请输入月份" />
      </van-dropdown-item>
    </van-dropdown-menu>
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="scroll"
      @pullingUp="pullingUp"
    >
      <div class="context_box">
        <van-swipe-cell v-for="item in state.monthWages" :key="item.id">
          <div :class="[item.deleted_at?'items_box bg_delect':'items_box']">
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
          <template #right>
            <van-button
              v-if="!item.to_examine"
              square
              type="primary"
              style="height:100%;"
              text="核准"
              @click="approvalitem(item.id)"
            />
            <van-button
              v-else-if="!item.deleted_at || item.to_examine"
              square
              type="info"
              style="height:100%;"
              text="取消核准"
              @click="NoApprovalitem(item.id)"
            />
            <van-button
              v-if="!item.deleted_at && !item.to_examine"
              square
              type="danger"
              style="height:100%;"
              text="作废"
              @click="delectitem(item.id)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </scroll>
    <van-datetime-picker
      class="datetime"
      v-if="state.isPicker"
      v-model="state.currentDate"
      type="year-month"
      title="选择年月"
      :min-date="state.minDate"
      :max-date="state.maxDate"
      :formatter="formatter"
      @cancel="state.isPicker = false"
      @confirm="confirm"
    />
    <van-popup
      v-model="state.popupshow"
      position="bottom"
      :style="{ height: '20%' }"
      @close="popupClose"
    >
      <van-field
        v-model="state.searchName"
        readonly
        @click="state.namePicker = true"
        label="姓名"
        placeholder="点击选择员工"
      />
      <van-field
        v-model="state.message"
        rows="2"
        autosize
        label="备注"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <van-picker
      class="datetime"
      v-if="state.namePicker"
      title="选择员工"
      show-toolbar
      :columns="state.columns"
      @confirm="onConfirm"
      @cancel="state.namePicker = false"
    />
  </div>
</template>

<script>
import { reactive, computed } from '@vue/composition-api'
import {
  getMonthWagesList,
  delMonthWages,
  toExamine,
  cacnelToExamine,
  addMonthWages,
} from '@/network/home'
export default {
  setup(props, { root }) {
    const state = reactive({
      monthWages: [],
      popupshow: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      isPicker: false,
      namePicker: false,
      searchName: '',
      message: '',
      columns: [],
      users: [],
      year: '',
      month: '',
      user_id: '',
      allPage: 1,
      value1: 0,
      option1: [],
      dropdownYear: null,
      dropdownMonth: null,
      dropdownUser_id: 0,
    })

    function onClickLeft() {
      state.monthWages = []
      state.popupshow = false
      state.isPicker = false
      state.namePicker = false
      state.searchName = ''
      state.message = ''
      state.columns = []
      state.users = []
      state.year = ''
      state.month = ''
      state.user_id = ''
      state.allPage = 1
      state.value1 = 0
      state.option1 = []
      state.dropdownYear = null
      state.dropdownMonth = null
      state.dropdownUser_id = 0
      root.$router.replace('/home')
    }

    const MonthList = computed(() => {
      return {
        token: root.$store.state.token,
        page: state.allPage,
        offset: 20,
        user_id: state.dropdownUser_id,
        year: state.dropdownYear,
        month: state.dropdownMonth,
        _: new Date().getTime(),
      }
    })

    async function getMonthList() {
      const { data } = await getMonthWagesList(MonthList.value)
      state.monthWages = [...state.monthWages, ...data.monthWages]
      console.log('getMonthList', state.monthWages)
      state.users = [...data.users]
      state.columns = state.users.map((item) => item.name)
      state.option1 = state.users.map((item) => {
        return {
          text: item.name,
          value: item.id,
        }
      })
    }

    async function delectitem(id) {
      const { code, msg } = await delMonthWages({
        token: root.$store.state.token,
        id,
      })
      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        state.monthWages = []
        getMonthList()
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }

    async function approvalitem(id) {
      const { code, msg } = await toExamine({
        id,
        token: root.$store.state.token,
      })
      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        state.monthWages = []
        getMonthList()
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }

    async function NoApprovalitem(id) {
      const { code, msg } = await cacnelToExamine({
        id,
        token: root.$store.state.token,
      })
      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        state.monthWages = []
        getMonthList()
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }

    function formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    }

    function confirm(value) {
      let data = new Date(value)
      state.year = data.getFullYear()
      state.month = data.getMonth() + 1
      state.isPicker = false
      state.popupshow = true
    }

    function onConfirm(value, index) {
      state.searchName = value
      state.user_id = state.users.filter(
        (item, index1) => index == index1
      )[0].id
      state.namePicker = false
    }

    async function popupClose() {
      const { code, msg } = await addMonthWages({
        token: root.$store.state.token,
        user_id: state.user_id,
        generate_year: state.year,
        generate_month: state.month,
        remark: state.message,
      })

      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        scroll()
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }

    function scroll() {
      state.searchName = ''
      state.message = ''
      state.value1 = 0
      state.dropdownUser_id = 0
      state.dropdownYear = null
      state.dropdownMonth = null
      state.allPage = 1
      state.monthWages = []
      getMonthList()
    }

    function pullingUp() {
      state.allPage++
      getMonthList()
    }

    function dropChange(value) {
      state.dropdownUser_id = value
      state.allPage = 1
      state.monthWages = []
      getMonthList()
    }

    function dropClose() {
      console.log(state.dropdownYear, state.dropdownMonth)
      state.allPage = 1
      state.monthWages = []
      getMonthList()
    }

    getMonthList()

    return {
      state,
      onClickLeft,
      delectitem,
      approvalitem,
      NoApprovalitem,
      formatter,
      confirm,
      popupClose,
      onConfirm,
      pullingUp,
      scroll,
      dropChange,
      dropClose,
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
      margin-left: 0.928571rem;
      span {
        font-size: 1.428571rem;
      }
    }
    .right {
      margin-right: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 8.857143rem;
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
  .datetime {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9990;
  }
}
</style>