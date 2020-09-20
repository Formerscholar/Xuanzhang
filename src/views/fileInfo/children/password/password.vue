<template>
  <div class="fileInfoList">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>修改密码</span>
      </div>
      <div class="right" slot="right" @click="editEmail">
        <span>保存</span>
      </div>
    </navbar>
    <div class="listItem d-flex">
      <div class="itemText">
        <span>新密码</span>
      </div>
      <div class="itemContent">
        <van-form style="width:100%;">
          <van-field
            v-model="email"
            type="text"
            placeholder="请输入新密码"
            :rules="[{ required: true, message: '请输入新密码' }]"
          />
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { editUser } from '@/network/home'
import { logout } from '@/network/login'

export default {
  data() {
    return {
      userInfo: {},
      email: '',
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async editEmail() {
      const { code } = await editUser(this.editUserData)
      if (code == 200) {
        const { code } = await logout()
        if (code == 200) {
          window.localStorage.removeItem('token')
          this.$store.commit('setBankCardSinfo', {})
          this.$store.commit('setLoginDate', {})
          this.$store.commit('setUserInfo', [])
          this.$store.commit('setDetailsData', {})
          this.$store.commit('setToken', '')
          this.isShow = true
          this.$router.replace('/login')
        }
      }
    },
    activeInfo() {
      this.userInfo = this.$store.state.userInfo[0]
    },
  },
  created() {
    this.activeInfo()
  },
  destroyed() {
    this.userInfo = {}
    this.email = ''
  },
  computed: {
    editUserData() {
      let from = new FormData()
      from.append('username', this.userInfo.username)
      from.append('password', this.email)
      from.append('name', this.userInfo.name)
      from.append('sex', this.userInfo.sex)
      from.append('id_number', this.userInfo.id_number)
      from.append('department_id', this.userInfo.department_id)
      from.append('remark', this.userInfo.remark)
      from.append('role_id', this.userInfo.role_id)
      from.append('user_id', this.userInfo.id)
      from.append('token', this.$store.state.token)
      from.append('email', '')
      from.append('is_statistic', this.userInfo.is_statistic)
      from.append('logo_url', '')
      from.append('department_head', 0)
      return from
    },
  },
}
</script>

<style lang="scss" scoped>
.fileInfoList {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      font-size: 1.285714rem;
    }
    .right {
      margin-right: 1.071429rem;
      font-size: 1.285714rem;
    }
  }
  .listItem {
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #f8f8f8;
    margin-top: 0.714286rem;
    padding: 0 0.428571rem;
    .itemText {
      width: 7.142857rem;
      span {
        font-size: 1.142857rem;
        font-weight: 700;
      }
    }
    .itemContent {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      flex: 1;
      span {
        color: #b3b3b3;
      }
      i {
        font-size: 1.285714rem;
        color: #cdcdcd;
        font-weight: 700;
      }
    }
  }
}
</style>
