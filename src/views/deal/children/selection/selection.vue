<template>
  <div class="selection wrapper bg-primary my_header" ref="wrapper">
    <ul class="list text-white" ref="list">
      <!-- mui-control-item mui-active -->
      <li
        v-for="(item,index) in selectionList"
        class="mui-control-item"
        :class="{mui_active:index == currentIndex}"
        :key="item.id"
        @click="selectionClick(item.id,index)"
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
    return {
      currentIndex: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initPics()
    })
  },
  methods: {
    selectionClick(i, index) {
      this.currentIndex = index
      this.$emit('selectionClick', {
        i,
        index
      })
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
    .mui_active {
      border-bottom: 2px solid #fff;
    }
  }
}
</style>
