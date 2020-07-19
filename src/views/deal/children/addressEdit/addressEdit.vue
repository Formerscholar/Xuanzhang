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
      :area-list="areaList"
      show-postal
      show-delete
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
    
<script>
import areaList from '@/common/area'

export default {
  name: 'addressEdit',
  data() {
    return {
      areaList,
      searchResult: []
    }
  },
  components: {
  },

  methods: {
    onSave(content) {
      console.log('save', content)
      this.$store.commit('setAddressID', ++this.$store.state.AddressID)
      let obj = {
        id: this.$store.state.AddressID,
        name: content.name,
        tel: content.tel,
        address:
          content.province +
          content.city +
          content.county +
          content.addressDetail,
        isDefault: content.isDefault
      }
      this.$store.commit('setAddress', obj)
      this.$router.replace('/addressList')
    },
    onDelete() {
      this.$router.replace('/addressList')
    },
    blacknext() {
      this.$router.go(-1)
    }
  }
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
