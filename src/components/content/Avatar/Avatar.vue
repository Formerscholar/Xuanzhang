<template>
  <div id="fileInfoList">
    <simple-cropper
      :initParam="uploadParam"
      :successCallback="uploadHandle"
      ref="cropper"
    >
      <div @click="upload" class="content_box">
        <img v-if="userImg" v-lazy="userImg" />
        <img v-else-if="PropsImg" v-lazy="PropsImg" />
        <van-icon v-else name="photograph" />
      </div>
    </simple-cropper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadParam: 4,
      userImg: '',
    }
  },
  components: {
    SimpleCropper: () =>
      import('@/components/common/SimpleCropper/SimpleCropper'),
  },
  props: {
    PropsImg: {
      type: String,
      default: null,
    },
  },
  methods: {
    upload() {
      this.$refs['cropper'].upload()
    },
    uploadHandle(data) {
      this.userImg = data.substr(1)
      this.$emit('ObtainUrl', data.substr(1))
    },
  },
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
