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
                <div class="botbox">
                  <span>
                    【{{item.name}}】
                    {{item.title}}
                  </span>
                </div>
              </el-card>
            </div>
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
                <div class="botbox">
                  <span>
                    【{{item.name}}】
                    {{item.title}}
                  </span>
                </div>
              </el-card>
            </div>
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
                <div class="botbox">
                  <span>
                    【{{item.name}}】
                    {{item.title}}
                  </span>
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
import scroll from '@/components/common/scroll/scroll'
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  components: { scroll },
  props: {
    designatedTasksList: {
      type: Array,
      default: []
    },
    UserDesignatedTasksData: {
      type: Array,
      default: []
    },
    Designated: {
      type: Array,
      default: []
    }
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
    }
  }
}
</script>
    
<style lang="scss">
.cardbtns {
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .el-tabs {
    padding-top: 2.857143rem;
    .el-tabs__header {
      position: fixed;
      top: 5.428571rem;
      left: 0;
      right: 0;
      z-index: 9999;
      background-color: #fff;
      padding: 0 !important;
    }
    .el-tabs__nav-scroll {
      display: flex;
      justify-content: center;
    }
    .el-tab-pane {
      .cardList {
        .listcontent {
          margin-bottom: 0.714286rem;
        }
        .el-tab-pane {
          padding: 0.357143rem 0.714286rem;
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

        .box-card {
          .el-card__body {
            padding: 1.171429rem;
          }
          .topbox {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.428571rem;
            font-size: 0.857143rem;
            .leftbox {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .left_id {
                .el-tag {
                  border: none;
                  background-color: #fff;
                  font-size: 0.857143rem;
                }
                span {
                  em {
                    color: #8c8c8c;
                  }
                }
              }
              .left_xj {
                //  67  53
                margin: 0 1.857143rem;
                .el-tag {
                  padding: 0;
                  border: none;
                  background-color: #fff;
                  font-size: 0.857143rem;
                }
              }
              .left_jj {
                .el-tag {
                  border: none;
                  background-color: #fff;
                  font-size: 0.857143rem;
                }
              }
            }
            .rightbox {
              .el-tag {
                font-size: 0.857143rem;
                border: none;
                background-color: #fff;
                color: #000;
              }
            }
          }
          .botbox {
            font-size: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
            }
          }
        }
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
}
</style>
