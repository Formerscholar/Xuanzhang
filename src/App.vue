<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <MainTabBar></MainTabBar>
  </div>
</template>

<script>
import MainTabBar from './components/content/MainTabBar/MainTabBar'
import { getlogin, getIndex } from '@/network/login.js'

export default {
  name: 'app',
  components: { MainTabBar },
  created() {
    this.getlogin()
    setInterval(() => {
      this.getlogin()
    }, 1500000)
  },
  methods: {
    async gettime() {
      var storage = window.localStorage
      var form = new FormData()
      form.append('username', storage.getItem('username'))
      form.append('password', storage.getItem('password'))
      form.append('company_id', storage.getItem('ChooseCompany'))
      const res = await getIndex(form)
      if (res.code == 200) {
        this.$store.commit(
          'setUserInfo',
          JSON.parse(JSON.stringify(res.data.userInfo))
        )
        this.$store.commit('setToken', res.data.token)
        if (!window.localStorage) {
          storage.setItem('token', JSON.stringify(this.$store.state.token))
        } else {
          storage.setItem('token', JSON.stringify(this.$store.state.token))
        }
      }
    },
    async getlogin() {
      var storage = window.localStorage
      const res = await getlogin({
        username: storage.getItem('username'),
        password: storage.getItem('password')
      })
      if (res.code == 200) {
        this.$store.commit('setLoginDate', JSON.parse(JSON.stringify(res.data)))
        if (res.data.customers.length > 1) {
          this.gettime()
        } else {
          var form = new FormData()
          form.append('username', storage.getItem('username'))
          form.append('password', storage.getItem('password'))
          form.append('company_id', storage.getItem('ChooseCompany'))
          const res1 = await getIndex(form)
          if (res1.code == 200) {
            this.$store.commit(
              'setUserInfo',
              JSON.parse(JSON.stringify(res1.data.userInfo))
            )
            this.$store.commit('setToken', res1.data.token)
            if (!window.localStorage) {
              storage.setItem('token', JSON.stringify(this.$store.state.token))
            } else {
              storage.setItem('token', JSON.stringify(this.$store.state.token))
            }
          }
        }
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Source Han Sans CN', tahoma, arial, 'Hiragino Sans GB',
    '\5b8b\4f53', sans-serif, Avenir, Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 62px;
  padding-bottom: 59px;
  max-width: 1024px;
  margin: 0 auto;
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-leave,
  .fade-enter-to {
    opacity: 1;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.382s;
  }
}
</style>
