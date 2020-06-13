<template>
  <div id="fileInfoList">
    <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper">
      <img v-if="userImg" :src="userImg" @click="upload" />
      <img v-else-if="PropsImg" :src="PropsImg" @click="upload" />
      <img v-else src="@/assets/image/dpng.png" @click="upload" />
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
}
</style>
