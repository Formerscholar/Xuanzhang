<template>
  <div id="reminder" class="my_package">
    <div class="reminder_item my_content d-flex">
      <div class="logo">
        <img src="@/assets/image/Transparent_logo.png" alt />
      </div>
      <div class="text">
        <ul>
          <li>你有10条待完成的任务,有3条已经过期!</li>
          <li>你有22条待审核的清单等待审核。</li>
        </ul>
      </div>
      <div class="icon">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'reminder',
  components: {}
}
</script>
    
<style lang="scss">
#reminder {
  max-height: 5rem;
  min-height: 2.785714rem;
  .reminder_item {
    justify-content: space-around;
    width: 100%;
    padding: 0 1.071429rem;

    .logo {
      width: 2.071429rem;
      margin-right: 0.714286rem;
      img {
        width: 100%;
      }
    }
    .text {
      padding: 0.714286rem 0.357143rem;
      overflow: hidden;
      flex: 1;
      text-align: left;
      font-size: 0.714286rem;
      ul {
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        li {
          height: 1.285714rem;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .icon {
      width: 2.142857rem;
      font-size: 1.571429rem;
      font-weight: 700;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>
