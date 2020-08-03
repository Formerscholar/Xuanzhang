<template>
  <div id="addDetails">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>明细添加</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="isolation"></div>
    <div class="body">
      <div class="money">
        <div class="top">报销金额</div>
        <div class="bto">
          <el-input v-model="apply" type="number" placeholder="￥请输入内容"></el-input>
        </div>
      </div>
      <el-row class="timer">
        <div class="left">
          <span>发生时间</span>
        </div>
        <div class="right">
          <el-date-picker
            v-model="timervalue"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
      </el-row>

      <div class="timer">
        <div class="left">
          <span>费用明细</span>
        </div>
        <div class="right">
          <el-input v-model="description" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <!-- <div class="upload">
        <div class="left">
          <div class="upload">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </div>
      </div>-->

      <el-row class="Feecollection">
        <div class="left">
          <span class="fee">费用合计</span>
          <span class="amount">
            <em>{{apply==''?'0.00':apply}}</em>
            CNY
          </span>
        </div>
        <div class="right">
          <el-button type="primary" @click="btnClick">保存</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>
    
<script>
import { getAddReimbursement } from '@/network/Reimbursement.js'

export default {
  name: 'addDetails',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      options: [],
      value: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      timervalue: '',
      apply: '',

      description: '',
    }
  },
  activated() {
    document.querySelectorAll('input').forEach((item) => {
      item.style.border = 'none'
    })

    this.getAddReimbursementData()
  },
  deactivated() {},
  methods: {
    btnClick() {
      this.$store.commit('setAddDetailsData', {
        optionstype: this.value,
        apply: this.apply * 1,
        timervalue: this.timervalue,
        description: this.description,
      })
      this.$router.replace('/account')
      this.value = null
      this.apply = null
      this.timervalue = null
      this.description = null
    },
    blacknext() {
      this.$router.go(-1)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async getAddReimbursementData() {
      const { data } = await getAddReimbursement(
        this.getAddReimbursementparamsData
      )
      console.log('getAddReimbursementData', data)
      this.optionstype = data.type
      data.type.forEach((item) => {
        let optionsObj = {
          value: item.id,
          label: item.category_name,
        }
        this.options.push(optionsObj)
      })
    },
  },
  computed: {
    getAddReimbursementparamsData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
  },
}
</script>
    
<style scoped lang="scss">
#addDetails {
  padding-top: 5.428571rem;
  min-height: 100vh;
  .p_root_box {
    color: #747474;
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
  .isolation {
    height: 1.071429rem;
    background-color: #f3f3f3;
  }
  .body {
    .money {
      height: 3.571429rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ececec;
      padding: 0.714286rem;
      .top {
        color: #a0a0a0;
        .el-icon-star-on {
          margin-right: 0.357143rem;
        }
      }
      .bto {
        font-size: 1.142857rem;
        display: flex;
        .el-input {
          margin-top: -5px;
        }
      }
    }
    .timer {
      height: 3.571429rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ececec;

      padding: 0.714286rem;
      .left {
        width: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        i {
          margin-right: 0.714286rem;
        }
        span {
          color: #505050;
          font-size: 1.042857rem;
        }
      }
      .right {
        width: 50%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        i {
          margin-left: 0.714286rem;
          font-size: 1.285714rem;
          // font-weight: 700;
        }
        span {
          color: #101010;
          // font-weight: 700;
          font-size: 1.428571rem;
        }
      }
    }
    .name {
      height: 3.571429rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.714286rem;

      border-bottom: 1px solid #ececec;
      padding: 0.714286rem 2.071429rem;
      .left {
        width: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 0.357143rem;
        span {
          color: #505050;
          font-size: 1.042857rem;
        }
      }
      .right {
        width: 50%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        span {
          color: #101010;
          // font-weight: 700;
          font-size: 1.042857rem;
        }
      }
    }
    .upload {
      display: flex;
      padding: 1.071429rem;
      border-bottom: 1px solid #ececec;
      .left {
        .upload {
          .el-upload {
            i {
            }
          }
          .el-dialog {
            img {
            }
          }
        }
      }
    }
    .delelt {
      height: 9.714286rem;
      background-color: #f3f3f3;
      padding: 0.357143rem 0;
      div {
        margin-top: 1.071429rem;
        height: 3.714286rem;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          color: #c83c3c;
          font-size: 1.142857rem;
          font-weight: 700;
        }
      }
    }
    .Feecollection {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.357143rem;
      padding-bottom: 14.285714rem;

      .left {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        text-align: left;
        position: relative;
        left: -0.928571rem;
        .fee {
          width: 100%;
          font-size: 1rem;
        }
        .amount {
          width: 100%;

          font-size: 1rem;
          color: #3063da;
          em {
            font-size: 1.857143rem;
          }
        }
      }
      .right {
        position: relative;
        right: -0.928571rem;
        .el-button {
          width: 10.714286rem;
          height: 3.571429rem;
          font-size: 1.428571rem;
        }
      }
    }
  }
}
</style>
