<template>
  <div class="selection wrapper bg-primary my_header" ref="wrapper">
    <ul class="list text-white" ref="list">
      <li
        class="mui-control-item mui-active"
        v-for="item in selectionList"
        :key="item.id"
        @click="selectionClick(item.id)"
      >{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'selection',
  props: {
    selectionList: {
      type: Array,
      default: []
    }
  },
  components: {},
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      this._initPics()
    })
  },
  methods: {
    selectionClick(i) {
      this.$emit('selectionClick', i)
    },
    _initPics() {
      let itemWidth = 90
      let margin = 6
      let width = (itemWidth + margin) * 6 - margin
      console.log(width)
      this.$refs.list.style.width = width + 'px'
      this.$nextTick(() => {
        if (!this.picScroll) {
          this.picScroll = new BScroll(this.$refs.wrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        } else {
          this.picScroll.refresh()
        }
      })
    }
  }
}
</script>
    
<style lang="scss">
.wrapper {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  position: fixed;
  top: 0;
  .list {
    display: flex;
    padding: 0 1.285714rem;
    .mui-control-item {
      margin-right: 1.285714rem;
      line-height: 2.857143rem;
      font-size: 1rem;
    }
  }
}
</style>
