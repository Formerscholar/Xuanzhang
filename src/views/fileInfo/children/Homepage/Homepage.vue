<template>
  <div id="Homepage">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>个人主页</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="content">
      <div class="logo">
        <Avatar :PropsImg="PropsImg" @ObtainUrl="ObtainUrl" />
      </div>
      <userName :getName="name" />
      <gender :sex="getsex" />
      <department :getsex="getdepartment" />
      <Roles :getsex="getdisplayName" />
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import Avatar from '@/components/content/Avatar/Avatar'
import userName from '@/views/fileInfo/children/userName/userName'
import gender from '@/views/fileInfo/children/gender/gender'
import department from '@/views/fileInfo/children/department/department'
import Roles from '@/views/fileInfo/children/Roles/Roles'

export default {
  name: 'Homepage',
  components: { navbar, Avatar, userName, gender, department, Roles },
  data() {
    return {
      userInfo: {},
      PropsImg: ''
    }
  },
  activated() {
    this.activeInfo()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  computed: {
    name() {
      return this.userInfo.name
    },
    getsex() {
      return this.userInfo.sex
    },
    getdepartment() {
      return this.userInfo.department.name
    },
    getdisplayName() {
      return this.userInfo.role.display_name
    }
  },
  methods: {
    ObtainUrl(data) {
      if (this.userInfo.img_url == data) {
        this.PropsImg = ''
      } else {
        this.PropsImg = data
      }
      this.$router.replace('/profile')
    },
    goBack() {
      this.$router.go(-1)
    },
    activeInfo() {
      this.$store.state.userInfo.map((item, index) => {
        if (index == 0) {
          this.userInfo = JSON.stringify(item)
        }
      })
      this.userInfo = JSON.parse(this.userInfo)
      this.PropsImg = this.userInfo.img_url
        ? this.userInfo.img_url.substr(1)
        : ''
    }
  }
}
</script>
    
<style scoped lang="scss">
#Homepage {
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
      margin-left: -2.5rem;
      font-size: 1.285714rem;
    }
  }
  .content {
    margin-top: 3.5rem;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
