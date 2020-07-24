<template>
  <div class="v-simple-cropper">
    <slot>
      <button @click="upload"></button>
    </slot>
    <input class="file" ref="file" type="file" accept="image/*" @change="uploadChange" />
    <div class="v-cropper-layer" ref="layer">
      <div class="layer-header">
        <van-button @click="cancelHandle" type="info">取消</van-button>
        <van-button type="primary" @click="confirmHandle">裁剪</van-button>
      </div>
      <img ref="cropperImg" />
    </div>
  </div>
</template> 
 
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import { uploadImgsss } from '@/network/materials'
export default {
  name: 'v-simple-cropper',
  props: {
    initParam: Number,
    successCallback: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      cropper: {},
      filename: '',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化裁剪插件
    init() {
      let cropperImg = this.$refs['cropperImg']
      this.cropper = new Cropper(cropperImg, {
        aspectRatio: 1 / 1,
        dragMode: 'move',
      })
    },
    // 点击上传按钮
    upload() {
      this.$refs['file'].click()
    },
    // 选择上传文件
    uploadChange(e) {
      let file = e.target.files[0]
      this.filename = file['name']
      let URL = window.URL || window.webkitURL
      this.$refs['layer'].style.display = 'block'
      this.cropper.replace(URL.createObjectURL(file))
    },
    // 取消上传
    cancelHandle() {
      this.cropper.reset()
      this.$refs['layer'].style.display = 'none'
      this.$refs['file'].value = ''
    },
    // 确定上传
    async confirmHandle() {
      let cropBox = this.cropper.getCropBoxData()
      let scale = this.initParam
      let cropCanvas = this.cropper.getCroppedCanvas({
        width: cropBox.width * scale,
        height: cropBox.height * scale,
      })
      let imgData = cropCanvas.toDataURL('image/jpeg')
      let formData = new FormData()
      formData.append('token', this.$store.state.token)
      formData.append('user_image', imgData)
      const res = await uploadImgsss(formData)
      this.successCallback(res.data.url)
      this.cancelHandle()
    },
  },
}
</script> 

<style lang="scss" scoped>
.v-simple-cropper {
  img {
    width: 3.5rem;
    height: 3.5rem;
  }
  .file {
    display: none;
  }
  .v-cropper-layer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99999;
    display: none;

    .layer-header {
      position: absolute;
      bottom: 0;
      z-index: 99999;
      width: 100%;
      height: 5.8rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      box-sizing: border-box;
      .van-button {
        margin-right: 0.714286rem;
      }
    }
  }
}
</style> 