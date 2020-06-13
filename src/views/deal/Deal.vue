<template>
  <div id="deal">
    <!-- selection -->
    <selection :selectionList="selectionList" @selectionClick="selectionClick" />
    <!-- goods -->
    <transition name="van-fade">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import selection from '@/views/deal/children/selection/selection'
import { getleft } from '@/network/deal'

export default {
  name: 'Deal',
  data() {
    return {
      selectionList: []
    }
  },
  components: {
    selection
  },
  activated() {
    this.getleftlist()
  },
  deactivated() {
    this.selectionList = []
  },
  computed: {
    getleftData() {
      return {
        token: this.$store.state.token,
        left: 14
      }
    }
  },
  methods: {
    async getleftlist() {
      const { data } = await getleft(this.getleftData)
      console.log('getleftlist', data)
      data.map((item, index) => {
        let obj = {
          id: item.id,
          title: item.title
        }
        this.selectionList.push(obj)
      })
      this.selectionClick(this.selectionList[0].id)
    },
    selectionClick(i) {
      switch (i) {
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
    }
  }
}
</script>

<style lang="scss">
#deal {
  background-color: #f5f5f5;
  padding-top: 1rem;
}
</style>