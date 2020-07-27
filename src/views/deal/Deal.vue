<template>
  <div id="deal">
    <!-- selection -->
    <selection v-if="isShow" :selectionList="selectionList" @selectionClick="selectionClick" />
    <!-- goods -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <MainTabBar />
  </div>
</template>

<script>
import MainTabBar from '@/components/content/MainTabBar/MainTabBar'

import selection from '@/views/deal/children/selection/selection'
import { getleft } from '@/network/deal'

export default {
  name: 'Deal',
  data() {
    return {
      selectionList: [],
      seletIndex: 0,
      isRelocation: false,
      isShow: true,
    }
  },
  components: {
    selection,
    MainTabBar,
  },
  activated() {
    this.getleftlist()
  },
  watch: {
    $route(to, from) {
      const fromDepths = from.path
      const toDepths = to.path
      console.log(toDepths, fromDepths)
      if (fromDepths == '/deal' || toDepths == '/deal') {
        this.isRelocation = true
        this.isShow = false
      }
    },
  },
  updated() {
    if (this.isRelocation) {
      this.selectionClick({
        i: this.selectionList[0].id,
        index: 0,
      })
      this.isShow = true
      this.isRelocation = false
    }
  },
  deactivated() {
    this.selectionList = []
  },
  computed: {
    getleftData() {
      return {
        token: this.$store.state.token,
        left: 14,
      }
    },
  },
  methods: {
    async getleftlist() {
      const { data } = await getleft(this.getleftData)
      console.log('getleftlist', data)
      data.map((item, index) => {
        let obj = {
          id: item.id,
          title: item.title,
        }
        this.selectionList.push(obj)
      })
      this.selectionClick({
        i: this.selectionList[this.seletIndex].id,
        index: this.seletIndex,
      })
    },
    selectionClick(data) {
      this.seletIndex = data.index
      switch (data.i) {
        case '27':
          this.$router.replace('/deal/sales')
          break
        case '28':
          this.$router.replace('/deal/contract')
          break
        case '29':
          this.$router.replace('/deal/machin')
          break
        case '32':
          this.$router.replace('/deal/purchase')
          break
        case '69':
          this.$router.replace('/deal/aside')
          break
        case '31':
          this.$router.replace('/deal/outsourcing')
          break
        case '30':
          this.$router.replace('/deal/stock')
          break
        default:
          break
      }
    },
  },
}
</script>

<style lang="scss">
#deal {
  background-color: #f5f5f5;
  padding-top: 1rem;
}
</style>