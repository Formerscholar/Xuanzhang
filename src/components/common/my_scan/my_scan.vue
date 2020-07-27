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

<script >
export default {
  data() {
    return {
      codeUrl: '',
      scan: null,
      filter: null,
      styles: { frameColor: '#2a88ff', scanbarColor: '#2a88ff' },
    }
  },
  activated() {
    this.startRecognize()
    this.startScan()
  },
  deactivated() {
    this.closeScan()
  },
  methods: {
    startRecognize() {
      if (!window.plus) return
      this.scan = plus.barcode.create('bcid', this.filter, this.styles)
      this.scan.onmarked = (type, result, file) => {
        result = result.replace(/\n/g, '')
        this.codeUrl = result
        alert(this.codeUrl)
        this.closeScan()
        this.$router.go(-1)
      }
    },
    startScan() {
      if (!window.plus) return
      this.scan.start()
    },
    cancelScan() {
      if (!window.plus) return
      this.scan.cancel()
    },
    closeScan() {
      if (!window.plus) return
      this.scan.close()
    },
    blackhome() {
      this.closeScan()
      this.$router.go(-1)
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