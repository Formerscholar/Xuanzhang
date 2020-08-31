<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <van-loading
        class="load"
        type="spinner"
        vertical
        color="#4293c8"
        style="padding: 0.357143rem 0;"
      >松开刷新</van-loading>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { throttle } from '@/common/utils'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    }
  },
  activated() {
    this.newScroll()
  },
  methods: {
    newScroll() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
      })
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          if (position.y > 50) {
            throttle(() => {
              this.$emit('scroll', position)
              setTimeout(() => {
                this.refresh()
              }, 500)
            }, 500)
          }
        })
      }
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          throttle(() => {
            this.$emit('pullingUp')
            setTimeout(() => {
              this.finishPullUp()
              this.refresh()
            }, 500)
          }, 500)
        })
      }
    },
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    },
  },
}
</script>

<style scoped lang="scss">
.content {
  min-height: calc(100vh + 1px);
  position: relative;
  .load {
    position: absolute;
    top: -4.928571rem;
    left: 0;
    right: 0;
  }
}
</style>
