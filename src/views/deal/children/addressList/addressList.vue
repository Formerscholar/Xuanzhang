<template>
  <div id="addressEdit">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>收货地址</span>
      </div>
      <div class="right" slot="right"></div>
    </navbar>
    <van-address-list
      @select="onSelect"
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
export default {
  name: 'addressEdit',
  data() {
    return {
      chosenAddressId: 0,
      list: [],
    }
  },
  components: {},
  created() {},
  activated() {
    if (this.$route.params.data.length > 0) {
      this.$route.params.data.map((item, index) => {
        let obj = {
          id: item.id,
          name: item.consignee,
          tel: item.consignee_tel,
          address: item.consignee_address,
          isDefault: item.is_default == '0' ? true : false,
        }
        this.list.push(obj)
      })
      this.$store.commit('setAddressID', ++this.$store.state.AddressID)
    } else {
      this.list.pop()
    }
    if (this.$store.state.Address.id != undefined) {
      this.list.push(this.$store.state.Address)
      if (this.$store.state.Address.isDefault) {
        this.chosenAddressId = this.$store.state.Address.id
      }
    }
  },

  methods: {
    onAdd() {
      this.$router.push('/addressEdit')
    },
    onEdit(item, index) {
      console.log('编辑地址:' + index)
    },
    onSelect(item, index) {
      console.log(item, index)
      console.log(item)
      this.$store.commit('setAddress', item)
      this.chosenAddressId = 0
      this.list = []
      this.$router.go(-1)
    },
    blacknext() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped lang="scss">
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
