<template>
  <div id="cardbox">
    <van-swipe-cell v-for="(item,index) in distributor" :key="index">
      <el-card class="box-card">
        <div @click="gokhlist(item)">
          <div class="box_name">
            <span class="kh_name">
              <span>{{item.name}}</span>
            </span>
            <span class="my_name">
              <span style="color:#409EFF">{{item.uname}}</span>
            </span>
          </div>
          <div class="box_info">
            <span class="phone_info">
              <span
                style="color:#409EFF;margin-right:1.071429rem"
              >{{item.contacts.length != 0 ?item.contacts[0].contacts:''}}</span>
              <span>{{item.contacts.length != 0 ?item.contacts[0].contacts_tel:''}}</span>
            </span>
            <span class="cz_Sales">
              <span>{{item.arrearsCount | arrears}}</span>
            </span>
          </div>
        </div>
      </el-card>
      <template #right>
        <div style=" height: 100%;display: flex;flex-direction: column;">
          <van-button
            square
            type="primary"
            text="编辑"
            style=" height: 50%;"
            @click="editClick(item)"
          />
          <van-button
            square
            text="删除"
            type="danger"
            style=" height: 50%;"
            @click="delelClick(item.id)"
          />
        </div>
      </template>
    </van-swipe-cell>
  </div>
</template>
    
<script>
import { deleteDistributor, deleteSupplier } from '@/network/client'

export default {
  name: 'cardbox',
  components: {},
  props: {
    titlename: {
      type: String,
      default: '客户'
    },
    distributor: {
      type: Array,
      default: []
    }
  },
  filters: {
    arrears(value) {
      return `应收:${value}元`
    }
  },
  methods: {
    editClick(item) {
      console.log(item)
      if (this.titlename == '客户') {
        if (item.status == 1) {
          this.$router.push(`/enterpriseedit/client/${item.id}`) //企业客户
        } else if (item.status == 2) {
          this.$router.push(`/clientedit/client/${item.id}`) //个人客户
        }
      } else if (this.titlename == '供应商') {
        if (item.status == 1) {
          this.$router.push(`/enterpriseedit/supplier/${item.id}`) //企业客户
        } else if (item.status == 2) {
          this.$router.push(`/clientedit/supplier/${item.id}`) //个人客户
        }
      }
    },
    async delelClick(id) {
      var form = new FormData()
      form.append('token', this.$store.state.token)
      form.append('id', id * 1)
      if (this.titlename == '客户') {
        const { code, msg } = await deleteDistributor(form)
        if (code == 200) {
          this.$message({
            showClose: true,
            message: msg,
            type: 'success'
          })
          this.$emit('refreshList')
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: 'error'
          })
        }
      } else {
        const { code, msg } = await deleteSupplier(form)
        if (code == 200) {
          this.$message({
            showClose: true,
            message: msg,
            type: 'success'
          })
          this.$emit('refreshList')
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: 'error'
          })
        }
      }
    },
    gokhlist(item) {
      this.$emit('gokhlist', item)
    }
  }
}
</script>
    
<style scoped lang="scss">
#cardbox {
  .box-card {
    margin-bottom: 0.714286rem;
    .box_name {
      display: flex;
      justify-content: space-between;
      .kh_name {
        .el-tag {
        }
      }
      .my_name {
        .el-tag {
        }
      }
    }
    .box_info {
      margin: 0.714286rem 0;
      display: flex;
      justify-content: space-between;
      .phone_info {
        .el-tag {
        }
      }
      .contract_info {
        .el-tag {
        }
      }
      .Arrears_info {
        .el-tag {
        }
      }
    }
    .box_cz {
      display: flex;
      justify-content: space-between;
      .cz_Sales {
        .el-tag {
        }
      }
      .cz_cz {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .el-tag {
          &:nth-child(2) {
            margin: 0 0.357143rem;
          }
        }
      }
    }
  }
}
</style>
