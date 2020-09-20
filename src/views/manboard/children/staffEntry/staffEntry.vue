<template>
  <div id="staffEntry">
    <navbar class="Controlled_root">
      <i class="el-icon-arrow-left text-primary" slot="left" @click="callBack"></i>
      <div class="title text-black" slot="center">
        <span>入职增加</span>
      </div>
      <i slot="right"></i>
    </navbar>
    <div class="staffEntry_content">
      <div class="box-card">
        <van-field class="newStyle" v-model="tel" type="tel" label="手机号" />

        <el-row class="DeliveryDate van-cell">
          <span class="lable">头像</span>
          <Avatars class="time" @ObtainUrl="ObtainUrls" />
        </el-row>

        <van-field class="newStyle" v-model="name" label="姓名" />
        <van-field
          class="newStyle"
          v-model="value"
          type="digit"
          label="身份证"
          ref="digit"
          @focus="touchStart"
        />
        <el-row class="DeliveryDate van-cell">
          <span class="lable">性别</span>
          <van-radio-group v-model="radio" direction="horizontal" class="time van-field__body">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </el-row>

        <div @click="isproperties = true" class="newStyle DeliveryDate van-cell">
          <span class="lable">部门</span>
          <span>
            {{ContractValue}}
            <van-icon name="arrow" />
          </span>
        </div>

        <div @click="ispropertiess = true" class="newStyle DeliveryDate van-cell">
          <span class="lable">主管</span>
          <span>
            {{ContractValuse}}
            <van-icon name="arrow" />
          </span>
        </div>

        <div @click="ispropertiesss = true" class="newStyle DeliveryDate van-cell">
          <span class="lable">职务</span>
          <span>
            {{jobValue}}
            <van-icon name="arrow" />
          </span>
        </div>

        <van-field
          class="newStyle"
          v-model="orther"
          rows="1"
          autosize
          label="其他"
          type="textarea"
          placeholder="请输入内容"
        />
      </div>
    </div>

    <myBtns :commitFun="addUserNow" :cancelFun="callBack">
      <span slot="cancel-btn">返回</span>
      <span slot="commit-btn">
        <span>保存</span>
      </span>
    </myBtns>

    <van-number-keyboard
      :show="isShow"
      v-model="value"
      extra-key="X"
      close-button-text="完成"
      @blur="isShow = false"
    />

    <van-picker
      class="datetime"
      v-if="isproperties"
      title="部门"
      show-toolbar
      :columns="ContractOptions"
      @confirm="propertiesonConfirm"
      @cancel="isproperties = false"
    />

    <van-picker
      class="datetime"
      v-if="ispropertiess"
      title="主管"
      show-toolbar
      :columns="ContractOptisons"
      @confirm="propertiesonConfirms"
      @cancel="ispropertiess = false"
    />

    <van-picker
      class="datetime"
      v-if="ispropertiesss"
      title="职务"
      show-toolbar
      :columns="jobOptions"
      @confirm="propertiesonConfirmss"
      @cancel="ispropertiesss = false"
    />
  </div>
</template>
    
<script>
import { getDepartments, getRoles, addUser } from '@/network/login'
import { bestURL, crosURl } from '@/network/baseURL'
const myBtns = () => import('@/components/common/my_btns/my_btns')
const Avatars = () => import('@/components/content/Avatars/Avatars')

export default {
  data() {
    return {
      isShow: false,
      value: '',
      name: '',
      digit: '',
      tel: '',
      isproperties: false,
      ispropertiess: false,
      ispropertiesss: false,
      orther: '',
      radio: '1',
      Contractnum: '',
      ContractValue: '',
      ContractValuetest: '',
      ContractValuse: '',
      ContractValusetest: '',
      ContractOptions: [],
      getDepartments: [],
      ContractOptisons: ['否', '是'],
      jobValue: '',
      jobValuetest: '',
      jobOptions: [],
      roles: [],
      dataImgUrl: '',
    }
  },
  components: { Avatars, myBtns },
  created() {
    this.getDepartment()
    this.getRolesList()
  },
  activated() {
    this.$Jurisdiction('106', localStorage.getItem('catearr'), () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
  },
  computed: {
    getDepartmentData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
    addUserData() {
      let form = new FormData()
      form.append('username', this.tel)
      form.append('name', this.name)
      form.append('sex', this.radio)
      form.append('id_number', this.value)
      form.append('department_id', this.ContractValuetest)
      form.append('remark', this.orther)
      form.append('role_id', this.jobValuetest)
      form.append('department_head', this.ContractValusetest)
      form.append('token', this.$store.state.token)
      form.append('logo_url', this.dataImgUrl)
      return form
    },
  },
  methods: {
    propertiesonConfirmss(value, index) {
      this.jobValue = value
      this.roles.map((item, index1) => {
        if (index1 == index) {
          this.jobValuetest = item.id
        }
      })
      console.log(this.jobValuetest)
      this.ispropertiesss = false
    },
    propertiesonConfirms(value, index) {
      this.ContractValuse = value
      this.ContractValusetest = index
      this.ispropertiess = false
    },
    propertiesonConfirm(value, index) {
      this.ContractValue = value
      this.getDepartments.map((item, index1) => {
        if (index1 == index) {
          this.ContractValuetest = item.id
        }
      })
      this.isproperties = false
    },
    touchStart() {
      this.$refs.digit.blur()
      this.isShow = true
    },
    async addUserNow() {
      const { code, msg } = await addUser(this.addUserData)
      if (code == 200) {
        this.$message({
          message: msg,
          type: 'success',
        })
        this.callBack()
      } else {
        this.$message.error(msg)
      }
    },
    ObtainUrls(ImgUrl) {
      this.dataImgUrl = ImgUrl
    },
    callBack() {
      this.isShow = false
      this.value = ''
      this.name = ''
      this.digit = ''
      this.tel = ''
      this.isproperties = false
      this.ispropertiess = false
      this.ispropertiesss = false
      this.orther = ''
      this.radio = '1'
      this.Contractnum = ''
      this.ContractValue = ''
      this.ContractValuetest = ''
      this.ContractValuse = ''
      this.ContractValusetest = ''
      this.ContractOptions = []
      this.getDepartments = []
      this.jobValue = ''
      this.jobValuetest = ''
      this.jobOptions = []
      this.roles = []
      this.dataImgUrl = ''
      this.$router.go(-1)
    },
    async getDepartment() {
      const { data } = await getDepartments(this.getDepartmentData)
      console.log('getDepartments', data)
      this.getDepartments = data.getDepartments
      this.ContractOptions = data.getDepartments.map((item) => item.name)
    },
    async getRolesList() {
      const { data } = await getRoles(this.getDepartmentData)
      console.log('getRoles', data)
      this.roles = data.roles
      this.jobOptions = data.roles.map((item, index) => item.display_name)
    },
  },
}
</script>

<style scoped lang="scss">
#staffEntry {
  padding-top: 5.428571rem;
  .Controlled_root {
    font-size: 1.285714rem;
    background-color: #fff;
    box-shadow: 0 0 15px 3px #fff;
    border: none;
    font-weight: 700;

    .el-icon-arrow-left {
      display: block;
      font-size: 1.714286rem;
      margin-left: 0.714286rem;
    }
    .title {
      margin-left: -1.714286rem;
    }
  }
  .staffEntry_content {
    .box-card {
      padding: 0.357143rem;
      .DeliveryDate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e7e7e7;
        line-height: normal;
        .lable {
          width: 4.928571rem;
          text-align: justify;
          text-align-last: justify;
          color: black;
          padding-right: 0.714286rem;
          border-right: 1px solid #e7e7e7;
        }
        .time {
          flex: 1;
          text-align: right;
          padding: 0 1rem;
        }
      }
      .Contract {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .btns {
    width: 100%;
    position: fixed;
    bottom: 0.357143rem;
    display: flex;
    justify-content: flex-end;
    .van-button {
      margin-right: 0.357143rem;
    }
  }
  .datetime {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
