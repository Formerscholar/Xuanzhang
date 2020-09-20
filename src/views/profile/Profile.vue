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
      <versionItem :version="version" :isShow="isShow" />
      <mytaskItem :doQuantity="doQuantity" />

      <tobalance
        :balance="
          balance.indexOf('-') == -1
            ? fmoney(balance)
            : '-' + fmoney(balance.substr(1))
        "
      />
      <Pendbalance
        :Pendbalance="
          Pendbalance.indexOf('-') == -1
            ? fmoney(Pendbalance)
            : '-' + fmoney(Pendbalance.substr(1))
        "
      />

      <Runrecord />
      <wages />
      <BankAccounts />
      <management v-if="ismanagement" />
      <Reimbursementrecord :record="record" />
      <baseLogin />
      <exitLogin />
    </scroll>

    <MainTabBar />
  </div>
</template>

<script>
const MainTabBar = () => import('@/components/content/MainTabBar/MainTabBar')
const pNavBar = () => import('@/views/profile/children/pNavBar/pNavBar')
const pHeader = () => import('@/views/profile/children/pHeader/pHeader')
const versionItem = () =>
  import('@/views/profile/children/versionItem/versionItem')
const BankAccounts = () =>
  import('@/views/profile/children/BankAccounts/BankAccounts')
const management = () =>
  import('@/views/profile/children/management/management')
const mytaskItem = () =>
  import('@/views/profile/children/mytaskItem/mytaskItem')
const tobalance = () => import('@/views/profile/children/tobalance/tobalance')
const Pendbalance = () =>
  import('@/views/profile/children/Pendbalance/Pendbalance')
const Runrecord = () => import('@/views/profile/children/Runrecord/Runrecord')
const wages = () => import('@/views/profile/children/wages/wages')
const Reimbursementrecord = () =>
  import('@/views/profile/children/Reimbursementrecord/Reimbursementrecord')
const baseLogin = () => import('@/views/profile/children/baseLogin/baseLogin')
const exitLogin = () => import('@/views/profile/children/exitLogin/exitLogin')

import { getlogin, getIndex, getAppVersion } from '@/network/login'
import { getUserDesignatedTasks, getUserIndex } from '@/network/home'
import { getUserReimbursementList } from '@/network/Reimbursement'
import { version } from '@/AppConfig'
import { fmoney } from '@/common/utils'
export default {
  name: 'Profile',
  data() {
    return {
      dataInfo: {},
      imgUrl: '',
      jobName: '',
      phone: '',
      name: '',
      company: '',
      version,
      isShow: false,
      doQuantity: 0,
      balance: '0.00',
      Pendbalance: '0.00',
      record: 0,
      ismanagement: true,
      fmoney,
    }
  },
  components: {
    pNavBar,
    pHeader,
    MainTabBar,
    versionItem,
    BankAccounts,
    management,
    mytaskItem,
    tobalance,
    Pendbalance,
    Runrecord,
    wages,
    Reimbursementrecord,
    baseLogin,
    exitLogin,
  },
  created() {
    this.getlogin()
    this.getNativeVersion()
    this.getUserDesignated()
    this.getUserIndexNews()
    this.getUserReimburseme()
  },
  activated() {
    this.$Jurisdiction('5', localStorage.getItem('oparr'), () => {
      this.ismanagement = false
    })
  },
  methods: {
    async getUserReimburseme() {
      const { data } = await getUserReimbursementList({
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        status: 2,
        _: new Date().getTime(),
      })
      this.record = data.reimbursementList.length
    },
    async getUserIndexNews() {
      const { data } = await getUserIndex({
        token: this.$store.state.token,
        _: new Date().getTime(),
      })
      this.balance = data.userNews.balance
      this.Pendbalance = data.userNews.toExamineMoney
    },
    async getUserDesignated() {
      const { data } = await getUserDesignatedTasks({
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        _: new Date().getTime(),
      })
      this.doQuantity = data.designatedTasksList.length
    },
    async getNativeVersion() {
      const { code, data, msg } = await getAppVersion()
      if (code == 200) {
        if (this.version !== data.version) {
          this.isShow = true
        } else {
          this.isShow = false
        }
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
        this.dataInfo = res.data.userInfo[0]
        this.imgUrl = this.dataInfo?.img_url.substr(1)
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
      this.getNativeVersion()
      this.getUserDesignated()
      this.getUserIndexNews()
      this.getUserReimburseme()
    },
  },
}
</script>

<style scoped lang="scss">
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
