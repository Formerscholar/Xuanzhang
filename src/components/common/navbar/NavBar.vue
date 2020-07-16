<template>
  <div class="navBar d-flex my_header bg-primary text-white">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  components: {}
}
</script>

<style >
.navBar {
  justify-content: space-between;
  font-size: 1.714286rem;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
.left,
.center,
.right {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
