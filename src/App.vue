<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script >
import { getlogin, getIndex } from '@/network/login'

export default {
  data() {
    return {
      transitionName: '',
      path: '',
    }
  },
  created() {
    this.getlogin()
  },
  watch: {
    $route(to, from) {
      const fromDepths = from.path
      const toDepths = to.path
      console.log(toDepths, fromDepths)
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
        this.transitionName = 'slide'
      } else if (
        toDepths === '/home' ||
        toDepths === '/deal/sales' ||
        toDepths === '/client' ||
        toDepths === '/profile'
      ) {
        this.transitionName = 'quit'
      } else if (
        fromDepths === '/home' ||
        fromDepths === '/deal/sales' ||
        fromDepths === '/client' ||
        fromDepths === '/profile'
      ) {
        this.transitionName = 'entry'
      } else {
        this.transitionName = 'slide'
      }
    },
  },
  methods: {
    async getlogin() {
      var storage = window.localStorage
      const res = await getlogin({
        username: storage.getItem('username'),
        password: storage.getItem('password'),
      })
      if (res.code == 200) {
        this.$store.commit('setLoginDate', JSON.parse(JSON.stringify(res.data)))
        this.gettime()
      }
    },
    async gettime() {
      var storage = window.localStorage
      var form = new FormData()
      form.append('username', storage.getItem('username'))
      form.append('password', storage.getItem('password'))
      form.append('company_id', storage.getItem('ChooseCompany'))
      const res = await getIndex(form)
      if (res.code == 200) {
        console.log('登录次数+1')
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
      } else {
        window.localStorage.removeItem('token')
        this.$store.commit('setBankCardSinfo', {})
        this.$store.commit('setLoginDate', {})
        this.$store.commit('setUserInfo', [])
        this.$store.commit('setDetailsData', {})
        this.$store.commit('setToken', '')
        this.isShow = true
        this.$router.replace('/')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  max-width: 73.142857rem;

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
