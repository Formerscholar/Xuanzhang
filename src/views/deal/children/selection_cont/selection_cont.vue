<template>
  <div class="selection wrapper" ref="wrapper">
    <ul class="list text-white" ref="list">
      <!-- mui-control-item mui-active -->
      <li v-for="(item) in selectionList" class="mui-control-item" :key="item.id">
        <img v-if="item.img_url" class="img" :src="item.img_url" />
        <div v-else class="img"></div>
        <div class="text">{{item.product_name}}</div>
      </li>
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
      default: [],
    },
  },
  components: { BScroll },
  mounted() {
    this.$nextTick(() => {
      this._initPics()
    })
  },
  methods: {
    _initPics() {
      let itemWidth = 85
      let margin = 5
      let width = (itemWidth + margin) * this.selectionList.length - margin
      this.$refs.list.style.width = width + 'px'
      this.$nextTick(() => {
        if (!this.picScroll) {
          this.picScroll = new BScroll(this.$refs.wrapper, {
            scrollX: true,
            eventPassthrough: 'vertical',
          })
        } else {
          this.picScroll.refresh()
        }
      })
    },
  },
}
</script>
    
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;

  .list {
    display: flex;
    .mui-control-item {
      margin-right: 0.357143rem;
      .img {
        width: 4.642857rem;
        height: 4.642857rem;
        background-color: #ccc;
        border-radius: 0.357143rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        text-align: center;
        color: #818181;
        font-size: 0.857143rem;
      }
    }
  }
}
</style>
