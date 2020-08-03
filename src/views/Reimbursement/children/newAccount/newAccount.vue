<template>
  <div id="newAccount">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>费用报销</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="BasicInfo">
      <div class="title">报销类别</div>
      <div class="item1">
        <span>选择类别</span>
        <el-select v-model="value" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            ref="optionstype"
          ></el-option>
        </el-select>
      </div>
      <div class="title">基本信息</div>
      <div class="item1">
        <span>报销事由</span>
        <el-input v-model="Reasons" placeholder="请输入内容"></el-input>
      </div>
    </div>
    <div class="ChargeDetails">
      <div class="title">费用明细</div>

      <div class="item1" v-for="(item,index) in NewCost" :key="index">
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
            <span>{{item.Whole}}</span>
            <em>.{{item.Loose}}</em>
          </div>
        </div>
      </div>

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
        <em>￥{{apply==undefined?'0':apply}}</em>
      </div>
      <div class="item4">
        <el-button type="primary" class="blue" @click="goBtnClick">提交</el-button>
      </div>
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
      applyName: '',
      value: '',
      type: [],
      reimbursement_detail: [],
      user_id: 0,
      token: '',
    }
  },
  components: {},
  activated() {
    document.querySelectorAll('input').forEach((item) => {
      item.style.border = 'none'
    })
    this.getAddReimbursementData()
    this.setNewCost()
  },
  deactivated() {},
  methods: {
    setNewCost() {
      let rootData = this.$store.state.AddDetailsData
      console.log(this.$store.state.AddDetailsData)

      if (rootData.optionstype != undefined) {
        let newObj = {}
        let newArr = new Array(5)
        let iid = rootData.optionstype
        newArr[0] = iid

        this.type.forEach((item) => {
          if (item.id == iid) {
            newObj.title = item.category_name
          }
        })
        newObj.detailed = rootData.description
        if (rootData.apply != undefined) {
          newArr[1] = rootData.apply
          newArr[2] = rootData.description

          this.apply = this.apply + rootData.apply
          let arr = String(rootData.apply).split('.')
          newObj.Whole = arr[0]
          newObj.Loose = arr[1]
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
        this.$store.commit('setAddDetailsData', {})
      }
    },
    blacknext() {
      this.$router.go(-1)
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
        this.options.push(optionsObj)
      })
    },
    async goBtnClick() {
      const { data } = await addReimbursement(this.getReimbursementData)
      console.log(data)
      this.$router.replace('/reimbursement')
    },
  },
  computed: {
    getReimbursementData() {
      return {
        token: this.token,
        operator_remark: this.Remarks,
        reimbursement_detail: this.reimbursement_detail,
        user_id: this.user_id,
        reason: this.Reasons,
      }
    },
  },
}
</script>
    
<style scoped lang="scss">
#newAccount {
  padding-top: 6.428571rem;

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
      span {
        color: #5d5d5d;
        margin-right: 0.571429rem;
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
    .item4 {
      line-height: 1.714286rem;
      padding: 1.071429rem;
      font-size: 0.857143rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f2f2f2;
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
}
</style>
