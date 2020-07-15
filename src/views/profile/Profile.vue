<template>
  <div id="Profile">
    <pNavBar />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <pHeader @toProfileInfo="toProfileInfo" />
      <pOptions />
    </van-pull-refresh>
  </div>
</template>

<script>
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
    pOptions
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

<style lang="scss">
#Profile {
  margin-top: 14px;
  .van-pull-refresh,
  .van-pull-refresh__track {
    min-height: calc(100vh - 5.428571rem);
  }
}
</style>