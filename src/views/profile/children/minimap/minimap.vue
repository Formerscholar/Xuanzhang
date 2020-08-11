<template>
  <div id="minimap">
    <div id="container"></div>
  </div>
</template>
    
<script>
import { reactive, onActivated } from '@vue/composition-api'
export default {
  setup(props, { root }) {
    const state = reactive({
      map: null,
    })
    onActivated(() => {
      init()
    })

    function init() {
      state.map = new AMap.Map('container')
      window.mapObj = state.map
    }
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
