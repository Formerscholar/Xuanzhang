<template>
  <div id="manboard">
    <navbar class="Controlled_root">
      <i class="el-icon-arrow-left text-primary" slot="left" @click="callBack"></i>
      <div class="title text-black" slot="center">
        <span>员工</span>
      </div>
      <i slot="right" class="el-icon-circle-plus-outline" @click="addman"></i>
    </navbar>
    <van-search v-model="searchValue" />
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMores"
      @scroll="clickscroll"
    >
      <van-tabs v-model="active" @click="handleClick">
        <van-tab title-style="height: 5rem;">
          <template #title>
            <div class="icon_wrap">
              <p class="tab_icon tabs_icon"></p>
              <span>在职</span>
            </div>
          </template>
          <div class="box-card" v-for="(item,index) in userLists" :key="index">
            <div class="img"></div>
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
        <van-tab>
          <template #title>
            <div class="icon_wrap">
              <p class="tab_icon"></p>
              <span>离职</span>
            </div>
          </template>
          <div class="box-card" v-for="(item,index) in Resignation" :key="index">
            <div class="img"></div>
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
  </div>
</template>
    
<script>
import { getUserList } from '@/network/login'
export default {
  data() {
    return {
      active: 0,
      userLists: [],
      Resignation: [],
      searchValue: ''
    }
  },

  computed: {
    getUserListData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        status: 'active',
        _: new Date().getTime()
      }
    },
    getResignationData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        status: 'prohibit',
        _: new Date().getTime()
      }
    }
  },
  methods: {
    loadMores() {
      console.log('没有更多数据了')
      this.$refs.scroll.finishPullUp()
    },
    clickscroll() {
      console.log('clickscroll')
    },
    callBack() {
      this.$router.go(-1)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    async getUserLists() {
      const { data } = await getUserList(this.getUserListData)
      console.log('getUserList', data)
      this.userLists = data.userLists
    },
    async getResignation() {
      const { data } = await getUserList(this.getResignationData)
      console.log('getUserList', data)
      this.Resignation = data.userLists
    },
    addman() {
      this.$router.push('/staffEntry')
    }
  },
  activated() {
    this.getUserLists()
    this.getResignation()
    document.querySelector('.van-tabs .van-tabs__wrap').style.height = '5rem'
    document.querySelector('.van-tabs__line').style.display = 'none'
    this.$once('hook:deactivated', () => {
      document.querySelector('.van-tabs .van-tabs__wrap').style.height = '44px'
      document.querySelector('.van-tabs__line').style.display = 'block'
    })
  },
  updated() {
    document.querySelector('.van-tabs .van-tabs__wrap').style.height = '5rem'
    document.querySelector('.van-tabs__line').style.display = 'none'
  },
  deactivated() {}
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
      margin-left: 1.285714rem;
      color: #fff;
    }
    .el-icon-circle-plus-outline {
      font-size: 1.714286rem;
      margin-right: 0.714286rem;
      color: #fff;
    }
  }

  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 9.285714rem;
    bottom: 0;
    overflow: hidden;
    .van-tabs {
      height: 5rem;

      .icon_wrap {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        span {
          font-size: 1rem;
          padding-bottom: 0.357143rem;
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

      .box-card {
        padding: 0 0.714286rem;
        padding-top: 0.357143rem;
        padding-bottom: 1.071429rem;
        margin-top: 0.714286rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .img {
          width: 4.071429rem;
          height: 4.071429rem;
          background-color: #ccc;
          margin-right: 1.071429rem;
        }
        .text {
          flex: 1;
          border-bottom: 1px solid #f7f7f7;
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
}
</style>
