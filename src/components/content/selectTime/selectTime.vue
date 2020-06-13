<template>
  <div id="selectTime">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>选择时间</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="请选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirmClick"
      @cancel="cancelClick"
    />
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'
import { setTimerType } from '@/common/utils.js'

export default {
  name: 'selectTime',
  data() {
    return {
      type: '',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date()
    }
  },
  components: {
    navbar
  },
  activated() {
    this.type = this.$route.params.type
    console.log(this.type)
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
    document.querySelector('textarea').style.border = 'none'
  },
  deactivated() {
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  methods: {
    blacknext() {
      this.$router.go(-1)
    },
    confirmClick(value) {
      this.$store.commit('setNewTimers', {
        type: this.type,
        timers: setTimerType(value)
      })
      this.blacknext()
    },
    cancelClick() {
      this.blacknext()
    }
  }
}
</script>
    
<style scoped lang="scss">
#selectTime {
  padding-top: 5.428571rem;
  min-height: 100vh;
}
</style>
