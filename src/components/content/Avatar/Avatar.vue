<template>
  <div id="fileInfoList">
    <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">
      <div @click="upload" class="content_box">
        <img v-if="userImg" :src="userImg" />
        <img v-else-if="PropsImg" :src="PropsImg" />
        <van-icon v-else name="photograph" />
      </div>
    </simple-cropper>
  </div>
</template>
    
<script>
import { bestURL, crosURl } from '@/network/baseURL'
import SimpleCropper from '@/components/common/SimpleCropper/SimpleCropper'

export default {
  data() {
    return {
      uploadParam: 4, // 相对手机屏幕放大的倍数: 4倍
      userImg: ''
    }
  },
  components: {
    SimpleCropper
  },
  props: {
    PropsImg: {
      type: String,
      default: null
    }
  },
  methods: {
    // 上传头像
    upload() {
      this.$refs['cropper'].upload()
    },
    // 上传头像成功回调
    uploadHandle(data) {
      this.userImg = bestURL + data
      this.$emit('ObtainUrl', data)
    }
  }
}
</script>
    
<style lang="scss" scoped>
#fileInfoList {
  .content_box {
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dfe6e9;
    border-radius: 5px;
    overflow: hidden;
    i {
      color: #b2bec3;
      font-size: 1.571429rem;
    }
  }
}
</style>
