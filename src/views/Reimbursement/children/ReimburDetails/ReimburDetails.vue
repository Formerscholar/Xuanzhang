<template>
  <div id="ReimburDetails">
    <!-- header -->
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>报销编号:{{iid}}</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <!-- body -->
    <div class="body">
      <!-- 头像logo -->
      <div class="logo">
        <div class="leftbox">
          <div class="picter">
            <img src="@/assets/image/logo.png" />
          </div>
          <div class="text">
            <em>{{userInfo[0].name}}</em>
            <p>{{userInfo[0].role.display_name}}</p>
          </div>
        </div>
        <div class="rightbox">
          <img src="@/assets/image/siletP.png" />
        </div>
      </div>
      <!-- 报销事由 -->
      <el-card class="box-card Cause">
        <div class="title">
          <span>报销事由</span>
          <em>备注</em>
        </div>
        <div class="content">
          <div class="item">
            <span>{{reimbursement.reason}}</span>
            <em>{{reimbursement.operator_remark}}</em>
          </div>
          <div class="item">
            <span>{{reimbursement.created_at}}</span>
            <em></em>
          </div>
        </div>
      </el-card>
      <!-- 报销明细 -->
      <div class="Details">
        <div class="title">报销明细</div>
        <el-card class="box-card detail" v-for="(item,index) in reimbursementDetail" :key="index">
          <div class="item rent">
            <span>{{item.category_name}}</span>
            <em>CNY</em>
          </div>
          <div class="item timer">
            <span>{{item.reason_time}}</span>
            <em>
              <i>{{item.money.split('.')[0]}}</i>
              .{{item.money.split('.')[1]}}
            </em>
          </div>
          <div class="item date">
            <span>{{item.reason}}</span>
          </div>
        </el-card>

        <el-card class="box-card detail">
          <div class="item rent">
            <span class="moneny">累计报销金额</span>
            <em>CNY</em>
          </div>
          <div class="item timer">
            <div></div>
            <em>
              <i>{{reimbursement.money.split('.')[0]}}</i>
              .{{reimbursement.money.split('.')[1]}}
            </em>
          </div>
          <div class="item date Reimburser">
            <span>报销人</span>
            <em>{{reimbursement.operator_name}}</em>
          </div>
        </el-card>
        <el-card class="box-card detail">
          <span class="state">状态: 待审核</span>
        </el-card>
      </div>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import { reimbursementDetail } from '@/network/Reimbursement.js'
export default {
  name: 'ReimburDetails',
  components: { navbar },
  data() {
    return {
      iid: 0,
      reimbursement: {},
      reimbursementDetail: [],
      userInfo: []
    }
  },

  activated() {
    this.iid = this.$route.params.id
    this.getreimbursementDetail()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  computed: {
    reimbursementDetailData() {
      return {
        token: this.$store.state.token,
        id: this.iid,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    blacknext() {
      this.$router.go(-1)
    },
    async getreimbursementDetail() {
      const { data } = await reimbursementDetail(this.reimbursementDetailData)
      this.reimbursement = data.reimbursement
      this.reimbursementDetail = data.reimbursementDetail
      this.userInfo = data.userInfo
      console.log('reimbursementDetail', data)
    }
  }
}
</script>
    
<style scoped lang="scss">
#ReimburDetails {
  padding-top: 5.428571rem;
  min-height: 100vh;
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;
    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -3.071429rem;
      font-size: 1.285714rem;
    }
  }
  .body {
    background-color: #f2f2f2;
    padding: 0 1.285714rem;
    .logo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.428571rem 2.428571rem 0 1.214286rem;
      margin-bottom: 1.428571rem;
      .leftbox {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .picter {
          width: 2.857143rem;
          height: 2.857143rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .text {
          margin-left: 1rem;
          em {
            font-size: 1.128571rem;
            font-weight: 700;
          }
          p {
            font-size: 0.771429rem;
            margin: 0.242857rem 0 0 0;
          }
        }
      }
      .rightbox {
        width: 3.571429rem;
        height: 3.571429rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .Cause {
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.014286rem;
        color: #868686;
        span {
          flex: 1;
        }
        em {
          flex: 1;
        }
      }
      .content {
        margin-top: 0.857143rem;

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #2d2d2d;
          font-weight: 700;
          font-size: 0.714286rem;
          margin-bottom: 1.428571rem;
          &:last-child {
            margin: 0;
          }
          span {
            flex: 1;
          }
          em {
            flex: 1;
          }
        }
      }
    }
    .Details {
      margin-top: 1.857143rem;
      .title {
        font-weight: 700;
        margin-bottom: 0.614286rem;
        padding-left: 0.857143rem;
      }
      .detail {
        margin-bottom: 0.428571rem;
        .item {
          display: flex;
          justify-content: space-between;
        }

        .rent {
          align-items: flex-start;
          .moneny {
            position: relative;
            top: 0.857143rem;
          }
          span {
            font-size: 1rem;
          }
          em {
            font-size: 1rem;
            color: #00cccc;
          }
        }
        .timer {
          align-items: flex-end;
          margin-bottom: 0.314286rem;
          span {
            font-size: 0.857143rem;
            color: #767676;
          }
          em {
            color: #1f1f1f;
            font-size: 1.142857rem;
            i {
              font-size: 1.714286rem;
            }
          }
        }
        .date {
          align-items: flex-end;
          span {
            font-size: 0.857143rem;
            color: #888888;
          }
        }
        .Reimburser {
          background-color: #dddddd;
          padding: 0.457143rem 1.571429rem;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            color: #0a0a0a;
          }
        }
        .state {
          color: #000;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
