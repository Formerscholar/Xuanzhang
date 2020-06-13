<template>
  <div id="Operation">
    <!-- topbar -->
    <o-topbar />
    <!-- header -->
    <oHeader />
   
  </div>
</template>

<script>
import oTopbar from '@/views/operation/children/oTopbar/oTopbar'
import oHeader from '@/views/operation/children/oHeader/oHeader'



export default {
  name: 'Operation',
  components: {
    
    oTopbar,
    oHeader
  }
}
</script>

<style lang="scss">
#Operation {
  padding-top: 1rem;
}
</style>