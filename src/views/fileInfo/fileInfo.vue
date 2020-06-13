<template>
  <div id="fileInfo">
    <pageTop />
    <Avatar @ImageUrl="ImageUrl" :PropsImg="PropsImg" />
    <iDCard :getname="getname" />
    <phoneNum :username="username" />
    <password @passwordInfo="passwordInfo" />
    <userName :getName="name" />
    <gender :sex="getsex" />
    <myArea @emailInfo="emailInfo" />
    <department :getsex="getdepartment" />
    <Roles :getsex="getdisplayName" />
    <status :status="getstatus" />
  </div>
</template>
    
<script>
import Avatar from '@/views/fileInfo/children/AvatarInfo/AvatarInfo'
import password from '@/views/fileInfo/children/password/password'
import userName from '@/views/fileInfo/children/userName/userName'
import iDCard from '@/views/fileInfo/children/iDCard/iDCard'
import phoneNum from '@/views/fileInfo/children/phoneNum/phoneNum'
import gender from '@/views/fileInfo/children/gender/gender'
import myArea from '@/views/fileInfo/children/myArea/myArea'
import pageTop from '@/views/fileInfo/children/page_top/pageTop'
import department from '@/views/fileInfo/children/department/department'
import Roles from '@/views/fileInfo/children/Roles/Roles'
import status from '@/views/fileInfo/children/status/status'
import { bestURL, crosURl } from '@/network/baseURL'
import { editUser } from '@/network/home'

export default {
  name: 'fileInfo',
  components: {
    pageTop,
    Avatar,
    iDCard,
    phoneNum,
    gender,
    userName,
    password,
    myArea,
    department,
    Roles,
    status
  },
  data() {
    return {
      userInfo: {},
      passwordData: '',
      ImageUrlData: ''
    }
  },
  activated() {
    this.activeInfo()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    this.subeditUser()
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  computed: {
    PropsImg() {
      return bestURL + this.userInfo.img_url
    },
    getname() {
      return this.userInfo.id_number
    },
    username() {
      return this.userInfo.username
    },
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
    },
    getstatus() {
      return this.userInfo.status
    },
    editUserData() {
      let from = new FormData()
      from.append('username', this.userInfo.username)
      from.append('password', this.passwordData)
      from.append('name', this.userInfo.name)
      from.append('sex', this.userInfo.sex)
      from.append('id_number', this.userInfo.id_number)
      from.append('department_id', this.userInfo.department_id)
      from.append('remark', this.userInfo.remark)
      from.append('role_id', this.userInfo.role_id)
      from.append('user_id', this.userInfo.id)
      from.append('token', this.$store.state.token)
      from.append('is_statistic', this.userInfo.is_statistic)
      from.append('logo_url', this.ImageUrlData)
      from.append('department_head', 0)
      return from
    }
  },
  methods: {
    async subeditUser() {
      const { data } = await editUser(this.editUserData)
    },
    ImageUrl(data) {
      this.ImageUrlData = this.$store.state.userInfo[0].img_url = data
    },
    passwordInfo(data) {
      this.passwordData = data
    },
    emailInfo(data) {
      console.log(data)
    },
    activeInfo() {
      this.userInfo = this.$store.state.userInfo[0]
    }
  }
}
</script>
    
<style lang="scss" scoped>
#fileInfo {
  background-color: #f5f5f5;
}
</style>
