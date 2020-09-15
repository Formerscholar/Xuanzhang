<template>
  <div id="deal">
    <!-- selection -->
    <selection v-if="isShow" :selectionList="selectionList" @selectionClick="selectionClick" />
    <!-- goods -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <MainTabBar />
  </div>
</template>

<script>
import MainTabBar from '@/components/content/MainTabBar/MainTabBar'

import selection from '@/views/deal/children/selection/selection'
import { getleft } from '@/network/deal'
import { getlogin, getIndex } from '@/network/login'
export default {
  data() {
    return {
      selectionList: [],
      seletIndex: 0,
      isRelocation: false,
      isShow: true,
    }
  },
  components: {
    selection,
    MainTabBar,
  },
  activated() {
    this.$Jurisdiction('14', this.$store.state.catearr, () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
    this.getlogin()
    this.getleftlist()
  },
  watch: {
    $route(to, from) {
      const fromDepths = from.path
      const toDepths = to.path
      console.log(toDepths, fromDepths)
      if (fromDepths == '/deal' || toDepths == '/deal') {
        this.isRelocation = true
        this.isShow = false
      }
    },
  },
  updated() {
    if (this.isRelocation) {
      this.selectionClick({
        i: this.selectionList[0].id,
        index: 0,
      })
      this.isShow = true
      this.isRelocation = false
    }
  },
  deactivated() {
    this.selectionList = []
  },
  computed: {
    getleftData() {
      return {
        token: this.$store.state.token,
        left: 14,
      }
    },
  },
  methods: {
    formatPhone(phone) {
      return phone.substr(0, 3) + '****' + phone.substr(7, 11)
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
        this.$store.commit('setcatearr', res.data.userInfo[0].role.catearr)
        this.$store.commit('setoparr', res.data.userInfo[0].role.oparr)
        if (!window.localStorage) {
          storage.setItem('token', JSON.stringify(this.$store.state.token))
        } else {
          storage.setItem('token', JSON.stringify(this.$store.state.token))
        }
        this.dataInfo = res.data.userInfo[0]
        this.imgUrl = this.dataInfo.img_url.substr(1)
        this.jobName = this.dataInfo.role.display_name
        this.phone = this.formatPhone(this.dataInfo.username)
        this.name = this.dataInfo.name
        this.company = this.dataInfo.user_compser_name
      }
    },
    async getleftlist() {
      const { data } = await getleft(this.getleftData)
      console.log('getleftlist', data)
      data.map((item, index) => {
        let obj = {
          id: item.id,
          title: item.title,
        }
        this.selectionList.push(obj)
      })
      this.selectionClick({
        i: this.selectionList[this.seletIndex].id,
        index: this.seletIndex,
      })
    },
    selectionClick(data) {
      this.seletIndex = data.index
      switch (data.i) {
        case '27':
          this.$router.replace('/deal/sales')
          break
        case '28':
          this.$router.replace('/deal/contract')
          break
        case '29':
          this.$router.replace('/deal/machin')
          break
        case '32':
          this.$router.replace('/deal/purchase')
          break
        case '69':
          this.$router.replace('/deal/aside')
          break
        case '31':
          this.$router.replace('/deal/outsourcing')
          break
        case '30':
          this.$router.replace('/deal/stock')
          break
        default:
          break
      }
    },
  },
}
</script>

<style lang="scss">
#deal {
  background-color: #f5f5f5;
  padding-top: 1rem;
}
</style>