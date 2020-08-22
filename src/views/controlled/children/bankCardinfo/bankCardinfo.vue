<template>
  <div class="bankCardinfo">
    <!-- banktitle -->
    <banktitle />
    <!-- bankCard -->
    <bankCard :cardinfo="cardinfo" />
  </div>
</template>
    
<script>
import banktitle from '@/views/controlled/children/banktitle/banktitle'
import bankCard from '@/views/controlled/children/bankCard/bankCard'
export default {
  name: 'bankCardinfo',
  components: {},
  components: {
    banktitle,
    bankCard,
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
