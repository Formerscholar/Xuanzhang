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
          余额:
          <span>{{cardinfo.Balance}}</span> 元
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
      default: {}
    }
  }
}
</script>
    
<style lang="scss">
.bankCard {
  justify-content: center;
  align-items: center;
  text-shadow: 3px 2px 5px #45444f;
  .bankCardItem {
    width: 394px;
    height: 13.285714rem;
    padding: 10px;
    border-radius: 10px;
    color: #e1e1e7;
    box-shadow: 3px 2px 5px #76748a;
    background: linear-gradient(to right, #76748a, #d9daec);
    flex-direction: column;
    justify-content: space-between;
    font-weight: 700;

    .title_text {
      justify-content: space-between;
      align-items: flex-end;
      height: 32px;
      font-size: 18px;
      padding: 0 10px;
    }

    .botn_text {
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 10px;
      padding-bottom: 5px;
      height: 45px;
      .couten_box {
        width: 100%;
        height: 4px;
        background: linear-gradient(to right, #e6d7f1, #e7d8f2);
        box-shadow: 3px 2px 5px #45444f;
      }
      .Balance {
        font-size: 14px;
        span {
          padding-left: 5px;
        }
      }
    }
  }
}
</style>
