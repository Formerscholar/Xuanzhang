<template>
  <div class="fileInfoList">
    <div class="listItem d-flex">
      <div class="itemText">
        <span>身份证</span>
      </div>
      <div class="itemContent">
        <span>{{getname}}</span>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'Avatar',
  components: {},
  props: {
    getname: {
      type: String,
      default: ''
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
      .sfz {
        width: 3.571429rem;
        height: 1.428571rem;
        margin: 0 0.714286rem;
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
