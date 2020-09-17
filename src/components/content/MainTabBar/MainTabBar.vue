<template>
  <tab-bar>
    <tab-bar-item path="/home" v-if="isHome" activeColor="rgb(66, 147, 200)" class="bar-item">
      <van-icon name="wap-home-o" slot="item-icon" class="bar-item-icon" />
      <van-icon name="wap-home" slot="item-icon-active" class="bar-item-icon" />
      <div slot="item-text" class="bar-item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/deal" v-if="isDeal" activeColor="rgb(66, 147, 200)" class="bar-item">
      <van-icon name="balance-list-o" slot="item-icon" class="bar-item-icon" />
      <van-icon name="balance-list" slot="item-icon-active" class="bar-item-icon" />
      <div slot="item-text" class="bar-item-text">交易</div>
    </tab-bar-item>
    <tab-bar-item path="/client" v-if="isClient" activeColor="rgb(66, 147, 200)" class="bar-item">
      <van-icon name="friends-o" slot="item-icon" class="bar-item-icon" />
      <van-icon name="friends" slot="item-icon-active" class="bar-item-icon" />
      <div slot="item-text" class="bar-item-text">客户</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="rgb(66, 147, 200)" class="bar-item">
      <van-icon name="manager-o" slot="item-icon" class="bar-item-icon" />
      <van-icon name="manager" slot="item-icon-active" class="bar-item-icon" />
      <div slot="item-text" class="bar-item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
export default {
  data() {
    return {
      isHome: true,
      isDeal: true,
      isClient: true,
    }
  },
  components: {
    TabBar: () => import('@/components/common/tabbar/TabBar'),
    TabBarItem: () => import('@/components/common/tabbar/TabBarItem'),
  },
  created() {
    this.$Jurisdiction('1', this.$store.state.oparr, () => {
      this.isHome = false
    })
    this.$Jurisdiction('2', this.$store.state.oparr, () => {
      this.isDeal = false
    })
    this.$Jurisdiction('6', this.$store.state.oparr, () => {
      this.isClient = false
    })
  },
}
</script>
<style scoped lang="scss">
.bar-item {
  .bar-item-icon {
    font-size: 2rem;
  }
  .bar-item-text {
    font-size: 0.642857rem;
  }
}
</style>
