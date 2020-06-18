<template>
  <div id="myVqr">
    <Vqr :logoSrc="imageUrl" :text="Content" :size="220"></Vqr>
  </div>
</template>
    
<script>
import Vqr from 'vue-qr'

export default {
  name: 'myVqr',
  data() {
    return {
      imageUrl: require('../../../assets/image/logo.png')
    }
  },
  props: {
    Content: {
      type: String,
      default: ''
    }
  },
  components: { Vqr }
}
</script>
    
<style scoped lang="scss">
#myVqr {
}
</style>
