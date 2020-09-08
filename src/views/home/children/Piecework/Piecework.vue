<template>
  <div id="Piecework">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>计价新增</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll-wrapper" ref="scroll" :probe-type="3" :pull-up-load="true">
      <van-field
        v-model="state.OrderModeState"
        label="计价模式"
        readonly
        @click-input="state.isOrderMode = true"
        class="newStyle"
        @click-right-icon="state.isOrderMode = true"
        placeholder="点击选择计价模式"
        right-icon="arrow"
      />
      <van-field
        v-model="state.state"
        label="员工姓名"
        @focus="focusClick"
        class="newStyle"
        @click-right-icon="focusClick"
        placeholder="点击检索员工姓名"
        right-icon="arrow"
      />
      <el-row class="DeliveryDate van-cell">
        <span class="lable">日期</span>
        <span class="time" @click="state.isDatetime = true">{{state.timersList.SigningDate}}</span>
      </el-row>
      <van-field v-model="state.contractAmount" label="工资" class="newStyle" />
      <van-field v-model="state.textarea" type="textarea" label="备注" class="newStyle" />
    </scroll>
    <myBtns :commitFun="quoteclick" :cancelFun="onClickLeft">
      <span slot="cancel-btn">取消</span>
      <span slot="commit-btn">
        <span>立即提交</span>
      </span>
    </myBtns>
    <van-datetime-picker
      class="datetime"
      v-if="state.isDatetime"
      v-model="state.currentDate"
      type="date"
      title="选择年月日"
      :min-date="state.minDate"
      :max-date="state.maxDate"
      @confirm="confirms"
      @cancel="state.isDatetime = false"
    />
    <van-picker
      class="datetime"
      v-if="state.isOrderMode"
      title="计价模式"
      show-toolbar
      :columns="state.OrderMode"
      @confirm="OrderModeConfirm"
      @cancel="state.isOrderMode = false"
    />
  </div>
</template>
    
<script>
import { reactive, onActivated, computed } from '@vue/composition-api'
import { getAddUserValuationWages, addUserValuationWages } from '@/network/home'
import { setTimerType } from '@/common/filter'
import myBtns from '@/components/common/my_btns/my_btns'

export default {
  components: {
    myBtns,
  },
  setup(props, { root }) {
    const state = reactive({
      timersList: {
        SigningDate: setTimerType(new Date().getTime()),
        ContractField: setTimerType(new Date().getTime()),
      },
      OrderModeState: '',
      state: '',
      isDatetime: false,
      isOrderMode: false,
      OrderMode: [],
      contractAmount: '',
      valuation_id: '',
      distributors: [],
      valuationWages: [],
      currentDate: '',
      textarea: '',
      selectedID: '',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
    })
    function onClickLeft() {
      state.OrderModeState = ''
      state.state = ''
      state.isDatetime = false
      state.isOrderMode = false
      state.OrderMode = []
      state.contractAmount = ''
      state.valuation_id = ''
      state.distributors = []
      state.valuationWages = []
      state.currentDate = ''
      state.textarea = ''
      state.selectedID = ''
      root.$router.replace('/home')
    }
    async function getAddUserList() {
      const { data } = await getAddUserValuationWages({
        token: root.$store.state.token,
        _: new Date().getTime(),
      })
      console.log('getAddUserValuationWages', data)
      const { valuationWages, users } = data
      state.valuationWages = valuationWages
      state.OrderMode = valuationWages.map((item) => item.valuation_name)
      state.distributors = users
    }
    onActivated(() => {
      getAddUserList()
    })

    function focusClick() {
      root.$router.push({
        path: '/nameSearch',
        query: {
          data: { ...state.distributors },
        },
      })
      root.$bus.$off('nameSupplier')
      root.$bus.$on('nameSupplier', (item) => {
        console.log(item)
        if (typeof item == 'string') {
          state.state = item
        } else {
          state.state = item.name
          state.selectedID = item.id
        }
      })
    }

    function OrderModeConfirm(value, index) {
      state.OrderModeState = value
      state.isOrderMode = false
      state.valuationWages.map((item, index1) => {
        if (index == index1) {
          state.valuation_id = item.id
        }
      })
    }

    function confirms(value) {
      state.timersList.SigningDate = setTimerType(value)
      state.isDatetime = false
    }

    const addUserValuationWagesData = computed(() => {
      return {
        token: root.$store.state.token,
        user_id: state.selectedID,
        valuation_id: state.valuation_id,
        apply_time: state.timersList.SigningDate,
        wages_money: state.contractAmount,
        remark: state.textarea,
      }
    })

    async function quoteclick() {
      const { code, msg } = await addUserValuationWages(
        addUserValuationWagesData.value
      )
      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        onClickLeft()
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }

    return {
      state,
      onClickLeft,
      focusClick,
      quoteclick,
      OrderModeConfirm,
      confirms,
    }
  },
}
</script>
    
<style scoped lang="scss">
#Piecework {
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
    .DeliveryDate {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .lable {
        width: 4.928571rem;
        text-align: justify;
        text-align-last: justify;
        color: black;
        padding-right: 0.714286rem;
        border-right: 1px solid #e7e7e7;
      }
      .time {
        flex: 1;
        text-align: right;
        padding: 0 1rem;
      }
    }
  }
  .datetime {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
