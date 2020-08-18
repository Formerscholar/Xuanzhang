<template>
  <div id="submit_root">
    <div id="submit">
      <div id="confirm"></div>
      <div id="reject"></div>
    </div>
    <el-dialog title="驳回理由" :visible.sync="centerDialogVisible" width="90%" center>
      <el-input type="textarea" autosize placeholder="请输入内容" v-model="textareatext"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Dismissed">取 消</el-button>
        <el-button type="primary" @click="RejectConfirmation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="确认理由" :visible.sync="confirmDialogVisible" width="90%" center>
      <el-input type="textarea" autosize placeholder="请输入内容" v-model="confirmtext"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDismissed">取 消</el-button>
        <el-button type="primary" @click="confirmConfirmation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提交理由" :visible.sync="referVisible" width="90%" center>
      <el-input type="textarea" autosize placeholder="请输入内容" v-model="refertext"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="referDismissed">取 消</el-button>
        <el-button type="primary" @click="referConfirmation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="取消理由" :visible.sync="cancelVisible" width="90%" center>
      <el-input type="textarea" autosize placeholder="请输入内容" v-model="canceltext"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDismissed">取 消</el-button>
        <el-button type="primary" @click="cancelConfirmation">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="完成理由" :visible.sync="completeVisible" width="90%" center>
      <el-input type="textarea" autosize placeholder="请输入内容" v-model="completetext"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="completeDismissed">取 消</el-button>
        <el-button type="primary" @click="completeConfirmation">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
    
<script>
import {
  getDesignatedTasksDetail,
  checkDesignatedTasksStatus,
  checkDesignatedTasksUserStatus,
} from '@/network/deal'
export default {
  data() {
    return {
      data: {},
      centerDialogVisible: false,
      textareatext: '',
      confirmDialogVisible: false,
      confirmtext: '',
      referVisible: false,
      refertext: '',
      cancelVisible: false,
      canceltext: '',
      completeVisible: false,
      completetext: '',
    }
  },
  props: {
    iid: {
      type: String,
      default: '0',
    },
  },
  activated() {
    this.getdealitem()
  },
  deactivated() {
    this.clierbtn()
  },
  computed: {
    getdealitemData() {
      return {
        token: this.$store.state.token,
        id: this.iid * 1,
        _: new Date().getTime(),
      }
    },
    checkDesignatedTasksStatusData() {
      let from = new FormData()
      from.append(
        'id',
        document.querySelector('#reject span').getAttribute('data-id')
      )
      from.append('token', this.$store.state.token)
      from.append(
        'status',
        document.querySelector('#reject span').getAttribute('data-status')
      )
      from.append('operation_remark', this.textareatext)
      return from
    },
    confirmData() {
      let from = new FormData()
      from.append(
        'id',
        document.querySelector('#confirm span').getAttribute('data-id')
      )
      from.append('token', this.$store.state.token)
      from.append(
        'status',
        document.querySelector('#confirm span').getAttribute('data-status')
      )
      from.append('operation_remark', this.confirmtext)
      return from
    },
    referData() {
      let from = new FormData()
      from.append(
        'id',
        document.querySelector('#confirm span').getAttribute('data-id')
      )
      from.append('token', this.$store.state.token)
      from.append(
        'status',
        document.querySelector('#confirm span').getAttribute('data-status')
      )
      from.append('operation_remark', this.refertext)
      return from
    },
    cancelData() {
      let from = new FormData()
      from.append(
        'id',
        document.querySelector('#reject span').getAttribute('data-id')
      )
      from.append('token', this.$store.state.token)
      from.append(
        'status',
        document.querySelector('#reject span').getAttribute('data-status')
      )
      from.append('operation_remark', this.canceltext)
      return from
    },
    completeData() {
      let from = new FormData()
      from.append(
        'id',
        document.querySelector('#confirm span').getAttribute('data-id')
      )
      from.append('token', this.$store.state.token)
      from.append(
        'status',
        document.querySelector('#confirm span').getAttribute('data-status')
      )
      from.append('operation_remark', this.completetext)
      return from
    },
  },
  methods: {
    setDataTrueO() {
      this.completeVisible = true
    },
    setDataTrueT() {
      this.centerDialogVisible = true
    },
    setDataTrueS() {
      this.confirmDialogVisible = true
    },
    setDataTrueF() {
      this.cancelVisible = true
    },
    setDataTrueFI() {
      this.referVisible = true
    },
    async getdealitem() {
      const { data } = await getDesignatedTasksDetail(this.getdealitemData)
      this.data = data
      console.log('this.data', this.data)
      let html = ''
      html = ''
      if (this.data.designatedTasks.user_id == this.data.userInfo[0].id) {
        if (this.data.designatedTasks.status != 1) {
          if (this.data.designatedTasks.user_status == 0) {
            html +=
              '<button type="button" class="btn btn-info"><span data-toggle="modal" data-target="#userComplete" data-id="' +
              this.data.designatedTasks.id +
              '" data-status="1" data-type="1">提交</span><button/>'
            document.querySelector('#confirm').innerHTML = html
            html = ''
            document
              .querySelector('#confirm')
              .addEventListener('click', this.setDataTrueFI)
          } else {
            html +=
              '<button type="button" class="btn btn-info"><span data-toggle="modal" data-target="#userComplete" data-id="' +
              this.data.designatedTasks.id +
              '" data-status="0" data-type="1">取消提交</span></ a>'
            document.querySelector('#reject').innerHTML = html
            html = ''
            document
              .querySelector('#reject')
              .addEventListener('click', this.setDataTrueF)
          }
        }
      } else {
        if (this.data.designatedTasks.user_status == 1) {
          if (this.data.designatedTasks.status == 0) {
            html =
              '<button type="button"  class="btn btn-success"><span data-toggle="modal" data-target="#userComplete" data-id="' +
              this.data.designatedTasks.id +
              '" data-status="1" data-type="2">确认</span></button>'
            document.querySelector('#confirm').innerHTML = html
            html = ''
            document
              .querySelector('#confirm')
              .addEventListener('click', this.setDataTrueS)
            html =
              '<button type="button" id="reject" class="btn btn-danger"><span data-toggle="modal" data-target="#userComplete" data-id="' +
              this.data.designatedTasks.id +
              '" data-status="2" data-type="2">驳回</span></button>'
            document.querySelector('#reject').innerHTML = html
            html = ''
            document
              .querySelector('#reject')
              .addEventListener('click', this.setDataTrueT)
          } else if (this.data.designatedTasks.status == 1) {
            html =
              '<button type="danger" id="reject"   class="btn btn-danger"><span data-toggle="modal" data-target="#userComplete" data-id="' +
              this.data.designatedTasks.id +
              '" data-status="2" data-type="2">驳回</span></button>'
            document.querySelector('#reject').innerHTML = html
            html = ''
            document
              .querySelector('#reject')
              .addEventListener('click', this.setDataTrueT)
          } else if (this.data.designatedTasks.status == 2) {
            html =
              '<button type="button" class="btn btn-success"><span data-toggle="modal" data-target="#userComplete" data-id="' +
              this.data.designatedTasks.id +
              '" data-status="1" data-type="2">完成</span></button>'
            document.querySelector('#confirm').innerHTML = html
            html = ''
            document
              .querySelector('#confirm')
              .addEventListener('click', this.setDataTrueO)
          }
        }
      }

      this.$once('hook:deactivated', () => {
        document
          .querySelector('#confirm')
          .removeEventListener('click', this.setDataTrueFI)
        document
          .querySelector('#reject')
          .removeEventListener('click', this.setDataTrueF)
        document
          .querySelector('#confirm')
          .removeEventListener('click', this.setDataTrueS)
        document
          .querySelector('#reject')
          .removeEventListener('click', this.setDataTrueT)
        document
          .querySelector('#confirm')
          .removeEventListener('click', this.setDataTrueO)
      })
    },
    //驳回确认
    async RejectConfirmation(e) {
      const res = await checkDesignatedTasksStatus(
        this.checkDesignatedTasksStatusData
      )
      console.log('checkDesignatedTasksStatus', res)
      if (res.code == 200) {
        this.$router.go(-1)
      }
      this.textareatext = ''
      this.centerDialogVisible = false
    },
    //驳回取消
    Dismissed() {
      this.textareatext = ''
      this.centerDialogVisible = false
    },
    //确认确认
    async confirmConfirmation(e) {
      const res = await checkDesignatedTasksStatus(this.confirmData)
      console.log('checkDesignatedTasksStatus', res)
      if (res.code == 200) {
        this.$router.go(-1)
      }
      this.confirmtext = ''
      this.confirmDialogVisible = false
    },
    //确认取消
    confirmDismissed() {
      this.confirmtext = ''
      this.confirmDialogVisible = false
    },
    //提交确认
    async referConfirmation(e) {
      const res = await checkDesignatedTasksUserStatus(this.referData)
      console.log('checkDesignatedTasksStatus', res)
      if (res.code == 200) {
        this.$router.go(-1)
      }
      this.refertext = ''
      this.referVisible = false
    },
    //提交取消
    referDismissed() {
      this.refertext = ''
      this.referVisible = false
    },
    // 取消确认
    async cancelConfirmation(e) {
      const res = await checkDesignatedTasksUserStatus(this.cancelData)
      console.log('checkDesignatedTasksStatus', res)
      if (res.code == 200) {
        this.$router.go(-1)
      }
      this.canceltext = ''
      this.cancelVisible = false
    },
    //提交取消
    cancelDismissed() {
      this.canceltext = ''
      this.cancelVisible = false
    },
    // 取消确认
    async completeConfirmation(e) {
      const res = await checkDesignatedTasksStatus(this.completeData)
      console.log('checkDesignatedTasksStatus', res)
      if (res.code == 200) {
        this.$router.go(-1)
      }
      this.completetext = ''
      this.completeVisible = false
    },
    //提交取消
    completeDismissed() {
      this.completetext = ''
      this.completeVisible = false
    },
    // 清除按钮
    clierbtn() {
      document.querySelector('#confirm').innerHTML = ''
      document.querySelector('#reject').innerHTML = ''
    },
  },
}
</script>
    
<style lang="scss">
#submit {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  height: 3.714286rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  #confirm,
  #reject {
    flex: 1;
    .btn {
      width: 100%;
      line-height: 3.714286rem;
      text-align: center;
      border: none;
    }
    .btn-danger {
      color: #f56c6c;
      background: #fef0f0;
      border-color: #fbc4c4;
    }
    .btn-info {
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
    }
  }
  #confirm {
  }
  #reject {
  }
}
</style>
