<template>
  <div id="addMaterial">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="onClickLeft">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>新建物料</span>
      </div>
    </navbar>
    <scroll class="scroll-wrapper" :probeType="3">
      <el-card class="box-card">
        <div class="img_upload van-cell DeliveryDate">
          <span class="lable">上传图片</span>
          <img class="img_box" v-if="state.img_URL" :src="state.img_URL" @click="imgClick" />
          <div v-else class="img_box" @click="imgClick"></div>
        </div>
        <van-field
          class="newStyle DeliveryDate van-cell"
          v-model="state.MaterialName"
          label="物料名称"
        />
        <van-field
          class="newStyle DeliveryDate van-cell"
          v-model="state.specification"
          label="物料规格"
        />
        <div @click="propertiesClick" class="newStyle DeliveryDate van-cell">
          <span class="lable">物料属性</span>
          <span>
            {{state.value}}
            <van-icon name="arrow" />
          </span>
        </div>

        <div @click="MaterialPropertiesClick" class="newStyle DeliveryDate van-cell">
          <span class="lable">物料分类</span>
          <span>
            {{state.values}}
            <van-icon name="arrow" />
          </span>
        </div>

        <van-field
          class="newStyle DeliveryDate van-cell"
          label="物料编码"
          :value="state.MaterialCode"
          readonly
        />

        <div @click="BasicUnitClick" class="newStyle DeliveryDate van-cell">
          <span class="lable">基本单位</span>
          <span>
            {{state.valuess}}
            <van-icon name="arrow" />
          </span>
        </div>

        <van-field
          class="newStyle DeliveryDate van-cell"
          v-model="state.MaterialPrice"
          type="number"
          label="物料价格"
        />
        <van-field
          class="newStyle DeliveryDate van-cell"
          label="入库价格"
          :value="state.StoragePrices"
          readonly
        />
        <van-field
          class="newStyle DeliveryDate van-cell"
          label="出库价格"
          :value="state.OutboundPrice"
          readonly
        />
        <van-field
          class="newStyle DeliveryDate van-cell"
          label="bom价格"
          :value="state.bomPrice"
          readonly
        />

        <div @click="DeWarehouseClick" class="newStyle DeliveryDate van-cell">
          <span class="lable">默认仓库</span>
          <span>
            {{state.valuesss}}
            <van-icon name="arrow" />
          </span>
        </div>

        <van-field
          class="newStyle DeliveryDate van-cell"
          v-model="state.LocationNum"
          type="digit"
          label="库位号"
        />
      </el-card>
      <div v-for="(item,index) in state.materielField" :key="item.id">
        <van-field v-model="state.SetMaterialFlags[index]" :label="item.field_name" />
      </div>
    </scroll>

    <myBtns :commitFun="onsubmit" :cancelFun="onClickLeft">
      <span slot="cancel-btn">返 回</span>
      <span slot="commit-btn">
        <span>确 定</span>
      </span>
    </myBtns>

    <simple-cropper :initParam="state.uploadParam" :successCallback="uploadHandle" ref="cropper" />
    <van-picker
      class="datetime"
      v-if="state.isproperties"
      title="物料属性"
      show-toolbar
      :columns="state.options"
      @confirm="propertiesonConfirm"
      @cancel="propertiesnCancel"
    />
    <van-picker
      class="datetime"
      v-if="state.isMaterialProperties"
      title="物料属性"
      show-toolbar
      :columns="state.optionss"
      @confirm="MaterialPropertiesConfirm"
      @cancel="MaterialPropertiesCancel"
    />
    <van-picker
      class="datetime"
      v-if="state.isBasicUnit"
      title="基本单位"
      show-toolbar
      :columns="state.optionsss"
      @confirm="BasicUnitConfirm"
      @cancel="BasicUnitCancel"
    />
    <van-picker
      class="datetime"
      v-if="state.isDeWarehouse"
      title="默认仓库"
      show-toolbar
      :columns="state.optionssss"
      @confirm="DeWarehouseConfirm"
      @cancel="DeWarehouseCancel"
    />
  </div>
</template>
    
<script>
import { getAddMateriel, addMateriel, uploadImg } from '@/network/materials'
import { bestURL, crosURl } from '@/network/baseURL'
import SimpleCropper from '@/components/common/SimpleCropper/SimpleCropper'
import myBtns from '@/components/common/my_btns/my_btns'

import {
  reactive,
  onUnmounted,
  computed,
  ref,
  onActivated,
} from '@vue/composition-api'

export default {
  components: {
    SimpleCropper,
    myBtns,
  },
  setup(props, { root }) {
    const cropper = ref(null)
    const state = reactive({
      fileList: [],
      activeNames: [],
      SetMaterialFlags: [],
      PropsImg: '',
      Propsfile: '',
      Propsdesign: '',
      PropsMould: '',
      Remarks: '',
      img_URL: '',
      options: ['产品', '零件'],
      value: '',
      optionss: [],
      values: '',
      optionsss: [],
      valuess: '',
      optionssss: [],
      valuesss: '',
      propertieValue: '',
      MaterialPropertiesValue: '',
      BasicUnitValue: '',
      DeWarehouseValue: '',
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
      isproperties: false,
      isMaterialProperties: false,
      isBasicUnit: false,
      isDeWarehouse: false,
      MinimumInventory: 0,
      BasicInventory: 0,
      Detailsweight: '',
      DetailsPiecePrice: '',
      DetailsproductMaterial: '',
      DetailsMoldCode: '',
      uploadParam: 4,
      materielField: [],
      materielCategory: [],
      materielUnit: [],
      materielWarehouse: [],
    })

    onActivated(() => {
      root.$Jurisdiction('136', root.$store.state.catearr, () => {
        root.$router.replace('/home')
        root.$toast('您的账号无该模块权限!')
      })
    })

    onUnmounted(() => {
      state.fileList = []
      state.activeNames = []
      state.SetMaterialFlags = []
      state.PropsImg = ''
      state.Propsfile = ''
      state.Propsdesign = ''
      state.PropsMould = ''
      state.Remarks = ''
      state.img_URL = ''
      state.value = ''
      state.optionss = []
      state.values = ''
      state.optionsss = []
      state.valuess = ''
      state.optionssss = []
      state.valuesss = ''
      state.propertieValue = ''
      state.MaterialPropertiesValue = ''
      state.BasicUnitValue = ''
      state.DeWarehouseValue = ''
      state.MaterialName = ''
      state.specification = ''
      state.MaterialPrice = ''
      state.LocationNum = ''
      state.MaximumInventory = 0
      state.SafetyStock = 0
      state.isproperties = false
      state.isMaterialProperties = false
      state.isBasicUnit = false
      state.isDeWarehouse = false
      state.MinimumInventory = 0
      state.BasicInventory = 0
      state.Detailsweight = ''
      state.DetailsPiecePrice = ''
      state.DetailsproductMaterial = ''
      state.DetailsMoldCode = ''
      state.uploadParam = 4
      state.materielField = []
      state.materielCategory = []
      state.materielUnit = []
      state.materielWarehouse = []
    })

    const getAddMaterielData = computed(() => {
      return {
        token: root.$store.state.token,
        _: new Date().getTime(),
      }
    })

    const addMaterielData = computed(() => {
      console.log(state.SetMaterialFlags)
      let field_data = ''
      state.SetMaterialFlags.map((item) => {
        field_data += ',' + item
      })
      return {
        token: root.$store.state.token,
        name: state.MaterialName,
        specification: state.specification,
        attribute: state.propertieValue == 1 ? 'product' : 'spare_parts',
        materiel_category_id: state.MaterialPropertiesValue,
        unit_id: state.BasicUnitValue,
        unit_price: state.MaterialPrice,
        warehouse_id: state.DeWarehouseValue,
        warehouse_position: state.LocationNum,
        design_chart: state.Propsdesign,
        file_dir: state.Propsfile,
        remark: state.Remarks,
        piecework_price: state.DetailsPiecePrice,
        img_url: state.PropsImg,
        stock: state.BasicInventory,
        field_data,
      }
    })

    function uploadHandle(data) {
      state.img_URL = data.substr(1)
      state.PropsImg = state.img_URL.split(bestURL)[1]
      console.log(state.img_URL, state.PropsImg)
    }
    function imgClick() {
      cropper.value.upload()
    }
    async function afterRead(file) {
      console.log(file)
      const { data } = await uploadImg({
        user_image: file.content,
        token: root.$store.state.token,
      })
      state.PropsImg = data.url
    }
    async function onsubmit() {
      const { code, msg } = await addMateriel(addMaterielData.value)
      if (code == 200) {
        root.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        root.$router.replace('/materialpage')
      } else {
        root.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    }
    async function getAddMater() {
      const { data } = await getAddMateriel(getAddMaterielData.value)
      console.log('getAddMateriel', data)
      state.materielField = data.materielField
      state.materielCategory = data.materielCategory
      state.materielUnit = data.materielUnit
      state.materielWarehouse = data.materielWarehouse
      data.materielCategory.map((item, index) => {
        state.optionss.push(item.category_name)
      })
      data.materielUnit.forEach((item) => {
        state.optionsss.push(item.unit_name)
      })
      data.materielWarehouse.forEach((item) => {
        state.optionssss.push(item.warehouse_name)
      })
    }
    function handleChange(val) {
      console.log(val)
    }
    function onClickLeft() {
      root.$router.replace('/materialpage')
    }

    function propertiesonConfirm(value, index) {
      state.value = value
      state.propertieValue = index + 1
      state.isproperties = false
    }
    function propertiesnCancel() {
      state.isproperties = false
    }
    function propertiesClick() {
      state.isproperties = true
    }
    function MaterialPropertiesConfirm(value, index) {
      state.values = value
      state.materielCategory.map((item, index1) => {
        if (index1 == index) {
          state.MaterialPropertiesValue = item.id
        }
      })
      state.isMaterialProperties = false
    }
    function MaterialPropertiesCancel() {
      state.isMaterialProperties = false
    }
    function MaterialPropertiesClick() {
      state.isMaterialProperties = true
    }
    function BasicUnitConfirm(value, index) {
      state.valuess = value
      state.materielUnit.map((item, index1) => {
        if (index1 == index) {
          state.BasicUnitValue = item.id
        }
      })
      state.isBasicUnit = false
    }
    function BasicUnitCancel() {
      state.isBasicUnit = false
    }
    function BasicUnitClick() {
      state.isBasicUnit = true
    }
    function DeWarehouseConfirm(value, index) {
      state.valuesss = value
      state.materielWarehouse.map((item, index1) => {
        if (index1 == index) {
          state.DeWarehouseValue = item.id
        }
      })
      state.isDeWarehouse = false
    }
    function DeWarehouseCancel() {
      state.isDeWarehouse = false
    }
    function DeWarehouseClick() {
      state.isDeWarehouse = true
    }
    getAddMater()

    return {
      state,
      cropper,
      imgClick,
      uploadHandle,
      onClickLeft,
      onsubmit,
      propertiesClick,
      propertiesnCancel,
      propertiesonConfirm,
      MaterialPropertiesConfirm,
      MaterialPropertiesCancel,
      MaterialPropertiesClick,
      BasicUnitConfirm,
      BasicUnitCancel,
      BasicUnitClick,
      DeWarehouseConfirm,
      DeWarehouseCancel,
      DeWarehouseClick,
    }
  },
}
</script>
    
<style scoped lang="scss">
#addMaterial {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #747474;
    background-color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      font-size: 1.285714rem;
      margin-left: -1.071429rem;
      color: #030303;
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.428571rem;
    width: 100%;
    overflow: hidden;
    .box-card {
      .img_upload {
        .img_box {
          display: inline-block;
          width: 3.5rem;
          height: 3.5rem;
          background-color: #ccc;
        }
      }
      .DeliveryDate {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .lable {
          width: 4.928571rem;
          text-align: justify;
          text-align-last: justify;
          color: black;
          padding-right: 0.714286rem;
          border-right: 1px solid #e7e7e7;
        }
        .time {
          flex: 1;
          text-align: right;
        }
      }
      .ccpepolData {
        position: relative;
        padding-right: 2.5rem;
        .van-icon {
          position: absolute;
          right: 0.714286rem;
          font-size: 1.285714rem;
        }
      }

      .details {
        border: none;
        margin-bottom: 0;
      }
    }
  }
  .datetime {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
