<template>
  <div id="home">
    <topbar @showCard="showCard" />

    <scroll class="scroll-wrapper" :probeType="3">
      <div>
        <myHeader
          :isShow="isShow"
          @materialClick="materialClick"
          @goMission="goMission"
          @ReimbursementClick="ReimbursementClick"
          @goEarly="goEarly"
        />
        <Ability />
        <!-- <reminder /> -->
        <myEcharts />
      </div>
    </scroll>

    <van-overlay :show="overlayshow" @click="overlayshow = false">
      <div class="wrappers">
        <div class="block">
          <div class="items" @click.stop="scanClick">
            <van-icon name="scan" class="icon" />
            <span>扫一扫</span>
          </div>
        </div>
      </div>
    </van-overlay>
    <MainTabBar />
  </div>
</template>

<script>
import MainTabBar from '@/components/content/MainTabBar/MainTabBar'
import topbar from '@/views/home/children/topbar/topbar'
import myHeader from '@/views/home/children/myHeader/myHeader'
import Ability from '@/views/home/children/ability/Ability'
import myEcharts from '@/views/home/children/myEcharts/myEcharts'
import reminder from '@/views/home/children/reminder/reminder'

import { getUserDesignatedTasks } from '@/network/home'
import { getlogin, getIndex } from '@/network/login'

export default {
  name: 'Home',
  components: {
    topbar,
    myHeader,
    Ability,
    myEcharts,
    Interval: null,
    reminder,
    MainTabBar,
  },
  data() {
    return {
      isShow: 0,
      overlayshow: false,
    }
  },
  activated() {
    clearInterval(this.Interval)
    this.Interval = setInterval(this.getlogin, 1500000)
    console.log('开启定时器 时间 25m')
    this.getlogin()
    this.getUserDesignat()
  },
  deactivated() {
    this.isShow = 0
  },
  computed: {
    getUserDesignatedTasksData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        _: new Date().getTime(),
      }
    },
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
        console.log('home定时登录次数+1')
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
    materialClick() {
      this.$router.push('/materialpage')
    },
    showCard() {
      this.overlayshow = true
    },
    goEarly() {
      this.$router.push('/early')
    },
    async getUserDesignat() {
      const { data } = await getUserDesignatedTasks(
        this.getUserDesignatedTasksData
      )
      this.isShow = data.designatedTasksList.length
    },
    scanClick() {
      this.$router.push('/scan')
      this.overlayshow = false
    },
    goMission() {
      this.$router.push('/mission')
    },
    ReimbursementClick() {
      this.$router.push('/reimbursement')
    },
  },
}
</script>


<style lang="scss" scoped>
#home {
  background-color: #f5f5f5;
  height: calc(100vh - 9.642857rem);
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 5.428571rem;
    bottom: 4.214286rem;
    overflow: hidden;
  }
  .wrappers {
    height: 100%;
    .block {
      width: 10.714286rem;
      border-radius: 5px;
      background-color: #fff;
      position: absolute;
      right: 0.714286rem;
      top: 5.571429rem;
      padding: 0.357143rem;
      &::before {
        display: block;
        content: '';
        border-width: 0.571429rem 0.571429rem 0.571429rem 0.571429rem;
        border-style: solid;
        border-color: transparent transparent #fff transparent;
        position: absolute;
        right: 0.571429rem;
        top: -1rem;
      }
      .items {
        height: 2.857143rem;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0.357143rem;
        .icon {
          font-size: 1.857143rem;
          margin-right: 0.714286rem;
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
}
</style>