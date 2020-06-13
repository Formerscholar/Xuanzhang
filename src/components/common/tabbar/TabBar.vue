<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'TabBar',
  components: {}
}
</script>
<style scoped>
#tab-bar {
  display: flex;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  max-width: 1024px;
  margin: 0 auto;
  z-index: 99999;
}
</style>
