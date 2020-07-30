<template>
  <div id="borderCard">
    <van-tabs v-model="active" @click="handleClick">
      <van-tab>
        <template #title>
          <div class="icon_wrap">
            <p class="tab_icon tabs_icon"></p>
            <span>客户</span>
          </div>
        </template>
        <div class="bg"></div>
        <slot name="card"></slot>
      </van-tab>
      <van-tab>
        <template #title>
          <div class="icon_wrap">
            <p class="tab_icon tabs_icons"></p>
            <span>供应商</span>
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
      justify-content: center;
      align-items: flex-end;
      width: 100%;

      span {
        font-size: 1rem;
        padding-bottom: 0.857143rem;
        font-weight: 700;
      }
      .tab_icon {
        width: 3.928571rem;
        height: 3.928571rem;
        background-image: url('../../../../assets/image/staff.png');
        background-repeat: no-repeat;
        background-size: 8.571429rem 11.071429rem;
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
    .bg {
      height: 1.071429rem;
      width: 100%;
      background-color: #f2f2f2;
      border-bottom: 1px solid #e8e8e8;
    }
  }
}
</style>
