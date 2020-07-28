<template>
  <div class="scan">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <i class="el-icon-back"></i>
      </div>
      <div class="center" slot="center">
        <span>扫一扫</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div id="bcid">
      <div style="height:40%"></div>
      <p class="tip">...载入中...</p>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
let scan = null

export default {
  data() {
    return {
      codeUrl: '',
      filter: [
        plus.barcode.QR,
        plus.barcode.AZTEC,
        plus.barcode.DATAMATRIX,
        plus.barcode.MAXICODE,
        plus.barcode.PDF417,
      ],
      styles: { frameColor: '#2a88ff', scanbarColor: '#2a88ff' },
    }
  },
  activated() {
    console.log('activated')
    this.startRecognize()
    this.startScan()
  },
  deactivated() {
    console.log('deactivated')
    this.closeScan()
  },

  methods: {
    blackhome() {
      this.closeScan()
      this.$router.go(-1)
    },
    //创建扫描控件
    startRecognize() {
      let that = this
      if (!window.plus) return
      scan = new plus.barcode.Barcode('bcid', this.filter, this.styles)
      scan.onmarked = onmarked

      function onmarked(type, result, file) {
        result = result.replace(/\n/g, '')
        that.codeUrl = result
        alert(result)
        that.closeScan()
        that.$router.go(-1)
      }
      console.log('startRecognize')
    },
    //开始扫描
    startScan() {
      if (!window.plus) return
      scan.start()
    },
    //关闭扫描
    cancelScan() {
      if (!window.plus) return
      scan.cancel()
    },
    //关闭条码识别控件
    closeScan() {
      if (!window.plus) return
      scan.close()
    },
  },
}
</script>
<style lang="scss" scoped>
.scan {
  height: 100%;
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      margin-left: -3.071429rem;
      span {
        font-size: 1.571429rem;
      }
    }
  }
  #bcid {
    width: 100%;
    position: absolute;
    top: 5.428571rem;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    color: #fff;
    background: #ccc;
  }
}
</style>