<template>
  <div id="fileInfo">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>个人信息</span>
      </div>
    </navbar>
    <div class="fileInfoList">
      <div class="listItem d-flex" @click="goIndexInfo">
        <div class="itemText">
          <span>头像</span>
        </div>
        <div class="itemContent">
          <img :src="PropsImg" />
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="fileInfoList">
      <div class="listItem d-flex">
        <div class="itemText">
          <span>姓名</span>
        </div>
        <div class="itemContent">
          <span>{{getname}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="fileInfoList">
      <div class="listItem d-flex">
        <div class="itemText">
          <span>性别</span>
        </div>
        <div class="itemContent">
          <span>{{getSex}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>

    <div class="fileInfoList">
      <div class="listItem d-flex">
        <div class="itemText">
          <span>部门</span>
        </div>
        <div class="itemContent">
          <span>{{userInfo.department.name}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="fileInfoList mar_bot">
      <div class="listItem d-flex">
        <div class="itemText">
          <span>职务</span>
        </div>
        <div class="itemContent">
          <span>{{userInfo.role.display_name}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="fileInfoList">
      <div class="listItem d-flex">
        <div class="itemText">
          <span>登录账号</span>
        </div>
        <div class="itemContent">
          <span>{{username}}</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
    <div class="content_box" @click="goPassword">
      <span class="content_text">重置密码</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="content_box" @click="goEmail">
      <span class="content_text">邮箱</span>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>
    
<script>
import { bestURL, crosURl } from '@/network/baseURL'

export default {
  data() {
    return {
      userInfo: {},
      passwordData: '',
      ImageUrlData: '',
    }
  },
  created() {
    this.userInfo = this.$store.state.userInfo[0]
  },
  computed: {
    PropsImg() {
      return this.userInfo.img_url
        ? this.userInfo.img_url.substr(1)
        : 'data:image/png;base64,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'
    },
    getname() {
      return this.userInfo.name
    },
    username() {
      return this.userInfo.username
    },
    getSex() {
      return this.userInfo.sex ? '男' : '女'
    },
  },
  methods: {
    formatPhone(phone) {
      return phone.substr(0, 3) + '****' + phone.substr(7, 11)
    },
    goIndexInfo() {
      this.$router.push('/avatarInfo')
    },
    goBack() {
      this.$router.go(-1)
    },
    goPassword() {
      this.$router.push('/password')
    },
    goEmail() {
      this.$router.push('/email')
    },
    passwordInfo(data) {
      this.passwordData = data
    },
    emailInfo(data) {
      console.log(data)
    },
  },
}
</script>
    
<style lang="scss" scoped>
#fileInfo {
  padding-top: 5.428571rem;
  background-color: #f5f4f9;
  min-height: 100vh;
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      font-size: 1.5rem;
    }
    .center {
      margin-left: -1.071429rem;
      font-size: 1.5rem;
    }
  }
  .fileInfoList {
    padding-left: 2.785714rem;
    padding-right: 1.357143rem;
    height: 3.928571rem;
    background-color: #fff;
    .listItem {
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 100%;
      .itemText {
        width: 7.142857rem;
        span {
          font-size: 1.142857rem;
        }
      }
      .itemContent {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 1;
        img {
          width: 2.857143rem;
          height: 2.857143rem;
          border-radius: 0.357143rem;
        }
        span {
          color: #b3b3b3;
        }
        i {
          font-size: 1.285714rem;
          margin-left: 1.071429rem;
        }
      }
    }
  }
  .mar_bot {
    margin-bottom: 1.428571rem;
  }
  .content_box {
    height: 3.928571rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 2.785714rem;
    padding-right: 1.357143rem;
    font-size: 1.142857rem;
    background-color: #fff;

    .content_text {
    }
    .el-icon-arrow-right {
      font-size: 1.285714rem;
      margin-left: 1.071429rem;
    }
  }
}
</style>
