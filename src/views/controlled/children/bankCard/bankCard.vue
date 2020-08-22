<template>
  <div class="bankCard d-flex">
    <div class="bankCardItem d-flex">
      <div class="title_text d-flex">
        <div class="bankName">{{cardinfo.bankName}}</div>
        <div class="phone">{{cardinfo.phone}}</div>
      </div>

      <div class="botn_text d-flex">
        <div class="couten_box"></div>
        <div class="Balance">
          <span>{{cardinfo.Balance | Balance}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'bankCard',
  components: {},
  props: {
    cardinfo: {
      type: Object,
      default: {},
    },
  },
  filters: {
    Balance(value) {
      return `余额:${value}元`
    },
  },
}
</script>
    
<style lang="scss" scoped>
.bankCard {
  justify-content: center;
  align-items: center;
  text-shadow: 0.214286rem 0.142857rem 0.357143rem #45444f;
  .bankCardItem {
    width: 28.142857rem;
    height: 13.285714rem;
    padding: 0.714286rem;
    border-radius: 0.714286rem;
    color: #e1e1e7;
    box-shadow: 0.214286rem 0.142857rem 0.357143rem #76748a;
    background: linear-gradient(to right, #76748a, #d9daec);

    flex-direction: column;
    justify-content: space-between;
    font-weight: 700;

    .title_text {
      justify-content: space-between;
      align-items: flex-end;
      flex-direction: column;
      height: 2.285714rem;
      font-size: 1.285714rem;
      padding: 0 0.714286rem;
      .bankName {
        width: 100%;
        text-align: left;
        padding-bottom: 0.357143rem;
      }
    }

    .botn_text {
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 0.714286rem;
      padding-bottom: 0.357143rem;
      height: 3.214286rem;
      .couten_box {
        width: 100%;
        height: 0.285714rem;
        background: linear-gradient(to right, #e6d7f1, #e7d8f2);
        box-shadow: 0.214286rem 0.142857rem 0.357143rem #45444f;
      }
      .Balance {
        font-size: 1rem;
        span {
          padding-left: 0.357143rem;
        }
      }
    }
  }
}
</style>
