<template>
  <div id="Profile">
    <pNavBar />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <pHeader
        :imgUrl="imgUrl"
        :jobName="jobName"
        :phone="phone"
        :name="name"
        :company="company"
        @toProfileInfo="toProfileInfo"
      />
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
import { getlogin, getIndex } from '@/network/login'

export default {
  name: 'Profile',
  data() {
    return {
      isLoading: false,
      dataInfo: {},
      imgUrl: '',
      jobName: '',
      phone: '',
      name: '',
      company: '',
    }
  },
  components: {
    pNavBar,
    pHeader,
    pOptions,
    MainTabBar,
  },
  activated() {
    this.getlogin()
  },
  created() {},
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
        this.dataInfo = res.data.userInfo[0]
        this.imgUrl = this.dataInfo.img_url.substr(1)
        this.jobName = this.dataInfo.role.display_name
        this.phone = this.formatPhone(this.dataInfo.username)
        this.name = this.dataInfo.name
        this.company = this.dataInfo.user_compser_name
      }
    },
    formatPhone(phone) {
      return phone.substr(0, 3) + '****' + phone.substr(7, 11)
    },
    toProfileInfo() {
      this.$router.push('/fileInfo')
    },
    onRefresh() {
      location.reload()
      this.isLoading = false
    },
  },
}
</script>

<style scoped lang="scss" >
#Profile {
  padding-top: 5.428571rem;
  .van-pull-refresh {
  }
}
</style>