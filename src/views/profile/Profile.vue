<template>
  <div id="Profile">
    <pNavBar />
    <pHeader @toProfileInfo="toProfileInfo" />
    <pOptions />
  </div>
</template>

<script>
import pNavBar from '@/views/profile/children/pNavBar/pNavBar'
import pHeader from '@/views/profile/children/pHeader/pHeader'
import pOptions from '@/views/profile/children/pOptions/pOptions'
export default {
  name: 'Profile',
  components: {
    pNavBar,
    pHeader,
    pOptions
  },
  methods: {
    toProfileInfo() {
      this.$router.push('/fileInfo')
    }
  },
  
}
</script>

<style lang="scss">
#Profile {
  margin-top: 14px;
}
</style>