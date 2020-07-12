<template>
  <div id="addMaterial">
    <div class="topheader bg-primary"></div>
    <van-nav-bar title="修改物料" left-arrow @click-left="onClickLeft" />
    <scroll class="scroll-wrapper">
      <el-card class="box-card">
        <el-row class="van-cell uploadImage">
          <span>图片</span>
          <van-uploader
            :after-read="afterRead"
            :max-size="10 * 1024 * 1024"
            v-model="fileList"
            :max-count="1"
          />
        </el-row>
        <van-field v-model="MaterialName
" label="物料名称" />
        <van-field v-model="specification" label="物料规格" />
        <el-row class="van-cell MaterialProperties">
          <span>物料属性</span>
          <el-select v-model="value" style="margin: 0 1.285714rem;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <span class="Propertiestext"></span> -->
        </el-row>
        <el-row class="van-cell MaterialProperties">
          <span>物料分类</span>
          <el-select v-model="values" placeholder="请选择" style="margin: 0 1.285714rem;">
            <el-option
              v-for="item in optionss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <span class="Propertiestext">新增分类</span> -->
        </el-row>
        <van-field label="物料编码" :value="MaterialCode" readonly />
        <el-row class="van-cell MaterialProperties">
          <span>基本单位</span>
          <el-select v-model="valuess" placeholder="请选择" style="margin: 0 1.285714rem;">
            <el-option
              v-for="item in optionsss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <span class="Propertiestext">新增单位</span> -->
        </el-row>
        <van-field v-model="MaterialPrice" type="number" label="物料价格" />
        <van-field label="入库价格" :value="StoragePrices" readonly />
        <van-field label="出库价格" :value="OutboundPrice" readonly />
        <van-field label="bom价格" :value="bomPrice" readonly />
      </el-card>
      <el-card class="box-card">
        <el-row class="van-cell MaterialProperties">
          <span>默认仓库</span>
          <el-select
            v-model="valuesss"
            placeholder="请选择"
            style="margin: 0 1.285714rem;"
            @change="WarehouseSelect"
          >
            <el-option
              v-for="item in optionssss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <span class="Propertiestext">新增仓库</span> -->
        </el-row>
        <van-field v-model="LocationNum" type="digit" label="库位号" />
      </el-card>
      <el-card class="box-card">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="库存预警" name="1" style="padding-left: 1rem;">
            <van-field
              v-model="MaximumInventory"
              type="digit"
              label="最大库存"
              style="padding-left: 0;"
            />
            <van-field v-model="SafetyStock" type="digit" label="安全库存" style="padding-left: 0;" />
            <van-field
              v-model="MinimumInventory"
              type="digit"
              label="最小库存"
              style="padding-left: 0;"
            />
            <van-field v-model="BasicInventory" type="digit" label="基本库存" style="padding-left: 0;" />
          </el-collapse-item>
          <el-collapse-item title="物料详情" name="2" style="padding-left: 1rem;">
            <van-field v-model="Detailsweight" label="重量" style="padding-left: 0;" />
            <van-field v-model="DetailsPiecePrice" label="计件价格" style="padding-left: 0;" />
            <van-field v-model="DetailsproductMaterial
" label="产品材质" style="padding-left: 0;" />
            <van-field v-model="DetailsMoldCode" label="模具编码" style="padding-left: 0;" />

            <el-row class="van-cell uploadImage" style="padding-left: 0;">
              <span>模具照片</span>
              <van-uploader
                :after-read="afterReads"
                :max-size="10 * 1024 * 1024"
                v-model="fileLists"
                :max-count="1"
                style=" margin-left: 2.142857rem;"
              />
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="质量验收及图纸" name="3" style="padding-left: 1rem;">
            <el-row class="van-cell uploadImage" style="padding-left: 0;">
              <span>设计图</span>
              <van-uploader
                :after-read="afterReadss"
                :max-size="10 * 1024 * 1024"
                v-model="fileListss"
                :max-count="1"
                style=" margin-left: 3.14286rem;"
              />
            </el-row>
            <el-row class="van-cell uploadImage" style="padding-left: 0;">
              <span>文件</span>
              <van-uploader
                :after-read="afterReadsss"
                :max-size="10 * 1024 * 1024"
                v-model="fileListsss"
                :max-count="1"
                style=" margin-left: 4.14286rem;"
              />
            </el-row>
            <van-field
              v-model="Remarks"
              rows="1"
              autosize
              label="备注"
              type="textarea"
              style="padding-left: 0;"
            />
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </scroll>
  </div>
</template>





    
<script>
import scroll from '@/components/common/scroll/scroll'
import { editMateriel, getEditMateriel, uploadImg } from '@/network/materials'
import { bestURL, crosURl } from '@/network/baseURL'

export default {
  name: 'addMaterial',
  data() {
    return {
      fileList: [],
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
      category_id: 0,
      unit_id: ''
    }
  },
  components: { scroll },
  activated() {
    this.iid = this.$route.params.id
    this.type = this.$route.params.type == '1' ? true : false
    this.getEditMater()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
    document.querySelectorAll('input').forEach(item => {
      item.style.border = 'none'
    })
  },
  deactivated() {
    this.iid = 0
    this.valuesss = ''
    this.warehouse_id = 0
    this.type = false
    this.fileList = []
    this.fileLists = []
    this.fileListss = []
    this.fileListsss = []
    this.optionss = []
    this.optionsss = []
    this.optionssss = []
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
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
    async afterRead(file) {
      console.log(file)
      const { data } = await uploadImg({
        user_image: file.content,
        token: this.$store.state.token
      })
      this.PropsImg = data.url.split(bestURL)[1]
      console.log(this.PropsImg)
    },
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
          this.fileList.push({ url: bestURL + item.img_url })
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

        this.$router.replace('/materialpage')
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        })
      }
    },
    handleChange(val) {
      console.log(val)
    },
    onClickLeft() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认是否修改内容?'
        })
        .then(() => {
          this.onsubmit()
        })
        .catch(() => {
          this.$router.replace('/materialpage')
        })
    }
  }
}
</script>
    
<style scoped lang="scss">
#addMaterial {
  height: calc(100vh - 1.857143rem);
  .topheader {
    height: 1.928571rem;
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

  .uploadImage {
    .van-uploader {
      margin-left: 3.928571rem;
    }
  }
  .MaterialProperties {
    display: flex;
    .el-select {
      flex: 1;
    }
    .Propertiestext {
      width: 6.357143rem;
    }
  }
}
</style>
