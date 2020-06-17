<template>
  <div class="content">
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
  </div>
</template>
    
<script>
import { getDesignatedTasksDetail } from '@/network/deal'
import { bestURL, crosURl } from '@/network/baseURL'
export default {
  components: {},
  data() {
    return {
      designatedTasks: {},
      designatedTasksType: {},
      jobTitle: '',
      designatedTasksDetail: [],
      imgSrc: ''
    }
  },
  props: {
    iid: {
      type: String,
      default: '0'
    }
  },
  mounted() {
    this.$preview.on('imageLoadComplete', (e, item) => {
      let preview = this.$preview.self
      let lookUrl = window.location.href + '&look'
      window.history.pushState(null, null, lookUrl)
      preview.listen('close', function() {
        if (window.location.href.indexOf('&look') !== -1) {
          window.history.back()
        }
      })
      window.onhashchange = function() {
        if (preview !== null && preview !== undefined) {
          preview.close()
          preview = null
        }
      }
    })
  },
  activated() {
    document
      .querySelectorAll('.content .Process .el-timeline-item__timestamp')
      .forEach(item => {
        item.style.fontSize = ' 1.142857rem !important'
      })
    this.getdealitem()
  },
  deactivated() {
    this.imgSrc = ''
  },
  computed: {
    getdealitemData() {
      return {
        token: this.$store.state.token,
        id: this.iid * 1,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    async getdealitem() {
      const { data } = await getDesignatedTasksDetail(this.getdealitemData)
      console.log('getDesignatedTasksDetail', data)
      this.imgSrc = data.userInfo[0].img_url
      this.designatedTasksDetail = data.designatedTasksDetail.reverse()
      this.jobTitle = data.designatedTasks.operator_role
      this.designatedTasks = data.designatedTasks
      this.designatedTasksType = data.designatedTasksType
      let str = this.designatedTasks.details
      console.log('str', str)
      for (let i = 0; i <= str.split('<img src="/view').length - 1; i++) {
        str = str.replace(
          /(<img src="\/view)/,
          `
        <br /><img preview="2" preview-text="图片详情" style="width:100%;" src="${bestURL}/view
        `
        )
      }
      for (let i = 0; i <= str.split('<img src="/uploads').length - 1; i++) {
        str = str.replace(
          /(<img src="\/uploads)/,
          `
        <br /><img preview="2" preview-text="图片详情" style="width:100%;" src="${bestURL}/uploads
        `
        )
      }
      document.querySelector('#content').innerHTML = str
      this.$previewRefresh()
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
    }
  }
}
</script>
    
<style lang="scss" scoped >
.content {
  padding: 0.357143rem 0.714286rem;
  padding-bottom: 2.857143rem;
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
          .title_logo {
            width: 2.857143rem;
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
            top: 0.178571rem;
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
    .el-timeline {
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
</style>
