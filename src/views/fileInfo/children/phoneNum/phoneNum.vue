<template>
  <div class="fileInfoList">
    <div class="listItem d-flex">
      <div class="itemText">
        <span>手机号</span>
      </div>
      <div class="itemContent">
        <span>{{getphone}}</span>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'phoneNum',
  components: {},
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  computed: {
    getphone() {
      return this.formatPhone(this.username)
    }
  },
  methods: {
    formatPhone(phone) {
      return phone.substr(0, 3) + '****' + phone.substr(7, 11)
    }
  }
}
</script>
    
<style lang="scss" scoped>
.fileInfoList {
  padding: 0 0.357143rem;
  height: 2.785714rem;
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
