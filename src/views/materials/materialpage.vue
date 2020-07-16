<template>
  <div id="materialpage">
    <div class="topheader bg-primary"></div>
    <div class="head">
      <van-icon name="arrow-left" class="head_icon" @click="onClickLeft" />
      <van-search
        class="head_search"
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        @search="primarySearch"
      />
    </div>
    <van-tabs v-model="active">
      <van-tab title="物料列表" class="Delivery">
        <scroll class="scroll-wrapper">
          <van-swipe-cell v-for="(item,index) in materielList" :key="index">
            <template #left>
              <van-button
                square
                text="bom"
                type="primary"
                style="height: 4.714286rem;width: 4.571429rem;"
                @click="tobomPage(item.id)"
              />
            </template>
            <div @click="editClick(item.id)">
              <el-card class="box-card">
                <div class="topbox">
                  <span>
                    {{item.scope_of_business}}
                    <em>产品</em>
                  </span>
                  <i>品名:{{item.name}} 规格:{{item.specification}}</i>
                </div>
                <div class="botbox">
                  <span class="black">{{item.stock}}{{item.unit_name}}</span>
                  <em>库位:{{item.warehouse_position}}</em>
                </div>
              </el-card>
            </div>
            <template #right>
              <van-button
                square
                text="废弃"
                type="danger"
                style="height: 4.714286rem;width: 4.571429rem;"
                @click="Abandoned(item.id)"
              />
            </template>
          </van-swipe-cell>
        </scroll>
      </van-tab>
      <van-tab title="临时物料" class="Delivery">
        <scroll class="scroll-wrapper">
          <van-swipe-cell v-for="(item,index) in Temporary" :key="index">
            <template #left>
              <van-button
                square
                text="废弃"
                type="danger"
                style="height: 4.714286rem;width: 4.571429rem;"
                @click="Abandonedss(item)"
              />
            </template>
            <div>
              <el-card class="box-card">
                <div class="topbox">
                  <span>
                    {{item.scope_of_business}}
                    <em>产品</em>
                  </span>
                  <i>品名:{{item.name}} 规格:{{item.specification}}</i>
                </div>
                <div class="botbox">
                  <span class="black">{{item.stock}}{{item.unit_name}}</span>
                  <em>库位:{{item.warehouse_position}}</em>
                </div>
              </el-card>
            </div>
            <template #right>
              <van-button
                square
                text="使用"
                type="info"
                style="height: 4.714286rem;width: 4.571429rem;"
                @click="uses(item)"
              />
            </template>
          </van-swipe-cell>
        </scroll>
      </van-tab>
    </van-tabs>
    <i class="el-icon-plus" @click="addMaterial"></i>
  </div>
</template>
    
<script>
import { getMaterielList, editMaterielStatus } from '@/network/materials'
import scroll from '@/components/common/scroll/scroll'

export default {
  name: 'materialpage',
  data() {
    return {
      active: 0,
      searchValue: '',
      materielList: [],
      Temporary: []
    }
  },
  components: {
    scroll
  },
  activated() {
    this.getMaterie()
    this.getTemporary()
  },
  deactivated() {
    this.materielList = []
    this.Temporary = []
  },
  computed: {
    getMaterielData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        materiel_name: null,
        specification: null,
        materiel_status: 'normal',
        _: new Date().getTime()
      }
    },
    getTemporaryData() {
      return {
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        materiel_name: null,
        specification: null,
        materiel_status: 'wait_check',
        _: new Date().getTime()
      }
    }
  },
  methods: {
    async primarySearch(value) {
      let datamateriel_status
      if (this.active == 0) {
        datamateriel_status = 'normal'
      } else if (this.active == 1) {
        datamateriel_status = 'wait_check'
      }
      const { data, code, msg } = await getMaterielList({
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        materiel_name: value,
        specification: null,
        materiel_status: datamateriel_status,
        _: new Date().getTime()
      })
      if (code == 200) {
        if (this.active == 0) {
          this.materielList = data.materielList
        } else if (this.active == 1) {
          this.Temporary = data.materielList
        }

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
    },
    tobomPage(id) {
      this.$router.push(`/bompage/${id}`)
    },
    async uses(data) {
      const { code, msg } = await editMaterielStatus({
        token: this.$store.state.token,
        id: data.id,
        materiel_status: 'normal',
        name: data.name,
        specification: data.specification,
        attribute: data.attribute,
        materiel_category_id: 8,
        unit_id: 9
      })
      if (code == 200) {
        this.materielList = []
        this.getMaterie()
        this.Temporary = []
        this.getTemporary()
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
    },
    async Abandonedss(data) {
      const { code, msg } = await editMaterielStatus({
        token: this.$store.state.token,
        id: data.id,
        materiel_status: 'discard',
        name: data.name,
        specification: data.specification,
        attribute: data.attribute,
        materiel_category_id: data.materiel_category_id,
        unit_id: data.unit_id
      })
      if (code == 200) {
        this.materielList = []
        this.getMaterie()
        this.Temporary = []
        this.getTemporary()
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
    },
    async Abandoned(id) {
      const { code, msg } = await editMaterielStatus({
        token: this.$store.state.token,
        id: id,
        materiel_status: 'discard',
        name: null,
        specification: null,
        attribute: 'product',
        materiel_category_id: null,
        unit_id: null
      })
      if (code == 200) {
        this.materielList = []
        this.getMaterie()
        this.Temporary = []
        this.getTemporary()
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
    },
    editClick(id) {
      this.$router.push(`/editMaterial/${id}/1`)
    },
    addMaterial() {
      this.$router.push('/addMaterial')
    },
    async getMaterie() {
      const { data } = await getMaterielList(this.getMaterielData)
      console.log('getMaterielList', data)
      this.materielList = data.materielList
    },
    async getTemporary() {
      const { data } = await getMaterielList(this.getTemporaryData)
      console.log('Temporary', data)
      this.Temporary = data.materielList
    },
    onClickLeft() {
      this.$router.replace('/home')
    },
    onClickRight() {
      console.log('搜索')
    }
  }
}
</script>

<style lang="scss">
.van-tabs__line {
  background-color: #3390ff;
}
</style>

    
<style scoped lang="scss">
#materialpage {
  .topheader {
    height: 1.928571rem;
  }
  .head {
    display: flex;
    padding: 0 0.357143rem;
    justify-content: space-between;
    align-items: center;
    .head_icon {
      font-size: 1.428571rem;
      padding-left: 10px;
    }
    .head_search {
      flex: 1;
    }
  }
  .Delivery {
    height: calc(100vh - 8.928571rem);
    .scroll-wrapper {
      position: absolute;
      left: 0;
      right: 0;
      top: 3.142857rem;
      bottom: 0;
      width: 100%;
      overflow: hidden;
      .content_right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .van-button {
          height: 2.357143rem !important;
        }
      }
    }
    .box-card {
      margin-bottom: 0.571429rem;
      .topbox {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        span {
          font-size: 0.857143rem;
          color: #ff9d17;
          font-weight: 700;
          em {
            color: #acacac;
            padding-left: 0.571429rem;
            font-weight: normal;
          }
        }
        i {
          font-size: 1rem;
          font-weight: 700;
          color: #000;
        }
      }
      .botbox {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 0.857143rem;
        margin-top: 0.714286rem;
        span {
          font-weight: 700;
        }
        .black {
          color: #000000;
        }
        .red {
          color: red;
        }
        em {
          color: #acacac;
        }
      }
    }
  }
  .el-icon-plus {
    position: fixed;
    bottom: 3.142857rem;
    right: 2.357143rem;
    padding: 0.571429rem;
    z-index: 999;
    font-size: 2.714286rem;
    background-color: #2a7bd0;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
