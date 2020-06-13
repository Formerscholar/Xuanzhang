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
        <i class="el-icon-plus newbtn" @click="newAccount"></i>
      </div>
    </navbar>
    <!-- titlebox -->
    <div class="titlebox">
      <div class="topbox">
        <div class="leftbox">
          <img src="@/assets/image/Transparent_logo.png" alt />
        </div>
        <div class="centerbox">
          <div class="namebox">
            <span>{{titleName.name}}</span>
            <span class="bordertext">默认</span>
          </div>
          <div class="firm">
            <span>{{titleName.compserName}}</span>
          </div>
        </div>
        <div class="rightbox">
          <i class="el-icon-discover"></i>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的申请" class="itembox" name="first">
        <div class="body_box">
          <div class="btn">
            <button>查看已完成的申请</button>
          </div>
          <div class="card">
            <el-card class="box-card topcard">
              <ul>
                <li>
                  <span>审批中</span>
                  <em>500.00</em>
                </li>
                <li>
                  <span>待审票</span>
                  <em>0.00</em>
                </li>
                <li>
                  <span>待付款</span>
                  <em>0.00</em>
                </li>
                <li>
                  <span>我的借款</span>
                  <em>0.00</em>
                </li>
              </ul>
            </el-card>
          </div>
          <div
            class="cardban"
            v-for="(item,index) in reimbursementList"
            :key="index"
            @click="reimburClick(item.id)"
          >
            <el-card class="box-card">
              <el-row class="item1">
                <div class="leftbox">
                  <span>{{item.created_at}}</span>
                </div>
                <div class="rightbox">
                  <div class="timer">
                    <span>{{item.operator_name}}</span>
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
          <div class="text">
            <span>已经加载全部数据</span>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待审批" class="itembox" name="second">
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
      </el-tab-pane>
      <el-tab-pane label="应用中心" name="third">角色管理</el-tab-pane>
    </el-tabs>

    <!-- body -->
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import { getReimbursementLists } from '@/network/Reimbursement.js'

export default {
  name: 'Reimbursement',
  components: {
    navbar
  },
  data() {
    return {
      activeName: 'first',
      reimbursementList: [],
      titleName: {},
      // 状态列表
      StateList: []
    }
  },
  created() {},
  computed: {
    getReimbursementListsState() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20
      }
    }
  },
  activated() {
    this.getReimburse()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  methods: {
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

      this.StateList = data.is_verified
      this.reimbursementList = data.reimbursementList

      this.titleName = {
        name: data.userInfo[0].name || '姓名',
        compserName: data.userInfo[0].user_compser_name || '公司全称'
      }
    },
    reimburClick(id) {
      console.log('-----ReimburDetails--------')
      this.$router.push(`/reimburDetails/${id}`)
    }
  }
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
      justify-content: space-between;
      align-items: center;
      padding: 0.357143rem 1.071429rem;
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
      .centerbox {
        position: relative;
        left: -2.055714rem;
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
            font-size: 14px;
            padding: 0 0.714286rem;
            border: 1px solid #fff;
          }
        }
        .firm {
          font-size: 14px;
          span {
          }
        }
      }
      .rightbox {
        position: relative;
        top: -1.357143rem;
        right: 0.214286rem;
        i {
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
            height: 46px;
            width: 100%;
            border-radius: 0.357143rem;
            font-weight: 700;
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
                span {
                  color: #525252;
                  font-size: 1.142857rem;
                }
              }
              .rightbox {
                text-align: right;
                font-weight: 700;
                font-size: 1.142857rem;
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
}
</style>
