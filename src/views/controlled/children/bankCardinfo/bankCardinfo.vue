<template>
  <div class="bankCardinfo">
    <!-- banktitle -->
    <banktitle />
    <!-- bankCard -->
    <bankCard :cardinfo="cardinfo" />
  </div>
</template>
    
<script>
export default {
  components: {
    banktitle: () => import('@/views/controlled/children/banktitle/banktitle'),
    bankCard: () => import('@/views/controlled/children/bankCard/bankCard'),
  },
  data() {
    return {
      cardinfo: {},
    }
  },
  mounted() {
    this.cardinfo = this.$store.state.bankCardSinfo
  },
}
</script>
    
<style lang="scss" scoped>
.bankCardinfo {
  padding: 0.714286rem;
}
</style>
