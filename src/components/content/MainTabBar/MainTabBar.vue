<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="#4293c8" class="bar-item">
      <van-icon name="wap-home-o" slot="item-icon" class="bar-item-icon" />
      <van-icon name="wap-home" slot="item-icon-active" class="bar-item-icon" />
      <div slot="item-text" class="bar-item-text">首页</div>
    </tab-bar-item>
    <!-- <tab-bar-item path="/operation" activeColor="#4293c8" class="bar-item">
      <van-icon name="cluster-o" slot="item-icon" class="bar-item-icon" />
      <van-icon name="cluster" slot="item-icon-active" class="bar-item-icon" />
      <div slot="item-text" class="bar-item-text">运营</div>
    </tab-bar-item>-->
    <tab-bar-item path="/deal" activeColor="#4293c8" class="bar-item">
      <van-icon name="balance-list-o" slot="item-icon" class="bar-item-icon" />
      <van-icon name="balance-list" slot="item-icon-active" class="bar-item-icon" />
      <div slot="item-text" class="bar-item-text">交易</div>
    </tab-bar-item>
    <tab-bar-item path="/client" activeColor="#4293c8" class="bar-item">
      <van-icon name="friends-o" slot="item-icon" class="bar-item-icon" />
      <van-icon name="friends" slot="item-icon-active" class="bar-item-icon" />
      <div slot="item-text" class="bar-item-text">客户</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#4293c8" class="bar-item">
      <van-icon name="manager-o" slot="item-icon" class="bar-item-icon" />
      <van-icon name="manager" slot="item-icon-active" class="bar-item-icon" />
      <div slot="item-text" class="bar-item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
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
