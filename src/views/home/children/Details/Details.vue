<template>
  <div id="Details">
    <dpageheader class="toptext" />
    <dbody :iid="setdata" />
    <dsubmit :iid="setdata" />
  </div>
</template>
    
<script>
import dpageheader from '@/views/home/children/Details/children/dpageheader/dpageheader'
import dbody from '@/views/home/children/Details/children/dbody/dbody'
import dsubmit from '@/views/home/children/Details/children/dsubmit/dsubmit'

export default {
  name: 'Details',
  components: {
    dpageheader,
    dbody,
    dsubmit
  },
  data() {
    return {}
  },
  created() {},
  computed: {
    setdata() {
      return this.$store.state.detailsdata
    }
  },
  activated() {
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
  },
  methods: {},
  data() {
    return {
      activeName: '1'
    }
  }
}
</script>
    
<style lang="scss" scoped>
#Details {
  padding-top: 5.571429rem;
  padding-bottom: 1.571429rem;
  .toptext {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
}
</style>
