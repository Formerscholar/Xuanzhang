<template>
  <div id="because">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="clearData">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center" style="color: #646566;">
        <span>补全物料信息</span>
      </div>
      <div slot="right">
        <!-- <van-icon name="success" /> -->
      </div>
    </navbar>
    <div class="content">
      <van-field v-model="materialName" label="物料名称" />
      <van-field v-model="materials" label="物料规格" />
      <div class="select_box van-cell">
        <span class="van-field__label">物料属性</span>
        <el-select v-model="materialProperties">
          <el-option
            v-for="item in materialPropertiesoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="select_box van-cell">
        <span class="van-field__label">物料分类</span>
        <el-select v-model="declassification">
          <el-option
            v-for="item in declassificationoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="select_box van-cell">
        <span class="van-field__label">基本单位</span>
        <el-select v-model="UnitComponent">
          <el-option
            v-for="item in UnitComponentoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
    
<script>
import { getEditMaterielStatus, editMaterielStatus } from '@/network/materials'

export default {
  data() {
    return {
      iid: 0,
      materialName: '',
      materials: '',
      materialPropertiesoptions: [
        {
          value: '0',
          label: '产品',
        },
        {
          value: '1',
          label: '零件',
        },
      ],
      materialProperties: '',
      declassificationoptions: [],
      declassification: '',
      UnitComponentoptions: [],
      UnitComponent: '',
    }
  },
  created() {
    this.iid = this.$route.params.iid
    this.getEditMateriel()
  },
  destroyed() {
    this.submit()
    this.iid = 0
    this.materialName = ''
    this.materials = ''
    this.materialPropertiesoptions = []
    this.materialProperties = ''
    this.declassificationoptions = []
    this.declassification = ''
    this.UnitComponentoptions = []
    this.UnitComponent = ''
  },
  computed: {
    getEditMaterielData() {
      return {
        token: this.$store.state.token,
        id: this.iid,
      }
    },
  },
  methods: {
    async submit() {
      let attribute = !this.declassification ? 'product' : 'spare_parts'
      const { code, msg } = await editMaterielStatus({
        token: this.$store.state.token,
        id: this.iid,
        materiel_status: 'normal',
        name: this.materialName,
        specification: this.materials,
        attribute,
        materiel_category_id: this.declassification,
        unit_id: this.UnitComponent,
      })
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
    async getEditMateriel() {
      const { data } = await getEditMaterielStatus(this.getEditMaterielData)
      console.log('getEditMaterielStatus', data)
      this.materialName = data.materiel[0].name
      this.materials = data.materiel[0].specification
      if (data.materiel[0].attribute == 'product') {
        this.materialProperties = '1'
      } else {
        this.materialProperties = '2'
      }
      data.materielCategory.forEach((item) => {
        let obj = {
          value: item.id,
          label: item.category_name,
        }
        this.declassificationoptions.push(obj)
      })
      data.materielUnit.forEach((item) => {
        let obj = {
          value: item.id,
          label: item.unit_name,
        }
        this.UnitComponentoptions.push(obj)
      })
    },
    submitClick() {
      console.log('ok')
    },
    clearData() {
      this.$router.go(-1)
    },
  },
}
</script>
    
<style scoped lang="scss">
#because {
  padding-top: 5.428571rem;
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
      margin-left: -3.071429rem;
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
  .content {
    .select_box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .van-field__label {
        margin-right: 0;
      }
      .el-select {
        flex: 1;
      }
    }
  }
}
</style>
