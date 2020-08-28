<template>
  <div id="my_btns">
    <div class="left_btn" @click="cancelFun">
      <slot name="cancel-btn"></slot>
    </div>
    <div class="right_btn" @click="commitFun">
      <slot name="commit-btn"></slot>
    </div>
  </div>
</template>
    
<script>
export default {
  props: {
    commitFun: {
      type: Function,
      default: () => {},
    },
    cancelFun: {
      type: Function,
      default: () => {},
    },
  },
}
</script>
    
<style scoped lang="scss">
#my_btns {
  height: 3.5rem;
  width: 100%;
  padding: 0.357143rem 2.142857rem;
  position: fixed;
  bottom: 1.428571rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  .left_btn {
    height: 2.785714rem;
    line-height: 2.785714rem;
    color: #4692c4;
    border: 1px solid #4692c4;
    background-color: #fff;
    flex: 3;
    margin-right: 0.428571rem;
    text-align: center;
    border-top-left-radius: 0.571429rem;
    border-bottom-left-radius: 0.571429rem;
    overflow: hidden;
  }
  .right_btn {
    flex: 7;
    text-align: center;
    height: 2.785714rem;
    line-height: 2.785714rem;
    color: #fff;
    border-top-right-radius: 0.571429rem;
    border-bottom-right-radius: 0.571429rem;
    overflow: hidden;
    background-color: #4692c4;
    // background: url('../../../assets/image/right_btns.jpg') no-repeat;
    // background-size: 100% 100%;
    // background-position: 0 0;
  }
}
</style>
