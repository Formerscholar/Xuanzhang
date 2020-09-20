<template>
  <div id="Reimbursement">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>报销</span>
      </div>
    </navbar>
    <div class="titlebox">
      <div class="topbox d-flex">
        <div class="logo d-flex">
          <img v-if="state.img_url" :src="state.img_url" alt="logo" />
          <img src="@/assets/image/dpng.png" v-else alt="logo" />
          <div class="info">
            <div class="name">
              <div>{{ state.titleName.name }}</div>
              <div class="span">{{ state.titleName.roleName }}</div>
              <div class="phone">{{ state.titleName.phone }}</div>
            </div>
            <div class="companys">{{ state.titleName.compserName }}</div>
          </div>
        </div>
      </div>
    </div>
    <el-tabs v-model="state.activeName">
      <el-tab-pane
        label="我的报销"
        v-if="state.isreimbursementListss"
        class="itembox"
        name="third"
      >
        <scroll
          class="scroll-wrapper"
          :probeType="3"
          :pull-up-load="true"
          @scroll="clickscroll"
          @pullingUp="loadMore"
        >
          <div class="body_box">
            <van-swipe-cell
              v-for="item in state.reimbursementListss"
              :key="item.id"
            >
              <div class="cardmoney" @click="reimburClicks(item.id)">
                <div class="box-card">
                  <el-row class="item1" style="margin-bottom: .357143rem;">
                    <div class="leftbox">
                      <span>
                        <i class="el-icon-s-custom" style="color:#6898ef"></i>
                        <em style="margin-left: .714286rem;">{{
                          item.operator_name
                        }}</em>
                      </span>
                      <div class="examines">
                        <div
                          v-for="items in item.auditRecord"
                          :key="items.user_id"
                          :class="
                            items.status == 0
                              ? 'examines-bg examines-bg-pramiry'
                              : 'examines-bg examines-bg-info'
                          "
                        ></div>
                      </div>
                    </div>
                    <div class="rightbox">
                      <div class="timer">
                        <span>{{ item.created_at | setTimerType }}</span>
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </el-row>
                  <el-row class="item1">
                    <div class="leftbox">
                      <span style="margin-left: -5px;"
                        >【{{ item.category_name }}】</span
                      >
                    </div>
                    <div class="rightbox">
                      <div class="timer"></div>
                    </div>
                  </el-row>
                  <el-row class="item2">
                    <div class="leftbox">
                      <span>{{ item.reason }}</span>
                    </div>
                    <div class="rightbox">
                      <span>
                        ￥
                        <em>{{ item.money }}</em>
                      </span>
                    </div>
                  </el-row>
                </div>
              </div>

              <template #right>
                <van-button
                  square
                  type="primary"
                  @click="printH5(item.id)"
                  text="打印"
                />
              </template>
            </van-swipe-cell>

            <div class="text">
              <span>已经加载全部数据</span>
            </div>
          </div>
        </scroll>
      </el-tab-pane>
      <el-tab-pane
        label="我的待审"
        v-if="state.isauditRecordLists"
        class="itembox"
        name="three"
      >
        <scroll
          class="scroll-wrapper"
          :probeType="3"
          :pull-up-load="true"
          @scroll="clickscrolls"
          @pullingUp="loadMores"
        >
          <div class="body_box">
            <van-swipe-cell
              v-for="item in state.auditRecordLists"
              :key="item.id"
            >
              <div class="cardmoney" @click="reimburClicks(item.id)">
                <div class="box-card">
                  <el-row class="item1" style="margin-bottom: .357143rem;">
                    <div class="leftbox">
                      <span>
                        <i class="el-icon-s-custom" style="color:#6898ef"></i>
                        <em style="margin-left: .714286rem;">{{
                          item.operator_name
                        }}</em>
                      </span>
                      <div class="examines">
                        <div
                          v-for="items in item.auditRecord"
                          :key="items.user_id"
                          :class="
                            items.status == 0
                              ? 'examines-bg examines-bg-pramiry'
                              : 'examines-bg examines-bg-info'
                          "
                        ></div>
                      </div>
                    </div>
                    <div class="rightbox">
                      <div class="timer">
                        <span>{{ item.created_at | setTimerType }}</span>
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </el-row>
                  <el-row class="item1">
                    <div class="leftbox">
                      <span style="margin-left: -5px;"
                        >【{{ item.category_name }}】</span
                      >
                    </div>
                    <div class="rightbox">
                      <div class="timer"></div>
                    </div>
                  </el-row>
                  <el-row class="item2">
                    <div class="leftbox">
                      <span>{{ item.reason }}</span>
                    </div>
                    <div class="rightbox">
                      <span>
                        ￥
                        <em>{{ item.money }}</em>
                      </span>
                    </div>
                  </el-row>
                </div>
              </div>

              <template #right>
                <van-button
                  square
                  type="primary"
                  v-if="state.iSaudit_enabled"
                  @click="audit_enabled(item.id)"
                  text="审核"
                />
              </template>
            </van-swipe-cell>

            <div class="text">
              <span>已经加载全部数据</span>
            </div>
          </div>
        </scroll>
      </el-tab-pane>
      <el-tab-pane
        label="全部待审"
        v-if="state.isreimbursementLists"
        class="itembox"
        name="second"
      >
        <scroll
          class="scroll-wrapper"
          :probeType="3"
          :pull-up-load="true"
          @scroll="clickscrollss"
          @pullingUp="loadMoress"
        >
          <div class="body_box">
            <van-swipe-cell
              v-for="item in state.reimbursementLists"
              :key="item.id"
            >
              <div
                class="cardmoney"
                @click="JudgmentReview(item.to_examine, item.id)"
              >
                <div class="box-card">
                  <el-row class="item1" style="margin-bottom: .357143rem;">
                    <div class="leftbox">
                      <span>
                        <i class="el-icon-s-custom" style="color:#6898ef"></i>
                        <em style="margin-left: .714286rem;">{{
                          item.operator_name
                        }}</em>
                      </span>
                      <div class="examines">
                        <div
                          v-for="items in item.auditRecord"
                          :key="items.user_id"
                          :class="
                            items.status == 0
                              ? 'examines-bg examines-bg-pramiry'
                              : 'examines-bg examines-bg-info'
                          "
                        ></div>
                      </div>
                    </div>
                    <div class="rightbox">
                      <div class="timer">
                        <span>{{ item.created_at | setTimerType }}</span>
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </el-row>
                  <el-row class="item1">
                    <div class="leftbox">
                      <span style="margin-left: -5px;"
                        >【{{ item.category_name }}】</span
                      >
                    </div>
                    <div class="rightbox">
                      <div class="timer"></div>
                    </div>
                  </el-row>
                  <el-row class="item2">
                    <div class="leftbox">
                      <span>{{ item.reason }}</span>
                    </div>
                    <div class="rightbox">
                      <span>
                        ￥
                        <em>{{ item.money }}</em>
                      </span>
                    </div>
                  </el-row>
                </div>
              </div>

              <template #right>
                <van-button
                  v-if="item.to_examine"
                  square
                  type="primary"
                  @click="cancel_enabled(item.id)"
                  text="取消审核"
                />
                <van-button
                  v-else
                  square
                  type="primary"
                  @click="audit_enabled(item.id)"
                  text="审核"
                />
              </template>
            </van-swipe-cell>

            <div class="text">
              <span>已经加载全部数据</span>
            </div>
          </div>
        </scroll>
      </el-tab-pane>
      <el-tab-pane
        label="全部通过"
        v-if="state.isreimbursementList"
        class="itembox"
        name="first"
      >
        <scroll
          class="scroll-wrapper"
          :probeType="3"
          :pull-up-load="true"
          @scroll="clickscrollsss"
          @pullingUp="loadMoresss"
        >
          <div class="body_box">
            <van-swipe-cell
              v-for="(item, index) in state.reimbursementList"
              :key="index"
            >
              <div class="cardmoney" @click="reimburClicks(item.id)">
                <div class="box-card">
                  <el-row class="item1" style="margin-bottom: .357143rem;">
                    <div class="leftbox">
                      <span>
                        <i class="el-icon-s-custom" style="color:#6898ef"></i>
                        <em style="margin-left: .714286rem;">{{
                          item.operator_name
                        }}</em>
                      </span>
                      <div class="examines">
                        <div
                          v-for="items in item.auditRecord"
                          :key="items.user_id"
                          :class="
                            items.status == 0
                              ? 'examines-bg examines-bg-pramiry'
                              : 'examines-bg examines-bg-info'
                          "
                        ></div>
                      </div>
                    </div>
                    <div class="rightbox">
                      <div class="timer">
                        <span>{{ item.created_at | setTimerType }}</span>
                        <i class="el-icon-arrow-right"></i>
                      </div>
                    </div>
                  </el-row>
                  <el-row class="item1">
                    <div class="leftbox">
                      <span style="margin-left: -5px;"
                        >【{{ item.category_name }}】</span
                      >
                    </div>
                    <div class="rightbox">
                      <div class="timer"></div>
                    </div>
                  </el-row>
                  <el-row class="item2">
                    <div class="leftbox">
                      <span>{{ item.reason }}</span>
                    </div>
                    <div class="rightbox">
                      <span>
                        ￥
                        <em>{{ item.money }}</em>
                      </span>
                    </div>
                  </el-row>
                </div>
              </div>
              <template #right>
                <van-button
                  square
                  type="primary"
                  @click="cancel_enabled(item.id)"
                  text="取消审核"
                />
              </template>
            </van-swipe-cell>

            <div class="text">
              <span>已经加载全部数据</span>
            </div>
          </div>
        </scroll>
      </el-tab-pane>
    </el-tabs>
    <i class="el-icon-plus" @click="newAccount" v-if="state.isnewAccount"></i>
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

import { reactive, computed, onActivated } from '@vue/composition-api'

export default {
  components: {
    myVqr: () => import('@/components/common/my_vqr/myVqr'),
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
      onepage: 1,
      twoPage: 1,
      spage: 1,
      threepage: 1,
      img_url: '',
      StateList: [],
      isreimbursementLists: true,
      isreimbursementList: true,
      isreimbursementListss: true,
      isauditRecordLists: true,
      isnewAccount: true,
      iSaudit_enabled: true,
      isreimburClicks: true,
    })

    onActivated(() => {
      root.$Jurisdiction('38', localStorage.getItem('catearr'), () => {
        root.$router.replace('/home')
        root.$toast('您的账号无该模块权限!')
      })
      root.$Jurisdiction('131', localStorage.getItem('catearr'), () => {
        state.isreimbursementLists = false
      })
      root.$Jurisdiction('133', localStorage.getItem('catearr'), () => {
        state.isreimbursementList = false
      })
      root.$Jurisdiction('159', localStorage.getItem('catearr'), () => {
        state.isreimbursementListss = false
      })
      root.$Jurisdiction('160', localStorage.getItem('catearr'), () => {
        state.isauditRecordLists = false
      })
      root.$Jurisdiction('52', localStorage.getItem('oparr'), () => {
        state.isnewAccount = false
      })
      root.$Jurisdiction('55', localStorage.getItem('oparr'), () => {
        state.iSaudit_enabled = false
      })
      root.$Jurisdiction('59', localStorage.getItem('oparr'), () => {
        state.isreimburClicks = false
      })
    })

    const getReimbursementListsState = computed(() => {
      return {
        token: root.$store.state.token,
        page: state.threepage,
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
        page: state.spage,
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
        page: state.onepage,
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
        page: state.twoPage,
        offset: 20,
        _: new Date().getTime(),
      }
    })

    async function getMyToExamineReimbursement() {
      const { data } = await getMyToExamineReimbursementList(
        getMyToExamineReimbursementListData.value
      )

      state.auditRecordLists = [
        ...state.auditRecordLists,
        ...data.auditRecordLists,
      ]
    }
    async function getUserReimbursement() {
      const { data } = await getUserReimbursementList(
        getUserReimbursementListData.value
      )

      state.reimbursementListss = [
        ...state.reimbursementListss,
        ...data.reimbursementList,
      ]
    }
    function printH5(iid) {
      state.textContent = `http://219.83.161.11:8030/view/html/accountment/reimbursementPrint.php?id=${iid}`
      state.isShow = true
    }
    async function audit_enabled(id) {
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
        state.reimbursementLists = []
        state.auditRecordLists = []
        getMyToExamineReimbursement()
        getReimburses()
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

      state.img_url = data.userInfo[0]?.img_url.substr(1)
      state.StateList = data.is_verified
      state.reimbursementList = [
        ...state.reimbursementList,
        ...data.reimbursementList,
      ]
      state.titleName = {
        name: data.userInfo[0].name || '姓名',
        compserName: data.userInfo[0].user_compser_name || '公司全称',
        roleName: data.userInfo[0].role.display_name,
        phone: data.userInfo[0].username,
      }
    }
    async function getReimburses() {
      const { data } = await getReimbursementList(
        getReimbursementListsStates.value
      )

      state.reimbursementLists = [
        ...state.reimbursementLists,
        ...data.reimbursementList,
      ]
    }
    function reimburClick(id) {
      root.$router.push(`/reimburDetails/${id}`)
    }
    function reimburClicks(id) {
      if (state.isreimburClicks) {
        root.$router.push(`/reimburDetail/${id}`)
      }
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

      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        getReimburses()
        getReimburse()
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }

    function JudgmentReview(to_examine, iid) {
      if (to_examine) {
        reimburClicks(iid)
      } else {
        reimburClick(iid)
      }
    }

    function clickscroll() {
      state.onepage = 1
      state.reimbursementListss = []
      getUserReimbursement()
    }

    function clickscrolls() {
      state.twoPage = 1
      state.auditRecordLists = []
      getMyToExamineReimbursement()
    }

    function clickscrollss() {
      state.spage = 1
      state.reimbursementLists = []
      getReimburses()
    }
    function clickscrollsss() {
      state.threepage = 1
      state.reimbursementList = []
      getReimburse()
    }

    function loadMore() {
      state.onepage++
      getUserReimbursement()
    }
    function loadMores() {
      state.twoPage++
      getMyToExamineReimbursement()
    }

    function loadMoress() {
      state.spage++
      getReimburses()
    }

    function loadMoresss() {
      state.threepage++
      getReimburse()
    }

    getReimburse()
    getReimburses()
    getUserReimbursement()
    getMyToExamineReimbursement()
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
      clickscroll,
      clickscrolls,
      clickscrollss,
      clickscrollsss,
      loadMore,
      loadMores,
      loadMoress,
      loadMoresss,
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
      font-size: 1.5rem;
    }
    .center {
      margin-left: -1.071429rem;
      font-size: 1.5rem;
    }
  }
  .titlebox {
    background-color: rgb(66, 147, 200);
    padding: 0.357143rem 1rem;
    color: #fff;
    .topbox {
      height: 100%;
      justify-content: space-between;
      align-items: center;
      .logo {
        flex: 1;
        width: 100%;
        align-items: center;
        position: relative;
        img {
          width: 4.285714rem;
          height: 4.285714rem;
          border: 0.214286rem solid #67a6d9;
        }
        .el-icon-help {
          font-size: 1.571429rem;
          background-color: #a590c6;
          color: #fff;
          position: absolute;
          top: 3.214286rem;
          left: 3.214286rem;
        }
        .info {
          flex: 1;
          margin-left: 1.071429rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          font-size: 1rem;
          .name {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
            margin-bottom: 0.714286rem;

            .phone {
              margin-left: 0.571429rem;
              font-size: 0.857143rem;
              margin-bottom: 0.035714rem;
            }
            .span {
              margin-left: 0.571429rem;
              font-size: 0.857143rem;
              margin-bottom: 0.035714rem;
            }
          }

          .companys {
            font-size: 1.071429rem;
          }
        }
      }
      .icons {
        font-size: 1.571429rem;
        margin-right: 0.714286rem;
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
        padding: 0.571429rem 0.714286rem;
        background-color: #f3f4f9;
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
            background-color: #fff;
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
            background-color: #fff;
            padding: 0.714286rem;
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
                    background-color: rgb(66, 147, 200);
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
          margin-bottom: 0.571429rem;
          .box-card {
            background-color: #fff;
            padding: 0.714286rem;
          }

          .item1 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .leftbox {
              width: 50%;
              margin-left: -1px;
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
                  background-color: rgb(66, 147, 200);
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
                  color: rgb(66, 147, 200);
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
    background-color: rgb(66, 147, 200);
    color: #fff;
    border-radius: 50%;
  }
}
</style>
