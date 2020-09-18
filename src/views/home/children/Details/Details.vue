<template>
  <div id="Details">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>任务详情</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="content">
      <scroll class="scroll-wrapper" :probeType="3" @scroll="clickScroll">
        <el-card class="box-card">
          <div class="topbox">
            <div class="name">
              <div class="left">
                <img class="title_logo" :src="imgSrc" />
              </div>
              <div class="right">
                <div class="title">
                  <span>
                    {{designatedTasks.operator_name}}
                    <em>【{{jobTitle}}】</em>
                  </span>
                </div>
                <div class="end_timer">
                  <span>{{designatedTasks.created_at}}</span>
                  <span>
                    状态 -
                    <em>
                      <el-tag
                        :type="setTextStatus('type',designatedTasks.status,designatedTasks.user_status)"
                      >{{setTextStatus('text',designatedTasks.status,designatedTasks.user_status)}}</el-tag>
                    </em>
                  </span>
                </div>
              </div>
            </div>
            <div class="cc">
              <span>
                <img class="bgt" src="@/assets/image/smol_picter.fw.png" alt="logo" /> 抄送范围:
                <em>{{designatedTasks.users_ccs}}</em>
              </span>
            </div>
            <div class="timer">
              <div class="left">
                <span>
                  任务截至日期:
                  <em>{{designatedTasks.end_time}}</em>
                </span>
              </div>
              <div class="right">
                <span>
                  <el-tag
                    :type="setAttr('type',designatedTasks.attribute)"
                  >{{setAttr('text',designatedTasks.attribute)}}</el-tag>
                </span>
              </div>
            </div>
          </div>
          <div class="botbox">
            <div class="title">
              <span>{{designatedTasks.title}}</span>
            </div>
            <div id="content"></div>
          </div>
        </el-card>
        <div class="Process">
          办理流程：
          <el-timeline>
            <el-timeline-item
              :timestamp="item.updated_at"
              placement="top"
              v-for="(item,index) in designatedTasksDetail"
              :key="index"
            >
              <el-card body-style="padding:.714286rem;">
                <p
                  style="margin:0; margin-bottom: .357143rem;"
                >{{item.operator_name}} 提交于 {{item.created_at}}</p>
                <h4 style="margin:0;">
                  <el-tag
                    style=" border: none; background-color: #fff; font-size: 1rem; padding: 0;"
                    :type="setTextStatus('type',item.status,item.user_status)"
                  >{{setTextStatus('text',item.status,item.user_status)}}</el-tag>
                  {{item.remark}}
                </h4>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </scroll>
      <div id="submit" v-if="issubmit">
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
  </div>
</template>
    
<script>
import { bestURL, crosURl } from '@/network/baseURL'
import {
  getDesignatedTasksDetail,
  checkDesignatedTasksStatus,
  checkDesignatedTasksUserStatus,
} from '@/network/deal'

export default {
  data() {
    return {
      activeName: '1',
      iid: 0,
      designatedTasks: {},
      designatedTasksType: {},
      jobTitle: '',
      designatedTasksDetail: [],
      imgSrc: '',
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
      issubmit: true,
    }
  },
  activated() {
    this.iid = this.$route.params.iid
    this.getdealitem()
    this.$Jurisdiction('269', this.$store.state.oparr, () => {
      this.issubmit = false
    })
  },
  deactivated() {
    this.activeName = '1'
    this.iid = 0
    this.designatedTasks = {}
    this.designatedTasksType = {}
    this.jobTitle = ''
    this.designatedTasksDetail = []
    this.imgSrc = ''
    this.data = {}
    this.centerDialogVisible = false
    this.textareatext = ''
    this.confirmDialogVisible = false
    this.confirmtext = ''
    this.referVisible = false
    this.refertext = ''
    this.cancelVisible = false
    this.canceltext = ''
    this.completeVisible = false
    this.completetext = ''
    this.clierbtn()
  },
  computed: {
    getdealitemData() {
      return {
        token: this.$store.state.token,
        id: this.iid,
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
    goBack() {
      this.$router.replace('/mission')
    },
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
      this.imgSrc = data.userInfo[0].img_url.substr(1)
      this.designatedTasksDetail = data.designatedTasksDetail.reverse()
      this.jobTitle = data.designatedTasks.operator_role
      this.designatedTasks = data.designatedTasks
      this.designatedTasksType = data.designatedTasksType
      let str = this.designatedTasks.details
      for (let i = 0; i <= str.split('<img src="/view').length; i++) {
        str = str.replace(
          /(<img src="\/view)/,
          `
        <br /><img preview="2" preview-text="图片详情" style="width:100%;" src="${bestURL}/view
        `
        )
      }
      for (let i = 0; i <= str.split('<img src="/uploads').length; i++) {
        str = str.replace(
          /(<img src="\/uploads)/,
          `
        <br /><img preview="2" preview-text="图片详情" style="width:100%;" src="${bestURL}/uploads
        `
        )
      }
      document.querySelector('#content').innerHTML = str
      this.$previewRefresh()
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

      this.$once('hook:destroyed', () => {
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
    clickScroll() {
      this.getdealitem()
    },

    setAttr(type, attribute) {
      return type == 'type'
        ? attribute == 1
          ? 'success'
          : 'danger'
        : attribute == 1
        ? '一般'
        : '紧急'
    },
    setTextStatus(type, status, user_status) {
      if (type == 'type') {
        if (status == 2) {
          return 'danger'
        } else if (status == 1) {
          return 'success'
        } else if (user_status == 1) {
          return 'info'
        } else {
          return ''
        }
      } else {
        if (status == 2) {
          return '驳回'
        } else if (status == 1) {
          return '完成'
        } else if (user_status == 1) {
          return '待确认'
        } else {
          return '新建'
        }
      }
    },
  },
}
</script>
    
<style lang="scss" scoped>
#Details {
  padding-top: 5.571429rem;
  padding-bottom: 1.571429rem;
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      margin-left: -3.071429rem;
      span {
        font-size: 1.571429rem;
      }
    }
  }
  .content {
    padding: 0.357143rem 0.714286rem;
    padding-bottom: 2.857143rem;

    .scroll-wrapper {
      position: absolute;
      left: 0;
      top: 5.428571rem;
      bottom: 3.714286rem;
      width: 100%;
      overflow: hidden;
    }
    .el-card__body {
      padding: 0.571429rem !important;
    }
    .box-card {
      .topbox {
        border-bottom: 1px solid #9c9c9c;
        padding: 0.571429rem 0.357143rem;
        .name {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 0.714286rem;
          .left {
            margin-right: 0.357143rem;
            .title_logo {
              width: 2.857143rem;
              border-radius: 0.357143rem;
            }
          }
          .right {
            flex: 1;
            align-items: flex-start;
            flex-direction: column;
            color: #8e8e8e;
            font-size: 0.857143rem;
            margin-left: 0.357143rem;
            .el-tag {
              border: none;
              background-color: #fff;
            }
            .end_timer {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          }
        }
        .cc {
          margin-bottom: 0.5rem;
          color: #86ebf3;
          span {
            border: 1px solid #86ebf3;
            padding: 0.157143rem;
            padding-right: 1.071429rem;
            padding-left: 0.714286rem;
            border-top-right-radius: 1.071429rem;
            border-bottom-right-radius: 1.071429rem;
            border-top-left-radius: 1.071429rem;
            border-bottom-left-radius: 1.071429rem;
            font-size: 1rem;
            .bgt {
              margin-right: 0.357143rem;
              width: 1.071429rem;
              border-radius: 50%;
              position: relative;
              top: -0.142857rem;
            }
          }
        }
        .timer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1rem;
          color: #9b9b9b;
          .left {
            span {
              em {
                color: #e30000;
              }
            }
          }
          .right {
            span {
              font-size: 1rem;
              .el-tag {
                border: none;
                background-color: #fff;
              }
            }
          }
        }
      }
      .botbox {
        margin-top: 0.928571rem;
        span {
          font-size: 1.142857rem;
          font-weight: 700;
          color: #000;
        }
        #content {
          margin-top: 0.714286rem;
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
        }
      }
    }
    .Process {
      margin-top: 0.714286rem;
      font-size: 1rem;
      padding: 0.357143rem 0.857143rem;

      /deep/.el-timeline {
        font-size: 1rem;
        margin-top: 0.857143rem;
        .el-timeline-item {
          .el-timeline-item__wrapper {
            .el-timeline-item__timestamp {
              font-size: 1rem !important;
            }
            .el-timeline-item__content {
              .el-card {
                .el-card__body {
                  font-size: 1rem;
                }
              }
            }
          }
        }
      }
    }
  }
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
      /deep/.btn {
        width: 100%;
        line-height: 3.714286rem;
        text-align: center;
        border: none;
      }
      /deep/.btn-danger {
        color: #f56c6c;
        background: #fef0f0;
        border-color: #fbc4c4;
      }
      /deep/.btn-info {
        color: #409eff;
        background: #ecf5ff;
        border-color: #b3d8ff;
      }
    }
  }
}
</style>
