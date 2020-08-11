<template>
  <div id="addMaterial">
    <div class="topheader bg-primary"></div>
    <van-nav-bar
      title="新建物料"
      left-arrow
      @click-left="onClickLeft"
      right-text="提交"
      @click-right="onsubmit"
    />
    <scroll class="scroll-wrapper">
      <el-card class="box-card">
        <el-row class="van-cell uploadImage">
          <span>图片</span>
          <img v-if="img_URL" :src="img_URL" alt="logo" @click="imgClick" />
          <img v-else src="@/assets/image/dpng.png" alt="logo" @click="imgClick" />
        </el-row>
        <van-field v-model="MaterialName
" label="物料名称" />
        <van-field v-model="specification" label="物料规格" />
        <el-row class="van-cell MaterialProperties">
          <span>物料属性</span>
          <el-select v-model="value" style="margin: 0 0.357143rem;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="Propertiestext"></span>
        </el-row>
        <el-row class="van-cell MaterialProperties">
          <span>物料分类</span>
          <el-select v-model="values" placeholder="请选择" style="margin: 0 0.357143rem;">
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
          <el-select v-model="valuess" placeholder="请选择" style="margin: 0 0.357143rem;">
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
          <el-select v-model="valuesss" placeholder="请选择" style="margin: 0 0.357143rem;">
            <el-option
              v-for="item in optionssss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-row>
        <van-field v-model="LocationNum" type="digit" label="库位号" />
      </el-card>
      <el-card class="box-card">
        <div v-for="(item,index) in materielField" :key="item.id">
          <van-field v-model="SetMaterialFlags[index]" :label="item.field_name" />
        </div>
      </el-card>

      <!-- <el-card class="box-card">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="库存预警" name="1">
            <van-field v-model="MaximumInventory" type="digit" label="最大库存" />
            <van-field v-model="SafetyStock" type="digit" label="安全库存" />
            <van-field v-model="MinimumInventory" type="digit" label="最小库存" />
            <van-field v-model="BasicInventory" type="digit" label="基本库存" />
          </el-collapse-item>
          <el-collapse-item title="物料详情" name="2">
            <van-field v-model="Detailsweight" label="重量" />
            <van-field v-model="DetailsPiecePrice" label="计件价格" />
            <van-field v-model="DetailsproductMaterial
" label="产品材质" />
            <van-field v-model="DetailsMoldCode" label="模具编码" />

            <el-row class="van-cell uploadImage">
              <span>模具照片</span>
              <van-uploader
                :after-read="afterRead"
                :max-size="10 * 1024 * 1024"
                v-model="fileList"
                multiple
              />
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="质量验收及图纸" name="3">
            <el-row class="van-cell uploadImage">
              <span>设计图</span>
              <van-uploader
                :after-read="afterRead"
                :max-size="10 * 1024 * 1024"
                v-model="fileList"
                multiple
              />
            </el-row>
            <el-row class="van-cell uploadImage">
              <span>文件</span>
              <van-uploader
                :after-read="afterRead"
                :max-size="10 * 1024 * 1024"
                v-model="fileList"
                multiple
              />
            </el-row>

            <van-field v-model="Remarks" rows="1" autosize label="备注" type="textarea" />
          </el-collapse-item>
        </el-collapse>
      </el-card>-->
    </scroll>
    <simple-cropper :initParam="uploadParam" :successCallback="uploadHandle" ref="cropper" />
  </div>
</template>
    
<script>
import { getAddMateriel, addMateriel, uploadImg } from '@/network/materials'
import { bestURL, crosURl } from '@/network/baseURL'
import SimpleCropper from '@/components/common/SimpleCropper/SimpleCropper'
export default {
  name: 'addMaterial',
  data() {
    return {
      fileList: [],
      activeNames: [],
      SetMaterialFlags: [],
      PropsImg: '',
      Propsfile: '',
      Propsdesign: '',
      PropsMould: '',
      Remarks: '',
      img_URL: '',
      options: [
        {
          value: '1',
          label: '产品',
        },
        {
          value: '2',
          label: '零件',
        },
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
      uploadParam: 4,
      materielField: [],
    }
  },
  components: { SimpleCropper },
  activated() {
    this.getAddMater()
    document.querySelectorAll('input').forEach((item) => {
      item.style.border = 'none'
    })
  },
  deactivated() {
    this.fileList = []
    this.activeNames = []
    this.PropsImg = ''
    this.Propsfile = ''
    this.Propsdesign = ''
    this.PropsMould = ''
    this.Remarks = ''
    this.img_URL = ''
    this.options = []
    this.value = '1'
    this.optionss = []
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
    this.SetMaterialFlags = []
    this.uploadParam = 4
  },
  computed: {
    getAddMaterielData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
    addMaterielData() {
      console.log(this.SetMaterialFlags)
      let field_data = ''
      this.SetMaterialFlags.map((item) => {
        field_data += ',' + item
      })
      return {
        token: this.$store.state.token,
        name: this.MaterialName,
        specification: this.specification,
        attribute: this.value == 1 ? 'product' : 'spare_parts',
        materiel_category_id: this.values,
        unit_id: this.valuess,
        unit_price: this.MaterialPrice,
        warehouse_id: this.valuesss,
        warehouse_position: this.LocationNum,
        design_chart: this.Propsdesign,
        file_dir: this.Propsfile,
        remark: this.Remarks,
        piecework_price: this.DetailsPiecePrice,
        img_url: this.PropsImg,
        stock: this.BasicInventory,
        field_data,
      }
    },
  },
  methods: {
    uploadHandle(data) {
      this.img_URL = data.substr(1)
      this.PropsImg = this.img_URL.split(bestURL)[1]
      console.log(this.img_URL, this.PropsImg)
    },
    imgClick() {
      this.$refs['cropper'].upload()
    },
    async afterRead(file) {
      console.log(file)
      const { data } = await uploadImg({
        user_image: file.content,
        token: this.$store.state.token,
      })
      this.PropsImg = data.url
    },
    async onsubmit() {
      const { code, msg } = await addMateriel(this.addMaterielData)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.$router.replace('/materialpage')
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async getAddMater() {
      const { data } = await getAddMateriel(this.getAddMaterielData)
      console.log('getAddMateriel', data)
      this.materielField = data.materielField
      data.materielCategory.forEach((item, index) => {
        let obj = {
          value: item.id,
          label: item.category_name,
        }
        this.optionss.push(obj)
      })
      data.materielUnit.forEach((item) => {
        let obj = {
          value: item.id,
          label: item.unit_name,
        }
        this.optionsss.push(obj)
      })
      data.materielWarehouse.forEach((item) => {
        let obj = {
          value: item.id,
          label: item.warehouse_name,
        }
        this.optionssss.push(obj)
      })
    },
    handleChange(val) {
      console.log(val)
    },
    onClickLeft() {
      this.$router.replace('/materialpage')
    },
  },
}
</script>
    
<style scoped lang="scss">
#addMaterial {
  height: calc(100vh - 5.214285rem);
  .topheader {
    height: 1.928571rem;
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 5.214285rem;
    bottom: 0;
    overflow: hidden;
    .box-card {
      margin-bottom: 0.571429rem;
    }
  }

  .uploadImage {
    img {
      width: 5.714286rem;
      height: 5.714286rem;
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
