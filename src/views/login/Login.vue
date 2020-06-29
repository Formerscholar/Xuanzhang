<template>
  <div id="Login">
    <div class="logo">
      <img src="../../assets/image/logo.png" alt="logo" />
    </div>
    <div class="from">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="50px"
        class="demo-ruleForm"
      >
        <el-form-item class="from_title" label-width="0px" prop="name">
          <el-input
            @focus="allfocusnone"
            @blur="allfocusblbock"
            class="userInput"
            type="number"
            placeholder="请输入手机号"
            v-model="ruleForm.name"
            :trigger-on-focus="false"
            maxlength="11"
            minlength="11"
            autofocus
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass" label-width="0px">
          <el-input
            @focus="allfocusnone"
            @blur="allfocusblbock"
            :trigger-on-focus="false"
            class="userInput"
            type="password"
            placeholder="请输入密码"
            maxlength="21"
            minlength="6"
            v-model="ruleForm.pass"
          ></el-input>
        </el-form-item>

        <el-form-item label-width="0px" class="loginBtn">
          <el-button class="nextbtn" type="primary" @click="submitForm">登 录</el-button>
        </el-form-item>
        <div class="puzzle-box" v-if="isShow">
          <PuzzleVerification
            :puzzleImgList="puzzleImgList"
            deviation="5"
            blockType="puzzle"
            :onSuccess="handleSuccess"
          />
        </div>
        <el-link :underline="false" class="from_tip" type="primary">用手机号登录</el-link>
      </el-form>
    </div>
    <div class="tips">
      <el-link :underline="false" class="tips_one tipsItem" type="primary">注册账号</el-link>
      <el-link :underline="false" class="tips_two tipsItem" type="primary">遇到问题？</el-link>
    </div>
    <van-overlay :show="MaskShow" />
  </div>
</template>

<script>
import { getlogin, getIndex } from '@/network/login.js'
import navbar from '@/components/common/navbar/NavBar'
import PuzzleVerification from '@/components/common/puzzleVerification/puzzleVerification'

export default {
  name: 'Login',
  components: { navbar, PuzzleVerification },
  data() {
    return {
      MaskShow: false,
      isShow: false,
      puzzleImgList: [
        require('../../assets/image/thumbnail-img01.jpg'),
        require('../../assets/image/thumbnail-img02.jpg'),
        require('../../assets/image/thumbnail-img03.jpg')
      ],
      text: '',
      ruleForm: {
        // name: '',
        // pass: ''
        name: '18083795906',
        // name: '18752715203',
        pass: '123456'
      },
      rules: {
        name: [
          { required: true, message: '请输入你的手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入你的密码', trigger: 'blur' },
          { min: 6, max: 21, message: '长度在 6-21 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSuccess() {
      this.isShow = false
      this.MaskShow = false
      this.gologin()
    },
    submitForm() {
      this.isShow = true
      this.MaskShow = true
    },
    gologin() {
      this.$refs['ruleForm'].validate(async valid => {
        if (valid) {
          const res = await getlogin({
            username: this.ruleForm.name,
            password: this.ruleForm.pass
          })
          if (res.code == 200) {
            this.$store.commit(
              'setLoginDate',
              JSON.parse(JSON.stringify(res.data))
            )
            var storage = window.localStorage
            storage.setItem('username', this.ruleForm.name)
            storage.setItem('password', this.ruleForm.pass)
            if (res.data.customers.length > 1) {
              this.$router.push('/businessLogin')
            } else {
              var form = new FormData()
              form.append('username', res.data.requestData.username)
              form.append('password', res.data.requestData.password)
              form.append('company_id', res.data.customers[0].id)
              const res1 = await getIndex(form)
              if (res1.code == 200) {
                this.$store.commit(
                  'setUserInfo',
                  JSON.parse(JSON.stringify(res1.data.userInfo))
                )
                this.$store.commit('setToken', res1.data.token)
                if (!window.localStorage) {
                  alert('浏览器不支持localstorage')
                } else {
                  storage.setItem(
                    'token',
                    JSON.stringify(this.$store.state.token)
                  )
                }
              }
              this.$router.replace('/')
            }
          } else {
            this.$message.error('账号或密码错误!')
            return
          }
        } else {
          // 失败
          return false
        }
      })
    },
    // opacity
    allfocusnone() {
      document.querySelector('#Login .tips').style.display = 'none'
    },
    allfocusblbock() {
      document.querySelector('#Login .tips').style.display = 'block'
    }
  },
  activated() {
    const h = document.body.scrollHeight
    window.onresize = function() {
      if (document.body.scrollHeight < h) {
        document.body.style.height = h
      }
    }
    document
      .querySelectorAll('.el-form-item .userInput input')
      .forEach(item => {
        item.style.border = 'none'
        item.style.height = '3rem'
        item.style.borderRadius = '0px'
        item.style.borderBottom = '1px solid #f3f3f3'
        item.style.fontSize = '1.285714rem '
      })
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.paddingTop = '0px'
    document.querySelector('#app').style.paddingBottom = '0px'
  },
  deactivated() {
    document.querySelector('#tab-bar').style.height = '59px'
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '62px'
  }
}
</script>

<style lang="scss" scoped>
.puzzle-box {
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 10;
  transform: translate(-5%, -50%);
}

#app {
  padding: 0 !important;
  padding-bottom: 0;
}
#Login {
  .logo {
    width: 100%;
    padding-top: 2.857143rem;
    padding-bottom: 2.142857rem;
    img {
      display: block;
      margin: 0 auto;
      width: 5rem;
    }
  }
  .from {
    padding: 0 1.428571rem;
    .from_title {
      text-align: left;
    }
    .nextbtn {
      width: 100%;
      height: 3rem;
      font-size: 1.428571rem;
    }
    .from_tip {
      text-align: center;
      width: 100%;
    }
  }
  .tips {
    width: 100%;
    text-align: center;
    position: fixed;
    bottom: 4rem;
    left: 0;
    right: 0;

    .tips_one {
      margin-right: 0.714286rem;
    }
    .tips_two {
    }
  }
}
</style>
