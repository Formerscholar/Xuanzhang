<template>
  <div class="cardbtns">
    <el-tabs v-model="activeName">
      <el-tab-pane class="first" label="参与任务" name="first">
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
                    <!-- <span class="jobName">董事长</span> -->
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
                    <!-- <span class="jobName">董事长</span> -->
                  </div>
                </div>
              </el-card>
            </div>
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
      <el-tab-pane class="second" label="已经完成" name="second">
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
                <div class="top_box">
                  <img src="@/assets/image/rw_logo.png" style="margin-right:.357143rem;" />
                  <span>
                    ID:
                    <em>{{item.task_id}}</em>
                  </span>
                  <span>
                    【{{item.name}}】
                    {{item.title}}
                  </span>
                </div>
                <div class="bot_box">
                  <div class="left_box">
                    <span class="name">{{item.operator_name}}</span>
                    <!-- <span class="jobName">董事长</span> -->
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
                    <!-- <span class="jobName">董事长</span> -->
                  </div>
                </div>
              </el-card>
            </div>
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
      <el-tab-pane class="third" label="任务列表" name="fourth">
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
                <div class="top_box">
                  <img src="@/assets/image/rw_logo.png" style="margin-right:.357143rem;" />
                  <span>
                    ID:
                    <em>{{item.task_id}}</em>
                  </span>
                  <span>
                    【{{item.name}}】
                    {{item.title}}
                  </span>
                </div>
                <div class="bot_box">
                  <div class="left_box">
                    <span class="name">{{item.operator_name}}</span>
                    <!-- <span class="jobName">董事长</span> -->
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
                    <!-- <span class="jobName">董事长</span> -->
                  </div>
                </div>
              </el-card>
            </div>
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
    </el-tabs>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      activeName: 'first',
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
      .box-card {
        .top_box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 0.357143rem;
          font-size: 1.142857rem;
          overflow: hidden;
          white-space: nowrap;
          img {
            width: 2rem;
            height: 2rem;
          }
        }
        .bot_box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 1.428571rem;
          .left_box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .name {
              font-size: 1.285714rem;
              font-weight: 700;
              color: black;
              width: 4.214286rem;
              text-align: center;
            }
            .jobName {
              font-size: 0.857143rem;
              color: #999999;
            }
          }
          .certent_box {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: url('../../../../../../assets/image/rw_bg.png')
              no-repeat;
            background-position: 2.142857rem 1.071429rem;
            .timers_box {
              margin-top: 0.714286rem;
              font-size: 0.857143rem;
            }
          }
          .right_box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .name {
              color: black;
              font-size: 1.285714rem;
              font-weight: 700;
              width: 4.214286rem;
              text-align: center;
            }
            .jobName {
              font-size: 0.857143rem;
              color: #999999;
            }
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
