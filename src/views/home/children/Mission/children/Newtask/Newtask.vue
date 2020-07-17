<template>
  <div id="Newtask">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>新增任务</span>
      </div>
      <div class="right" slot="right"></div>
    </navbar>

    <scroll class="scroll-wrapper">
      <el-card class="box-card" body-style="padding: 0.357143rem ;">
        <el-form :model="form">
          <el-form-item label="任务类型" class="TaskType" :label-width="formLabelWidth">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in selectionArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务属性" class="properties" :label-width="formLabelWidth">
            <el-select v-model="styleValue" placeholder="请选择">
              <el-option
                v-for="item in form.styleValue"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <timers class="end_time" type="end_time" title="截至时间" :valueData="timersList.end_time" />
          <el-form-item label="任务标题" class="title" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="指派对象" class="Aobjects" :label-width="formLabelWidth">
            <el-select v-model="Assign" placeholder="请选择">
              <el-option
                v-for="item in AssignArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="抄送" class="ccpepol" :label-width="formLabelWidth">
            <el-select v-model="Ccpeople" placeholder="请选择">
              <el-option
                v-for="item in AssignArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="图片上传" class="details" :label-width="formLabelWidth">
            <el-upload
              action
              list-type="picture-card"
              multiple
              ref="upload"
              :http-request="httpRequest"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>

          <el-form-item label="任务详情" class="details" :label-width="formLabelWidth"></el-form-item>
          <el-form-item id="textarea" class="details" label-width="0">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </scroll>

    <div class="btns">
      <el-button @click="cancelForm">返 回</el-button>
      <el-button type="primary" @click="addDesignatedTask">确 定</el-button>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import scroll from '@/components/common/scroll/scroll'

import {
  addDesignatedTasks,
  getAddDesignatedTasks,
  uploadImage
} from '@/network/home'
import timers from '@/components/content/timers/timers'
export default {
  name: 'Newtask',
  data() {
    return {
      timersList: {
        end_time: new Date().getTime()
      },
      dialogImageUrl: '',
      dialogVisible: false,
      timer: null,
      dialog: false,
      loading: false,
      formLabelWidth: '5rem',
      form: {
        value: this.selectionArr,
        styleValue: [
          {
            value: 1,
            label: '一般'
          },
          {
            value: 2,
            label: '紧急'
          }
        ],
        Assign: this.AssignArr,
        title: ''
      },
      value: '',
      styleValue: '',
      Assign: '',
      Ccpeople: '',
      textarea: '',
      imgUrlAdd: '',
      selectionArr: [],
      AssignArr: []
    }
  },
  components: { navbar, timers, scroll },
  async activated() {
    if (this.$store.state.timers.end_time != '') {
      this.timersList.end_time = this.$store.state.timers.end_time
    }
    const { data } = await getAddDesignatedTasks({
      token: this.$store.state.token,
      _: new Date().getTime()
    })
    console.log('UserDesignatedTasksData', data)
    data.designatedTasksType.map(item => {
      this.selectionArr.push({
        value: item.id,
        label: item.name
      })
    })
    data.users.map(item => {
      this.AssignArr.push({
        value: item.id,
        label: item.name
      })
    })
  },
  deactivated() {
    this.$refs.upload.clearFiles()
  },
  computed: {
    getAddDesignatedTasksData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime()
      }
    },
    mydata() {
      return {
        token: this.$store.state.token
      }
    },
    addDesignatedTasksData() {
      return {
        token: this.$store.state.token,
        type: this.value,
        attribute: this.styleValue,
        end_time: this.timersList.end_time,
        title: this.form.title,
        user_id: this.Assign,
        details: this.textarea + this.imgUrlAdd
      }
    }
  },
  methods: {
    async httpRequest(options) {
      console.log(options)
      this.loading = true
      let content = options.file
      if (content) {
        let form = new FormData()
        form.append('token', this.$store.state.token)
        form.append('user_image', content)
        const { data } = await uploadImage(form)
        this.imgUrlAdd = `<img src="${data.url}" />`
      }
    },
    async addDesignatedTask() {
      const { code } = await addDesignatedTasks(this.addDesignatedTasksData)
      if (code == 200) {
        this.blacknext()
      }
    },
    blacknext() {
      this.value = ''
      this.selectionArr = []
      this.styleValue = ''
      this.form.title = ''
      this.AssignArr = []
      this.Assign = ''
      this.Ccpeople = ''
      this.dialogImageUrl = ''
      this.textarea = ''
      this.$router.go(-1)
    },
    cancelForm() {
      this.blacknext()
    }
  }
}
</script>
    
<style scoped lang="scss">
#Newtask {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      font-size: 1.285714rem;
      color: #030303;
    }
    .right {
      margin-right: 1.071429rem;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 3rem;
    width: 100%;
    overflow: hidden;
    .box-card {
      min-height: calc(100vh - 5.428571rem);
      .el-form {
        .el-form-item {
          padding: 0.357143rem;
          border-bottom: 1px solid #f8f7f5;
          margin-bottom: 0.357143rem;
          .el-form-item__content {
            width: 100%;
          }
        }
        .TaskType {
          .el-select {
            .el-option {
            }
          }
        }
        .properties {
          .el-select {
            .el-option {
            }
          }
        }
        .end_time {
          .el-date-picker {
          }
        }
        .title {
          .el-input {
          }
        }
        .Aobjects {
          .el-select {
            .el-option {
            }
          }
        }
        .ccpepol {
          .el-select {
            .el-option {
            }
          }
        }
        .details {
          border: none;
          margin-bottom: 0;
        }
      }
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding-bottom: 0.714286rem;
    padding-right: 0.357143rem;
  }
}
</style>


<style lang="scss">
#Newtask {
  input,
  textarea {
    border: none;
    text-align: right;
  }
  textarea {
    text-align: left;
  }
  label {
    text-align: justify;
  }
  .el-card {
    text-align: right;
  }
  #timers {
    .van-cell {
      padding: 0.714286rem 0.357143rem;
      .van-cell__title {
        text-align: left;
      }
      .van-field__control {
        text-align: right;
      }
    }
  }
}
</style>