<template>
  <div id="addNewProductlist">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>添加客户</span>
      </div>
      <div class="right" slot="right"></div>
    </navbar>
    <el-card class="box-card">
      <van-field v-model="name" label="公司名称" />
      <van-field v-model="name" label="简称" />
      <van-field v-model="name" label="国家" />
      <van-field v-model="specification" label="联系人" />
      <van-field v-model="specification" label="职务" />
      <van-field v-model="price" type="number" label="电话" />
      <van-field v-model="weight" label="邮箱" />
      <van-field v-model="product" label="销售员" />
    </el-card>
    <div class="btns">
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)">确认</van-button>
      <van-button color="linear-gradient(to right, #ccc, #ddd)">取消</van-button>
    </div>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'

export default {
  data() {
    return {
      name: '',
      specification: '',
      price: '',
      weight: '',
      product: '',
      Quantity: '',
      Remarks: ''
    }
  },
  components: {
    navbar
  },
  methods: {
    blacknext() {
      this.$router.go(-1)
    }
  },
  
}
</script>
    
<style scoped lang="scss">
#addNewProductlist {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      font-size: 1.285714rem;
      color: #030303;
    }
    .right {
      margin-right: 1.071429rem;
    }
  }
  .btns {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: fixed;
    bottom: 1.285714rem;
    .van-button {
      margin-right: 0.714286rem;
    }
  }
}
</style>
