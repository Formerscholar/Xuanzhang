<template>
  <div id="minimap">
    <div id="container"></div>
  </div>
</template>
    
<script>
import { reactive } from '@vue/composition-api'
export default {
  setup(props, { root }) {
    const state = reactive({
      map: null,
      center: [119.417964, 32.386693],
    })

    function init() {
      state.map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 13,
        center: state.center,
      })
    }

    init()
  },
}
</script>
    
<style scoped lang="scss">
#minimap {
  width: 100%;
  height: 100vh;
  #container {
    width: 100%;
    height: 100%;
  }
}
</style>
