<template>
  <div id="cardbox">
    <van-swipe-cell v-for="(item,index) in distributor" :key="index">
      <div class="box-card">
        <div class="content" @click="gokhlist(item)">
          <div class="left_box">
            <span class="kh_name">{{item.name}}</span>
            <span class="kh_address">{{item.province}}{{item.contacts_address}}</span>
            <span class="kh_phone">
              <i>{{item.contacts.length != 0 ?item.contacts[0].contacts:''}}</i>
              <em>{{item.contacts.length != 0 ?item.contacts[0].contacts_tel:''}}</em>
            </span>
          </div>
          <div class="right_box">
            <span class="kh_moneny">￥{{item.arrearsCount }}</span>
            <span class="kh_created">{{item.created_at | getCreatedAt}}</span>
          </div>
        </div>
      </div>
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
      default: '客户',
    },
    distributor: {
      type: Array,
      default: [],
    },
  },
  filters: {
    getCreatedAt(value) {
      return value.split(' ')[0]
    },
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
            type: 'success',
          })
          this.$emit('refreshList')
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: 'error',
          })
        }
      } else {
        const { code, msg } = await deleteSupplier(form)
        if (code == 200) {
          this.$message({
            showClose: true,
            message: msg,
            type: 'success',
          })
          this.$emit('refreshList')
        } else {
          this.$message({
            showClose: true,
            message: msg,
            type: 'error',
          })
        }
      }
    },
    gokhlist(item) {
      this.$emit('gokhlist', item)
    },
  },
}
</script>
    
<style scoped lang="scss">
#cardbox {
  padding: 0 1.571429rem;
  .box-card {
    border-bottom: 1px solid #f2f2f2;
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.357143rem;
      .left_box {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .kh_name {
          font-size: 1.142857rem;
          margin-top: 0.428571rem;
          font-weight: 700;
          color: #020202;
          font-family: 'SimHei';
        }
        .kh_address {
          font-size: 1rem;
          white-space: nowrap;
          color: #727272;
        }
        .kh_phone {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          font-size: 1rem;
          color: #89c2ec;
          i {
            margin-right: 0.714286rem;
          }
        }
      }
      .right_box {
        width: 5.714286rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .kh_moneny {
          margin-bottom: 1.285714rem;
          color: #d6503e;
          font-size: 1.428571rem;
        }
        .kh_created {
          font-size: 1rem;
          color: #a5a5a5;
        }
      }
    }
  }
}
</style>
