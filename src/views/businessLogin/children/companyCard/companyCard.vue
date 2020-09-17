<template>
  <div class="busbtnbox">
    <!-- <div class="title">扬州日吨食品实业发展有限公司</div> -->
    <el-button v-for="(item,index) in cardList" :key="index" @click="btnclick(item.id)">
      <em>
        <h5>{{item.name}}</h5>
        <!-- <h6>geixb@1255.com</h6> -->
      </em>
      <i class="el-icon-arrow-right el-icon--right"></i>
    </el-button>
  </div>
</template>
    
<script>
export default {
  props: {
    cardList: {
      type: Array,
      default: [],
    },
  },
  methods: {
    btnclick(id) {
      this.$emit('btnclick', id)
    },
  },
}
</script>
    
<style lang="scss">
.busbtnbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  .title {
    font-size: 1rem;
    color: #b2b2b2;
    margin-bottom: 0.714286rem;
  }
  .el-button {
    width: 90%;
    outline: none;
    margin-top: 0.357143rem;
    margin-left: 0;
    span {
      display: flex;
      padding: 0.357143rem;
      justify-content: space-between;
      align-items: center;
      em {
        font-style: normal;
        h5 {
          font-size: 1rem;
          margin: 0.357143rem 0;
          font-weight: 700;
        }
        h6 {
          color: #a7a7a7;
          font-size: 0.857143rem;
          margin: 0.357143rem 0;
        }
      }
      i {
        color: #c9c8cd;
        font-weight: 700;
        font-size: 1.285714rem;
      }
    }
  }
}
</style>
