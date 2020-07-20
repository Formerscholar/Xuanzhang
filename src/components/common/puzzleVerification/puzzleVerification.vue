<template>
  <div class="puzzle-container">
    <div class="puzzle-header">
      <span class="puzzle-header-left">拖动下方滑块完成拼图</span>
      <div>
        <span class="re-btn iconfont icon-shuaxinzhongjieban" @click.stop="refreshImg"></span>
        <!-- <span class="close-btn iconfont icon-guanbi" @click="closeVerificationBox"></span> -->
      </div>
    </div>
    <div :style="'position:relative;overflow:hidden;width:'+ dataWidth +'px;'">
      <div :style="'position:relative;width:' + dataWidth + 'px;height:' + dataHeight + 'px;'">
        <img
          id="scream"
          ref="scream"
          :src="imgRandom"
          :style="'width:' + dataWidth + 'px;height:' + dataHeight + 'px;'"
        />
        <canvas id="puzzle-box" ref="puzzleBox" :width="dataWidth" :height="dataHeight"></canvas>
      </div>
      <div
        class="puzzle-lost-box"
        :style="'left:' + left_Num + 'px;width:' + dataWidth + 'px;height:' + dataHeight + 'px;'"
      >
        <canvas id="puzzle-shadow" ref="puzzleShadow" :width="dataWidth" :height="dataHeight"></canvas>
        <canvas id="puzzle-lost" ref="puzzleLost" :width="dataWidth" :height="dataHeight"></canvas>
      </div>
      <p :class="'ver-tips'+ (displayTips ? ' slider-tips' : '')" ref="verTips">
        <template v-if="verification">
          <i style="background-position:-4px -1207px;"></i>
          <span style="color:#42ca6b;">验证通过</span>
          <span></span>
        </template>
        <template v-if="!verification">
          <i style="background-position:-4px -1229px;"></i>
          <span style="color:red;">验证失败:</span>
          <span style="margin-left:4px;">拖动滑块将悬浮图像正确拼合</span>
        </template>
      </p>
    </div>

    <div class="slider-container" :style="'width:' + dataWidth + 'px;'">
      <div class="slider-bar"></div>
      <div
        class="slider-btn"
        ref="sliderBtn"
        @mousedown.stop="startMove"
        @touchstart.stop="startMove"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'puzzleVerification',
  data() {
    return {
      moveStart: '',
      displayTips: false,
      verification: false,
      randomX: null,
      randomY: null,
      imgRandom: '',
      left_Num: 0,
      dataWidth: null,
      dataHeight: null,
      puzzleSize: null, // 滑块的大小
      deviationValue: null,
      radius: null,
      padding: null
    }
  },
  model: {
    prop: 'verificationShow',
    event: 'setVisible'
  },
  watch: {
    isVerificationShow(val) {
      this.$emit('setVisible', val)
    },
    verificationShow(val) {
      this.isVerificationShow = val
    }
  },
  props: {
    // 画布图片的尺寸
    width: {
      type: [String, Number],
      default: 260
    },
    height: {
      type: [String, Number],
      default: 120
    },
    // 图集
    puzzleImgList: {
      type: Array,
      default: () => [
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591781429895&di=9fe848f511557c73be86a4dd941b494f&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa2cc7cd98d1001e9b0d7d104ba0e7bec55e797d6.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591781429895&di=b0b08fd0794f577c44900630a4b8ff6d&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Ffc1f4134970a304eb048b46ad1c8a786c9175c33.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591781429894&di=97516c05ec443bed6cf3db39f07c0924&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201303%2F13%2F174429b5wzavjztjr9tntt.jpg'
      ]
    },
    // 滑块的大小
    blockSize: {
      type: [String, Number],
      default: 40
    },
    // 误差
    deviation: {
      type: [String, Number],
      default: 4
    },
    // 滑块的圆角大小
    blockRadius: {
      type: [String, Number],
      default: 4
    },
    // 滑块随机出现的范围
    wraperPadding: {
      type: [String, Number],
      default: 20
    },
    // 滑块形状 square  puzzle
    blockType: {
      type: String,
      default: 'square'
    },
    // 成功的回调
    onSuccess: {
      type: Function,
      default: () => {}
    },
    // 失败的回调
    onError: {
      type: Function,
      default: () => {
        console.log('失败')
      }
    },
    verificationShow: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initCanvas()
    })
  },
  created() {
    // 随机显示一张图片
    let imgRandomIndex = Math.round(
      Math.random() * (this.puzzleImgList.length - 1)
    )
    this.imgRandom = this.puzzleImgList[imgRandomIndex]

    this.puzzleSize = Number(this.blockSize)
    this.deviationValue = Number(this.deviation)
    this.radius = Number(this.blockRadius)
    this.dataWidth = Number(this.width)
    this.dataHeight = Number(this.height)
    this.padding = Number(this.wraperPadding)
  },
  methods: {
    /* 关闭验证 */
    closeVerificationBox() {
      this.isVerificationShow = false
    },
    /* 刷新 */
    refreshImg() {
      let imgRandomIndex = Math.round(
        Math.random() * (this.puzzleImgList.length - 1)
      )
      this.imgRandom = this.puzzleImgList[imgRandomIndex]
      this.initCanvas()
    },
    /* 画布初始化 */
    initCanvas() {
      this.clearCanvas()
      let w = this.dataWidth
      let h = this.dataHeight
      let PL_Size = this.puzzleSize
      let padding = this.padding
      let MinN_X = padding + PL_Size
      let MaxN_X = w - padding - PL_Size - PL_Size / 6
      let MaxN_Y = padding
      let MinN_Y = h - padding - PL_Size - PL_Size / 6
      this.randomX = Math.round(Math.random() * (MaxN_X - PL_Size) + MinN_X)
      this.randomY = Math.round(Math.random() * MaxN_Y + MinN_Y)
      let X = this.randomX
      let Y = this.randomY
      this.left_Num = -X + 10
      let d = PL_Size / 3
      let radius = Number(this.radius)

      let c = this.$refs.puzzleBox
      let c_l = this.$refs.puzzleLost
      let c_s = this.$refs.puzzleShadow
      let ctx = c.getContext('2d')
      let ctx_l = c_l.getContext('2d')
      let ctx_s = c_s.getContext('2d')
      ctx.globalCompositeOperation = 'xor'
      ctx.shadowBlur = 10
      ctx.shadowColor = '#fff'
      ctx.shadowOffsetX = 3
      ctx.shadowOffsetY = 3
      ctx.fillStyle = 'rgba(0,0,0,0.7)'
      ctx.beginPath()
      ctx.lineWidth = '1'
      ctx.strokeStyle = 'rgba(0,0,0,0)'
      if (this.blockType === 'square') {
        ctx.arc(X + radius, Y + radius, radius, Math.PI, (Math.PI * 3) / 2)
        ctx.lineTo(PL_Size - radius + X, Y)
        ctx.arc(
          PL_Size - radius + X,
          radius + Y,
          radius,
          (Math.PI * 3) / 2,
          Math.PI * 2
        )
        ctx.lineTo(PL_Size + X, PL_Size + Y - radius)
        ctx.arc(
          PL_Size - radius + X,
          PL_Size - radius + Y,
          radius,
          0,
          (Math.PI * 1) / 2
        )
        ctx.lineTo(radius + X, PL_Size + Y)
        ctx.arc(
          radius + X,
          PL_Size - radius + Y,
          radius,
          (Math.PI * 1) / 2,
          Math.PI
        )
      } else {
        ctx.moveTo(X, Y)
        ctx.lineTo(X + d, Y)
        ctx.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
        ctx.lineTo(X + 3 * d, Y)
        ctx.lineTo(X + 3 * d, Y + d)
        ctx.bezierCurveTo(
          X + 2 * d,
          Y + d,
          X + 2 * d,
          Y + 2 * d,
          X + 3 * d,
          Y + 2 * d
        )
        ctx.lineTo(X + 3 * d, Y + 3 * d)
        ctx.lineTo(X, Y + 3 * d)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.fill()

      let img = new Image()
      img.src = this.imgRandom

      img.onload = function() {
        ctx_l.drawImage(img, 0, 0, w, h)
      }
      ctx_l.beginPath()
      ctx_l.strokeStyle = 'rgba(0,0,0,0)'
      if (this.blockType === 'square') {
        ctx_l.arc(X + radius, Y + radius, radius, Math.PI, (Math.PI * 3) / 2)
        ctx_l.lineTo(PL_Size - radius + X, Y)
        ctx_l.arc(
          PL_Size - radius + X,
          radius + Y,
          radius,
          (Math.PI * 3) / 2,
          Math.PI * 2
        )
        ctx_l.lineTo(PL_Size + X, PL_Size + Y - radius)
        ctx_l.arc(
          PL_Size - radius + X,
          PL_Size - radius + Y,
          radius,
          0,
          (Math.PI * 1) / 2
        )
        ctx_l.lineTo(radius + X, PL_Size + Y)
        ctx_l.arc(
          radius + X,
          PL_Size - radius + Y,
          radius,
          (Math.PI * 1) / 2,
          Math.PI
        )
      } else {
        ctx_l.moveTo(X, Y)
        ctx_l.lineTo(X + d, Y)
        ctx_l.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
        ctx_l.lineTo(X + 3 * d, Y)
        ctx_l.lineTo(X + 3 * d, Y + d)
        ctx_l.bezierCurveTo(
          X + 2 * d,
          Y + d,
          X + 2 * d,
          Y + 2 * d,
          X + 3 * d,
          Y + 2 * d
        )
        ctx_l.lineTo(X + 3 * d, Y + 3 * d)
        ctx_l.lineTo(X, Y + 3 * d)
      }
      ctx_l.closePath()
      ctx_l.stroke()
      ctx_l.shadowBlur = 10
      ctx_l.shadowColor = 'black'
      ctx_l.clip()
      ctx_s.beginPath()
      ctx_s.lineWidth = '1'
      ctx_s.strokeStyle = 'rgba(0,0,0,0)'
      if (this.blockType === 'square') {
        ctx_s.arc(X + radius, Y + radius, radius, Math.PI, (Math.PI * 3) / 2)
        ctx_s.lineTo(PL_Size - radius + X, Y)
        ctx_s.arc(
          PL_Size - radius + X,
          radius + Y,
          radius,
          (Math.PI * 3) / 2,
          Math.PI * 2
        )
        ctx_s.lineTo(PL_Size + X, PL_Size + Y - radius)
        ctx_s.arc(
          PL_Size - radius + X,
          PL_Size - radius + Y,
          radius,
          0,
          (Math.PI * 1) / 2
        )
        ctx_s.lineTo(radius + X, PL_Size + Y)
        ctx_s.arc(
          radius + X,
          PL_Size - radius + Y,
          radius,
          (Math.PI * 1) / 2,
          Math.PI
        )
      } else {
        ctx_s.moveTo(X, Y)
        ctx_s.lineTo(X + d, Y)
        ctx_s.bezierCurveTo(X + d, Y - d, X + 2 * d, Y - d, X + 2 * d, Y)
        ctx_s.lineTo(X + 3 * d, Y)
        ctx_s.lineTo(X + 3 * d, Y + d)
        ctx_s.bezierCurveTo(
          X + 2 * d,
          Y + d,
          X + 2 * d,
          Y + 2 * d,
          X + 3 * d,
          Y + 2 * d
        )
        ctx_s.lineTo(X + 3 * d, Y + 3 * d)
        ctx_s.lineTo(X, Y + 3 * d)
      }
      ctx_s.closePath()
      ctx_s.stroke()
      ctx_s.shadowBlur = 20
      ctx_s.shadowColor = 'black'
      ctx_s.fill()
    },
    /* 通过重置画布尺寸清空画布，这种方式更彻底 */
    clearCanvas() {
      let c = this.$refs.puzzleBox
      let c_l = this.$refs.puzzleLost
      let c_s = this.$refs.puzzleShadow
      c.setAttribute('height', c.getAttribute('height'))
      c_l.setAttribute('height', c.getAttribute('height'))
      c_s.setAttribute('height', c.getAttribute('height'))
    },
    /* 按住滑块后初始化移动监听，记录初始位置 */
    startMove(e) {
      // console.log(e);
      e = e || window.event
      this.$refs.sliderBtn.style.backgroundPosition = '0 -15.428571rem'
      this.moveStart = e.pageX || e.targetTouches[0].pageX
      this.addMouseMoveListener()
    },
    /* 滑块移动 */
    moving(e) {
      let self = this
      e = e || window.event
      let moveX = e.pageX || e.targetTouches[0].pageX
      let d = moveX - self.moveStart
      let w = self.dataWidth
      let PL_Size = this.puzzleSize
      let padding = this.padding
      if (self.moveStart === '') {
        return ''
      }
      if (d < 0 || d > w - padding - PL_Size) {
        return ''
      }
      self.$refs.sliderBtn.style.left = d + 'px'
      self.$refs.sliderBtn.style.transition = 'inherit'
      self.$refs.puzzleLost.style.left = d + 'px'
      self.$refs.puzzleLost.style.transition = 'inherit'
      self.$refs.puzzleShadow.style.left = d + 'px'
      self.$refs.puzzleShadow.style.transition = 'inherit'
    },
    /* 移动结束，验证并回调 */
    moveEnd(e) {
      let self = this
      e = e || window.event
      let moveEnd_X = (e.pageX || e.changedTouches[0].pageX) - self.moveStart
      let ver_Num = self.randomX - 10
      let deviationValue = this.deviationValue
      let Min_left = ver_Num - deviationValue
      let Max_left = ver_Num + deviationValue
      if (self.moveStart !== '') {
        if (Max_left > moveEnd_X && moveEnd_X > Min_left) {
          self.displayTips = true
          self.verification = true
          setTimeout(function() {
            self.displayTips = false
            self.initCanvas()
            /* 成功的回调函数 */
            self.onSuccess()
          }, 500)
        } else {
          self.displayTips = true
          self.verification = false
          setTimeout(function() {
            self.displayTips = false
            self.initCanvas()
            /* 失败的回调函数 */
            self.onError()
          }, 800)
        }
      }
      if (
        typeof self.$refs.sliderBtn !== 'undefined' &&
        typeof self.$refs.puzzleLost !== 'undefined' &&
        typeof self.$refs.puzzleShadow !== 'undefined'
      ) {
        setTimeout(function() {
          self.$refs.sliderBtn.style.left = 0
          self.$refs.sliderBtn.style.transition = 'left 0.5s'
          self.$refs.puzzleLost.style.left = 0
          self.$refs.puzzleLost.style.transition = 'left 0.5s'
          self.$refs.puzzleShadow.style.left = 0
          self.$refs.puzzleShadow.style.transition = 'left 0.5s'
        }, 400)
        self.$refs.sliderBtn.style.backgroundPosition = '0 -84px'
      }
      self.moveStart = ''
    },
    /* 全局绑定滑块移动与滑动结束，移动过程中鼠标可在页面任何位置 */
    addMouseMoveListener() {
      let self = this
      document.addEventListener('mousemove', self.moving)
      document.addEventListener('touchmove', self.moving)
      document.addEventListener('mouseup', self.moveEnd)
      document.addEventListener('touchend', self.moveEnd)
      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('mousemove', self.moving)
        document.removeEventListener('touchmove', self.moving)
        document.removeEventListener('mouseup', self.moveEnd)
        document.removeEventListener('touchend', self.moveEnd)
      })
    }
  }
}
</script>

<style scoped>
.slider-btn {
  position: absolute;
  width: 3.142857rem;
  height: 3.142857rem;
  left: 0;
  top: -0.5rem;
  z-index: 12;
  cursor: pointer;
  background-image: url('../../../assets/image/sprite.3.2.0.png');
  background-position: 0 -6rem;
  transition: inherit;
}

.ver-tips {
  position: absolute;
  left: 0;
  bottom: -1.571429rem;
  background: rgba(255, 255, 255, 0.9);
  height: 1.571429rem;
  line-height: 1.571429rem;
  font-size: 0.857143rem;
  width: 100%;
  margin: 0;
  text-align: left;
  padding: 0 0.571429rem;
  transition: all 0.4s;
}

.slider-tips {
  bottom: 0;
}

.ver-tips i {
  display: inline-block;
  width: 1.571429rem;
  height: 1.571429rem;
  vertical-align: top;
  background-image: url('../../../assets/image/sprite.3.2.0.png');
  background-position: -0.285714rem -87.785714rem;
}

.ver-tips span {
  display: inline-block;
  vertical-align: top;
  line-height: 1.571429rem;
  color: #455;
}

.active-tips {
  display: block;
}

.hidden {
  display: none;
}

.puzzle-container {
  position: relative;
  display: inline-block;
  padding: 1.071429rem 1.071429rem 2rem;
  border: 1px solid #ddd;
  background: #ffffff;
  border-radius: 1.142857rem;
}

.puzzle-header {
  display: flex;
  justify-content: space-between;
  margin: 0.357143rem 0;
}

.puzzle-header-left {
  color: #333;
}

.re-btn,
.close-btn {
  font-size: 1.142857rem;
  cursor: pointer;
  color: #666;
}

.re-btn:hover {
  color: #67c23a;
}

.close-btn:hover {
  color: #f56c6c;
}

.close-btn {
  margin-left: 0.357143rem;
}

.slider-container {
  position: relative;
  margin: 0.714286rem auto 0;
  min-height: 1.071429rem;
}

.slider-bar {
  height: 0.714286rem;
  border: 1px solid #c3c3c3;
  border-radius: 0.357143rem;
  background: #e4e4e4;
  box-shadow: 0 1px 1px rgba(12, 10, 10, 0.2) inset;
  position: absolute;
  width: 100%;
  top: 0.5rem;
}

#puzzle-box {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 22;
}

#puzzle-shadow {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 22;
}

#puzzle-lost {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 33;
}

.puzzle-lost-box {
  position: absolute;
  width: 18.571429rem;
  height: 8.285714rem;
  left: 0;
  top: 0;
  z-index: 111;
}
</style>