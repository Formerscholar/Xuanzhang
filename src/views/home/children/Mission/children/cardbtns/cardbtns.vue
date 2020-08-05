<template>
  <div class="cardbtns">
    <van-search v-model="searchValue" shape="round" background="#fff" placeholder="搜索/查单">
      <template #right-icon>
        <van-icon name="scan" />
      </template>
    </van-search>
    <el-tabs v-model="activeName">
      <el-tab-pane class="first" :label="'参与'+ UserDesignatedTasksCount" name="first">
        <scroll
          class="scroll-wrapper"
          ref="scrollss"
          :probe-type="3"
          :pull-up-load="true"
          @pullingUp="loadMore('participate')"
        >
          <div class="cardList" v-for="(item,index) in designatedTasksList" :key="index">
            <div class="listcontent" @click="goDetails(item.id)">
              <el-card class="box-card">
                <div class="numstag">
                  <div class="num">
                    <span class="title">任务编号:</span>
                    <span class="content">{{item.task_id}}</span>
                  </div>
                  <div class="tags">
                    <el-tag
                      style="margin-right:.428571rem;"
                      effect="plain"
                      :type="setTextStatus('type',item.status,item.user_status)"
                    >{{setTextStatus('text',item.status,item.user_status)}}</el-tag>
                    <el-tag
                      style="margin-left:.428571rem;"
                      effect="plain"
                      :type="setTypes('type',item.attribute)"
                    >{{setTypes('text',item.attribute)}}</el-tag>
                  </div>
                </div>
                <div class="charactimer">
                  <div class="left_box">
                    <div class="name">{{item.operator_name}}</div>
                    <div class="timers">{{item.created_at | setTimerType}}</div>
                  </div>
                  <div class="center_box">
                    <img src="@/assets/image/rw_bg.png" />
                  </div>
                  <div class="right_box">
                    <div class="name">{{item.user_name}}</div>
                    <div class="timers">{{item.end_time}}</div>
                  </div>
                </div>
                <div class="MissionDetails">
                  <span>【{{item.name}}】</span>
                  {{item.title}}
                </div>
              </el-card>
            </div>

            <!-- <div class="listcontent" @click="goDetails(item.id)">
              <el-card class="box-card">
                <div class="top_box">
                  <img src="@/assets/image/rw_logo.png" style="margin-right:.357143rem;" />
                  <span>
                    ID:
                    <em>{{item.task_id}}</em>
                  </span>
                  <span class="title">
                    【{{item.name}}】
                    {{item.title}}
                  </span>
                </div>
                <div class="bot_box">
                  <div class="left_box">
                    <span class="name">{{item.operator_name}}</span>
                    <span class="jobName">董事长</span>
                  </div>
                  <div class="certent_box">
                    <div class="status_box">
                      <el-tag
                        style="margin-right:.428571rem;"
                        effect="plain"
                        :type="setTextStatus('type',item.status,item.user_status)"
                      >{{setTextStatus('text',item.status,item.user_status)}}</el-tag>
                      <el-tag
                        style="margin-left:.428571rem;"
                        effect="plain"
                        :type="setTypes('type',item.attribute)"
                      >{{setTypes('text',item.attribute)}}</el-tag>
                    </div>
                    <div class="timers_box">{{item.end_time}}</div>
                  </div>
                  <div class="right_box">
                    <span class="name">{{item.user_name}}</span>
                    <span class="jobName">董事长</span>
                  </div>
                </div>
              </el-card>
            </div>-->

            <!-- <div class="listcontent" @click="goDetails(item.id)">
              <el-card class="box-card">
                <div class="botbox">
                  <span>
                    【{{item.name}}】
                    {{item.title}}
                  </span>
                </div>
                <div class="topbox">
                  <div class="leftbox">
                    <div class="left_id">
                      <el-tag
                        :type="setTextStatus('type',item.status,item.user_status)"
                      >{{setTextStatus('text',item.status,item.user_status)}}</el-tag>
                    </div>
                    <div class="left_xj">
                      <span>
                        ID:
                        <em>{{item.id}}</em>
                      </span>
                    </div>
                    <div class="left_jj">
                      <el-tag
                        :type="setTypes('type',item.attribute)"
                      >{{setTypes('text',item.attribute)}}</el-tag>
                    </div>
                  </div>
                  <div class="rightbox">
                    <el-tag type="danger">{{item.end_time}}</el-tag>
                  </div>
                </div>
              </el-card>
            </div>-->
          </div>
        </scroll>
      </el-tab-pane>
      <el-tab-pane class="second" :label="'已完成' + designatedTasksCount " name="second">
        <scroll
          class="scroll-wrapper"
          ref="scrolls"
          :probe-type="3"
          :pull-up-load="true"
          @pullingUp="loadMore('success')"
        >
          <div class="cardList" v-for="(item,index) in UserDesignatedTasksData" :key="index">
            <div class="listcontent" @click="goDetails(item.id)">
              <el-card class="box-card">
                <div class="numstag">
                  <div class="num">
                    <span class="title">任务编号:</span>
                    <span class="content">{{item.task_id}}</span>
                  </div>
                  <div class="tags">
                    <el-tag
                      style="margin-right:.428571rem;"
                      effect="plain"
                      :type="setTextStatus('type',item.status,item.user_status)"
                    >{{setTextStatus('text',item.status,item.user_status)}}</el-tag>
                    <el-tag
                      style="margin-left:.428571rem;"
                      effect="plain"
                      :type="setTypes('type',item.attribute)"
                    >{{setTypes('text',item.attribute)}}</el-tag>
                  </div>
                </div>
                <div class="charactimer">
                  <div class="left_box">
                    <div class="name">{{item.operator_name}}</div>
                    <div class="timers">{{item.created_at | setTimerType}}</div>
                  </div>
                  <div class="center_box">
                    <img src="@/assets/image/rw_bg.png" />
                  </div>
                  <div class="right_box">
                    <div class="name">{{item.user_name}}</div>
                    <div class="timers">{{item.end_time}}</div>
                  </div>
                </div>
                <div class="MissionDetails">
                  <span>【{{item.name}}】</span>
                  {{item.title}}
                </div>
              </el-card>
            </div>
          </div>
        </scroll>
      </el-tab-pane>
      <el-tab-pane class="third" :label="'所有' + DesignatedCount" name="fourth">
        <scroll
          class="scroll-wrapper"
          ref="scroll"
          :probe-type="3"
          :pull-up-load="true"
          @pullingUp="loadMore('list')"
        >
          <div class="cardList" v-for="(item,index) in Designated" :key="index">
            <div class="listcontent" @click="goDetails(item.id)">
              <el-card class="box-card">
                <div class="numstag">
                  <div class="num">
                    <span class="title">任务编号:</span>
                    <span class="content">{{item.task_id}}</span>
                  </div>
                  <div class="tags">
                    <el-tag
                      style="margin-right:.428571rem;"
                      effect="plain"
                      :type="setTextStatus('type',item.status,item.user_status)"
                    >{{setTextStatus('text',item.status,item.user_status)}}</el-tag>
                    <el-tag
                      style="margin-left:.428571rem;"
                      effect="plain"
                      :type="setTypes('type',item.attribute)"
                    >{{setTypes('text',item.attribute)}}</el-tag>
                  </div>
                </div>
                <div class="charactimer">
                  <div class="left_box">
                    <div class="name">{{item.operator_name}}</div>
                    <div class="timers">{{item.created_at | setTimerType}}</div>
                  </div>
                  <div class="center_box">
                    <img src="@/assets/image/rw_bg.png" />
                  </div>
                  <div class="right_box">
                    <div class="name">{{item.user_name}}</div>
                    <div class="timers">{{item.end_time}}</div>
                  </div>
                </div>
                <div class="MissionDetails">
                  <span>【{{item.name}}】</span>
                  {{item.title}}
                </div>
              </el-card>
            </div>
          </div>
        </scroll>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      activeName: 'first',
      searchValue: '',
    }
  },

  props: {
    designatedTasksList: {
      type: Array,
      default: [],
    },
    UserDesignatedTasksData: {
      type: Array,
      default: [],
    },
    Designated: {
      type: Array,
      default: [],
    },
    designatedTasksCount: {
      type: Number,
      default: 0,
    },
    UserDesignatedTasksCount: {
      type: Number,
      default: 0,
    },
    DesignatedCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    loadMore(str) {
      switch (str) {
        case 'participate':
          this.$emit('loadMore', 'particiType')
          this.$refs.scrollss.finishPullUp()
          break
        case 'success':
          this.$emit('loadMore', 'SuccessType')
          this.$refs.scrolls.finishPullUp()
          break
        case 'list':
          this.$emit('loadMore', 'ListType')
          this.$refs.scroll.finishPullUp()
          break
        default:
          break
      }
    },
    goDetails(id) {
      this.$emit('goDetails', id)
    },
    setTextStatus(type, status, user_status) {
      if (type == 'type') {
        if (status == 2) {
          return 'danger'
        } else if (status == 1) {
          return 'success'
        } else if (user_status == 1) {
          return 'warning'
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
    setTypes(type, attribute) {
      if (type == 'type') {
        if (attribute == 1) {
          return 'success'
        } else {
          return 'danger'
        }
      } else {
        if (attribute == 1) {
          return '一般'
        } else {
          return '紧急'
        }
      }
    },
  },
}
</script>
    
<style lang="scss" scoped>
.cardbtns {
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .cardList {
    .listcontent {
      margin-bottom: 0.357143rem;
      padding: 0.357143rem 0.857143rem;
      .box-card {
        font-family: 'SimHei';
        .numstag {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.857143rem;
          margin-bottom: 0.571429rem;

          .num {
            color: #ababab;
            .title {
            }
            .content {
              color: black;
            }
          }
          .tags {
            .status {
              border: 1px solid #2889fe;
              color: #2889fe;
              padding: 0 0.714286rem;
              text-align: center;
              border-radius: 0.357143rem;
              margin-right: 0.357143rem;
            }
            .urgents {
              border: 1px solid #ff0000;
              color: #ff0000;
              padding: 0 0.714286rem;
              text-align: center;
              border-radius: 0.357143rem;
            }
          }
        }
        .charactimer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
          margin-bottom: 0.571429rem;
          .left_box {
            flex: 1;
            .name {
              font-size: 1.285714rem;
            }
            .timers {
              font-size: 0.857143rem;
            }
          }
          .center_box {
            width: 5.214286rem;
            overflow: hidden;
          }
          .right_box {
            flex: 1;
            .name {
              font-size: 1.285714rem;
            }
            .timers {
              font-size: 0.857143rem;
            }
          }
        }
        .MissionDetails {
          font-size: 1.071429rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span {
            color: #666666;
          }
        }
      }
    }

    .text {
      font-size: 1rem;
    }

    .item {
      margin-bottom: 1.285714rem;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: '';
    }
    .clearfix:after {
      clear: both;
    }
  }
  .first {
    min-height: calc(100vh - 8.285714rem);
  }
  .second {
    min-height: calc(100vh - 8.285714rem);
  }
  .third {
    min-height: calc(100vh - 8.285714rem);
  }
}
</style>
