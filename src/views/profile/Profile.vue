<template>
  <div id="Profile">
    <pNavBar />

    <scroll
      class="scroll_wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="onRefresh"
    >
      <pHeader
        :imgUrl="imgUrl"
        :jobName="jobName"
        :phone="phone"
        :name="name"
        :company="company"
        @toProfileInfo="toProfileInfo"
      />
      <pOptions />
    </scroll>

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
  created() {
    this.getlogin()
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
      this.getlogin()
      this.isLoading = false
    },
  },
}
</script>

<style scoped lang="scss" >
#Profile {
  padding-top: 5.428571rem;
  .scroll_wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 5.428571rem;
    bottom: 4.214286rem;
    width: 100%;
    overflow: hidden;
    /deep/.content {
      min-height: calc(100vh - 9.571429rem);
    }
  }
}
</style>