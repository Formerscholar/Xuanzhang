<template>
  <div id="addressList">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>地址簿</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper" ref="scroll">
      <el-card class="border_card" v-for="item in state.receivingInformationList" :key="item.id">
        <div @click="waitNoChange(item)">
          <div class="content">
            <div class="information">
              <div class="name">{{item.consignee}}</div>
              <div class="phone">{{item.consignee_tel}}</div>
            </div>
            <div class="address">{{item.consignee_address}}</div>
          </div>
          <div class="operation">
            <div class="editbtn" @click.stop="editAddress(item.id)">
              <van-icon name="edit" />
              <span>编辑</span>
            </div>
            <div class="delectbtn" @click.stop="deleteAddress(item.id)">
              <van-icon name="delete" />
              <span>删除</span>
            </div>
          </div>
        </div>
      </el-card>
    </scroll>
    <div class="addressbtn">
      <div class="span" @click="AddressView">新增地址</div>
    </div>
  </div>
</template>
    
<script>
import { reactive, computed, onActivated } from '@vue/composition-api'
import {
  getReceivingInformationList,
  deleteReceivingInformation,
} from '@/network/deal'

export default {
  setup(props, { root }) {
    const state = reactive({
      iid: 0,
      searchResult: [],
      receivingInformationList: [],
    })

    onActivated(() => {
      state.iid = root.$route.params.id
      getReceiving()
    })

    function waitNoChange(item) {
      root.$bus.$emit('waitNoChange', item)
      root.$router.go(-1)
    }

    function deleteAddress(iid) {
      root.$dialog
        .confirm({
          title: '提示',
          message: '是否删除此地址?',
        })
        .then(async () => {
          const deleteReceivingInformationData = computed(() => {
            return {
              token: root.$store.state.token,
              id: iid,
            }
          })

          const { code, msg } = await deleteReceivingInformation(
            deleteReceivingInformationData.value
          )
          if (code == 200) {
            root.$message({
              showClose: true,
              message: msg,
              type: 'success',
            })
            getReceiving()
          } else {
            root.$message({
              showClose: true,
              message: msg,
              type: 'error',
            })
          }
        })
    }

    const getReceivingInformationListData = computed(() => {
      return {
        token: root.$store.state.token,
        id: state.iid,
        type: 'distributor',
        _: new Date().getTime(),
      }
    })

    async function getReceiving() {
      const { data } = await getReceivingInformationList(
        getReceivingInformationListData.value
      )
      state.receivingInformationList = data.receivingInformationList
    }

    function blacknext() {
      this.$router.go(-1)
    }

    function AddressView() {
      root.$router.push(`/InvalidAddress/${state.iid}`)
    }
    function editAddress(iid) {
      root.$router.push(`/editAddress/${iid}`)
    }
    return {
      state,
      blacknext,
      waitNoChange,
      deleteAddress,
      AddressView,
      editAddress,
    }
  },
}
</script>
    
<style scoped lang='scss'>
#addressList {
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
      margin-left: -1.071429rem;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 3.714286rem;
    width: 100%;
    overflow: hidden;
    padding: 0.714286rem;
    .border_card {
      padding: 1rem 0.857143rem;
      margin-bottom: 0.714286rem;
      .content {
        border-bottom: 1px solid #f7f7f7;
        margin-bottom: 0.714286rem;
        .information {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 1.142857rem;
          margin-bottom: 0.571429rem;
          .name {
            margin-right: 1rem;
          }
          .phone {
          }
        }
        .address {
          font-size: 1rem;
          color: #909090;
          margin-bottom: 0.857143rem;
        }
      }
      .operation {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #626262;
        font-size: 1rem;

        .editbtn {
          margin-right: 0.714286rem;
        }
        .delectbtn {
        }
      }
    }
  }
  .addressbtn {
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
