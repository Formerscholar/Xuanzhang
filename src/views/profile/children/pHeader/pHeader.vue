<template>
  <div id="pHeader" class="my_header text-white bg-primary">
    <div class="topbox d-flex">
      <div class="logo d-flex">
        <img v-if="imgUrl" :src="imgUrl" alt="logo" />
        <img src="../../../../assets/image/dpng.png" v-else alt="logo" />
        <div class="info">
          <div class="name">
            {{name || '姓名'}}
            <span>{{jobName || '职位'}}</span>
          </div>
          <div class="companys">{{company}}</div>
          <div class="phone">{{phone}}</div>
        </div>
      </div>
      <div class="icon" @click="toProfileInfo">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'pHeader',
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    jobName: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      default: '',
    },
  },
  methods: {
    toProfileInfo() {
      this.$emit('toProfileInfo')
    },
  },
}
</script>
    
<style lang="scss">
#pHeader {
  padding: 0.357143rem 0.642857rem;
  height: 5.928571rem;
  .topbox {
    justify-content: space-between;
    align-items: center;
    .logo {
      flex: 1;
      width: 100%;
      align-items: center;
      position: relative;
      img {
        width: 4.285714rem;
        height: 4.285714rem;
        border: 0.214286rem solid #67a6d9;
      }
      .el-icon-help {
        font-size: 1.571429rem;
        background-color: #a590c6;
        color: #fff;
        position: absolute;
        top: 3.214286rem;
        left: 3.214286rem;
      }
      .info {
        flex: 1;
        margin-left: 1.071429rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 1rem;
        .name {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          font-size: 1.285714rem;
          span {
            margin-left: 1.428571rem;
            font-size: 0.857143rem;
          }
        }
        .companys,
        .phone {
          font-size: 0.857143rem;
        }
      }
    }
    .icon {
      font-size: 1.571429rem;
      margin-right: 0.714286rem;
    }
  }
}
</style>
