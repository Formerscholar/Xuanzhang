<template>
  <div class="selection wrapper" ref="wrapper">
    <ul class="list text-white" ref="list">
      <li v-for="(item) in selectionList" class="mui-control-item" :key="item.id">
        <img v-if="item.img_url && item.img_url != 0 " class="img" :src="item.img_url | getUrl" />
        <img
          v-else-if="item.img_url_lin && item.img_url_lin != 0 "
          class="img"
          :src="item.img_url_lin  | getUrl"
        />
        <img src="@/assets/image/Default.png" class="img" v-else />
        <!-- <div v-else class="img"></div> -->
        <div class="text">{{item.product_name || item.materiel_name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { bestURL, crosURl } from '@/network/baseURL'

export default {
  name: 'selection',
  props: {
    selectionList: {
      type: Array,
      default: [],
    },
  },
  components: { BScroll },
  created() {
    this.$nextTick(() => {
      this._initPics()
    })
  },
  filters: {
    getUrl(value) {
      if (value.indexOf(bestURL) == -1) {
        return bestURL + value
      } else {
        return value
      }
    },
  },
  methods: {
    _initPics() {
      let itemWidth = 65
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
      width: 4.642857rem;
      overflow: hidden;
      .img {
        width: 100%;
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
        color: #ccc;
        font-size: 0.857143rem;
      }
    }
  }
}
</style>
