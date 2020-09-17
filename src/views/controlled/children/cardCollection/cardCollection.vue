<template>
  <div class="cardCollection">
    <!-- bankCard -->
    <div v-for="(item,index) in cardCollInfos" :key="index" class="card_content">
      <bankCard :cardinfo="item" />
    </div>
  </div>
</template>
    
<script>
export default {
  components: {
    bankCard: () => import('@/views/controlled/children/bankCard/bankCard'),
  },
  props: {
    cardCollInfos: {
      type: Array,
      default: [],
    },
  },
}
</script>
    
<style lang="scss" scoped>
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

    &:nth-child(1) {
      top: 0;
      /deep/.bankCardItem {
        background: linear-gradient(to right, #5087c8, #4363b8);
      }
    }
    &:nth-child(2) {
      top: 4.642857rem;
      /deep/.bankCardItem {
        background: linear-gradient(to right, #ff622d, #cc3300);
      }
    }
    &:nth-child(3) {
      top: 9.285714rem;
      /deep/.bankCardItem {
        background: linear-gradient(to right, #99cc00, #7ca600);
      }
    }
  }
}
</style>
