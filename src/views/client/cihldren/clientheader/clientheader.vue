<template>
  <div id="clientheader">
    <navbar class="p_root_box">
      <div slot="left"></div>
      <div slot="center">
        <span>客户</span>
      </div>
      <div slot="right"></div>
    </navbar>
  </div>
</template>
    
<script>
import navbar from '@/components/common/navbar/NavBar'

export default {
  name: 'clientheader',
  components: { navbar },
  props:{
    
  }
}
</script>
    
<style scoped lang="scss">
#clientheader {
  .p_root_box {
      span {
        font-size: 1.571429rem;
    }
  }
}
</style>
