<template>
  <div id="addressEdit">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>新增地址</span>
      </div>
      <div class="right" slot="right"></div>
    </navbar>
    <van-address-edit
      :area-list="state.areaList"
      show-search-result
      :search-result="state.searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>
    
<script>
import areaList from '@/common/area'
import { reactive, computed } from '@vue/composition-api'
import { addReceivingInformation } from '@/network/deal'
export default {
  setup() {
    const state = reactive({
      iid: 0,
      areaList,
      searchResult: [],
    })

    async function onSave(content) {
      console.log('save', content)
      const { code, msg } = await addReceivingInformation({
        consignee: content.name,
        consignee_address:
          content.province +
          content.city +
          content.county +
          content.addressDetail,
        consignee_tel: content.tel,
        token: this.$store.state.token,
        consignee_id: state.iid,
        type: 'distributor',
      })
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.blacknext()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }

    function blacknext() {
      this.$router.go(-1)
    }

    return {
      state,
      onSave,
      blacknext,
    }
  },
  activated() {
    this.state.iid = this.$route.params.id
  },
}
</script>
    
<style scoped lang='scss'>
#addressEdit {
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
}
</style>
