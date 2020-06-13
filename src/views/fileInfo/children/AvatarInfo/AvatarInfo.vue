<template>
  <div class="fileInfoList">
    <div class="listItem d-flex">
      <div class="itemText">
        <span>头像</span>
      </div>
      <div class="itemContent">
        <Avatar :PropsImg="PropsImg" @ObtainUrl="ObtainUrl" />
      </div>
    </div>
  </div>
</template>
    
<script>
import Avatar from '@/components/content/Avatar/Avatar'

export default {
  name: 'gender',
  components: { Avatar },
  data() {
    return {}
  },
  props: {
    PropsImg: {
      type: String,
      default: ''
    }
  },
  methods: {
    ObtainUrl(data) {
      this.$emit('ImageUrl', data)
    }
  },
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
