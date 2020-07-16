<template>
  <div id="Profile">
    <pNavBar />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <pHeader @toProfileInfo="toProfileInfo" />
      <pOptions />
    </van-pull-refresh>
    <MainTabBar />
  </div>
</template>

<script>
import MainTabBar from '@/components/content/MainTabBar/MainTabBar'

import pNavBar from '@/views/profile/children/pNavBar/pNavBar'
import pHeader from '@/views/profile/children/pHeader/pHeader'
import pOptions from '@/views/profile/children/pOptions/pOptions'
export default {
  name: 'Profile',
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    pNavBar,
    pHeader,
    pOptions,
    MainTabBar
  },
  methods: {
    toProfileInfo() {
      this.$router.push('/fileInfo')
    },
    onRefresh() {
      location.reload()
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="scss" >
#Profile {
  padding-top: 5.428571rem;
  .van-pull-refresh {
  }
}
</style>