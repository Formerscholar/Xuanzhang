<template>
  <div id="bompage">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>bom</span>
      </div>
      <div slot="right" class="right" @click="bomparallel">
        <span>同步</span>
      </div>
    </navbar>
    <el-card class="box-card" style="margin-bottom:.357143rem;">
      <el-row class="searchBar van-cell">
        <span>零件名称</span>
        <el-autocomplete
          v-model="inputvalue"
          :fetch-suggestions="querySearchAsync"
          @select="handleSelect"
        ></el-autocomplete>
        <van-button type="primary" @click="btnClick">提交</van-button>
      </el-row>
      <van-field v-model="digitnum" type="digit" label="零件数量" />
    </el-card>
    <el-card class="box-card" style="margin-bottom:.357143rem;">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="物料编码"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="address" label="规格"></el-table-column>
        <el-table-column prop="nums" label="数量"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
    
<script>
import {
  getAddSpareParts,
  getMaterielBoom,
  addSpareParts,
  synchronizationBoom,
} from '@/network/materials'

export default {
  name: 'bompage',
  data() {
    return {
      iid: 0,
      digitnum: 0,
      inputvalue: '',
      restaurants: [],
      inputID: '',
      timeout: null,
      tableData: [],
    }
  },
  created() {
    this.getAddSpare()
    this.iid = this.$route.params.id
    this.getMaterielbom()
    document.querySelectorAll('input').forEach((item) => {
      item.style.border = 'none'
    })
  },
  destroyed() {
    this.iid = 0
    this.digitnum = 0
    this.inputvalue = ''
    this.restaurants = []
    this.inputID = ''
    this.timeout = null
    this.tableData = []
  },
  computed: {
    getAddSpareData() {
      return {
        token: this.$store.state.token,
        _: new Date().getTime(),
      }
    },
    getMaterielBoomData() {
      return {
        token: this.$store.state.token,
        materiel_id: this.iid,
        _: new Date().getTime(),
      }
    },
    addSparePartsData() {
      return {
        token: this.$store.state.token,
        materiel_id: this.iid,
        spare_parts_id: this.inputID,
        count: this.digitnum,
      }
    },
    synchronizationData() {
      return {
        token: this.$store.state.token,
        materiel_id: this.iid,
      }
    },
  },
  methods: {
    async bomparallel() {
      const { code, msg } = await synchronizationBoom(this.synchronizationData)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.blacknext()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async btnClick() {
      const { code, msg } = await addSpareParts(this.addSparePartsData)
      if (code == 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success',
        })
        this.getMaterielbom()
      } else {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error',
        })
      }
    },
    async getMaterielbom() {
      const { data } = await getMaterielBoom(this.getMaterielBoomData)
      console.log('getMaterielBoom', data)
      data.getMaterielBoom.forEach((item) => {
        let obj = {
          date: item.id,
          name: item.name,
          address: item.specification,
          nums: item.count,
        }
        this.tableData.push(obj)
      })
    },
    async getAddSpare() {
      const { data } = await getAddSpareParts(this.getAddSpareData)
      console.log('getAddSpareParts', data)
      data.materielSpareParts.forEach((item) => {
        let obj = {
          address: item.id,
          value: item.name,
        }
        this.restaurants.push(obj)
      })
    },
    blacknext() {
      this.$router.go(-1)
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
      this.inputID = item.address
      console.log(this.inputID)
    },
  },
}
</script>
    
<style scoped lang="scss">
#bompage {
  padding-top: 5.428571rem;

  .p_root_box {
    color: #fff;
    border: none;
    box-shadow: none;

    .left {
      margin-left: 1.071429rem;
    }
    .center {
      font-size: 1.285714rem;
      margin-left: 0.428571rem;
    }
    .right {
      font-size: 1.285714rem;
      margin-right: 1.071429rem;
    }
  }
  .box-card {
    .searchBar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-autocomplete {
        flex: 1;
        padding: 0 0.357143rem;
      }
    }
  }
}
</style>
