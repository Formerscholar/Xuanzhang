<template>
  <div id="addMaterial">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span @click="clickISWrite">{{isWrite?'编辑' :'查看'}}物料</span>
      </div>
      <div slot="right" class="right">
        <span>二维码</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper">
      <van-swipe class="swiper" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img :src="img_URL" alt="logo" @click="imgClick" />
        </van-swipe-item>
        <van-swipe-item>
          <img :src="fileLists" alt="模具照片" @click="imgClick" />
        </van-swipe-item>
        <van-swipe-item>
          <img :src="fileListss" alt="设计图" @click="imgClick" />
        </van-swipe-item>
      </van-swipe>
      <div class="compitem">
        <div class="content_nums">
          <div class="left">
            <span class="stock">库存</span>
            <span class="stocknums">2911件</span>
          </div>
          <div class="right">
            <span>
              编码:
              <em>{{MaterialCode}}</em>
            </span>
          </div>
        </div>
        <div class="content_name">
          <div class="left_box">
            <span class="left_name">{{MaterialName}}</span>
            <span class="left_number">{{specification}}</span>
          </div>
          <div class="right_box">
            <span>库存不足</span>
          </div>
        </div>
      </div>
      <div class="listItems">
        <div class="lists">
          <span class="list_name">物料属性</span>
          <div class="list_data">
            <span>{{value}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">物料分类</span>
          <div class="list_data">
            <span>{{values}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">基本单位</span>
          <div class="list_data">
            <span>{{valuess}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">物料价格</span>
          <div class="list_data">
            <span>{{MaterialPrice}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">入库价格</span>
          <div class="list_data">
            <span>{{StoragePrices}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">出库价格</span>
          <div class="list_data">
            <span>{{OutboundPrice}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">bom价格</span>
          <div class="list_data">
            <span>{{bomPrice}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">默认仓库</span>
          <div class="list_data">
            <span>{{valuesss}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">库位号</span>
          <div class="list_data">
            <span>{{LocationNum}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">最大库存</span>
          <div class="list_data">
            <span>{{MaximumInventory}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">安全库存</span>
          <div class="list_data">
            <span>{{SafetyStock}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">最小库存</span>
          <div class="list_data">
            <span>{{MinimumInventory}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">基本库存</span>
          <div class="list_data">
            <span>{{BasicInventory}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">重量</span>
          <div class="list_data">
            <span>{{Detailsweight}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">计件价格</span>
          <div class="list_data">
            <span>{{DetailsPiecePrice}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">产品材质</span>
          <div class="list_data">
            <span>{{DetailsproductMaterial}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">模具编码</span>
          <div class="list_data">
            <span>{{DetailsMoldCode}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="lists">
          <span class="list_name">备注</span>
          <div class="list_data">
            <span>{{Remarks}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
      <!-- 
              <span>文件</span>
              <van-uploader
                :after-read="afterReadsss"
                :max-size="10 * 1024 * 1024"
                v-model="fileListsss"
                :max-count="1"
                style=" margin-left: 4.14286rem;"
              />
      -->
    </scroll>
    <simple-cropper
      style="opacity: 0;"
      :initParam="uploadParam"
      :successCallback="uploadHandle"
      ref="cropper"
    />
  </div>
</template>
    
<script>
import { editMateriel, getEditMateriel, uploadImg } from '@/network/materials'
import { bestURL, crosURl } from '@/network/baseURL'
import SimpleCropper from '@/components/common/SimpleCropper/SimpleCropper'
export default {
  name: 'addMaterial',
  data() {
    return {
      // fileList: [],
      fileLists: [],
      fileListss: [],
      fileListsss: [],
      iid: 0,
      type: false,
      activeNames: [],
      PropsImg: '',
      Propsfile: '',
      Propsdesign: '',
      PropsMould: '',
      img_URL: '',
      Remarks: '',
      options: [
        {
          value: '1',
          label: '产品'
        },
        {
          value: '2',
          label: '零件'
        }
      ],
      value: '1',
      optionss: [],
      values: '',
      optionsss: [],
      valuess: '',
      optionssss: [],
      valuesss: '',
      MaterialName: '',
      specification: '',
      MaterialCode: '自动生成',
      StoragePrices: '自动生成',
      OutboundPrice: '自动生成',
      bomPrice: '自动生成',
      MaterialPrice: '',
      LocationNum: '',
      MaximumInventory: 0,
      SafetyStock: 0,
      MinimumInventory: 0,
      BasicInventory: 0,
      Detailsweight: '',
      DetailsPiecePrice: '',
      DetailsproductMaterial: '',
      DetailsMoldCode: '',
      attribute: 1,
      uploadParam: 4,
      category_id: 0,
      unit_id: '',
      isWrite: false
    }
  },
  components: { SimpleCropper },
  activated() {
    this.iid = this.$route.params.id
    this.type = this.$route.params.type == '1' ? true : false
    this.getEditMater()
    document.querySelectorAll('input').forEach(item => {
      item.style.border = 'none'
    })
  },
  deactivated() {
    if (this.isWrite) {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认是否修改内容?'
        })
        .then(() => {
          this.onsubmit()
        })
        .catch(() => {
          this.clearData()
        })
    }
    this.isWrite = false
  },
  computed: {
    addMaterielData() {
      return {
        token: this.$store.state.token,
        name: this.MaterialName,
        specification: this.specification,
        attribute: this.attribute == 1 ? 'product' : 'spare_parts',
        materiel_category_id: this.category_id,
        unit_id: this.unit_id,
        unit_price: this.MaterialPrice,
        warehouse_id: this.warehouse_id,
        warehouse_position: this.LocationNum,
        design_chart: this.Propsdesign,
        file_dir: this.Propsfile,
        remark: this.Remarks,
        piecework_price: this.DetailsPiecePrice,
        img_url: this.PropsImg,
        stock: this.BasicInventory,
        id: this.iid
      }
    },
    getEditMaterData() {
      return {
        token: this.$store.state.token,
        id: this.iid,
        _: new Date().getTime()
      }
    }
  },
  methods: {
    clickISWrite() {
      this.isWrite = !this.isWrite
      console.log(this.isWrite)
    },
    uploadHandle(data) {
      this.img_URL = data.substr(1)
      this.PropsImg = this.img_URL.split(bestURL)[1]
      console.log(this.img_URL, this.PropsImg)
    },
    imgClick() {
      this.$refs['cropper'].upload()
    },
    async afterReads(file) {
      console.log(file)
      const { data } = await uploadImg({
        user_image: file.content,
        token: this.$store.state.token
      })
      // this.PropsImg = data.url.split(bestURL)[1]
      // console.log(this.PropsImg)
    },
    async afterReadsss(file) {
      const { data } = await uploadImg({
        user_image: file.content,
        token: this.$store.state.token
      })
      this.Propsfile = data.url.split(bestURL)[1]
    },
    async afterReadss(file) {
      const { data } = await uploadImg({
        user_image: file.content,
        token: this.$store.state.token
      })
      this.Propsdesign = data.url.split(bestURL)[1]
    },
    // async afterRead(file) {
    //   console.log(file)
    //   const { data } = await uploadImg({
    //     user_image: file.content,
    //     token: this.$store.state.token
    //   })
    //   this.PropsImg = data.url.split(bestURL)[1]
    //   console.log(this.PropsImg)
    // },
    async getEditMater() {
      const { data } = await getEditMateriel(this.getEditMaterData)
      console.log('getEditMateriel', data)
      data.materielCategory.forEach((item, index) => {
        let obj = {
          value: item.id,
          label: item.category_name
        }
        this.optionss.push(obj)
      })
      data.materielUnit.forEach(item => {
        let obj = {
          value: item.id,
          label: item.unit_name
        }
        this.optionsss.push(obj)
      })
      data.materielWarehouse.forEach(item => {
        let obj = {
          value: item.id,
          label: item.warehouse_name
        }
        this.optionssss.push(obj)
      })
      data.materiel.forEach(item => {
        this.attribute = item.attribute == 'product' ? 1 : 2
        this.value = item.attribute == 'product' ? '产品' : '零件'
        this.MaterialName = item.name
        this.specification = item.specification
        data.materielCategory.forEach(item1 => {
          if (item1.id == item.unit_id) {
            this.values = item1.category_name
            this.category_id = item1.id
          }
        })
        this.MaterialCode = item.scope_of_business
        this.valuess = item.unit_name
        this.MaterialPrice = item.unit_price
        this.StoragePrices = item.piecework_price
        this.OutboundPrice = item.out_price
        this.bomPrice = item.bom_price
        data.materielWarehouse.forEach(item2 => {
          if (item2.id == item.warehouse_id) {
            this.valuesss = item2.warehouse_name
            this.warehouse_id = item2.id
          }
        })
        this.LocationNum = item.warehouse_position
        if (item.img_url) {
          // this.fileList.push({ url: bestURL + item.img_url })
          this.img_URL = bestURL + item.img_url
          this.PropsImg = item.img_url
        }
        this.Propsfile = item.file_dir
        this.Propsdesign = item.design_chart
        this.Remarks = item.remark
        this.Detailsweight = item.weight
        this.MaximumInventory = item.max_stock
        this.MinimumInventory = item.min_stock
        data.materielUnit.forEach(item3 => {
          if (item.unit_name == item3.unit_name) {
            this.unit_id = item3.id
          }
        })
        this.warehouse_id = item.warehouse_id
      })
    },
    WarehouseSelect(value) {
      this.warehouse_id = value
    },
    async onsubmit() {
      console.log(this.addMaterielData)
      const { code, msg } = await editMateriel(this.addMaterielData)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        })
      }
      this.clearData()
    },
    handleChange(val) {
      console.log(val)
    },
    onClickLeft() {
      this.$router.replace('/materialpage')
    },
    clearData() {
      this.iid = 0
      this.valuesss = ''
      this.warehouse_id = 0
      this.type = false
      this.img_URL = ''
      this.PropsImg = ''
      this.fileLists = []
      this.fileListss = []
      this.fileListsss = []
      this.optionss = []
      this.optionsss = []
      this.optionssss = []
    }
  }
}
</script>
    
<style scoped lang="scss">
#addMaterial {
  padding-top: 5.428571rem;
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      margin-left: 2.928571rem;
      span {
        font-size: 1.428571rem;
      }
    }
    .right {
      font-size: 1.142857rem;
      margin-right: 1.071429rem;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 5.142857rem;
    bottom: 0;
    overflow: hidden;
    .box-card {
      margin-bottom: 0.571429rem;
    }
  }

  .swiper {
    width: 100%;
    height: 16.214286rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .compitem {
    padding: 0 1.714286rem;
    margin-top: 1.285714rem;
    border-bottom: 0.428571rem solid #f5f5f5;
    .content_nums {
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-bottom: 0.357143rem;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .stock {
          font-size: 0.857143rem;
          color: #0c0c0c;
        }
        .stocknums {
          font-size: 1.571429rem;
          color: #e8956b;
        }
      }
      .right {
        font-size: 1.142857rem;
        color: #969696;
      }
    }
    .content_name {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 1.571429rem;
      .left_box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-bottom: 1.571429rem;
        .left_name {
          font-size: 1.285714rem;
          margin-bottom: 1.142857rem;
          color: #000;
        }
        .left_number {
          font-size: 1rem;
          color: #a4a4a4;
        }
      }
      .right_box {
        span {
          height: 1.571429rem;
          width: 5.5rem;
          background-color: #f80002;
          font-size: 1.142857rem;
          color: #fff;
          border-radius: 0.357143rem;
          padding: 0.357143rem;
        }
      }
    }
  }

  .listItems {
    padding: 0.357143rem 1.714286rem;
    border-bottom: 0.428571rem solid #f5f5f5;
    .lists {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3rem;
      .list_name {
        font-size: 1.142857rem;
        color: #9d9d9d;
      }
      .list_data {
        font-size: 1.142857rem;
        span {
          color: #3a3a3a;
        }
        .van-icon {
          margin-left: 2rem;
          color: #e1e1e1;
        }
      }
    }
  }
}
</style>
