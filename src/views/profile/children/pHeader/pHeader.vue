<template>
  <div id="pHeader" class="my_header text-white bg-primary">
    <div class="topbox d-flex">
      <div class="logo d-flex">
        <img v-if="imgUrl" :src="bestURL + imgUrl" alt="logo" />
        <img src="../../../../assets/image/dpng.png" v-else alt="logo" />

        <div class="info">
          <div class="name">
            {{name || '姓名'}}
            <div style="padding-right:.714286rem;">
              <span>{{jobName || '职位'}}</span>
            </div>
          </div>
          <div class="phone">{{phone|| '180****8888'}}</div>
        </div>
      </div>
      <div class="icon" @click="toProfileInfo">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
    
<script>
import { bestURL, crosURl } from '@/network/baseURL'
import { getUserDesignatedTasks } from '@/network/home'

export default {
  name: 'pHeader',
  data() {
    return {
      dataInfo: {},
      name: '',
      phone: '',
      jobName: '',
      imgUrl: '',
      bestURL: ''
    }
  },
  activated() {
    this.bestURL = bestURL
    this.getUserDesignat()
  },
  computed: {
    getUserDesignatedTasksData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    async getUserDesignat() {
      const { data } = await getUserDesignatedTasks(
        this.getUserDesignatedTasksData
      )
      this.dataInfo = data.userInfo[0]
      this.imgUrl = this.dataInfo.img_url
      this.jobName = this.dataInfo.role.display_name
      this.phone = this.formatPhone(this.dataInfo.username)
      this.name = this.dataInfo.name
    },
    toProfileInfo() {
      this.$emit('toProfileInfo')
    },
    formatPhone(phone) {
      return phone.substr(0, 3) + '****' + phone.substr(7, 11)
    }
  }
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
