<template>
  <div id="Controlled">
    <!-- navbar -->
    <conNavbar />
    <!-- bankCardinfo -->
    <bankCardinfo />
    <!-- cardCollection -->
    <cardCollection :cardCollInfos="cardCollInfos" />
  </div>
</template>
    
<script>
import conNavbar from '@/views/controlled/children/con_navbar/con_navbar'
import bankCardinfo from '@/views/controlled/children/bankCardinfo/bankCardinfo'
import cardCollection from '@/views/controlled/children/cardCollection/cardCollection'
import { getUserIndex } from '@/network/home'

export default {
  name: 'Controlled',
  data() {
    return {
      cardCollInfos: [
        {
          bankName: '中国农业银行瘦西湖支行',
          phone: '6228450440049318516',
          Balance: '66666.66',
        },
        {
          bankName: '中国工商银行宏达支行',
          phone: '6228450440049318516',
          Balance: '66666.66',
        },
        {
          bankName: '扬州农村商业银行江阳支行',
          phone: '6228450440049318516',
          Balance: '63552.00',
        },
      ],
    }
  },
  components: {
    conNavbar,
    bankCardinfo,
    cardCollection,
  },
  created() {
    this.getIndexData()
  },
  methods: {
    async getIndexData() {
      const { data } = await getUserIndex(this.$store.state.token)
      console.log(data)
    },
  },

}
</script>
    
<style lang="scss" scoped>
#Controlled {
  padding-top: 5.428571rem;
  height: 100vh;
}
</style>
