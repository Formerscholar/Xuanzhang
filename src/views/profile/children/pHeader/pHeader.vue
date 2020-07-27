<template>
  <div id="pHeader" class="my_header text-white bg-primary">
    <div class="topbox d-flex">
      <div class="logo d-flex">
        <img v-if="imgUrl" :src="imgUrl" alt="logo" />
        <img src="../../../../assets/image/dpng.png" v-else alt="logo" />
        <div class="info">
          <div class="name">
            {{name || '姓名'}}
            <div style="padding-right:.714286rem;">
              <span>{{jobName || '职位'}}</span>
            </div>
          </div>
          <div class="phone">{{phone}}</div>
        </div>
      </div>
      <div class="icon" @click="toProfileInfo">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
    
<script>
import { getIndex } from '@/network/login.js'

export default {
  name: 'pHeader',
  data() {
    return {
      dataInfo: {},
      name: '',
      phone: '',
      jobName: '',
      imgUrl: '',
      bestURL: '',
    }
  },
  activated() {
    this.gettime()
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
    toProfileInfo() {
      this.$emit('toProfileInfo')
    },
    formatPhone(phone) {
      return phone.substr(0, 3) + '****' + phone.substr(7, 11)
    },
  },
}
</script>
    
<style lang="scss">
#pHeader {
  padding: 0.357143rem 0.642857rem;
  height: 5.928571rem;
  .topbox {
    justify-content: space-between;
    align-items: center;
    .logo {
      flex: 1;
      width: 100%;
      align-items: center;
      position: relative;
      img {
        width: 4.285714rem;
        height: 4.285714rem;
        border: 0.214286rem solid #67a6d9;
      }
      .el-icon-help {
        font-size: 1.571429rem;
        background-color: #a590c6;
        color: #fff;
        position: absolute;
        top: 3.214286rem;
        left: 3.214286rem;
      }
      .info {
        flex: 1;
        margin-left: 1.071429rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 1rem;
        .name {
          width: 100%;
          padding-bottom: 0.714286rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
      }
    }
    .icon {
      font-size: 1.571429rem;
      margin-right: 0.714286rem;
    }
  }
}
</style>
