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
      <van-field class="newStyle" v-model="apply" type="number" label="报销金额" placeholder="￥请输入内容" />
      <div class="newStyle DeliveryDate van-cell">
        <span class="lable">发生时间</span>
        <span class="time" @click="tiemrClick">{{end_time}}</span>
      </div>
      <van-field class="newStyle" v-model="description" label="费用明细" placeholder="请输入内容" />
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
              <img  width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </div>
      </div>-->
    </div>

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
    <van-datetime-picker
      class="datetime"
      v-if="isDatetime"
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirms"
      @cancel="cancel"
    />
  </div>
</template>
    
<script>
import { getAddReimbursement } from '@/network/Reimbursement.js'
import { setTimerType } from '@/common/filter'

export default {
  name: 'addDetails',
  data() {
    return {
      isDatetime: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      end_time: setTimerType(new Date().getTime()),
      dialogImageUrl: '',
      dialogVisible: false,
      options: [],
      value: '',
      timervalue: '',
      apply: '',
      description: '',
    }
  },
  created() {
    this.getAddReimbursementData()
  },
  methods: {
    tiemrClick() {
      this.isDatetime = true
    },
    cancel() {
      this.isDatetime = false
    },
    confirms(value) {
      this.end_time = setTimerType(value)
      this.isDatetime = false
    },
    btnClick() {
      this.$store.commit('setAddDetailsData', {
        apply: this.apply * 1,
        timervalue: this.end_time,
        description: this.description,
      })
      this.dialogImageUrl = ''
      this.dialogVisible = false
      this.options = []
      this.value = ''
      this.timervalue = ''
      this.apply = ''
      this.description = ''
      this.$router.replace('/account')
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
      }
    }
    .money {
      height: 3.571429rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ececec;
      padding: 0.714286rem;
      .top {
        color: #505050;
        font-size: 1.042857rem;
        .el-icon-star-on {
          margin-right: 0.357143rem;
        }
      }
      .bto {
        flex: 1;
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
        flex: 1;

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
  }
  .datetime {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .Feecollection {
    position: fixed;
    bottom: 0.571429rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

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
</style>
