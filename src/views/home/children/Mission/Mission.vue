<template>
  <div id="Mission">
    <mHeader />
    <cardbtns
      :designatedTasksList="designatedTasksList"
      :UserDesignatedTasksData="UserDesignatedTasksData"
      :Designated="Designated"
      :designatedTasksCount="designatedTasksCount"
      :UserDesignatedTasksCount="UserDesignatedTasksCount"
      :DesignatedCount="DesignatedCount"
      @goDetails="goDetails"
      @loadMore="loadMore"
      @clickScroll="clickScroll"
      @deletTasks="deletTasks"
    />
    <i class="el-icon-plus" @click="tike" v-if="istike"></i>
  </div>
</template>

<script>
import {
  getUserDesignatedTasks,
  getDesignatedTasks,
  getCompleteDesignatedTasks,
  deleteDesignatedTasks,
} from '@/network/home'
export default {
  components: {
    mHeader: () =>
      import('@/views/home/children/Mission/children/mHeader/mHeader'),
    cardbtns: () =>
      import('@/views/home/children/Mission/children/cardbtns/cardbtns'),
  },
  data() {
    return {
      designatedTasksList: [],
      UserDesignatedTasksData: [],
      Designated: [],
      itempages: 1,
      succpages: 1,
      partici: 1,
      allpage: 1,
      istike: true,
      designatedTasksCount: 0,
      UserDesignatedTasksCount: 0,
      DesignatedCount: 0,
    }
  },
  computed: {
    getUserDesignatedTasksData() {
      return {
        token: this.$store.state.token,
        page: this.allpage,
        offset: 20,
        _: new Date().getTime(),
      }
    },
  },
  created() {
    this.succpages = 1
    this.itempages = 1
    this.allpage = 1
    this.getCompleteDesignated()
    this.getDesignated()
    this.getUserDesignat()
  },
  destroyed() {
    this.designatedTasksList = []
    this.UserDesignatedTasksData = []
    this.Designated = []
    this.getUserDesignatedTasksData = {}
  },
  activated() {
    this.$Jurisdiction('24', localStorage.getItem('catearr'), () => {
      this.$router.replace('/home')
      this.$toast('您的账号无该模块权限!')
    })
    this.$Jurisdiction('116', localStorage.getItem('oparr'), () => {
      this.istike = false
    })
  },
  methods: {
    async deletTasks(iid) {
      const { code, msg } = await deleteDesignatedTasks({
        token: this.$store.state.token,
        id: iid,
      })
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.designatedTasksList = []
        this.getUserDesignat()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    loadMore(str) {
      switch (str) {
        case 'participate':
          this.allpage = ++this.partici
          this.getUserDesignat()
          break
        case 'success':
          this.allpage = ++this.succpages
          this.getCompleteDesignated()
          break
        case 'list':
          this.allpage = ++this.itempages
          this.getDesignated()
          break
        default:
          break
      }
    },
    clickScroll(str) {
      switch (str) {
        case 'participate':
          this.partici = 1
          this.allpage = this.partici
          this.designatedTasksList = []
          this.getUserDesignat()
          break
        case 'success':
          this.succpages = 1
          this.allpage = this.succpages
          this.UserDesignatedTasksData = []
          this.getCompleteDesignated()
          break
        case 'list':
          this.itempages = 1
          this.allpage = this.itempages
          this.Designated = []
          this.getDesignated()
          break
        default:
          break
      }
    },
    goDetails(id) {
      this.$router.push(`/details/${id}`)
    },
    async getUserDesignat() {
      const { data } = await getUserDesignatedTasks(
        this.getUserDesignatedTasksData
      )
      this.UserDesignatedTasksCount = data.count
      this.designatedTasksList = [
        ...this.designatedTasksList,
        ...data.designatedTasksList,
      ]
    },
    async getCompleteDesignated() {
      const { data } = await getCompleteDesignatedTasks(
        this.getUserDesignatedTasksData
      )
      this.designatedTasksCount = data.count
      this.UserDesignatedTasksData = [
        ...this.UserDesignatedTasksData,
        ...data.designatedTasksList,
      ]
    },
    async getDesignated() {
      const { data } = await getDesignatedTasks(this.getUserDesignatedTasksData)
      this.DesignatedCount = data.count
      this.Designated = [...this.Designated, ...data.designatedTasksList]
    },
    async tike() {
      this.$router.push('/newtask')
    },
  },
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
    background-color: rgb(66, 147, 200);
    color: #fff;
    border-radius: 50%;
  }
}
</style>
