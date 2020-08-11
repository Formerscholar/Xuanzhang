<template>
  <div class="v-simple-cropper">
    <slot>
      <button @click="upload"></button>
    </slot>
    <input class="file" ref="file" type="file" accept="image/*" @change="uploadChange" />
    <div class="v-cropper-layer" ref="layer">
      <div class="layer-header">
        <div @click="cancelHandle" style="color:#fff;">取消</div>
        <van-button type="primary" @click="confirmHandle">确定</van-button>
      </div>
      <img ref="cropperImg" />
    </div>
  </div>
</template> 
 
<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import { uploadImage } from '@/network/home'
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
    init() {
      let cropperImg = this.$refs['cropperImg']
      this.cropper = new Cropper(cropperImg, {
        aspectRatio: 1 / 1,
        dragMode: 'move',
      })
    },
    upload() {
      this.$refs['file'].click()
    },
    uploadChange(e) {
      let file = e.target.files[0]
      this.filename = file['name']
      let URL = window.URL || window.webkitURL
      this.$refs['layer'].style.display = 'block'
      this.cropper.replace(URL.createObjectURL(file))
    },
    cancelHandle() {
      this.cropper.reset()
      this.$refs['layer'].style.display = 'none'
      this.$refs['file'].value = ''
    },
    confirmHandle() {
      let cropCanvas = this.cropper.getCroppedCanvas({
        width: 300,
        height: 300,
        imageSmoothingEnabled: false,
      })
      let imgData = cropCanvas.toDataURL('image/jpeg')
      lrz(imgData, {
        width: 300,
        height: 300,
        quality: 0.7,
        fieldName: 'user_image',
      }).then(async (rst) => {
        let formData = new FormData()
        formData.append('token', this.$store.state.token)
        formData.append('user_image', rst.base64)
        const res = await uploadImage(formData)
        this.successCallback(res.data.url)
        this.cancelHandle()
      })
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
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding: 0 1.142857rem;
      font-size: 1.142857rem;
      .van-button {
        height: 2.428571rem;
      }
    }
  }
}
</style> 