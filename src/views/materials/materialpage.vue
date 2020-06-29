<template>
  <div id="materialpage">
    <div class="head">
      <van-icon name="arrow-left" class="head_icon" @click="onClickLeft" />
      <van-search class="head_search" v-model="searchValue" placeholder="请输入搜索关键词" />
    </div>
    <van-tabs v-model="active">
      <van-tab title="物料列表" class="Delivery">
        <scroll class="scroll-wrapper">
          <van-swipe-cell v-for="(item,index) in materielList" :key="index">
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
            <template #right>
              <div class="content_right">
                <van-button
                  square
                  text="查看"
                  type="primary"
                  class="delete-button"
                  @click="ViewClick(item.id)"
                />
                <van-button
                  square
                  text="修改"
                  type="danger"
                  class="delete-button"
                  @click="editClick(item.id)"
                />
              </div>
            </template>
          </van-swipe-cell>
        </scroll>
      </van-tab>
      <van-tab title="废弃物料">废弃物料</van-tab>
      <van-tab title="临时物料">临时物料</van-tab>
    </van-tabs>
    <i class="el-icon-plus" @click="addMaterial"></i>
  </div>
</template>
    
<script>
import { getMaterielList } from '@/network/materials'
import scroll from '@/components/common/scroll/scroll'

export default {
  name: 'materialpage',
  data() {
    return {
      active: 0,
      searchValue: '',
      materielList: []
    }
  },
  components: { scroll },
  activated() {
    this.getMaterie()
    document.querySelector('#tab-bar').style.height = '0px'
    document.querySelector('#app').style.padding = '0px'
  },
  deactivated() {
    document.querySelector('#app').style.paddingTop = '62px'
    document.querySelector('#app').style.paddingBottom = '59px'
    document.querySelector('#tab-bar').style.height = '59px'
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
    }
  },
  methods: {
    editClick(id) {
      this.$router.push(`/editMaterial/${id}/1`)
    },
    ViewClick(id) {
      this.$router.push(`/editMaterial/${id}/0`)
    },
    addMaterial() {
      this.$router.push('/addMaterial')
    },
    async getMaterie() {
      const { data } = await getMaterielList(this.getMaterielData)
      console.log('getMaterielList', data)
      this.materielList = data.materielList
    },
    onClickLeft() {
      this.$router.go(-1)
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
  .head {
    display: flex;
    padding: 0 0.357143rem;
    padding-top: 1.928571rem;
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
    height: calc(100vh - 7rem);
    .scroll-wrapper {
      position: absolute;
      left: 0;
      right: 0;
      top: 3.571429rem;
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
