<template>
  <div id="Mission">
    <mHeader />
    <!-- btns -->
    <cardbtns
      :designatedTasksList="designatedTasksList"
      :UserDesignatedTasksData="UserDesignatedTasksData"
      :Designated="Designated"
      @goDetails="goDetails"
      @loadMore="loadMore"
    />
    <i class="el-icon-plus" @click="tike"></i>
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
  },
  deactivated() {
    this.designatedTasksList = []
    this.UserDesignatedTasksData = []
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
    
<style lang="scss" scoped>
#Mission {
  padding-top: 5.428571rem;
  .el-icon-plus {
    position: fixed;
    bottom: 4.142857rem;
    right: 3.357143rem;
    padding: 0.571429rem;
    z-index: 999;
    font-size: 2.714286rem;
    background-color: #2a7bd0;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
