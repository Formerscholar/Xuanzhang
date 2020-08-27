<template>
  <div id="engravDetail">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>{{metadata.order_number | setOrderNumber }}</span>
      </div>
      <div class="right" slot="right">
        <span></span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <el-card class="content_wrap">
        <div class="Company">
          <span>{{metadata.name }}</span>
          <span>
            <em>￥</em>
            {{metadata.amount_of_discount }}
          </span>
        </div>
        <div class="itembox">
          <span>{{metadata.created_at | setRecordItemCreated}}</span>
          <span>{{metadata.operator_name |setOperatorName }}</span>
        </div>
      </el-card>
      <el-card class="product_box">
        <div class="wrap_item" v-for="(item,index) in deliverGoodsDetail" :key="index">
          <div class="wrap_left">
            <div @touchstart="touchin" @touchend="cleartime(item.materiel_id)">
              <img
                v-if="item.img_url && item.img_url != 0 "
                class="img"
                :src="item.img_url  | getUrl"
              />
              <img src="@/assets/image/Default.png" class="img" v-else />
            </div>
            <div class="text">
              <div class="title">
                <p>{{item.product_name}}</p>
                <div>
                  <span>￥</span>
                  <span class="funds">{{item.total_price}}</span>
                </div>
              </div>
              <p class="model">{{item.product_model}}</p>
              <div class="wrap_right">
                <span v-if="item.weight || item.process_cost">
                  ({{item.unit_price}}
                  <span v-if="item.weight">×{{item.weight}}</span>
                  <span v-if="item.process_cost">+{{item.process_cost}}</span>
                  )
                </span>
                <span v-else>{{item.unit_price}}</span>
                ×{{item.number}}
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </scroll>
    <div class="btns">
      <div class="deleteDeliver" @click="deleteDeliver"></div>
      <div class="deleteDelivers" @click="deleteDeliver">作废</div>
      <div class="printShip" @click="printShip">打印</div>
      <div class="editShips" @click="editShip">编辑</div>
      <div class="editShip" @click="editShip"></div>
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
import myVqr from '@/components/common/my_vqr/myVqr'
import { bestURL, crosURl } from '@/network/baseURL'
import { getOutsourcingDetail, delOutsourcingOrder } from '@/network/deal'

export default {
  data() {
    return {
      metadata: {},
      isShow: false,
      textContent: '',
      deliverGoodsDetail: [],
      iid: 0,
    }
  },
  components: {
    myVqr,
  },
  filters: {
    setOrderNumber(value) {
      return '单号:' + value
    },
    setRecordItemCreated(value) {
      return '创建:' + value
    },
    setOperatorName(value) {
      return '制单:' + value
    },
    getUrl(value) {
      if (value.indexOf(bestURL) == -1) {
        return bestURL + value
      } else {
        return value
      }
    },
  },
  created() {
    this.iid = this.$route.params.id
    this.getOutsourcingDetails()
  },
  destroyed() {
    this.metadata = {}
    this.isShow = false
    this.textContent = ''
    this.deliverGoodsDetail = []
    this.iid = 0
  },
  computed: {
    getOutsourcingDetailData() {
      return {
        id: this.iid,
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    touchin() {
      clearInterval(this.Loop)
      this.Loop = setTimeout(() => {
        this.touch = true
      }, 800)
    },
    cleartime(materiel_id) {
      clearInterval(this.Loop)
      if (this.touch) {
        this.touch = false
        this.$router.push(`/editMaterial/${materiel_id}`)
      }
    },
    async getOutsourcingDetails() {
      const { code, data, msg } = await getOutsourcingDetail(
        this.getOutsourcingDetailData
      )
      console.log('getOutsourcingDetail', data)
      if (code == 200) {
        this.metadata = data.outsourcing
        this.deliverGoodsDetail = data.outsourcingDetail
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
        this.blacknext()
      }
    },
    editShip() {
      this.$router.push(`/OutsourcingItem/${this.metadata.id}`)
    },
    printShip() {
      this.textContent = `${bestURL}/Vt/view?id=${this.metadata.id}&order_type=outsourcing`
      this.isShow = true
    },
    deleteDeliver() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认要作废吗？',
        })
        .then(async () => {
          const { code, msg } = await delOutsourcingOrder({
            token: this.$store.state.token,
            id: this.metadata.id,
          })
          if (code == 200) {
            this.$message({
              showClose: true,
              message: msg,
              type: 'success',
            })
            this.blacknext()
          } else {
            this.$message({
              showClose: true,
              message: msg,
              type: 'error',
            })
          }
        })
    },
    blacknext() {
      this.$router.replace('/deal/outsourcing')
    },
  },
}
</script>
    
<style scoped lang="scss">
#engravDetail {
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
      font-size: 1.285714rem;
      color: #030303;
    }
    .right {
      margin-right: 1.071429rem;
      font-size: 0.714286rem;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.428571rem;
    width: 100%;
    overflow: hidden;
    padding: 1.428571rem 0.714286rem;
    .content_wrap {
      padding: 0.714286rem 1.071429rem;
      margin-top: 0.357143rem;
      margin-bottom: 0.357143rem;
      .Company {
        margin-bottom: 0.714286rem;
        font-size: 1.142857rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        em {
          font-size: 0.714286rem;
        }
      }
      .Numbers {
        margin-bottom: 0.357143rem;
        font-size: 0.857143rem;
        color: #5b534d;
      }
      .itembox {
        font-size: 0.857143rem;
        color: #5b534d;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
        }
      }
    }
    .product_box {
      .wrap_item {
        padding: 0.357143rem;
        border-bottom: 1px solid #f2f2f2;

        .wrap_left {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .img {
            width: 5.928571rem;
            height: 5.928571rem;
            background-color: #655d55;
            border-radius: 0.357143rem;
            margin-right: 0.714286rem;
          }
          .text {
            flex: 1;
            font-size: 1rem;
            color: #000;
            overflow: hidden;
            .title {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 1rem;

              .funds {
                font-size: 1rem;
              }
            }
            .model {
              color: #ccc;
            }
            p {
              margin-bottom: 0.357143rem;
            }
            .wrap_right {
              width: 100%;
              display: flex;
              justify-content: flex-start;
              color: #ccc;
              span {
                font-size: 0.857143rem;
              }
            }
          }
        }
      }
      .wrap_money {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 0.357143rem;
        font-size: 1.142857rem;
        color: #848484;
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
