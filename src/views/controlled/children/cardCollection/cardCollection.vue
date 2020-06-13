<template>
  <div class="cardCollection">
    <!-- bankCard -->
    <div v-for="(item,index) in cardCollInfos" :key="index" class="card_content">
      <bankCard :cardinfo="item" />
    </div>
  </div>
</template>
    
<script>
import bankCard from '@/views/controlled/children/bankCard/bankCard'
export default {
  name: 'cardCollection',
  components: { bankCard },
  props: {
    cardCollInfos: {
      type: Array,
      default: []
    }
  }
}
</script>
    
<style lang="scss">
.cardCollection {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .card_content {
    position: absolute;
    width: 100%;
    padding: 0.714286rem;

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      .title_text {
        flex-direction: column;
        .bankName {
          width: 100%;
          text-align: left;
          padding-bottom: 0.357143rem;
        }
      }
    }
    &:nth-child(1) {
      top: 0;
      .bankCardItem {
        background: linear-gradient(to right, #5087c8, #4363b8);
      }
    }
    &:nth-child(2) {
      top: 65px;
      .bankCardItem {
        background: linear-gradient(to right, #ff622d, #cc3300);
      }
    }
    &:nth-child(3) {
      top: 130px;
      .bankCardItem {
        background: linear-gradient(to right, #99cc00, #7ca600);
      }
    }
  }
}
</style>
