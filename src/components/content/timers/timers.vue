<template>
  <div id="timers">
    <van-field @click="toTimers(type)" :label="title" :value="valueData" readonly />
  </div>
</template>
    
<script>
import { setTimerType } from '@/common/utils.ts'

export default {
  name: 'timers',
  props: {
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    valueData: {
      type: String,
      default: setTimerType(new Date().getTime())
    }
  },
  methods: {
    toTimers(type) {
      this.$router.push(`/selectTime/${type}`)
    }
  }
}
</script>
    
<style scoped>
</style>
