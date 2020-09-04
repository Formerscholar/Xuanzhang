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

<script>
export default {
  data() {
    return {
      codeUrl: '',
      styles: {
        frameColor: 'rgb(66, 147, 200)',
        scanbarColor: 'rgb(66, 147, 200)',
      },
      filter: [
        plus.barcode.QR,
        plus.barcode.EAN13,
        plus.barcode.EAN8,
        plus.barcode.AZTEC,
        plus.barcode.DATAMATRIX,
        plus.barcode.UPCA,
        plus.barcode.UPCE,
        plus.barcode.CODABAR,
        plus.barcode.CODE39,
        plus.barcode.CODE93,
        plus.barcode.CODE128,
        plus.barcode.ITF,
        plus.barcode.MAXICODE,
        plus.barcode.PDF417,
        plus.barcode.RSS14,
        plus.barcode.RSSEXPANDED,
      ],
      scan: null,
      model: null,
    }
  },
  activated() {
    setTimeout(() => {
      this.startRecognize()
      this.startScan()
    }, 500)
    this.model = this.$route.params.model
  },
  deactivated() {
    this.closeScan()
  },
  methods: {
    startRecognize() {
      this.scan = new plus.barcode.Barcode('bcid', this.filter, this.styles)
      this.scan.onmarked = (type, result, file) => {
        result = result.replace(/\n/g, '')
        this.codeUrl = result
        this.closeScan()
        if (this.codeUrl.indexOf('/scanSelectPd/') != -1) {
          switch (this.model) {
            case 'home':
              this.$router.replace('/home')
              break
            default:
              this.$router.push({
                path: this.codeUrl,
                query: {
                  data: this.model,
                },
              })
              break
          }
        } else {
          this.$dialog({ message: '无法识别的二维码!' })
          this.$router.go(-1)
        }
      }
    },
    startScan() {
      this.scan.start()
    },
    cancelScan() {
      this.scan.cancel()
    },
    closeScan() {
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