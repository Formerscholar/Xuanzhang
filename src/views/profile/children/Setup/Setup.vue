<template>
  <div id="Setup">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>设置</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper" ref="scroll" :probe-type="3">
      <div class="imgbox">
        <img src="@/assets/image/logo.png" alt="logo" />
        <span>
          版本号
          <em>V{{state.version}}</em>
        </span>
      </div>
      <div class="UserActions">
        <div class="update" v-if="state.isNews" @click="getUpdate">
          <div class="label">检测更新</div>
          <div class="status">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="update" v-else>
          <div class="label">检测更新</div>
          <div class="status">
            <span>已是最新版</span>
          </div>
        </div>
        <div class="update" @click="gobaseLogin">
          <div class="label">切换公司</div>
          <div class="status">
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="update" @click="exitLogin">
          <div class="label">退出登录</div>
          <div class="status">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
    
<script>
import { reactive } from '@vue/composition-api'
import { logout, getAppVersion } from '@/network/login'
export default {
  setup(props, { root }) {
    const state = reactive({
      version: '20200825',
      isNews: true,
    })

    function goBack() {
      this.$router.go(-1)
    }

    function gobaseLogin() {
      this.$router.push('/businessLogin')
    }

    async function exitLogin() {
      const { code } = await logout()
      if (code == 200) {
        localStorage.removeItem('token')
        root.$store.commit('setBankCardSinfo', {})
        root.$store.commit('setLoginDate', {})
        root.$store.commit('setUserInfo', [])
        root.$store.commit('setDetailsData', {})
        root.$store.commit('setToken', '')
        root.$router.replace('/')
      }
    }

    function getUpdate() {
      root.$dialog.alert({
        message: '功能暂未放出',
      })
      // document.addEventListener('plusready', () => {
      //   getNativeVersion()
      // })
    }

    async function getNativeVersion() {
      const { code, data, msg } = await getAppVersion()
      if (code == 200) {
        if (state.version !== data.version) {
          root.$dialog
            .confirm({
              title: '更新提示',
              message: '有新版本，是否启动后台下载?',
            })
            .then(() => {
              downloadApk(data.url)
            })
        } else {
          state.isNews = false
        }
      }
    }
    function downloadApk(url) {
      plus.downloader
        .createDownload(url, {}, (d, status) => {
          if (status == 200) {
            installApk(d.filename)
          }
        })
        .start()
    }
    function installApk(path) {
      plus.runtime.install(
        path,
        {},
        () => {
          plus.runtime.restart()
        },
        (e) => {
          root.$dialog.alert({
            message: '安装更新失败!',
          })
        }
      )
    }

    return {
      state,
      goBack,
      gobaseLogin,
      exitLogin,
      getUpdate,
    }
  },
}
</script>
    
<style scoped lang="scss">
#Setup {
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -2.071429rem;
      font-size: 1.285714rem;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 5.142857rem;
    bottom: 0;
    overflow: hidden;
    .imgbox {
      border-radius: 0.357143rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 14.285714rem;
      img {
        width: 4.928571rem;
        height: 4.928571rem;
        margin-bottom: 1rem;
      }
    }
    .UserActions {
      padding: 0 1rem;
      .update {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 3.5rem;
        margin-bottom: 0.357143rem;
        .label,
        .status {
          font-size: 1.142857rem;
        }
      }
    }
  }
}
</style>
