<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { getlogin, getIndex } from '@/network/login.js'
export default {
  data() {
    return {
      transitionName: ''
    }
  },
  created() {
    setInterval(() => {
      this.getlogin()
    }, 1500000)
    this.getlogin()
  },
  watch: {
    $route(to, from) {
      const fromDepths = from.path
      const toDepths = to.path
      console.log(fromDepths, toDepths)
      if (
        (fromDepths === '/home' ||
          fromDepths === '/deal/sales' ||
          fromDepths === '/client' ||
          fromDepths === '/profile') &&
        (toDepths === '/home' ||
          toDepths === '/deal/sales' ||
          toDepths === '/client' ||
          toDepths === '/profile')
      ) {
        console.log('tabbar跳转 渐隐渐现')
        this.transitionName = 'slide'
      } else if (
        toDepths === '/home' ||
        toDepths === '/deal/sales' ||
        toDepths === '/client' ||
        toDepths === '/profile'
      ) {
        console.log('从左往右退')
        this.transitionName = 'quit'
      } else if (
        fromDepths === '/home' ||
        fromDepths === '/deal/sales' ||
        fromDepths === '/client' ||
        fromDepths === '/profile'
      ) {
        console.log('从右往左进')
        this.transitionName = 'entry'
      } else {
        console.log('其他情况')
        this.transitionName = 'slide'
      }
    }
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

<style lang="scss" scoped>
#app {
  font-family: 'Source Han Sans CN', tahoma, arial, 'Hiragino Sans GB',
    '\5b8b\4f53', sans-serif, Avenir, Helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 73.142857rem;

  // 同级跳转
  .slide-enter,
  .slide-enter-active,
  .slide-enter-to,
  .slide-leave,
  .slide-leave-active,
  .slide-leave-to {
    transition: all 0.382s ease;
    opacity: 0;
  }

  // 退出
  .quit-enter,//定义进入过渡的开始状态
  .quit-enter-active ,//定义进入过渡生效时的状态
  .quit-enter-to {
    //定义进入过渡的结束状态
    transition: all 0.382s ease;
    transform: translateX(-100%);
    opacity: 0;
  }

  .quit-leave, //定义离开过渡的开始状态
  .quit-leave-active, //定义离开过渡生效时的状态
  .quit-leave-to {
    //定义离开过渡的结束状态
    transition: all 0.382s ease;
    transform: translateX(100%);
    opacity: 0;
  }
  // 进入
  .entry-enter,//定义进入过渡的开始状态
  .entry-enter-active,//定义进入过渡生效时的状态
  .entry-enter-to {
    //定义进入过渡的结束状态
    transition: all 0.382s ease;
    opacity: 0;
    transform: translateX(100%);
  }

  .entry-leave,//定义离开过渡的开始状态
  .entry-leave-active, //定义离开过渡生效时的状态
  .entry-leave-to {
    //定义离开过渡的结束状态
    transition: all 0.382s ease;
    opacity: 0;
    transform: translateX(-100%);
  }
}
</style>
