<template>
  <div id="businessLogin">
    <div class="busnum">
      <span>请选择公司</span>
    </div>
    <companyCard :cardList="companyList" @btnclick="btnclick" />
  </div>
</template>
    
<script>
import companyCard from '@/views/businessLogin/children/companyCard/companyCard'

import { getIndex } from '@/network/login.js'

export default {
  name: 'businessLogin',
  components: {
    companyCard,
  },
  data() {
    return {
      companyList: [],
      getIndexData: {},
    }
  },
  methods: {
    async btnclick(id) {
      var storage = window.localStorage
      var form = new FormData()
      form.append('username', storage.getItem('username'))
      form.append('password', storage.getItem('password'))
      form.append('company_id', id)
      const res = await getIndex(form)
      console.log('index/index : ', res)
      if (res.code == 200) {
        storage.setItem('ChooseCompany', id)
        this.$store.commit(
          'setUserInfo',
          JSON.parse(JSON.stringify(res.data.userInfo))
        )
        this.$store.commit('setToken', res.data.token)
        if (!window.localStorage) {
          alert('浏览器不支持localstorage')
        } else {
          storage.setItem('token', JSON.stringify(this.$store.state.token))
        }
      }
      this.$router.replace('/')
      this.$vnode.parent.componentInstance.cache = {}
      this.$vnode.parent.componentInstance.keys = []
    },
  },
  created() {
    this.companyList = this.$store.state.loginDate.customers
  },
}
</script>
    
<style lang="scss">
#businessLogin {
  background-color: #ededed;
  height: 100vh;
  padding-top: 4.214286rem;
  .p_root_box {
    color: #747474;
    background-color: #ededed;

    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -1.071429rem;
      font-size: 1.285714rem;
    }
  }

  .busnum {
    width: 100%;
    line-height: 6.785714rem;
    text-align: center;
    span {
      font-size: 1.571429rem;
    }
  }
}
</style>
