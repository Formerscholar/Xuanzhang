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
      <el-card class="box-card">
        <van-field v-model="tel" type="tel" label="手机号" />
        <div class="van-cell van-field">
          <span class="van-cell__title van-field__label">头像</span>
          <div class="van-cell__value van-field__value">
            <Avatar @ObtainUrl="ObtainUrls" />
          </div>
        </div>
        <van-field v-model="name" label="姓名" />
        <van-field v-model="value" type="digit" label="身份证" ref="digit" @focus="touchStart" />
        <div class="van-cell van-field">
          <span class="van-cell__title van-field__label">性别</span>
          <div class="van-cell__value van-field__value">
            <van-radio-group v-model="radio" direction="horizontal" class="van-field__body">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="van-cell van-field">
          <span class="van-cell__title van-field__label">部门</span>
          <div class="van-cell__value van-field__value">
            <el-select v-model="ContractValue" placeholder="请选择" class="van-field__body">
              <el-option
                v-for="item in ContractOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="van-cell van-field">
          <span class="van-cell__title van-field__label">职务</span>
          <div class="van-cell__value van-field__value">
            <el-select v-model="jobValue" placeholder="请选择" class="van-field__body">
              <el-option
                v-for="item in jobOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="Contract">
          <van-field v-model="Contractnum" label="合同编号" />
          <van-button type="info">下载合约</van-button>
        </div>
        <van-field
          v-model="orther"
          rows="1"
          autosize
          label="其他"
          type="textarea"
          placeholder="请输入内容"
        />
      </el-card>
    </div>
    <div class="btns">
      <van-button type="info" @click="addUserNow">保存</van-button>
    </div>
    <van-number-keyboard
      :show="isShow"
      v-model="value"
      extra-key="X"
      close-button-text="完成"
      @blur="isShow = false"
    />
  </div>
</template>
    
<script>
import Avatar from '@/components/content/Avatar/Avatar'

import { getDepartments, getRoles, addUser } from '@/network/login'
import { bestURL, crosURl } from '@/network/baseURL'
export default {
  data() {
    return {
      isShow: false,
      value: '',
      name: '',
      digit: '',
      tel: '',
      orther: '',
      radio: '1',
      Contractnum: '',
      ContractValue: '',
      ContractOptions: [],
      jobValue: '',
      jobOptions: [],
      dataImgUrl: ''
    }
  },
  components: { Avatar },
  activated() {
    this.getDepartment()
    this.getRolesList()
  },
  deactivated() {},
  computed: {
    getDepartmentData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime()
      }
    },
    addUserData() {
      let form = new FormData()
      form.append('username', this.tel)
      form.append('name', this.name)
      form.append('sex', this.radio)
      form.append('id_number', this.value)
      form.append('department_id', this.ContractValue)
      form.append('remark', this.orther)
      form.append('role_id', this.jobValue)
      form.append('token', this.$store.state.token)
      form.append('logo_url', this.dataImgUrl)
      return form
    }
  },
  methods: {
    touchStart() {
      this.$refs.digit.blur()
      this.isShow = true
    },
    async addUserNow() {
      const { code } = await addUser(this.addUserData)
      if (code == 200) {
        this.$router.go(-1)
      }
    },
    ObtainUrls(ImgUrl) {
      this.dataImgUrl = ImgUrl
    },
    callBack() {
      this.$router.go(-1)
    },
    async getDepartment() {
      const { data } = await getDepartments(this.getDepartmentData)
      console.log('getDepartments', data)
      data.getDepartments.map((item, index) => {
        let obj = {
          value: item.id,
          label: item.name
        }
        this.ContractOptions.push(obj)
      })
    },
    async getRolesList() {
      const { data } = await getRoles(this.getDepartmentData)
      console.log('getRoles', data)
      data.roles.map((item, index) => {
        let obj = {
          value: item.id,
          label: item.display_name
        }
        this.jobOptions.push(obj)
      })
    }
  }
}
</script>
<style lang="scss">
.van-cell {
  padding: 0.714286rem 0.428571rem;
}
.van-button {
  font-size: 0.857143rem;
  width: 7.142857rem;
  padding: 0;
  height: 2.571429rem;
}
.van-cell__title {
}
</style>
<style scoped lang="scss">
#staffEntry {
  padding-top: 1rem;
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
}
</style>
