<template>
  <div class="bg-primary text-white my_headers">
    <div class="header_bot">
      <div class="bot_item my_scan" @click="materialClick">
        <van-icon name="cart-o" class="icon" />
        <span>物料</span>
      </div>
      <div class="bot_item" @click="ReimbursementClick">
        <van-icon name="peer-pay" class="icon" />
        <span>报销</span>
      </div>
      <div class="bot_item" @click="goEarly">
        <van-icon name="bulb-o" class="icon" />
        <span>预警</span>
      </div>
      <div class="bot_item" @click="goMission">
        <i class="el-icon-more my_more" v-show="isShow"></i>
        <van-icon name="apps-o" class="icon" />
        <span>任务</span>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'myHeader',
  data() {
    return {
      input: ''
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    materialClick() {
      this.$emit('materialClick')
    },
    goMission() {
      this.$emit('goMission')
    },
    ReimbursementClick() {
      this.$emit('ReimbursementClick')
    },
    goEarly() {
      this.$emit('goEarly')
    }
  }
}
</script>
    
<style  lang="scss">
.my_headers {
  overflow: hidden;
  justify-content: center;
  align-items: center;
  .header_bot {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.714286rem;
    height: 6.428571rem;
    .icon {
      font-size: 2.428571rem;
    }
    .bot_item {
      flex: 1;
      text-align: center;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      .my_more {
        color: red;
        position: absolute;
        top: 0;
        right: 1.428571rem;
        font-size: 1.714286rem;
      }
      div {
        font-size: 2.571429rem;
      }
      span {
        display: block;
        margin-top: 0.357143rem;
      }
    }
  }
}
</style>
