<template>
  <div id="Piecework">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>计件新增</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll-wrapper" ref="scroll" :probe-type="3" :pull-up-load="true">
      <van-field
        v-model="state.state"
        label="员工姓名"
        @focus="focusClick"
        class="newStyle"
        @click-right-icon="focusClick"
        placeholder="点击检索员工姓名"
        right-icon="arrow"
      />
      <van-field
        v-model="state.OrderModeState"
        label="物料成品"
        readonly
        @click-input="state.isOrderMode = true"
        class="newStyle"
        @click-right-icon="state.isOrderMode = true"
        placeholder="点击选择物料成品"
        right-icon="arrow"
      />
      <van-field
        v-model="state.consumablesState"
        label="物料耗材"
        readonly
        @click-input="state.isconsumables = true"
        class="newStyle"
        @click-right-icon="state.isconsumables = true"
        placeholder="点击选择物料耗材"
        right-icon="arrow"
      />
      <van-field
        v-model="state.Totalproduction"
        label="生产总数"
        class="newStyle"
        @input="changeInput"
      />
      <van-field
        v-model="state.Unitpriceperpiece"
        label="计件单价"
        class="newStyle"
        @input="changeInput"
      />
      <van-field
        v-model="state.Subjectivescrapping"
        label="主观报废"
        class="newStyle"
        @input="changeInput"
      />
      <van-field v-model="state.UnitpricedeductionO" label="扣损单价" class="newStyle" readonly />
      <van-field
        v-model="state.Nonprimaryscrap"
        label="非主报废"
        class="newStyle"
        @input="changeInput"
      />
      <van-field v-model="state.UnitpricedeductionT" label="扣损单价" class="newStyle" readonly />
      <el-row class="DeliveryDate van-cell">
        <span class="lable">日期</span>
        <span class="time" @click="state.isDatetime = true">{{state.timersList.SigningDate}}</span>
      </el-row>
      <van-field v-model="state.contractAmount" label="工资" class="newStyle" readonly />
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
      title="物料成品"
      show-toolbar
      :columns="state.OrderMode"
      @confirm="OrderModeConfirm"
      @cancel="state.isOrderMode = false"
    />
    <van-picker
      class="datetime"
      v-if="state.isconsumables"
      title="物料耗材"
      show-toolbar
      :columns="state.OrderMode"
      @confirm="consumableConfirm"
      @cancel="state.isconsumables = false"
    />
  </div>
</template>
    
<script>
import { reactive, onActivated, computed } from '@vue/composition-api'
import {
  getAddProcessPieceWorkWages,
  addProcessPieceWorkWages,
  getProcessPieceWorkWagesMoney,
} from '@/network/home'
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
      consumablesState: '',
      state: '',
      isDatetime: false,
      isOrderMode: false,
      isconsumables: false,
      OrderMode: [],
      contractAmount: '',
      Totalproduction: '',
      valuation_id: '',
      UnitpricedeductionO: '',
      Unitpriceperpiece: '',
      Nonprimaryscrap: '',
      consume_materiel_id: '',
      UnitpricedeductionT: '',
      Subjectivescrapping: '',
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
      state.consumablesState = ''
      state.state = ''
      state.isDatetime = false
      state.isOrderMode = false
      state.isconsumables = false
      state.OrderMode = []
      state.contractAmount = ''
      state.Totalproduction = ''
      state.valuation_id = ''
      state.UnitpricedeductionO = ''
      state.Unitpriceperpiece = ''
      state.Nonprimaryscrap = ''
      state.consume_materiel_id = ''
      state.UnitpricedeductionT = ''
      state.Subjectivescrapping = ''
      state.distributors = []
      state.valuationWages = []
      state.currentDate = ''
      state.textarea = ''
      state.selectedID = ''
      root.$router.go(-1)
    }
    async function getAddUserList() {
      const { data } = await getAddProcessPieceWorkWages({
        token: root.$store.state.token,
        _: new Date().getTime(),
      })
      console.log('getAddProcessPieceWorkWages', data)
      const { materiel, users } = data
      state.valuationWages = materiel
      state.OrderMode = materiel.map((item) => item.name)
      state.distributors = users
    }
    onActivated(() => {
      root.$Jurisdiction('173', root.$store.state.catearr, () => {
        root.$router.replace('/home')
        root.$toast('您的账号无该模块权限!')
      })
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

    async function OrderModeConfirm(value, index) {
      state.OrderModeState = value
      state.isOrderMode = false
      state.valuationWages.map((item, index1) => {
        if (index == index1) {
          state.consume_materiel_id = item.id
        }
      })
      const { data } = await getProcessPieceWorkWagesMoney({
        token: root.$store.state.token,
        user_id: state.selectedID,
        materiel_id: state.consume_materiel_id,
        _: new Date().getTime(),
      })
      const { processPieceWorkWages } = data
      console.log(processPieceWorkWages)
      state.consumablesState = processPieceWorkWages.cname
      state.valuation_id = processPieceWorkWages.consume_materiel_id
      state.Unitpriceperpiece = processPieceWorkWages.synthesis_price
      state.UnitpricedeductionO = processPieceWorkWages.main_scrap_price
      state.UnitpricedeductionT = processPieceWorkWages.secondary_scrap_price
    }

    function consumableConfirm(value, index) {
      state.consumablesState = value
      state.isconsumables = false
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
        consume_materiel_id: state.consume_materiel_id,
        synthesis_materiel_id: state.valuation_id,
        synthesis_number: state.Totalproduction,
        synthesis_price: state.Unitpriceperpiece,
        apply_time: state.timersList.SigningDate,
        wages_money: state.contractAmount,
        main_scrap_number: state.Subjectivescrapping,
        main_scrap_price: state.UnitpricedeductionO,
        secondary_scrap_number: state.Nonprimaryscrap,
        secondary_scrap_price: state.UnitpricedeductionT,
        remark: state.textarea,
      }
    })

    async function quoteclick() {
      const { code, msg } = await addProcessPieceWorkWages(
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

    function changeInput() {
      let main_money = 0
      let secondary_money = 0
      if (state.Unitpriceperpiece != '' && state.Totalproduction != '') {
        if (
          state.Subjectivescrapping != '' &&
          state.UnitpricedeductionO != ''
        ) {
          main_money =
            parseFloat(state.Subjectivescrapping) *
            parseFloat(state.UnitpricedeductionO)
        }
        if (state.Nonprimaryscrap != '' && state.UnitpricedeductionT != '') {
          secondary_money =
            parseFloat(state.Nonprimaryscrap) *
            parseFloat(state.UnitpricedeductionT)
        }
        state.contractAmount =
          parseFloat(state.Unitpriceperpiece) *
            parseFloat(state.Totalproduction) -
          parseFloat(main_money) -
          parseFloat(secondary_money)
      }
    }

    return {
      state,
      onClickLeft,
      focusClick,
      quoteclick,
      OrderModeConfirm,
      consumableConfirm,
      confirms,
      changeInput,
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
