<template>
  <div id="InvalidAddress">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>新增地址</span>
      </div>
    </navbar>
    <van-field v-model="state.name" label="姓名" placeholder="收货人姓名" />
    <van-field v-model="state.tel" type="tel" label="手机号" placeholder="收货人手机号" />
    <van-field v-model="state.addressDetail" label="详细地址" placeholder="街道门牌、楼层房间号等信息" />
    <div class="btns">
      <div class="span" @click="onSave">保存</div>
    </div>
  </div>
</template>
    
<script>
import { reactive, computed, onActivated } from '@vue/composition-api'
import { addReceivingInformation } from '@/network/deal'
export default {
  setup(props, { root }) {
    const state = reactive({
      iid: 0,
      name: '',
      tel: '',
      addressDetail: '',
    })
    onActivated(() => {
      state.iid = root.$route.params.id
    })

    async function onSave() {
      const addReceivingInformationData = computed(() => {
        return {
          consignee: state.name,
          consignee_address: state.addressDetail,
          consignee_tel: state.tel,
          token: root.$store.state.token,
          consignee_id: state.iid,
          type: 'distributor',
        }
      })
      const { code, msg } = await addReceivingInformation(
        addReceivingInformationData.value
      )
      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        blacknext()
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }

    function blacknext() {
      state.name = ''
      state.tel = ''
      state.addressDetail = ''
      root.$router.go(-1)
    }

    return {
      state,
      onSave,
      blacknext,
    }
  },
}
</script>
    
<style scoped lang='scss'>
#InvalidAddress {
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
  }
  .btns {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 0.714286rem;
    background-color: #fff;
    .span {
      width: 10.714286rem;
      height: 3rem;
      line-height: 3rem;
      background-color: #ca363a;
      color: white;
      text-align: center;
      font-size: 1.285714rem;
      border-radius: 1.428571rem;
    }
  }
}
</style>
