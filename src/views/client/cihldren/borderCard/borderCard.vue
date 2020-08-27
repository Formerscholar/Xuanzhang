<template>
  <div id="borderCard">
    <van-tabs v-model="active" @click="handleClick">
      <van-tab>
        <template #title>
          <div class="icon_wrap">
            <div class="icon_item_warp">
              <p class="tab_icon tabs_icon"></p>
              <span class="name">客户</span>
            </div>
            <div class="totol_price">￥{{allArrearsCount}}</div>
          </div>
        </template>
        <div class="bg"></div>
        <slot name="card"></slot>
      </van-tab>
      <van-tab>
        <template #title>
          <div class="icon_wrap">
            <div class="icon_item_warp">
              <p class="tab_icon tabs_icons"></p>
              <span class="name">供应商</span>
            </div>
            <div class="totol_price">￥{{allArrearsCounts}}</div>
          </div>
        </template>
        <div class="bg"></div>
        <slot name="Supplicard"></slot>
      </van-tab>
    </van-tabs>
  </div>
</template>
    
<script>
export default {
  name: 'borderCard',
  components: {},
  props: {
    allArrearsCount: {
      type: String,
      default: '0',
    },
    allArrearsCounts: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      active: 0,
    }
  },
  methods: {
    handleClick(title) {
      this.$emit('tabListTach', title)
    },
  },
}
</script>
    

<style scoped lang="scss">
#borderCard {
  .van-tabs {
    .icon_wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      .icon_item_warp {
        display: flex;
        justify-content: center;
        align-items: center;
        .name {
          font-size: 1rem;
          font-weight: 700;
        }
        .tab_icon {
          width: 2.428571rem;
          height: 2.428571rem;
          background-image: url('../../../../assets/image/staff.png');
          background-repeat: no-repeat;
          background-size: 7.857143rem 10.142857rem;
          margin-bottom: 0;
          margin-right: 0.357143rem;
        }
        .tabs_icon {
          background-position: -4.642857rem -7rem;
        }
        .tabs_icons {
          background-position: 0 -7rem;
        }
      }
    }
    .totol_price {
      font-size: 1rem;
      color: #ccc;
    }
    .bg {
      height: 1.071429rem;
      width: 100%;
      background-color: #f2f2f2;
      border-bottom: 1px solid #e8e8e8;
    }
  }
}
</style>
