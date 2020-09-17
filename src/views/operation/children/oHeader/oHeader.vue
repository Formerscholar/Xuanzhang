<template>
  <div class="opera_header bg-primary text-white d-flex">
    <div class="bot_box flex-1 d-flex">
      <div class="left_box">
        <div class="title">
          <span class="Money">总资产(元)</span>
          <i class="n_eyes el-icon-view"></i>
          <div class="guaranteed">
            <i class="el-icon-s-claim"></i>
            <span>保障中</span>
          </div>
        </div>
        <div class="body">
          <span>233.98</span>
        </div>
      </div>
      <div class="right_box">
        <div class="title">
          <span>昨日收益</span>
        </div>
        <div class="body">
          <span>+0.02</span>
          <i class="el-icon-caret-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'oHeader',
}
</script>
    
<style lang="scss">
.opera_header {
  flex-direction: column;
  height: 6.357143rem;
  .bot_box {
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.357143rem 0.714286rem;

    .left_box {
      display: flex;
      flex-direction: column;
      .title {
        display: flex;
        flex: 1;
        color: #7fb9e7;
        .Money {
          font-size: 0.714286rem;
        }
        .n_eyes {
          font-size: 1.285714rem;
          padding: 0 0.714286rem;
          margin-top: -0.357143rem;
          color: #fff;
        }
        .guaranteed {
          font-size: 0.571429rem;
          background-color: #347bcb;
          border-radius: 10px;
          text-align: center;
          padding: 0.285714rem 0.571429rem;
          margin-top: -0.357143rem;

          i {
          }
          span {
            padding-left: 0.357143rem;
          }
        }
      }
      .body {
        height: 2.428571rem;
        font-size: 1.571429rem;
        padding: 0.357143rem 0;
      }
    }
    .right_box {
      text-align: right;
      .title {
        color: #7fb9e7;
        padding-right: 1.857143rem;
      }
      .body {
        font-size: 1.857143rem;
      }
    }
  }
}
</style>
