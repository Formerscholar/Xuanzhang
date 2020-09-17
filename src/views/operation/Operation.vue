<template>
  <div id="Operation">
    <!-- topbar -->
    <o-topbar />
    <!-- header -->
    <oHeader />
  </div>
</template>

<script>
const oTopbar = () => import('@/views/operation/children/oTopbar/oTopbar')
const oHeader = () => import('@/views/operation/children/oHeader/oHeader')

export default {
  name: 'Operation',
  components: {
    oTopbar,
    oHeader,
  },
}
</script>

<style lang="scss">
#Operation {
  padding-top: 1rem;
}
</style>