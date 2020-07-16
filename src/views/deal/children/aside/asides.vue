<template>
  <div id="aside">
    <scroll
      class="scroll-wrapper"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <van-tabs v-model="active" animated @click="tacheClick">
        <van-tab title="入库清单" class="Delivery">
          <div
            v-for="(item, index) in warehouseAccessList"
            :key="index"
            @click="listClick(item)"
            @touchstart.prevent="touchin"
            @touchend.prevent="cleartime"
          >
            <el-card class="box-card">
              <div class="topbox">
                <span>
                  {{ item.order_number }}
                  <em>操作:{{ item.operator_name }}</em>
                </span>
                <i @click.stop="gotodetails(item.supplier_id)">{{ item.name_alias }}</i>
              </div>
              <div class="botbox">
                <span
                  :class="item.total_price.indexOf('-') == -1 ? 'black' : 'red'"
                >{{ item.total_price }}</span>
                <em>发货时间:{{ item.apply_time }}</em>
              </div>
            </el-card>
          </div>
        </van-tab>
        <van-tab title="明细列表" class="Detailed">
          <el-card class="box-card items" v-for="(item,index) in flowOrderList" :key="index">
            <div class="coutent">
              <div class="leftbox">
                <img src="@/assets/image/logo.png" />
              </div>
              <div class="rightbox">
                <div class="timer">
                  <div class="leftitem">{{item.order_number}}</div>
                  <div class="rightitem">{{item.name_alias}}</div>
                </div>
                <div class="article">
                  <div class="leftitem">{{item.materiel_name}}</div>
                  <div class="rightitem">交期:{{item.apply_time}}</div>
                </div>
                <div class="literature">
                  <div class="leftitem">{{item.materiel_model}}</div>
                  <div class="rightitem">数量:{{item.number}}</div>
                </div>
              </div>
            </div>
          </el-card>
        </van-tab>
      </van-tabs>
    </scroll>
    <van-action-sheet
      v-model="show"
      @click-overlay="closedClick"
      @cancel="closedClick"
      :close-on-click-action="true"
      :close-on-popstate="true"
      @select="onSelect"
      @open="openClick"
      :actions="actions"
      cancel-text="取消"
      safe-area-inset-bottom
    />
    <i class="el-icon-plus" @click="show = !show" v-if="isShow" slot="reference"></i>
    <i class="el-icon-plus" @click="createAddbill" v-else></i>
    <van-overlay :show="overlayShow" @click="overlayShow = false" lock-scroll>
      <div id="wrapper-click">
        <div id="block">
          <div class="propDivItem" @click="editlists">编辑</div>
          <div class="propDivItem" @click="VoidList">作废</div>
          <div class="propDivItem" @click="printList">打印</div>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="myVqrShow" @click="myVqrShow = false">
      <div class="wrapper-qrCode">
        <myVqr :Content="textContent"></myVqr>
      </div>
    </van-overlay>
  </div>
</template>
    
<script>
import {
  getWarehouseLists,
  getWarehouseDetailList,
  delWarehouseRecord
} from '@/network/deal'
import scroll from '@/components/common/scroll/scroll'
import myVqr from '@/components/common/my_vqr/myVqr'
import { bestURL } from '@/network/baseURL'

export default {
  components: { scroll, myVqr },
  data() {
    return {
      active: 0,
      warehouseAccessList: [],
      flowOrderList: [],
      isShow: true,
      visible: false,
      show: false,
      actions: [{ name: '入库' }, { name: '退货' }],
      allIndex: 1,
      Library: 1,
      detail: 1,
      overlayShow: false,
      listIsShow: false,
      myVqrShow: false,
      textContent: '',
      iid: 0
    }
  },
  computed: {
    getDeliverGoodsListData() {
      return {
        token: this.$store.state.token,
        page: this.allIndex,
        offset: 20,
        supplier_id: null,
        _: new Date().getTime()
      }
    },
    deleteContractOrderData() {
      const form = new FormData()
      form.append('token', this.$store.state.tonken)
      form.append('id', this.iid)
      return form
    }
  },
  activated() {
    this.allIndex = 1
    this.Library = 1
    this.detail = 1
    this.getDeliverLists()
    this.getFlowOrderLists()
  },
  deactivated() {
    this.warehouseAccessList = []
    this.flowOrderList = []
    this.iid = 0
    this.textContent = ''
  },
  methods: {
    editlists() {
      this.$router.push(`/editwarehouse/${this.iid}`)
      this.show = false
    },
    async VoidList() {
      this.show = false
      const { msg } = await delWarehouseRecord(this.deleteContractOrderData)
      this.$toast(msg)
    },
    printList() {
      this.overlayShow = false
      this.myVqrShow = true
      this.textContent = `${bestURL}/view/html/run/warehouse_print.php?id=${this.iid}`
    },
    listClick(item) {
      this.iid = item.id
      if (!this.listIsShow) {
        this.listIsShow = false
      } else {
        this.listIsShow = false
        console.log(item)
        this.overlayShow = true
      }
    },
    touchin() {
      clearInterval(this.Loop)
      this.Loop = setTimeout(() => {
        this.listIsShow = true
      }, 500)
    },
    cleartime() {
      clearInterval(this.Loop)
    },
    loadMore() {
      if (this.isShow) {
        this.Library += 1
        this.allIndex = this.Library
        this.getDeliverLists()
      } else {
        this.detail += 1
        this.allIndex = this.detail
        this.getFlowOrderLists()
      }
      this.$refs.scroll.finishPullUp()
    },
    onSelect(item) {
      this.show = false
      setTimeout(() => {
        if (item.name == '入库') {
          this.$router.push('/warehouse')
        } else if (item.name == '退货') {
          this.$router.push('/warehouseRet')
        }
      }, 10)
      this.closedClick()
    },
    gotodetails(id) {
      this.$router.push(`/storageCom/${id}`)
    },
    async getDeliverLists() {
      const { data } = await getWarehouseLists(this.getDeliverGoodsListData)
      console.log('getWarehouseLists', data)
      data.warehouseAccessList.map(item => {
        this.warehouseAccessList.push(item)
      })
    },
    createAddbill() {
      this.$router.push('/addbillwl')
    },
    async getFlowOrderLists() {
      const { data } = await getWarehouseDetailList(
        this.getDeliverGoodsListData
      )
      console.log('getFlowOrderList', data)
      data.warehouseAccessList.map(item => {
        this.flowOrderList.push(item)
      })
    },
    tacheClick(name, title) {
      console.log(name)
      if (name) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    openClick() {
    },
    closedClick() {
    }
  }
}
</script>
    
<style scoped lang="scss">
#aside {
  #wrapper-click {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100% !important;
    #block {
      width: 14.285714rem;
      height: 14.285714rem;
      background-color: #fff;
      .propDivItem {
        width: 100%;
        height: 33.33%;
        line-height: 4.857143rem;
        text-align: center;
        font-size: 1.428571rem;
        color: #888;
      }
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 4.214286rem;
    width: 100%;
    overflow: hidden;
  }
  .van-tabs {
    .Delivery {
      padding: 0.571429rem 1rem;
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

    .Detailed {
      padding: 0.571429rem 1rem;
      .box-card {
        margin-bottom: 0.571429rem;
        ul {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          li {
            width: 50%;
            height: 5.571429rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding: 1.014286rem;
            span {
              color: #9b9b9b;
            }
            em {
              font-weight: 700;
              font-style: normal;
              font-size: 1.142857rem;
            }
          }
        }
      }
      .items {
        margin-bottom: 0.571429rem;
        .coutent {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .leftbox {
          width: 5.928571rem;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
        }
        .rightbox {
          flex: 1;
          margin-left: 1rem;
          .timer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            font-size: 1rem;
            .leftitem {
              color: #fd9500;
              font-weight: 700;
            }
            .rightitem {
            }
          }
          .article {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin: 1.057143rem 0;
            .leftitem {
              font-weight: 700;
              font-size: 1rem;
              color: #9a9a9a;
            }
            .rightitem {
              font-size: 1rem;
              em {
                font-size: 0.571429rem;
              }
            }
          }
          .literature {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            .leftitem {
              font-size: 1rem;
              color: #aeaeae;
            }
            .rightitem {
              font-size: 1.142857rem;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
  .el-icon-plus {
    position: fixed;
    bottom: 7.142857rem;
    right: 3.357143rem;
    padding: 0.571429rem;
    z-index: 999;
    font-size: 2.714286rem;
    background-color: #2a7bd0;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
