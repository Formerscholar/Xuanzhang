<template>
  <div id="myVqr">
    <Vqr :logoSrc="imageUrl" :text="Content" :size="220"></Vqr>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      imageUrl: require('../../../assets/image/logo.png'),
    }
  },
  props: {
    Content: {
      type: String,
      default: '',
    },
  },
  components: {
    Vqr: () => import('vue-qr'),
  },
}
</script>
    
<style scoped lang="scss">
#myVqr {
}
</style>
