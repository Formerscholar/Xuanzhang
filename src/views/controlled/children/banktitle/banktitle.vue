<template>
  <div class="top_title d-flex">
    <div class="bankAmount">
      <i class="el-icon-s-finance text-primary"></i>
      <div>
        总金额:
        <em>778652.99</em>
        元
      </div>
    </div>
    <div class="bankall">
      <span>
        查看全部(
        <em>4</em> )
      </span>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'banktitle',
  components: {},
}
</script>
    
<style lang="scss" scoped>
.top_title {
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  line-height: 2.571429rem;
  margin-bottom: 0.714286rem;
  em {
    font-style: normal;
  }
  .el-icon-s-finance {
    font-size: 2.571429rem;
    margin-right: 0.714286rem;
  }
  .bankAmount {
    display: flex;
    i {
    }
    span {
      color: #585858;
      em {
        padding-left: 0 0.357143rem;
      }
    }
  }
  .bankall {
    color: #bdbdbd;
    span {
      em {
      }
    }
    .el-icon-arrow-right {
      font-size: 1.142857rem;
    }
  }
}
</style>
