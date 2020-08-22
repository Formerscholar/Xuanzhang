<template>
  <div id="addMaterial">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="clearData">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center"></div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <div class="swiper" @click="imgClick">
        <img :src="img_URL" alt="logo" />
        <i class="iconfont icon-pic img_btn"></i>
      </div>
      <div class="compitem">
        <div class="content_nums">
          <div class="left">
            <span class="stock">库存</span>
            <span class="stocknums">{{stock}}件</span>
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
        <div class="morebox" @click="valueClick">
          <span class="name">物料属性</span>
          <div class="contents">
            <span>{{value}}</span>
            <van-icon name="arrow" />
          </div>
        </div>

        <div class="morebox" @click="valuesClick">
          <span class="name">物料分类</span>
          <div class="contents">
            <span>{{values}}</span>
            <van-icon name="arrow" />
          </div>
        </div>

        <div class="morebox" @click="valuessClick">
          <span class="name">基本单位</span>
          <div class="contents">
            <span>{{valuess}}</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="morebox" @click="valuesssClick">
          <span class="name">默认仓库</span>
          <div class="contents">
            <span>{{valuesss}}</span>
            <van-icon name="arrow" />
          </div>
        </div>

        <van-field class="newStyle" v-model="LocationNum" placeholder="请输入库位号" label="库位编号" />

        <div v-for="item in materielExtra" :key="item.id">
          <!-- <Lists
            :name="item.field_name"
            route="WLNumber"
            :data="item.field_content"
            @listhandleClick="listhandleClick"
          />-->
          <van-field
            class="newStyle"
            v-model="item.field_content"
            placeholder="请输入内容"
            :label="item.field_name"
          />
        </div>
      </div>
    </scroll>
    <myBtns :commitFun="submitClick" :cancelFun="clearData">
      <span slot="cancel-btn">取消</span>
      <span slot="commit-btn">
        <span>提交</span>
      </span>
    </myBtns>

    <SimpleCropper :successCallback="uploadHandle" ref="croppers" />

    <van-picker
      class="valuepicker"
      v-if="valuepicker"
      title="物料属性"
      show-toolbar
      :columns="valuecolumns"
      @confirm="valueConfirm"
      @cancel="valuepicker = false"
    />
    <van-picker
      class="valuepicker"
      v-if="valuespicker"
      title="物料分类"
      show-toolbar
      :columns="optionss"
      @confirm="valuesConfirm"
      @cancel="valuespicker = false"
    />
    <van-picker
      class="valuepicker"
      v-if="valuesspicker"
      title="基本单位"
      show-toolbar
      :columns="optionsss"
      @confirm="valuessConfirm"
      @cancel="valuesspicker = false"
    />
    <van-picker
      class="valuepicker"
      v-if="valuessspicker"
      title="基本单位"
      show-toolbar
      :columns="optionssss"
      @confirm="valuesssConfirm"
      @cancel="valuessspicker = false"
    />
  </div>
</template>
    
<script>
import { editMateriel, getEditMateriel, uploadImg } from '@/network/materials'
import { bestURL, crosURl } from '@/network/baseURL'
import SimpleCropper from '@/components/common/SimpleCroppes/SimpleCroppes'
import myBtns from '@/components/common/my_btns/my_btns'

export default {
  name: 'addMaterial',
  data() {
    return {
      valuepicker: false,
      valuespicker: false,
      valuesspicker: false,
      valuessspicker: false,
      itemData: {},
      fileLists: [],
      fileListss: [],
      fileListsss: [],
      materielCategory: [],
      materielUnit: [],
      materielWarehouse: [],
      iid: 0,
      type: false,
      activeNames: [],
      PropsImg: '',
      Propsfile: '',
      stock: 0,
      Propsdesign: '',
      PropsMould: '',
      img_URL: '',
      Remarks: '',
      optionss: [],
      value: '',
      values: '',
      optionsss: [],
      materielExtra: [],
      valuess: '',
      optionssss: [],
      valuesss: '',
      MaterialName: '',
      valuecolumns: ['产品', '零件'],
      specification: '',
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
      isWrite: false,
      attributes: 0,
    }
  },
  components: {
    SimpleCropper,
    myBtns,
  },
  activated() {
    this.iid = this.$route.params.id
    this.type = this.$route.params.type == '1' ? true : false
    this.getEditMater()
  },
  computed: {
    addMaterielData() {
      console.log(this.materielExtra)
      let field_data = ''
      if (this.materielExtra.length) {
        this.materielExtra.map((item) => {
          field_data += ',' + item
        })
      } else {
        this.materielField.map((item) => {
          field_data += ', '
        })
      }

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
        id: this.iid,
        field_data,
      }
    },
    getEditMaterData() {
      return {
        token: this.$store.state.token,
        id: this.iid,
        _: new Date().getTime(),
      }
    },
  },
  methods: {
    valueClick() {
      this.valuepicker = true
    },
    valueConfirm(value, index) {
      this.value = value
      this.attribute = index ? 'spare_parts' : 'product'
      console.log(value, index, this.attribute)
      this.valuepicker = false
    },
    valuesClick() {
      this.valuespicker = true
    },
    valuesConfirm(value, index) {
      this.values = value
      this.materielCategory.forEach((item, index1) => {
        if (index1 == index) {
          this.category_id = item.id
        }
      })
      console.log(value, index, this.category_id)
      this.valuespicker = false
    },
    valuessClick() {
      this.valuesspicker = true
    },
    valuessConfirm(value, index) {
      this.valuess = value
      this.materielUnit.forEach((item, index1) => {
        if (index1 == index) {
          this.unit_id = item.id
        }
      })
      console.log(value, index, this.unit_id)
      this.valuesspicker = false
    },
    valuesssClick() {
      this.valuessspicker = true
    },
    valuesssConfirm(value, index) {
      this.valuesss = value
      this.materielWarehouse.forEach((item, index1) => {
        if (index1 == index) {
          this.warehouse_id = item.id
        }
      })
      console.log(value, index, this.warehouse_id)
      this.valuessspicker = false
    },
    submitClick() {
      this.isWrite = false
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认是否修改内容?',
        })
        .then(() => {
          this.onsubmit()
        })
        .catch(() => {
          this.isWrite = true
        })
    },
    listhandleClick(data) {
      console.log('跳转数据处理页面 $bus返回处理后数据', data.route)
      this.$router.push({
        path: '/' + data.route,
        query: {
          data,
          optionss: this.optionss,
          optionsss: this.optionsss,
          optionssss: this.optionssss,
        },
      })
      this.$bus.$off('listbusData')
      this.$bus.$on('listbusData', (item) => {
        console.log('$bus.$on(listbusData,')
        if (!this.isWrite) {
          this.isWrite = item.state
          console.log(this.isWrite)
        }
        console.log(item)
        if (item.route == 'Mproperties') {
          this.value = item.data
          this.attribute = item.value
        } else if (item.route == 'Mclassification') {
          this.values = item.data
          this.category_id = item.value
        } else if (item.route == 'BasicUnit') {
          this.valuess = item.data
          this.unit_id = item.value
        } else if (item.route == 'MPrice') {
          this.MaterialPrice = item.data
        } else if (item.route == 'DWarehouse') {
          this.valuesss = item.data
          this.warehouse_id = item.value
        } else if (item.route == 'WLNumber') {
          this.LocationNum = item.data
        }
      })
    },
    async onsubmit() {
      const { code, msg } = await editMateriel(this.addMaterielData)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.clearData()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async uploadHandle(data) {
      this.img_URL = data
      this.PropsImg = this.img_URL.split(bestURL)[1]
      console.log(this.img_URL, this.PropsImg)
      const { code, msg } = await editMateriel(this.addMaterielData)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    imgClick() {
      this.$refs.croppers.upload()
    },
    async afterReads(file) {
      console.log(file)
      const { data } = await uploadImg({
        user_image: file.content,
        token: this.$store.state.token,
      })
      // this.PropsImg = data.url.split(bestURL)[1]
      // console.log(this.PropsImg)
    },
    async afterReadsss(file) {
      const { data } = await uploadImg({
        user_image: file.content,
        token: this.$store.state.token,
      })
      this.Propsfile = data.url.split(bestURL)[1]
    },
    async afterReadss(file) {
      const { data } = await uploadImg({
        user_image: file.content,
        token: this.$store.state.token,
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
      this.materielExtra = data.materielExtra
      this.materielField = data.materielField
      this.itemData = { ...data.materiel[0] }
      this.materielCategory = data.materielCategory
      data.materielCategory.forEach((item, index) => {
        this.optionss.push(item.category_name)
      })
      this.materielUnit = data.materielUnit
      data.materielUnit.forEach((item) => {
        this.optionsss.push(item.unit_name)
      })
      this.materielWarehouse = data.materielWarehouse

      data.materielWarehouse.forEach((item) => {
        this.optionssss.push(item.warehouse_name)
      })
      data.materiel.forEach((item) => {
        this.attribute = item.attribute == 'product' ? 1 : 2
        this.value = item.attribute == 'product' ? '产品' : '零件'
        this.MaterialName = item.name
        this.specification = item.specification
        this.category_id = item.materiel_category_id
        data.materielCategory.forEach((item1) => {
          if (item1.id == item.materiel_category_id) {
            this.values = item1.category_name
          }
        })
        this.MaterialCode = item.scope_of_business
        this.stock = item.stock
        this.valuess = item.unit_name
        this.MaterialPrice = item.unit_price
        this.StoragePrices = item.piecework_price
        this.OutboundPrice = item.out_price
        this.bomPrice = item.bom_price
        data.materielWarehouse.forEach((item2) => {
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
        data.materielUnit.forEach((item3) => {
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
          type: 'success',
        })
        this.clearData()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    handleChange(val) {
      console.log(val)
    },
    clearData() {
      this.itemData = {}
      this.fileLists = []
      this.fileListss = []
      this.fileListsss = []
      this.materielExtra = []
      this.iid = 0
      this.type = false
      this.activeNames = []
      this.PropsImg = ''
      this.Propsfile = ''
      this.stock = 0
      this.Propsdesign = ''
      this.PropsMould = ''
      this.img_URL = ''
      this.Remarks = ''
      this.optionss = []
      this.value = ''
      this.values = ''
      this.optionsss = []
      this.valuess = ''
      this.optionssss = []
      this.valuesss = ''
      this.MaterialName = ''
      this.specification = ''
      this.MaterialCode = '自动生成'
      this.StoragePrices = '自动生成'
      this.OutboundPrice = '自动生成'
      this.bomPrice = '自动生成'
      this.MaterialPrice = ''
      this.LocationNum = ''
      this.MaximumInventory = 0
      this.SafetyStock = 0
      this.MinimumInventory = 0
      this.BasicInventory = 0
      this.Detailsweight = ''
      this.DetailsPiecePrice = ''
      this.DetailsproductMaterial = ''
      this.DetailsMoldCode = ''
      this.attribute = 1
      this.uploadParam = 4
      this.category_id = 0
      this.unit_id = ''
      this.isWrite = false
      this.attributes = 0
      this.$router.go(-1)
    },
  },
}
</script>
    
<style scoped lang="scss">
#addMaterial {
  .p_root_box {
    color: white;
    background: none;
    box-shadow: none;
    border: none;
    .left {
      margin-left: 1.071429rem;
      border-radius: 50%;
      width: 2.857143rem;
      height: 2.857143rem;
      background-color: rgba(45, 52, 54, 0.4);
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
      border-radius: 50%;
      width: 2.857143rem;
      height: 2.857143rem;
      background-color: rgba(45, 52, 54, 0.4);
      font-size: 1.428571rem;
      margin-right: 1.071429rem;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 4.214286rem;
    overflow: hidden;
    .box-card {
      margin-bottom: 0.571429rem;
    }
  }

  .swiper {
    width: 100%;
    height: 25.714286rem;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .img_btn {
      position: absolute;
      bottom: 1.071429rem;
      right: 1.071429rem;
      color: #fff;
      z-index: 2;
      text-align: center;
      border-radius: 50%;
      width: 2.857143rem;
      height: 2.857143rem;
      line-height: 2.857143rem;
      background-color: rgba(45, 52, 54, 0.4);
      font-size: 1.428571rem;
    }
    img {
      height: 100%;
      width: 100%;
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
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-bottom: 1.571429rem;
        white-space: nowrap;
        overflow: hidden;
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
        width: 5.5rem;

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
    .morebox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 3rem;
      border-bottom: 1px solid #e7e7e7;
      .name {
        font-size: 1.142857rem;
        color: black;
        padding-right: 0.714286rem;
        border-right: 1px solid #e7e7e7;
      }
      .contents {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
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
  .valuepicker {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
