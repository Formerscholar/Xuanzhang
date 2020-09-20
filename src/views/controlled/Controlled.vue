<template>
  <div id="Controlled">
    <conNavbar />
    <bankCardinfo />
    <cardCollection :cardCollInfos="cardCollInfos" />
  </div>
</template>

<script>
import { getUserIndex } from '@/network/home'

export default {
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
    conNavbar: () =>
      import('@/views/controlled/children/con_navbar/con_navbar'),
    bankCardinfo: () =>
      import('@/views/controlled/children/bankCardinfo/bankCardinfo'),
    cardCollection: () =>
      import('@/views/controlled/children/cardCollection/cardCollection'),
  },
  created() {
    this.getIndexData()
  },
  methods: {
    async getIndexData() {
      const { data } = await getUserIndex(this.$store.state.token)
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
