<template>
  <div id="home">
    <!-- topbar -->
    <topbar />
    <scroll class="scroll-wrapper">
      <div>
        <!-- header -->
        <myHeader
          :isShow="isShow"
          @scanClick="scanClick"
          @goMission="goMission"
          @ReimbursementClick="ReimbursementClick"
          @goEarly="goEarly"
        />
        <!-- ability -->
        <Ability />
        <!-- reminder -->
        <reminder />
        <!-- echarts -->
        <myEcharts />
      </div>
    </scroll>
  </div>
</template>

<script>
import topbar from '@/views/home/children/topbar/topbar'
import myHeader from '@/views/home/children/myHeader/myHeader'
import Ability from '@/views/home/children/ability/Ability'
import myEcharts from '@/views/home/children/myEcharts/myEcharts'
import reminder from '@/views/home/children/reminder/reminder'
import scroll from '@/components/common/scroll/scroll'
import { getUserDesignatedTasks } from '@/network/home'

export default {
  name: 'Home',
  components: {
    topbar,
    myHeader,
    Ability,
    myEcharts,
    scroll,
    reminder
  },
  data() {
    return { isShow: false }
  },
  activated() {
    this.getUserDesignat()
  },
  deactivated() {
    this.isShow = false
  },
  computed: {
    getUserDesignatedTasksData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    goEarly() {
      this.$router.push('/early')
    },
    async getUserDesignat() {
      const { data } = await getUserDesignatedTasks(
        this.getUserDesignatedTasksData
      )
      data.designatedTasksList.map((item, index) => {
        if (item.user_status == 0) {
          this.isShow = true
        } else {
          this.isShow = false
        }
      })
    },
    scanClick() {
      this.$router.push('/scan')
    },
    goMission() {
      this.$router.push('/mission')
    },
    ReimbursementClick() {
      this.$router.push('/reimbursement')
    }
  },
  created() {
    console.log(this.$store.state.userInfo)
  }
}
</script>


<style lang="scss" scoped>
#home {
  background-color: #f5f5f5;
  height: calc(100vh - 9.642857rem);
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.214286rem;
    width: 100%;
    overflow: hidden;
  }
}
</style>