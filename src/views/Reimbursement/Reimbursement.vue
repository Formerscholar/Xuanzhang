<template>
  <div id="Reimbursement">
    <!-- header -->
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <i class="el-icon-back"></i>
      </div>
      <div class="center" slot="center">
        <span>报销</span>
      </div>
      <div class="right" slot="right">
        <!-- <i class="el-icon-plus newbtn"></i> -->
      </div>
    </navbar>
    <!-- titlebox -->
    <div class="titlebox">
      <div class="topbox">
        <div class="leftbox">
          <img v-if="img_url" :src="img_url" alt="logo" />
          <img v-else src="@/assets/image/dpng.png" alt="logo" />
        </div>
        <div class="flex_box">
          <div class="centerbox">
            <div class="namebox">
              <span>{{titleName.name}}</span>
              <span class="bordertext">{{titleName.roleName}}</span>
            </div>
            <div class="firm">
              <span>{{titleName.compserName}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的申请" class="itembox" name="first">
        <scroll class="scroll-wrapper">
          <div class="body_box">
            <div class="btn">
              <button>查看已完成的申请</button>
            </div>
            <div class="card">
              <el-card class="box-card topcard">
                <ul>
                  <li>
                    <span>待审金额</span>
                    <em>0.00</em>
                  </li>
                  <li>
                    <span>我的余额</span>
                    <em>0.00</em>
                  </li>
                </ul>
              </el-card>
            </div>

            <van-swipe-cell v-for="(item,index) in reimbursementList" :key="index">
              <div class="cardban" @click="reimburClick(item.id)">
                <el-card class="box-card">
                  <el-row class="item1">
                    <div class="leftbox">
                      <span>{{item.created_at}}</span>
                    </div>
                    <div class="rightbox">
                      <div class="timer">
                        <span>{{item.reimburser_name}}</span>
                      </div>
                    </div>
                  </el-row>
                  <el-row class="item2">
                    <div class="leftbox">
                      <span>{{item.reason}}</span>
                    </div>
                    <div class="rightbox">
                      <span>{{item.money}}</span>
                    </div>
                  </el-row>
                </el-card>
              </div>
              <template #right>
                <van-button square type="primary" @click="audit_enabled(item.id)" text="审核" />
              </template>
            </van-swipe-cell>

            <div class="text">
              <span>已经加载全部数据</span>
            </div>
          </div>
        </scroll>
      </el-tab-pane>
      <el-tab-pane label="我的通过" class="itembox" name="second">
        <scroll class="scroll-wrapper">
          <div class="body_box">
            <div class="boxbtn">
              <div class="ltext">
                <span class="approval">
                  <i class="el-icon-s-promotion"></i>
                  <span>待我审批</span>
                  <span>
                    (
                    <em>1</em>
                    )
                  </span>
                </span>
                <span class="copy">
                  <em>@</em>
                  <span>抄送我的</span>
                  <span>
                    (
                    <em>0</em>
                    )
                  </span>
                </span>
              </div>
              <div class="rtext">
                <span class="apphistory">
                  <span>审批历史</span>
                  <i class="el-icon-arrow-right"></i>
                </span>
              </div>
            </div>

            <div class="cardmoney">
              <el-card class="box-card">
                <el-row class="item1" style="margin-bottom: 1.428571rem;">
                  <div class="leftbox">
                    <span>
                      <i class="el-icon-s-custom" style="color:#6898ef"></i>
                      <em style="margin-left: .714286rem;">吴鹏</em>
                    </span>
                  </div>
                  <div class="rightbox">
                    <div class="timer">
                      <span>2020/05/05</span>
                      <i class="el-icon-arrow-right"></i>
                    </div>
                  </div>
                </el-row>
                <el-row class="item1">
                  <div class="leftbox">
                    <span>
                      ￥
                      <em>500.00</em>
                    </span>
                  </div>
                  <div class="rightbox">
                    <div class="timer">
                      <el-tag type="primiry">部门经理</el-tag>
                    </div>
                  </div>
                </el-row>
                <el-row class="item2">
                  <div class="leftbox">
                    <span>招待费</span>
                  </div>
                  <div class="rightbox">
                    <span>500.00</span>
                  </div>
                </el-row>
              </el-card>
            </div>
            <div class="text">
              <span>已经加载全部数据</span>
            </div>
          </div>
        </scroll>
      </el-tab-pane>
      <el-tab-pane label="全部" name="third">
        <scroll class="scroll-wrapper">角色管理</scroll>
      </el-tab-pane>
    </el-tabs>

    <!-- body -->
    <i class="el-icon-plus" @click="newAccount"></i>
  </div>
</template>
    
<script>
import {
  getReimbursementLists,
  toExamineReimbursement,
} from '@/network/Reimbursement'

export default {
  name: 'Reimbursement',

  data() {
    return {
      activeName: 'first',
      reimbursementList: [],
      titleName: {},
      img_url: '',
      StateList: [],
    }
  },
  created() {},
  computed: {
    getReimbursementListsState() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
      }
    },
  },
  activated() {
    this.getReimburse()
  },
  deactivated() {},
  methods: {
    async audit_enabled(id) {
      console.log('审核', id)
      const { code, msg } = await toExamineReimbursement({
        id: [id],
        token: this.$store.state.token,
      })
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    blackhome() {
      this.$router.go(-1)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    newAccount() {
      this.$router.push('/account')
    },
    async getReimburse() {
      const { data } = await getReimbursementLists(
        this.getReimbursementListsState
      )
      console.log('reimbursementList', data)
      this.img_url = data.userInfo[0].img_url.substr(1)
      this.StateList = data.is_verified
      this.reimbursementList = data.reimbursementList
      this.titleName = {
        name: data.userInfo[0].name || '姓名',
        compserName: data.userInfo[0].user_compser_name || '公司全称',
        roleName: data.userInfo[0].role.display_name,
      }
    },
    reimburClick(id) {
      console.log('-----ReimburDetails--------')
      this.$router.push(`/reimburDetails/${id}`)
    },
  },
}
</script>
    
<style scoped lang="scss">
#Reimbursement {
  padding-top: 5.428571rem;
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      margin-left: 0.928571rem;
      span {
        font-size: 1.571429rem;
      }
    }
    .right {
      margin-right: 1.071429rem;
      .newbtn {
      }
    }
  }
  .titlebox {
    background-color: #2a88ff;

    color: #fff;
    .topbox {
      height: 5.571429rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 1.071429rem 0.357143rem 1.071429rem;
      .leftbox {
        width: 4.642857rem;
        height: 4.642857rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #fff;
        }
      }
      .flex_box {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex: 1;
        margin-left: 0.714286rem;
        width: 100%;
        padding: 0 0.357143rem;
      }
      .centerbox {
        font-size: 1.571429rem;
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .namebox {
          span {
            margin-right: 1.071429rem;
          }
          .bordertext {
            position: relative;
            top: -0.142857rem;
            font-size: 0.857143rem;
            padding: 0 0.714286rem;
          }
        }
        .firm {
          font-size: 0.857143rem;
          span {
          }
        }
      }
      .rightbox {
        width: 4.642857rem;
        height: 4.642857rem;
        i {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
        }
      }
    }
    .btnbox {
      display: flex;
      height: 3rem;
      justify-content: space-between;
      align-items: center;
      padding: 0.357143rem 1.071429rem;
      .el-button {
        flex: 1;
      }
    }
  }

  .el-tabs {
    .itembox {
      height: calc(100vh - 13.857143rem);

      .scroll-wrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        overflow: hidden;
      }

      .body_box {
        padding: 0.357143rem 0.714286rem;
        background-color: #f3f3f3;
        min-height: calc(100vh - 14rem);
        .boxbtn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 3.142857rem;
          margin: 0.714286rem 0;
          .ltext {
            width: 19.285714rem;
            background-color: #fff;
            // line-height: 3.142857rem;
            height: 3.142857rem;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.714286rem;
            font-size: 0.857143rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            .approval {
              font-weight: 700;
            }
            .copy {
              color: #818181;
            }
          }
          .rtext {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 3.142857rem;
            width: 9.142857rem;
            background-color: #fff;
            margin-left: 1.071429rem;
            border-radius: 5px;

            .apphistory {
              color: #676767;
              display: flex;
              align-items: center;
              height: 100%;
              padding-left: 0.714286rem;
              span {
                margin-right: 0.714286rem;
              }
              i {
                font-size: 1.142857rem;
              }
            }
          }
        }

        .btn {
          margin: 0.714286rem 0;
          button {
            background-color: #fff;
            color: #3372e9;
            border: none;
            height: 2.785714rem;
            width: 100%;
            border-radius: 0.357143rem;
          }
        }
        .card {
          margin-bottom: 0.714286rem;
          .box-card {
            ul {
              display: flex;
              width: 100%;
              flex-wrap: wrap;
              li {
                width: 50%;
                height: 5.571429rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                padding: 0.714286rem;
                padding-left: 20px;
                span {
                  color: #9b9b9b;
                }
                em {
                  font-weight: 700;
                  font-style: normal;
                  font-size: 22px;
                }
              }
            }
          }
        }
        .cardban {
          margin-bottom: 1.071429rem;
          position: relative;
          .box-card {
            .item1 {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .leftbox {
                flex: 1;
                font-size: 1.142857rem;
                span {
                  color: #5e5e5e;
                }
              }
              .rightbox {
                font-size: 1.142857rem;
                .timer {
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  color: #646464;
                }
              }
            }
            .item2 {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 0.5rem;
              .leftbox {
                flex: 1;
                overflow: hidden;
                span {
                  color: #525252;
                  font-size: 1.142857rem;
                }
              }
              .rightbox {
                text-align: right;
                font-weight: 700;
                font-size: 1.142857rem;
                margin-left: 0.357143rem;
                span {
                }
              }
            }
          }
        }
        .cardmoney {
          margin-bottom: 1.428571rem;

          .item1 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .leftbox {
              width: 50%;
              font-weight: 700;
              font-size: 1.028571rem;
              span {
                em {
                }
              }
            }
            .rightbox {
              width: 50%;

              .timer {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                span {
                  color: #696969;
                }
                .el-tag {
                  margin: 0 0.714286rem;
                  color: #3568d9;
                }
                i {
                }
              }
            }
          }
          .item2 {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .leftbox {
              width: 50%;

              span {
                color: #525252;
                font-size: 1.142857rem;
                font-weight: 550;
              }
            }
            .rightbox {
              width: 50%;
              text-align: right;
              font-weight: 700;
              span {
              }
            }
          }
        }
        .text {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.071429rem;
          font-size: 16px;
          color: #434343;
        }
        .row {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 3.571429rem;
          padding: 0 0.714286rem;
          margin-bottom: 3.142857rem;
          .el-button {
            width: 4.857143rem;
            height: 4.857143rem;
            font-size: 2.857143rem;
            i {
              font-weight: 700;
            }
          }
        }
      }
    }
  }
  .el-icon-plus {
    position: fixed;
    bottom: 3.357143rem;
    right: 3.357143rem;
    padding: 0.571429rem;
    z-index: 999;
    font-size: 2.714286rem;
    background-color: #2a7bd0;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
