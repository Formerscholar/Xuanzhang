<template>
  <div id="manboard">
    <navbar class="Controlled_root">
      <i class="el-icon-arrow-left text-primary" slot="left" @click="callBack"></i>
      <div class="title text-black" slot="center">
        <span>账户</span>
      </div>
    </navbar>
    <!-- <van-search v-model="searchValue" /> -->
    <el-autocomplete
      class="search"
      v-model="searchValue"
      :fetch-suggestions="querySearchAsync"
      prefix-icon="el-icon-search"
      @select="handleSelect"
      @change="handleChange"
    ></el-autocomplete>
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMores"
      @scroll="clickscroll"
    >
      <van-tabs v-model="active" @click="handleClick">
        <van-tab>
          <template #title>
            <div class="icon_wrap">
              <p class="tab_icon tabs_icon"></p>
              <span>在职</span>
            </div>
          </template>
          <div class="bg"></div>

          <van-swipe-cell v-for="(item,index) in userLists" :key="index">
            <div class="box-card">
              <img
                v-if="item.img_url"
                class="img"
                :src=" item.img_url.substr(0,1) == '#' ?  item.img_url.substr(1) : item.img_url"
                alt="logo"
              />

              <div v-else class="imgs"></div>
              <div class="text">
                <div class="title">
                  <div class="title_left">{{item.name}}</div>
                  <div
                    v-if="isBalance"
                    class="title_right"
                    :style="{color: item.balance > 0 ? '#a8a8a8' :'#ff7675'}"
                  >￥{{item.balance}}</div>
                </div>
                <div class="body">
                  <div class="body_phone">{{item.username}}</div>
                  <div class="body_tip">{{item.display_name}}</div>
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                v-if="!item.is_admin"
                style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
                square
                type="danger"
                text="离职"
                @click="quitting(item.id)"
              />
              <van-button
                style="height:100%; margin:0 auto;width:2.785714rem;line-height:1.714286rem;"
                square
                type="primary"
                text="编辑"
                @click="editting(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-tab>
        <van-tab>
          <template #title>
            <div class="icon_wrap">
              <p class="tab_icon"></p>
              <span>离职</span>
            </div>
          </template>
          <div class="bg"></div>
          <div class="box-card" v-for="(item,index) in Resignation" :key="index">
            <img v-if="item.img_url" class="img" :src="item.img_url.substr(1)" alt="logo" />
            <div v-else class="imgs"></div>
            <div class="text">
              <div class="title">
                <div class="title_left">{{item.name}}</div>
                <div
                  class="title_right"
                  :style="{color: item.balance > 0 ? '#a8a8a8' :'#ff7675'}"
                >￥{{item.balance}}</div>
              </div>
              <div class="body">
                <div class="body_phone">{{item.username}}</div>
                <div class="body_tip">{{item.display_name}}</div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </scroll>
    <i class="el-icon-plus" @click="addman"></i>
  </div>
</template>
    
<script>
import { getUserList, editUserStatus } from '@/network/login'
export default {
  data() {
    return {
      active: 0,
      userLists: [],
      Resignation: [],
      restaurants: [],
      useroption: [],
      Resigoption: [],
      searchValue: '',
      inputID: '',
      OPage: 1,
      TPage: 1,
      OllPage: 1,
      isONetwork: true,
      isTNetwork: true,
    }
  },
  computed: {
    getUserListData() {
      return {
        token: this.$store.state.token,
        page: this.OllPage,
        offset: 20,
        status: 'active',
        _: new Date().getTime(),
      }
    },
    getResignationData() {
      return {
        token: this.$store.state.token,
        page: this.OllPage,
        offset: 20,
        status: 'prohibit',
        _: new Date().getTime(),
      }
    },
    selectData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        status: 'active',
        name: this.inputID,
        _: new Date().getTime(),
      }
    },
    isBalance: {
      get() {
        return this.$store.state.userInfo[0].role.oparr.indexOf('304') == -1
          ? false
          : true
      },
      set(newValue) {
        console.log(newValue)
      },
    },
  },
  methods: {
    editting(iid) {
      console.log(iid)
      this.$router.push(`/editting/${iid}`)
    },
    async quitting(iid) {
      const { code, msg } = await editUserStatus({
        user_id: iid,
        token: this.$store.state.token,
      })
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.OllPage = 1
        this.userLists = []
        this.useroption = []
        this.getUserLists()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    loadAll() {
      if (!this.active) {
        return this.useroption
      } else {
        return this.Resigoption
      }
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    loadMores() {
      if (!this.active) {
        if (this.isONetwork) {
          this.OPage++
          this.OllPage = this.OPage
          this.getUserLists()
        } else {
          this.$toast('没有更多数据了')
        }
      } else {
        if (this.isTNetwork) {
          this.TPage++
          this.OllPage = this.TPage
          this.getResignation()
        } else {
          this.$toast('没有更多数据了')
        }
      }
      this.$once('hook:destroyed', () => {
        this.OPage = 1
        this.TPage = 1
        this.OllPage = 1
      })
    },
    clickscroll() {
      if (!this.active) {
        this.OPage = 1
        this.OllPage = 1
        this.isONetwork = true
        this.userLists = []
        this.getUserLists()
      } else {
        this.TPage = 1
        this.OllPage = 1
        this.isTNetwork = true
        this.Resignation = []
        this.getResignation()
      }
    },
    callBack() {
      this.$router.go(-1)
    },
    handleClick(tab) {
      console.log(tab)
      this.restaurants = this.loadAll()
    },
    async getUserLists() {
      const { data } = await getUserList(this.getUserListData)
      console.log('getUserList', data)
      if (data.userLists.length) {
        this.userLists = [...data.userLists]
        this.useroption = data.userLists.map((item) => {
          return {
            address: item.id,
            value: item.name,
          }
        })
      } else {
        this.isONetwork = false
      }

      this.$once('hook:destroyed', () => {
        this.userLists = []
        this.useroption = []
      })
    },
    async getResignation() {
      const { data } = await getUserList(this.getResignationData)
      console.log('getUserList', data)
      if (data.userLists.length) {
        data.userLists.forEach((item) => {
          this.Resignation.push(item)
          this.Resigoption.push({
            address: item.id,
            value: item.name,
          })
        })
      } else {
        this.isTNetwork = false
      }
      this.$once('hook:destroyed', () => {
        this.Resignation = []
        this.Resigoption = []
      })
    },
    addman() {
      this.$router.push('/staffEntry')
    },
    handleSelect(item) {
      console.log(item)
      this.inputID = item.value
      this.handleChange()
    },
    async handleChange(value) {
      const { data } = await getUserList(this.selectData)
      this.userLists = []
      data.userLists.forEach((item) => {
        this.userLists.push(item)
      })
    },
  },
  created() {
    this.getUserLists()
    this.getResignation()
    this.restaurants = this.loadAll()
  },
}
</script>



<style scoped lang="scss">
#manboard {
  padding-top: 5.428571rem;
  .Controlled_root {
    font-size: 1.285714rem;
    box-shadow: 0 0 15px 3px #fff;
    border: none;
    font-weight: 700;

    .el-icon-arrow-left {
      color: #fff;
      display: block;
      font-size: 1.714286rem;
      margin-left: 0.714286rem;
    }
    .title {
      margin-left: -1.285714rem;
      color: #fff;
    }
  }
  .search {
    width: 100%;
    padding: 0.714286rem 1.428571rem;
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 9.285714rem;
    bottom: 0;
    overflow: hidden;
    .van-tabs {
      .icon_wrap {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 100%;

        span {
          font-size: 1rem;
          padding-bottom: 0.357143rem;
          font-weight: 700;
        }
        .tab_icon {
          width: 3.928571rem;
          height: 3.928571rem;
          background-image: url('../../assets/image/staff.png');
          background-repeat: no-repeat;
          background-size: 8.571429rem 11.071429rem;
          margin-bottom: 0;
          margin-right: 0.714286rem;
        }
        .tabs_icon {
          background-position: -4.642857rem 0;
        }
      }
      .bg {
        height: 1.071429rem;
        width: 100%;
        background-color: #f2f2f2;
        border-bottom: 1px solid #e8e8e8;
        margin-bottom: 0.714286rem;
      }
      .box-card {
        padding: 0 1.428571rem;
        margin-bottom: 1.071429rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .img {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 2px;
          margin-right: 1.071429rem;
        }
        .imgs {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 2px;
          background-color: #ccc;
          margin-right: 1.071429rem;
        }
        .text {
          flex: 1;
          border-bottom: 1px solid #f7f7f7;
          margin-top: 0.214286rem;
          .title {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;

            .title_left {
              font-size: 1.142857rem;
              font-weight: 700;
              color: #121212;
            }
            .title_right {
              font-size: 0.714286rem;
              color: #a8a8a8;
            }
          }
          .body {
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
            color: #969696;
            margin-bottom: 0.857143rem;
            .body_phone {
              margin-right: 2.857143rem;
              font-size: 1rem;
            }
            .body_tip {
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
  .el-icon-plus {
    position: fixed;
    bottom: 3.142857rem;
    right: 2.357143rem;
    padding: 0.571429rem;
    z-index: 999;
    font-size: 2.714286rem;
    background-color: rgb(66, 147, 200);
    color: #fff;
    border-radius: 50%;
  }
}
</style>
