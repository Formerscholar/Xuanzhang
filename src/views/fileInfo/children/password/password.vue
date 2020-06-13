<template>
  <div class="fileInfoList">
    <div class="listItem d-flex">
      <div class="itemText">
        <span>密码</span>
      </div>
      <div class="itemContent">
        <van-field v-model="password" @input="inputChange" type="password" />
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'gender',
  data() {
    return {
      password: ''
    }
  },
  components: {},
  computed: {},
  activated() {},
  methods: {
    inputChange(value) {
      this.$emit('passwordInfo', value)
    }
  }
}
</script>
    
<style lang="scss" scoped>
.fileInfoList {
  padding: 0 0.357143rem;
  height: 3.928571rem;
  .listItem {
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #f8f8f8;
    .itemText {
      width: 7.142857rem;
      span {
        font-size: 1.142857rem;
        font-weight: 700;
      }
    }
    .itemContent {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      flex: 1;
      span {
        color: #b3b3b3;
      }
      i {
        font-size: 1.285714rem;
        color: #cdcdcd;
        font-weight: 700;
      }
    }
  }
}
</style>
