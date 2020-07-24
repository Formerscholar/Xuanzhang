<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive" :style="activeStyle">
      <slot name="item-icon"></slot>
    </div>
    <div v-else :style="activeStyle">
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#e93b3d',
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive
        ? {
            color: this.activeColor,
          }
        : {}
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    },
  },
}
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 59px;
}

.tab-bar-item i {
  margin-top: 0.714286rem;
  vertical-align: middle;
  margin-bottom: 0.142857rem;
}
</style>
