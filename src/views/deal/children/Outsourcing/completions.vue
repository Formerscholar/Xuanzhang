<template>
  <div id="completions">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>委外完工</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <el-card class="product_box">
        <div class="wrap_item" v-for="(item,index) in orderProducts" :key="index">
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
                <span>({{item.unit_price}}×{{item.weight}}+{{item.process_cost}})×{{item.number}}</span>
              </div>
            </div>
          </div>
          <van-field
            v-model="bawaylosses[index]"
            @input="inputChange(index)"
            type="number"
            label="总损失费"
          />
          <van-field v-model="parseAmount[index]" readonly type="number" label="最终金额" />
        </div>
        <van-field v-model="Amount" readonly type="number" label="总金额" />
        <van-field v-model="amount_validator" type="number" label="折后金额" />
      </el-card>
    </scroll>
    <myBtns :commitFun="quoteclick" :cancelFun="quxiaoClick">
      <span slot="cancel-btn">取消</span>
      <span slot="commit-btn">
        ￥{{amount_validator}}
        <span>立即提交</span>
      </span>
    </myBtns>
  </div>
</template>
    
<script>
import {
  getChangeOutsourcingOrder,
  changeOutsourcingOrder,
} from '@/network/deal'
import myBtns from '@/components/common/my_btns/my_btns'
export default {
  data() {
    return {
      iid: 0,
      orderProducts: [],
      bawaylosses: [],
      parseAmount: [],
      Amount: 0,
      amount_validator: 0,
    }
  },
  components: {
    myBtns,
  },
  filters: {
    getUrl(value) {
      if (value.indexOf(bestURL) == -1) {
        return bestURL + value
      } else {
        return value
      }
    },
  },
  activated() {
    this.iid = this.$route.params.id
    this.getChangeOutsourc()
  },
  computed: {
    getChangeOutsourcingOrderData() {
      return {
        token: this.$store.state.token,
        id: this.iid,
      }
    },
  },
  methods: {
    inputChange(index) {
      console.log(index)
      this.orderProducts.forEach((item1, index1) => {
        // this.parseAmount[index] = item.total_price
        // nums += item.total_price * 1
        if (index == index1) {
          this.parseAmount[index1] =
            item1.total_price - this.bawaylosses[index1]
        }
      })
      let nums = 0
      this.parseAmount.forEach((item) => {
        nums += item * 1
      })
      this.Amount = nums
      this.amount_validator = nums
    },
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
    quxiaoClick() {
      this.iid = 0
      this.orderProducts = []
      this.bawaylosses = []
      this.parseAmount = []
      this.Amount = 0
      this.amount_validator = 0
      this.$router.replace('/deal/outsourcing')
    },
    async quoteclick() {
      let arr = []
      this.orderProducts.forEach((item, index) => {
        let itemArr = []
        itemArr.push(item.id)
        itemArr.push(this.bawaylosses[index])
        itemArr.push(this.parseAmount[index])
        arr.push(itemArr)
      })
      console.log(arr)
      const { code, msg } = await changeOutsourcingOrder({
        product_data: arr,
        token: this.$store.state.token,
        id: this.iid,
        actual_amount_discount: this.amount_validator,
      })
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.quxiaoClick()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    blacknext() {
      this.iid = 0
      this.orderProducts = []
      this.bawaylosses = []
      this.parseAmount = []
      this.Amount = 0
      this.amount_validator = 0
      this.$router.go(-1)
    },
    async getChangeOutsourc() {
      const { data } = await getChangeOutsourcingOrder(
        this.getChangeOutsourcingOrderData
      )
      console.log('getChangeOutsourcingOrder', data)
      this.orderProducts = data.orderProducts
      let nums = 0
      this.orderProducts.forEach((item, index) => {
        this.parseAmount[index] = item.total_price
        nums += item.total_price * 1
      })
      this.Amount = nums
      this.amount_validator = nums
    },
  },
}
</script>
    
<style scoped lang="scss">
#completions {
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
      margin-left: -2.071429rem;
      font-size: 1.285714rem;
      font-weight: 700;
      color: #030303;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.428571rem;
    width: 100%;
    overflow: hidden;
    .product_box {
      .wrap_item {
        padding: 0.357143rem;
        border-bottom: 1px solid #f2f2f2;
        &:last-child {
          border: none;
        }
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
}
</style>
