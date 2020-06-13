<template>
  <div id="Mission">
    <mHeader @tike="tike" />
    <!-- btns -->
    <cardbtns
      :designatedTasksList="designatedTasksList"
      :UserDesignatedTasksData="UserDesignatedTasksData"
      :Designated="Designated"
      @goDetails="goDetails"
      @loadMore="loadMore"
    />
  </div>
</template>
    
<script>
import mHeader from '@/views/home/children/Mission/children/mHeader/mHeader'
import cardbtns from '@/views/home/children/Mission/children/cardbtns/cardbtns'

import {
  getUserDesignatedTasks,
  getDesignatedTasks,
  getCompleteDesignatedTasks
} from '@/network/home'
export default {
  name: 'Mission',
  components: {
    mHeader,
    cardbtns
  },
  data() {
    return {
      designatedTasksList: [],
      UserDesignatedTasksData: [],
      Designated: [],
      itempages: 1,
      succpages: 1,
      partici: 1,
      allpage: 1
    }
  },
  created() {},
  computed: {
    getUserDesignatedTasksData() {
      return {
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        _: new Date().getTime()
      }
    }
  },
  activated() {
    this.succpages = 1
    this.itempages = 1
    this.allpage = 1
    this.getCompleteDesignated()
    this.getDesignated()
    this.getUserDesignat()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    this.designatedTasksList = []
    this.UserDesignatedTasksData = []
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  destroyed() {
    this.getUserDesignatedTasksData = {}
  },
  methods: {
    loadMore(str) {
      console.log('加载更多', str)
      switch (str) {
        case 'particiType':
          this.allpage = ++this.partici
          this.getUserDesignat()
          break
        case 'SuccessType':
          this.allpage = ++this.succpages
          this.getCompleteDesignated()
          break
        case 'ListType':
          this.allpage = ++this.itempages
          this.getDesignated()
          break
        default:
          break
      }
    },
    goDetails(id) {
      this.$store.commit('setDetailsData', id)
      this.$router.push('/details')
    },
    async getUserDesignat() {
      const { data } = await getUserDesignatedTasks(
        this.getUserDesignatedTasksData
      )
      data.designatedTasksList.map(item => {
        this.designatedTasksList.push(item)
      })
      console.log('designatedTasksList', this.designatedTasksList)
    },
    async getCompleteDesignated() {
      const { data } = await getCompleteDesignatedTasks(
        this.getUserDesignatedTasksData
      )
      data.designatedTasksList.map(item => {
        this.UserDesignatedTasksData.push(item)
      })
      console.log('UserDesignatedTasks', this.UserDesignatedTasksData)
    },
    async getDesignated() {
      const { data } = await getDesignatedTasks(this.getUserDesignatedTasksData)
      data.designatedTasksList.map(item => {
        this.Designated.push(item)
      })
      console.log('Designated', this.Designated)
    },
    async tike() {
      this.$router.push('/newtask')
    }
  }
}
</script>
    
<style lang="scss">
#Mission {
  padding-top: 5.428571rem;
}
</style>
