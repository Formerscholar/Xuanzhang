<template>
  <div id="newAccount">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>报销申请</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <div class="BasicInfo">
        <div class="title">基本信息</div>
        <van-field
          class="newStyle"
          @click="Inputfocus"
          readonly
          v-model="picker"
          label="报销类别"
          right-icon="arrow"
        />
        <van-field class="newStyle" v-model="Reasons" label="报销事由" placeholder="请输入内容" />
      </div>
      <div class="ChargeDetails">
        <div class="title">费用明细</div>

        <van-swipe-cell v-for="(item,index) in NewCost" :key="index">
          <div class="item1">
            <div class="top">
              <div class="left">
                <i class="el-icon-s-flag"></i>
                <span>{{item.title}}</span>
                <em class="timer">{{item.timer}}</em>
              </div>
              <div class="right">
                <span>CNY</span>
              </div>
            </div>
            <div class="bot">
              <div class="left">
                <span>{{item.detailed}}</span>
              </div>
              <div class="right">
                <span>{{item.Whole }}</span>
                <em>.{{item.Loose}}</em>
              </div>
            </div>
          </div>

          <template #right>
            <van-button
              @click="deleteChargeDetail(index)"
              square
              style="height:100%;"
              type="danger"
              text="删除"
            />
          </template>
        </van-swipe-cell>

        <div class="Manual" @click="gotoDetails">
          <span>
            <i class="el-icon-discount"></i>手动添加费用
          </span>
        </div>
      </div>
      <div class="Summary">
        <div class="title">汇总</div>
        <div class="item1">
          <span>累计报销金额</span>
          <em>￥{{apply==undefined?'0':apply | setTwo}}</em>
        </div>
      </div>
      <div class="picker" v-if="ispicker">
        <van-picker
          title="报销类别"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </div>
    </scroll>
    <div class="item4">
      <el-button type="primary" class="blue" @click="goBtnClick">提交</el-button>
    </div>
  </div>
</template>
    
<script>
import {
  getAddReimbursement,
  addReimbursement,
} from '@/network/Reimbursement.js'
export default {
  name: 'newAccount',
  data() {
    return {
      NewCost: [],
      Reasons: '',
      Remarks: '',
      options: [],
      apply: 0,
      columns: [],
      ispicker: false,
      picker: '',
      applyName: '',
      pickerID: 0,
      type: [],
      reimbursement_detail: [],
      user_id: 0,
      token: '',
    }
  },
  activated() {
    document.querySelectorAll('input').forEach((item) => {
      item.style.border = 'none'
    })
    this.getAddReimbursementData()
    this.setNewCost()
  },
  filters: {
    setTwo(value) {
      return value.toFixed(2)
    },
  },
  methods: {
    deleteChargeDetail(index) {
      this.NewCost.splice(index, 1)
      this.reimbursement_detail.splice(index, 1)
    },
    Inputfocus() {
      this.ispicker = true
    },
    onConfirm(value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
      this.picker = value
      this.options.forEach((item, index1) => {
        if (index1 == index) {
          this.pickerID = item.value
        }
      })
      this.ispicker = false
      console.log(this.picker, this.pickerID)
    },
    onCancel() {
      this.picker = ''
      this.pickerID = 0
      this.ispicker = false
      console.log(this.picker, this.pickerID)
    },
    setNewCost() {
      let rootData = this.$store.state.AddDetailsData
      console.log(this.$store.state.AddDetailsData)

      if (rootData.apply != undefined) {
        let newObj = {}
        let newArr = new Array(5)
        newArr[0] = ''

        newObj.detailed = rootData.description
        if (rootData.apply != undefined) {
          newArr[1] = rootData.apply
          newArr[2] = rootData.description

          this.apply = this.apply + rootData.apply
          let arr = String(rootData.apply).split('.')
          newObj.Whole = arr[0]
          newObj.Loose = arr[1] || '00'
        }
        if (rootData.timervalue != undefined) {
          let d = new Date(rootData.timervalue)
          let youWant =
            d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate()
          newObj.timer = youWant
          let youWant1 =
            d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
          newArr[3] = youWant1
          newArr[4] = ''
        }
        console.log(newArr)
        this.reimbursement_detail.push(newArr)
        console.log(this.reimbursement_detail)
        this.NewCost.push(newObj)
        console.log(this.NewCost)
        this.$store.commit('setAddDetailsData', {})
      }
    },
    blacknext() {
      this.NewCost = []
      this.Reasons = ''
      this.Remarks = ''
      this.options = []
      this.apply = 0
      this.columns = []
      this.ispicker = false
      this.picker = ''
      this.applyName = ''
      this.pickerID = 0
      this.type = []
      this.reimbursement_detail = []
      this.user_id = 0
      this.token = ''
      this.$router.replace('/reimbursement')
    },
    gotoDetails() {
      this.$router.push('/add-details')
    },
    async getAddReimbursementData() {
      const { data } = await getAddReimbursement(this.$store.state.token)
      console.log('getAddReimbursement', data)
      this.user_id = data.userInfo[0].id
      this.type = data.type
      this.token = data.token
      this.applyName = data.userInfo[0].name
      data.type.forEach((item) => {
        let optionsObj = {
          value: item.id,
          label: item.category_name,
        }
        this.columns.push(item.category_name)
        this.options.push(optionsObj)
      })
    },
    async goBtnClick() {
      if (this.picker != '') {
        const { code, data, msg } = await addReimbursement(
          this.getReimbursementData
        )
        if (code == 200) {
          this.$message({
            showClose: true,
            message: msg,
            type: 'success',
          })
          this.blacknext()
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: 'error',
          })
        }
      } else {
        this.$toast('请填写报销类别')
      }
    },
  },
  computed: {
    getReimbursementData() {
      return {
        token: this.token,
        operator_remark: this.Remarks,
        reimbursement_detail: this.reimbursement_detail,
        category_id: this.pickerID,
        reason: this.Reasons,
      }
    },
  },
}
</script>
    
<style scoped lang="scss">
#newAccount {
  .p_root_box {
    color: #1a1a1a;
    background-color: #fff;
    border: none;
    box-shadow: none;
    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -3.071429rem;
      font-size: 1.285714rem;
    }
  }

  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 5.428571rem;
    bottom: 4.428571rem;
    overflow: hidden;
  }

  .BasicInfo {
    .title {
      line-height: 2.571429rem;
      background-color: #f2f2f2;
      color: #373737;
      padding: 0 0.714286rem;
    }
    .item1 {
      line-height: 3.428571rem;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 0.714286rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      display: flex;
      padding-left: 1.071429rem;
      span {
        color: #5d5d5d;
        margin-right: 0.571429rem;
      }
      .el-select {
        flex: 1;
      }
      .el-input {
        color: #232323;
        font-size: 16px;
        flex: 1;
      }
    }
    .item2 {
      height: 5.642857rem;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 0.714286rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      span {
        color: #646464;
      }
      em {
        color: #2e2e2e;
      }
    }
  }
  .ChargeDetails {
    .title {
      line-height: 2.571429rem;
      background-color: #f2f2f2;
      color: #373737;
      padding: 0 0.714286rem;
    }
    .item1 {
      padding: 1.071429rem;
      border-bottom: 1px solid #f5f5f5;

      .top {
        height: 2.142857rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .left {
          i {
            color: #2c7ae2;
            font-size: 1.142857rem;
          }
          span {
            color: #363636;
            margin-left: 0.357143rem;
            margin-right: 1.071429rem;
            font-weight: 700;
            font-size: 1.142857rem;
          }
          .timer {
            color: #b2b2b2;
            font-size: 0.714286rem;
            position: relative;
            bottom: -0.357143rem;
          }
        }
        .right {
          span {
            color: #c1c1c1;
          }
        }
      }
      .bot {
        height: 2.142857rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          span {
            color: #979797;
          }
        }
        .right {
          display: table-cell;
          vertical-align: bottom;
          span {
            font-size: 22px;
            color: #161616;
            font-weight: 700;
          }
          em {
            color: #161616;
          }
        }
      }
    }
    .Manual {
      line-height: 2.857143rem;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 0.714286rem;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #0a0a0a;
        font-weight: 700;
        i {
          color: #71a896;
          font-weight: normal;
          padding-right: 0.357143rem;
          font-size: 1.142857rem;
        }
      }
    }
  }
  .Summary {
    .title {
      line-height: 2.571429rem;
      background-color: #f2f2f2;
      color: #373737;
      padding: 0 0.714286rem;
    }
    .item1 {
      line-height: 2.857143rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.714286rem;
      font-size: 1.142857rem;
      em {
        font-weight: 700;
        display: flex;
        .el-input {
          margin-left: 0.571429rem;
        }
      }
    }
    .item2 {
      background-color: #e8f0fb;
      line-height: 1.714286rem;
      padding: 0 0.714286rem;
      font-size: 0.857143rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .item3 {
      line-height: 1.714286rem;
      padding: 0 0.714286rem;
      font-size: 0.857143rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .picker {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .item4 {
    position: fixed;
    bottom: 0.571429rem;
    left: 0;
    right: 0;
    font-size: 0.857143rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-button {
      width: 11.714286rem;
      height: 3.142857rem;
      font-size: 1.285714rem;
    }
    .writhe {
      border-color: #fff;
      background-color: #fff;
      color: #2f54c6;
    }
    .blue {
      border-color: #3574e6;
      background-color: #3574e6;
    }
  }
}
</style>
