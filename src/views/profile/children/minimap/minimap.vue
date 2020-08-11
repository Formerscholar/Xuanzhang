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
      center: [119.417964, 32.386693],
    })
    onActivated(() => {
      init()
    })
    function init() {
      state.map = new AMap.Map('container', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 13, //初始化地图层级
        center: state.center, //初始化地图中心点
      })
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
