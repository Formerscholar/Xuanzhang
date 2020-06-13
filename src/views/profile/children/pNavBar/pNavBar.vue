<template>
  <div id="pNavBar">
    <navbar class="p_root_box">
      <div class="left" slot="left"></div>
      <div class="center" style="margin-left: 7.142857rem;" slot="center">
        <span>我的</span>
      </div>
      <div class="rights" slot="right" style="margin-right:.714286rem;" @click="gobaseLogin">
        <span>切换</span>
      </div>
      <div class="right" slot="right" @click="exitLogin">
        <span>退出</span>
      </div>
    </navbar>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import { logout } from '@/network/login'

export default {
  name: 'pNavBar',
  data() {
    return {}
  },
  components: {
    navbar
  },
  methods: {
    gobaseLogin() {
      this.$router.push('/businessLogin')
    },
    async exitLogin() {
      const { code } = await logout()
      if (code == 200) {
        window.localStorage.removeItem('token')
        this.$store.commit('setBankCardSinfo', {})
        this.$store.commit('setLoginDate', {})
        this.$store.commit('setUserInfo', [])
        this.$store.commit('setDetailsData', {})
        this.$store.commit('setToken', '')
        this.isShow = true
        this.$router.replace('/')
      }
    }
  },
  activated() {},
  computed: {}
}
</script>
    
<style lang="scss" scoped>
#pNavBar {
  .p_root_box {
    font-size: 1.285714rem !important;
    padding: 0 1.714286rem !important;
    padding-top: 1.428571rem !important;
    .center {
      margin-left: 4.14286rem !important;
    }
    .rights {
      font-size: 1rem !important;
    }
    .right {
      font-size: 1rem !important;
      margin-right: -1rem !important;
    }
    .none {
      display: none;
    }
  }
}
</style>
