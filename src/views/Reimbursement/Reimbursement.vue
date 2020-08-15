<template>
  <div id="Reimbursement">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <i class="el-icon-back"></i>
      </div>
      <div class="center" slot="center">
        <span>报销</span>
      </div>
    </navbar>
    <div class="titlebox">
      <div class="topbox">
        <div class="leftbox">
          <img v-if="state.img_url" :src="state.img_url" alt="logo" />
          <img v-else src="@/assets/image/dpng.png" alt="logo" />
        </div>
        <div class="flex_box">
          <div class="centerbox">
            <div class="namebox">
              <span>{{state.titleName.name}}</span>
              <span class="bordertext">{{state.titleName.roleName}}</span>
            </div>
            <div class="firm">
              <span>{{state.titleName.compserName}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-tabs v-model="state.activeName">
      <el-tab-pane label="我的报销" class="itembox" name="third">
        <scroll class="scroll-wrapper">
          <div class="body_box">
            <van-swipe-cell v-for="item in state.reimbursementListss" :key="item.id">
              <div class="cardmoney" @click="reimburClicks(item.id)">
                <el-card class="box-card">
                  <el-row class="item1" style="margin-bottom: .357143rem;">
                    <div class="leftbox">
                      <span>
                        <i class="el-icon-s-custom" style="color:#6898ef"></i>
                        <em style="margin-left: .714286rem;">{{item.operator_name}}</em>
                      </span>
                      <div class="examines">
                        <div
                          v-for="items in item.auditRecord"
                          :key="items.user_id"
                          :class="items.status == 0 ? 'examines-bg examines-bg-pramiry' : 'examines-bg examines-bg-info'"
                        ></div>
                      </div>
                    </div>
                    <div class="rightbox">
                      <div class="timer">
                        <span>{{item.created_at | setTimerType}}</span>
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </el-row>
                  <el-row class="item1">
                    <div class="leftbox">
                      <span>{{item.category_name}}</span>
                    </div>
                    <div class="rightbox">
                      <div class="timer"></div>
                    </div>
                  </el-row>
                  <el-row class="item2">
                    <div class="leftbox">
                      <span>{{item.reason}}</span>
                    </div>
                    <div class="rightbox">
                      <span>
                        ￥
                        <em>{{item.money}}</em>
                      </span>
                    </div>
                  </el-row>
                </el-card>
              </div>

              <template #right>
                <van-button square type="primary" @click="printH5(item.id)" text="打印" />
              </template>
            </van-swipe-cell>

            <div class="text">
              <span>已经加载全部数据</span>
            </div>
          </div>
        </scroll>
      </el-tab-pane>
      <el-tab-pane label="我的待审" class="itembox" name="three">
        <scroll class="scroll-wrapper">
          <div class="body_box">
            <van-swipe-cell v-for="item in state.auditRecordLists" :key="item.id">
              <div class="cardmoney" @click="reimburClicks(item.id)">
                <el-card class="box-card">
                  <el-row class="item1" style="margin-bottom: .357143rem;">
                    <div class="leftbox">
                      <span>
                        <i class="el-icon-s-custom" style="color:#6898ef"></i>
                        <em style="margin-left: .714286rem;">{{item.operator_name}}</em>
                      </span>
                      <div class="examines">
                        <div
                          v-for="items in item.auditRecord"
                          :key="items.user_id"
                          :class="items.status == 0 ? 'examines-bg examines-bg-pramiry' : 'examines-bg examines-bg-info'"
                        ></div>
                      </div>
                    </div>
                    <div class="rightbox">
                      <div class="timer">
                        <span>{{item.created_at | setTimerType}}</span>
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </el-row>
                  <el-row class="item1">
                    <div class="leftbox">
                      <span>{{item.category_name}}</span>
                    </div>
                    <div class="rightbox">
                      <div class="timer"></div>
                    </div>
                  </el-row>
                  <el-row class="item2">
                    <div class="leftbox">
                      <span>{{item.reason}}</span>
                    </div>
                    <div class="rightbox">
                      <span>
                        ￥
                        <em>{{item.money}}</em>
                      </span>
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
      <el-tab-pane label="全部待审" class="itembox" name="second">
        <scroll class="scroll-wrapper">
          <div class="body_box">
            <van-swipe-cell v-for="item in state.reimbursementLists" :key="item.id">
              <div class="cardmoney" @click="JudgmentReview(item.to_examine,item.id)">
                <el-card class="box-card">
                  <el-row class="item1" style="margin-bottom: .357143rem;">
                    <div class="leftbox">
                      <span>
                        <i class="el-icon-s-custom" style="color:#6898ef"></i>
                        <em style="margin-left: .714286rem;">{{item.operator_name}}</em>
                      </span>
                      <div class="examines">
                        <div
                          v-for="items in item.auditRecord"
                          :key="items.user_id"
                          :class="items.status == 0 ? 'examines-bg examines-bg-pramiry' : 'examines-bg examines-bg-info'"
                        ></div>
                      </div>
                    </div>
                    <div class="rightbox">
                      <div class="timer">
                        <span>{{item.created_at | setTimerType}}</span>
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </el-row>
                  <el-row class="item1">
                    <div class="leftbox">
                      <span>{{item.category_name}}</span>
                    </div>
                    <div class="rightbox">
                      <div class="timer"></div>
                    </div>
                  </el-row>
                  <el-row class="item2">
                    <div class="leftbox">
                      <span>{{item.reason}}</span>
                    </div>
                    <div class="rightbox">
                      <span>
                        ￥
                        <em>{{item.money}}</em>
                      </span>
                    </div>
                  </el-row>
                </el-card>
              </div>

              <template #right>
                <van-button
                  v-if="item.to_examine"
                  square
                  type="primary"
                  @click="cancel_enabled(item.id)"
                  text="取消待审"
                />
                <van-button v-else square type="primary" @click="audit_enabled(item.id)" text="审核" />
              </template>
            </van-swipe-cell>

            <div class="text">
              <span>已经加载全部数据</span>
            </div>
          </div>
        </scroll>
      </el-tab-pane>
      <el-tab-pane label="全部通过" class="itembox" name="first">
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
            <van-swipe-cell v-for="(item,index) in state.reimbursementList" :key="index">
              <div class="cardban" @click="reimburClicks(item.id)">
                <el-card class="box-card">
                  <el-row class="item1" style="margin-bottom: .357143rem;">
                    <div class="leftbox">
                      <span>
                        <i class="el-icon-s-custom" style="color:#6898ef"></i>
                        <em style="margin-left: .714286rem;">{{item.operator_name}}</em>
                      </span>
                      <div class="examines">
                        <div
                          v-for="items in item.auditRecord"
                          :key="items.user_id"
                          :class="items.status == 0 ? 'examines-bg examines-bg-pramiry' : 'examines-bg examines-bg-info'"
                        ></div>
                      </div>
                    </div>
                    <div class="rightbox">
                      <div class="timer">
                        <span>{{item.created_at | setTimerType}}</span>
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </el-row>
                  <el-row class="item1">
                    <div class="leftbox">
                      <span>{{item.category_name}}</span>
                    </div>
                    <div class="rightbox">
                      <div class="timer"></div>
                    </div>
                  </el-row>
                  <el-row class="item2">
                    <div class="leftbox">
                      <span>{{item.reason}}</span>
                    </div>
                    <div class="rightbox">
                      <span>
                        ￥
                        <em>{{item.money}}</em>
                      </span>
                    </div>
                  </el-row>
                </el-card>
              </div>
              <template #right>
                <van-button square type="primary" @click="cancel_enabled(item.id)" text="取消待审" />
              </template>
            </van-swipe-cell>

            <div class="text">
              <span>已经加载全部数据</span>
            </div>
          </div>
        </scroll>
      </el-tab-pane>
    </el-tabs>
    <i class="el-icon-plus" @click="newAccount"></i>
    <van-overlay :show="state.isShow" @click="state.isShow = false">
      <div class="wrapper-qrCode">
        <myVqr :Content="state.textContent"></myVqr>
      </div>
    </van-overlay>
  </div>
</template>
    
<script>
import {
  getReimbursementList,
  toExamineReimbursement,
  getUserReimbursementList,
  getMyToExamineReimbursementList,
  cancelToExamineReimbursement,
} from '@/network/Reimbursement'
import myVqr from '@/components/common/my_vqr/myVqr'

import { reactive, computed, onActivated } from '@vue/composition-api'

export default {
  components: {
    myVqr,
  },
  setup(props, { root }) {
    const state = reactive({
      activeName: 'third',
      reimbursementList: [],
      reimbursementLists: [],
      reimbursementListss: [],
      auditRecordLists: [],
      isShow: false,
      titleName: {},
      textContent: '',
      img_url: '',
      StateList: [],
    })

    onActivated(() => {
      getReimburse()
      getReimburses()
      getUserReimbursement()
      getMyToExamineReimbursement()
    })

    const getReimbursementListsState = computed(() => {
      return {
        token: root.$store.state.token,
        page: 1,
        offset: 20,
        reason: null,
        category_id: null,
        operator_id: null,
        status: 1,
        _: new Date().getTime(),
      }
    })

    const getReimbursementListsStates = computed(() => {
      return {
        token: root.$store.state.token,
        page: 1,
        offset: 20,
        reason: null,
        category_id: null,
        operator_id: null,
        status: 0,
        _: new Date().getTime(),
      }
    })
    const getUserReimbursementListData = computed(() => {
      return {
        token: root.$store.state.token,
        page: 1,
        offset: 20,
        reason: null,
        category_id: null,
        operator_id: null,
        status: 2,
        _: new Date().getTime(),
      }
    })
    const getMyToExamineReimbursementListData = computed(() => {
      return {
        token: root.$store.state.token,
        page: 1,
        offset: 20,
        _: new Date().getTime(),
      }
    })

    async function getMyToExamineReimbursement() {
      const { data } = await getMyToExamineReimbursementList(
        getMyToExamineReimbursementListData.value
      )
      console.log('getMyToExamineReimbursementList', data)
      state.auditRecordLists = data.auditRecordLists
    }
    async function getUserReimbursement() {
      const { data } = await getUserReimbursementList(
        getUserReimbursementListData.value
      )
      console.log('getUserReimbursementList', data)
      state.reimbursementListss = data.reimbursementList
    }
    function printH5(iid) {
      console.log('print', iid)
      state.textContent = `http://219.83.161.11:8030/view/html/accountment/reimbursementPrint.php?id=${iid}`
      state.isShow = true
    }
    async function audit_enabled(id) {
      console.log('审核', id)
      const { code, msg } = await toExamineReimbursement({
        id: [id],
        token: root.$store.state.token,
      })
      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }
    function blackhome() {
      root.$router.go(-1)
    }

    function newAccount() {
      root.$router.push('/account')
    }
    async function getReimburse() {
      const { data } = await getReimbursementList(
        getReimbursementListsState.value
      )
      console.log('reimbursementList', data)
      state.img_url = data.userInfo[0].img_url.substr(1)
      state.StateList = data.is_verified
      state.reimbursementList = data.reimbursementList
      state.titleName = {
        name: data.userInfo[0].name || '姓名',
        compserName: data.userInfo[0].user_compser_name || '公司全称',
        roleName: data.userInfo[0].role.display_name,
      }
    }
    async function getReimburses() {
      const { data } = await getReimbursementList(
        getReimbursementListsStates.value
      )
      console.log('reimbursementList', data)
      state.reimbursementLists = data.reimbursementList
    }
    function reimburClick(id) {
      console.log('-----ReimburDetails--------')
      root.$router.push(`/reimburDetails/${id}`)
    }
    function reimburClicks(id) {
      root.$router.push(`/reimburDetail/${id}`)
    }

    async function cancel_enabled(iid) {
      const cancelToExamineReimbursementData = computed(() => {
        return {
          id: [iid],
          token: root.$store.state.token,
        }
      })
      const { code, msg } = await cancelToExamineReimbursement(
        cancelToExamineReimbursementData.value
      )
      console.log('cancelToExamineReimbursement', code, msg)
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
    }

    function JudgmentReview(to_examine, iid) {
      console.log(to_examine, iid)
      if (to_examine) {
        reimburClicks(iid)
      } else {
        reimburClick(iid)
      }
    }

    return {
      state,
      blackhome,
      reimburClick,
      reimburClicks,
      audit_enabled,
      printH5,
      newAccount,
      cancel_enabled,
      JudgmentReview,
    }
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
      margin-left: -1.071429rem;
      span {
        font-size: 1.571429rem;
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
          background-color: #fff;
          border: 0.214286rem solid #67a6d9;
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
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          margin-bottom: 0.714286rem;
          span {
            margin-right: 0.714286rem;
            font-size: 1.142857rem;
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
                display: flex;
                justify-content: flex-start;
                align-items: center;
                span {
                  color: #5e5e5e;
                }
                .examines {
                  margin-left: 0.357143rem;
                  display: flex;
                  .examines-bg {
                    width: 0.857143rem;
                    height: 0.857143rem;
                    margin-right: 0.357143rem;
                  }
                  .examines-bg-pramiry {
                    background-color: #ccc;
                  }
                  .examines-bg-info {
                    background-color: #3568d9;
                  }
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
                white-space: nowrap;
                span {
                  color: #525252;
                  font-size: 1.142857rem;
                }
              }
              .rightbox {
                text-align: right;
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
              font-size: 1.028571rem;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              .examines {
                margin-left: 0.357143rem;
                display: flex;
                .examines-bg {
                  width: 0.857143rem;
                  height: 0.857143rem;
                  margin-right: 0.357143rem;
                }
                .examines-bg-pramiry {
                  background-color: #ccc;
                }
                .examines-bg-info {
                  background-color: #3568d9;
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
              flex: 1;
              white-space: nowrap;
              overflow: hidden;
              span {
                color: #525252;
                font-size: 1.142857rem;
              }
            }
            .rightbox {
              text-align: right;
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
