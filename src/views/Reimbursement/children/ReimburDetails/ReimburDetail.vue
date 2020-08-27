<template>
  <div id="ReimburDetails">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>报销编号:{{iid}}</span>
      </div>
      <div slot="right"></div>
    </navbar>

    <scroll class="scroll-wrapper" ref="scroll" :probe-type="3">
      <div class="body">
        <div class="logo">
          <div class="leftbox">
            <div class="picter">
              <img v-if="userInfo.img_url" :src="userInfo.img_url.substr(1)" alt="logo" />
              <img v-else src="@/assets/image/dpng.png" />
            </div>
            <div class="text">
              <em>{{userInfo.name}}</em>
              <p>{{userInfo.department_name}}-{{userInfo.display_name}}</p>
            </div>
          </div>
        </div>
        <el-card class="box-card Cause">
          <div class="title">
            <span>报销事由</span>
            <em style="text-align: right; color:#000;">{{reimbursement.category_name}}</em>
          </div>
          <div class="content">
            <div class="item">
              <h4>{{reimbursement.reason}}</h4>
            </div>
          </div>
          <div class="title">
            <em>创建日期</em>
            <em style="text-align: right;">{{reimbursement.created_at}}</em>
          </div>
        </el-card>
        <div class="Details">
          <div class="title">报销明细</div>
          <el-card class="box-card detail" v-for="(item,index) in reimbursementDetail" :key="index">
            <div class="newDail">
              <div class="left_box">
                <div>{{item.reason_time}}</div>
                <div class="CNY">CNY</div>
              </div>
              <div class="right_box">
                <div>{{item.reason}}</div>
                <div class="money">{{item.money }}</div>
              </div>
            </div>
          </el-card>

          <el-card class="box-card detail">
            <div class="item rent">
              <span></span>
              <em>CNY</em>
            </div>
            <div class="item timer">
              <span class="moneny">累计报销金额</span>
              <em>{{reimbursement.money }}</em>
            </div>
          </el-card>

          <el-card class="box-card detail">
            <div class="item date Reimburser">
              <span>报销人</span>
              <em>{{reimbursement.reimburser_name}}</em>
            </div>
          </el-card>
        </div>
      </div>
    </scroll>

    <div class="btns">
      <div class="deleteDeliver"></div>
      <div class="deleteDelivers"></div>
      <div class="printShip" @click="printShip">打印</div>
      <div class="editShips"></div>
      <div class="editShip"></div>
      <img class="Print" src="@/assets/image/Print.png" alt="Print" @click="printShip" />
    </div>
    <van-overlay :show="isShow" @click="isShow = false">
      <div class="wrapper-qrCode">
        <myVqr :Content="textContent"></myVqr>
      </div>
    </van-overlay>
  </div>
</template>
    
<script>
import {
  reimbursementDetail,
  deleteReimbursement,
} from '@/network/Reimbursement.js'
import myVqr from '@/components/common/my_vqr/myVqr'

export default {
  data() {
    return {
      iid: 0,
      reimbursement: {},
      reimbursementDetail: [],
      userInfo: [],
      textContent: '',
      isShow: false,
    }
  },
  components: {
    myVqr,
  },
  created() {
    this.iid = this.$route.params.id
    this.getreimbursementDetail()
  },
  destroyed() {
    this.iid = 0
    this.reimbursement = {}
    this.reimbursementDetail = []
    this.userInfo = []
    this.textContent = ''
    this.isShow = false
  },
  computed: {
    reimbursementDetailData() {
      return {
        token: this.$store.state.token,
        id: this.iid,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    async deleteDeliver() {
      const { code, msg } = await deleteReimbursement({
        token: this.$store.state.token,
        id: this.reimbursement.id,
      })
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.$router.replace('/reimbursement')
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    printShip() {
      console.log('打印')
      this.textContent = `http://219.83.161.11:8030/view/html/accountment/reimbursementPrint.php?id=${this.reimbursement.id}`
      this.isShow = true
    },
    editShip() {
      this.$router.push(`/editAccount/${this.iid}`)
    },
    blacknext() {
      this.$router.go(-1)
    },
    async getreimbursementDetail() {
      const { data } = await reimbursementDetail(this.reimbursementDetailData)
      this.reimbursement = data.reimbursement
      this.reimbursementDetail = data.reimbursementDetail
      this.userInfo = data.reimburser[0]
      console.log('reimbursementDetail', data)
    },
  },
}
</script>
    
<style scoped lang="scss">
#ReimburDetails {
  padding-top: 5.428571rem;
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

  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.928571rem;
    width: 100%;
    overflow: hidden;
  }

  .body {
    background-color: #f2f2f2;
    padding: 0 1.285714rem;
    .logo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.428571rem 2.428571rem 0 1.214286rem;
      margin-bottom: 0.571429rem;
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
        margin-top: 0.357143rem;

        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #2d2d2d;
          font-size: 1rem;
          margin-bottom: 1.428571rem;
          text-indent: 2rem;
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
        .newDail {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .left_box {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            .CNY {
              font-size: 1rem;
              color: #00cccc;
              text-align: right;
            }
          }
          .right_box {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            .money {
              font-size: 1.142857rem;
              i {
                font-size: 1.428571rem;
              }
            }
          }
        }
        .item {
          display: flex;
          justify-content: space-between;
        }

        .rent {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          span {
            font-size: 1rem;
          }
          em {
            font-size: 1rem;
            color: #00cccc;
          }
        }
        .timer {
          display: flex;
          justify-content: space-between;
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
          .moneny {
            font-size: 1rem;
            color: #1f1f1f;
          }
        }
        .date {
          align-items: flex-end;
          span {
            font-size: 0.857143rem;
          }
        }
        .Reimburser {
          display: flex;
          justify-content: space-between;
          align-items: center;
          span,
          em {
            font-size: 1rem;
          }
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
  .btns {
    height: 3.5rem;
    width: 100%;
    padding: 0.357143rem 2.142857rem;
    position: fixed;
    bottom: 1.428571rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .deleteDeliver,
    .deleteDelivers,
    .printShip,
    .editShips,
    .editShip {
      height: 2.785714rem;
      line-height: 2.785714rem;
    }

    .deleteDeliver,
    .editShip {
      width: 2.785714rem;
      border-radius: 50%;
    }

    .deleteDeliver,
    .deleteDelivers,
    .printShip {
      background-color: #000;
    }
    .deleteDelivers,
    .printShip {
      color: #fff;
    }
    .deleteDelivers {
      text-align: left;
      margin-left: -1.428571rem;
      flex: 3;
      font-size: 1rem;
    }
    .printShip {
      flex: 14;
      margin-left: 0.214286rem;
      text-align: right;
      padding-right: 3.214286rem;
    }
    .editShips {
      flex: 3;
      text-align: right;
      margin-right: -1.428571rem;
      z-index: 2;
      background-color: #f2c659;
      color: #000;
      font-size: 1rem;
    }
    .editShip {
      background-color: #f2c659;
    }
    .Print {
      width: 6.428571rem;
      height: 6.428571rem;
      position: fixed;
      bottom: 0.714286rem;
      left: 30%;
    }
  }
}
</style>
