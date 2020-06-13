<template>
  <div id="manboard">
    <navbar class="Controlled_root">
      <i class="el-icon-arrow-left text-primary" slot="left" @click="callBack"></i>
      <div class="title text-black" slot="center">
        <span>人事管理</span>
      </div>
      <i slot="right" class="el-icon-plus text-primary" @click="addman"></i>
    </navbar>
    <van-tabs v-model="active" @click="handleClick">
      <van-tab title="在职人员">
        <el-card class="box-card" v-for="(item,index) in userLists" :key="index">
          <el-row :gutter="20" class="row-gc">
            <el-col :span="6">
              <div>
                编号:
                <em>{{item.user_number}}</em>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <em>{{item.name}}</em>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <em>{{item.sex==1?'男':'女'}}</em>
              </div>
            </el-col>
            <el-col :span="10">
              <div>
                <em>{{item.department_name}}</em>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div>
                <em>{{item.display_name}}</em>
              </div>
            </el-col>
            <el-col :span="9">
              <div>
                账户余额:
                <em>{{item.balance}}</em>
              </div>
            </el-col>
            <el-col :span="9">
              <div>
                <em>{{item.username}}</em>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </van-tab>
      <van-tab title="离职人员">
        <el-card class="box-card" v-for="(item,index) in Resignation" :key="index">
          <el-row :gutter="20" class="row-gc">
            <el-col :span="6">
              <div>
                编号:
                <em>{{item.user_number}}</em>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <em>{{item.name}}</em>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <em>{{item.sex==1?'男':'女'}}</em>
              </div>
            </el-col>
            <el-col :span="10">
              <div>
                <em>{{item.department_name}}</em>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div>
                <em>{{item.display_name}}</em>
              </div>
            </el-col>
            <el-col :span="9">
              <div>
                账户余额:
                <em>{{item.balance}}</em>
              </div>
            </el-col>
            <el-col :span="9">
              <div>
                <em>{{item.username}}</em>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </van-tab>
    </van-tabs>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import { getUserList } from '@/network/login'
export default {
  data() {
    return {
      active: 0,
      userLists: [],
      Resignation: []
    }
  },
  components: { navbar },
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
    document.querySelector('#tab-bar').style.height = '0px'
  },
  deactivated() {
    document.querySelector('#tab-bar').style.height = '59px'
  }
}
</script>

<style scoped lang="scss">
#manboard {
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
      margin-left: 1.285714rem;
    }
    .el-icon-plus {
      font-size: 1.714286rem;
      margin-right: 0.714286rem;
    }
  }
  .van-tabs {
    padding: 0 5px;
    .box-card {
      margin-bottom: 0.357143rem;
      .el-row {
        text-align: left;
      }
      .row-gc {
        margin-bottom: 0.357143rem;
      }
    }
  }
}
</style>
