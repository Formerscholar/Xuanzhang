<template>
  <div id="early">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <i class="el-icon-back"></i>
      </div>
      <div class="center" slot="center">
        <span>预警系统</span>
      </div>
      <div class="right" slot="right"></div>
    </navbar>
    <div class="content">
      <el-card class="box-card">
        <i class="el-icon-eleme"></i> 仓库预警
        <span>
          预警信息:
          <em>0</em>
        </span>
      </el-card>
      <el-card class="box-card">
        <i class="el-icon-eleme"></i> 买价上浮
        <span>
          未读信息:
          <em>0</em>
        </span>
      </el-card>
      <el-card class="box-card">
        <i class="el-icon-eleme"></i> 付款超标
        <span>
          超标信息:
          <em>0</em>
        </span>
      </el-card>
      <el-card class="box-card">
        <i class="el-icon-eleme"></i> 备用金
        <span>
          溢出信息:
          <em>0</em>
        </span>
      </el-card>
      <el-card class="box-card">
        <i class="el-icon-eleme"></i> 超额发货
        <span>
          超额信息:
          <em>0</em>
        </span>
      </el-card>
      <el-card class="box-card">
        <i class="el-icon-eleme"></i> 提前支取
        <span>
          超额信息:
          <em>0</em>
        </span>
      </el-card>
      <el-card class="box-card">
        <i class="el-icon-eleme"></i> 任务超时
        <span>
          超时信息:
          <em>0</em>
        </span>
      </el-card>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'

export default {
  components: { navbar },
  activated() {
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  methods: {
    blackhome() {
      this.$router.go(-1)
    }
  }
}
</script>
    
<style scoped lang="scss">
#early {
  padding-top: 5.428571rem;
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      span {
        font-size: 1.571429rem;
      }
    }
    .right {
      margin-right: 1.071429rem;
      .newbtn {
      }
    }
  }
}
</style>
