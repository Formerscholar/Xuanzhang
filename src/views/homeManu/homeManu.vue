<template>
  <div id="homeManu">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <van-field v-model="searchData" left-icon="search" />
      </div>
    </navbar>
    <scroll class="scroll-wrapper" ref="scroll" :probe-type="3" :pull-up-load="true">
      <div class="abilitys">
        <span class="titleName">审核</span>
        <div class="abilitys_item">
          <div
            v-for="(item,index) in ExamineList"
            :key="index"
            @touchstart="touchstart"
            @touchend="touchend(item.path)"
            class="abilitys_item_list"
          >
            <svg class="icon icons" aria-hidden="true">
              <use :xlink:href="item.icon_Url" />
            </svg>
            <span :style="item.path  ?{'color':'black'}:''">{{item.title}}</span>
            <div class="nums" v-if="item.nums">{{item.nums}}</div>
          </div>
        </div>
      </div>
      <div class="abilitys">
        <span class="titleName">财务</span>
        <div class="abilitys_item">
          <div
            v-for="(item,index) in financeThisList"
            :key="index"
            @touchstart="touchstart"
            @touchend="touchend(item.path)"
            class="abilitys_item_list"
          >
            <svg class="icon icons" aria-hidden="true">
              <use :xlink:href="item.icon_Url" />
            </svg>
            <span :style="item.path?{'color':'black'}:''">{{item.title}}</span>
          </div>
        </div>
      </div>
      <div class="abilitys">
        <span class="titleName">订单</span>
        <div class="abilitys_item">
          <div
            v-for="(item,index) in Tuple5OrderList"
            :key="index"
            @touchstart="touchstart"
            @touchend="touchend(item.path)"
            class="abilitys_item_list"
          >
            <svg class="icon icons" aria-hidden="true">
              <use :xlink:href="item.icon_Url" />
            </svg>
            <span :style="item.path?{'color':'black'}:''">{{item.title}}</span>
          </div>
        </div>
      </div>
      <div class="abilitys">
        <span class="titleName">执行</span>
        <div class="abilitys_item">
          <div
            v-for="(item,index) in implementList"
            :key="index"
            @touchstart="touchstart"
            @touchend="touchend(item.path)"
            class="abilitys_item_list"
          >
            <svg class="icon icons" aria-hidden="true">
              <use :xlink:href="item.icon_Url" />
            </svg>
            <span :style="item.path?{'color':'black'}:''">{{item.title}}</span>
          </div>
        </div>
      </div>
      <div class="abilitys">
        <span class="titleName">采购</span>
        <div class="abilitys_item">
          <div
            v-for="(item,index) in PurchaseTotalList"
            :key="index"
            @touchstart="touchstart"
            @touchend="touchend(item.path)"
            class="abilitys_item_list"
          >
            <svg class="icon icons" aria-hidden="true">
              <use :xlink:href="item.icon_Url" />
            </svg>
            <span :style="item.path?{'color':'black'}:''">{{item.title}}</span>
          </div>
        </div>
      </div>
      <div class="abilitys">
        <span class="titleName">生产</span>
        <div class="abilitys_item">
          <div
            v-for="(item,index) in productionsList"
            :key="index"
            @touchstart="touchstart"
            @touchend="touchend(item.path)"
            class="abilitys_item_list"
          >
            <svg class="icon icons" aria-hidden="true">
              <use :xlink:href="item.icon_Url" />
            </svg>
            <span :style="item.path?{'color':'black'}:''">{{item.title}}</span>
          </div>
        </div>
      </div>
      <div class="abilitys">
        <span class="titleName">计件考核</span>
        <div class="abilitys_item">
          <div
            v-for="(item,index) in PieceworkList"
            :key="index"
            @touchstart="touchstart"
            @touchend="touchend(item.path)"
            class="abilitys_item_list"
          >
            <svg class="icon icons" aria-hidden="true">
              <use :xlink:href="item.icon_Url" />
            </svg>
            <span :style="item.path?{'color':'black'}:''">{{item.title}}</span>
          </div>
        </div>
      </div>
    </scroll>
    <van-popup v-model="popupshow" position="bottom" :style="{ height: '10%' }">
      <div class="text_rap">
        <div class="text" @click="popupClick">添加到首页</div>
      </div>
    </van-popup>
  </div>
</template>
    
<script>
import { getSettlementRecordList, getPaymentRecordList } from '@/network/deal'

export default {
  data() {
    return {
      popupshow: false,
      PieceworkList: [
        {
          icon_Url: '#icon-jinrongleiicontubiao-30',
          title: '计价列表',
          path: '/PieceworkList',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-30',
          title: '工序计件',
          path: '/Processpiecework',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-30',
          title: '简易计件',
          path: '/Simplepiecework',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-1',
          title: '我的计件',
          path: '/MyPiecework',
        },
      ],
      financeThisList: [
        {
          icon_Url: '#icon-jinrongleiicontubiao-17',
          title: '报销',
          path: '/reimbursement',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-16',
          title: '提现',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-25',
          title: '收款',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-26',
          title: '付款',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-20',
          title: '对账单',
        },
        {
          icon_Url: '#icon-hetongguanlixitong',
          title: '公司流水',
          path: '/Companyflow',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-31',
          title: '统计报表',
        },
      ],
      Tuple5OrderList: [
        {
          icon_Url: '#icon-wodeshenpi',
          title: '新建合同',
          path: '/create-contract',
        },
        {
          icon_Url: '#icon-gongchengyuguidang',
          title: '发起代工',
          path: '/oem',
        },
        {
          icon_Url: '#icon-jiadaxiuguanlixitong',
          title: '售后',
        },
      ],
      implementList: [
        {
          icon_Url: '#icon-jinrongleiicontubiao-1',
          title: '生产质检',
        },
        {
          icon_Url: '#icon-xiangmurenwu',
          title: '领料',
          path: '/MaterialReturn',
        },
        {
          icon_Url: '#icon-renlikaoqin',
          title: '退料',
          path: '/picking',
        },
        {
          icon_Url: '#icon-gongchengjiansheanquanpaicha',
          title: '盘库',
          path: '/Inventory',
        },
        {
          icon_Url: '#icon-renlikaoqin',
          title: '任务管理',
          path: '/mission',
        },
        {
          icon_Url: '#icon-Glink',
          title: '流水发货',
          path: '/Ship',
        },
        {
          icon_Url: '#icon-appointment',
          title: '合同发货',
          path: '/ContractDelivery',
        },
        {
          icon_Url: '#icon-txt',
          title: '物料入库',
          path: '/warehouse',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-25',
          title: '合同收货',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-25',
          title: '等待发货',
          path: '/shipments',
        },
      ],
      PurchaseTotalList: [
        {
          icon_Url: '#icon-jinrongleiicontubiao-10',
          title: '采购合同',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-29',
          title: '发起委外',
          path: '/outsource',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-23',
          title: '采购计划',
        },
        {
          icon_Url: '#icon-yycg',
          title: '物料进度',
        },
        {
          icon_Url: '#icon-wodedaiban',
          title: '委外进度',
        },
      ],
      ExamineList: [
        {
          icon_Url: '#icon-jinrongleiicontubiao-18',
          title: '合同收款',
          path: '/ContractCollection',
          nums: 0,
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-7',
          title: '流水收款',
          path: '/CurrentCollection',
          nums: 0,
        },
        {
          icon_Url: '#icon-PDF',
          title: '代工收款',
          path: '/CollectionOEM',
          nums: 0,
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-21',
          title: '其他收款',
          path: '/OtherCollection',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-7',
          title: '委外付款',
          path: '/Outsourcingpayment',
          nums: 0,
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-18',
          title: '采购付款',
          path: '/Purchasepayment',
          nums: 0,
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-18',
          title: '工资汇总',
          path: '/Payrollsummary',
          nums: 0,
        },
      ],
      productionsList: [
        {
          icon_Url: '#icon-yunkanban',
          title: '合同进度',
          path: '/contractScreen',
        },
        {
          icon_Url: '#icon-xiaobaiban',
          title: '流水进度',
          path: '/flowScreen',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-30',
          title: '代工进度',
          path: '/oemScreen',
        },
      ],
      searchData: '',
      activeNames: ['1'],
      timer: null,
      isCLICK: true,
      isFunc: true,
    }
  },
  activated() {
    this.getSettlementRecord()
    this.getPaymenList()
  },
  methods: {
    popupClick() {
      this.popupshow = false
    },
    touchstart() {
      clearTimeout(this.timer)
      this.isCLICK = true
      this.timer = setTimeout(() => {
        this.isCLICK = false
      }, 500)
    },
    touchend(path) {
      clearTimeout(this.timer)
      if (this.isCLICK) {
        this.jumpPage(path)
      } else {
        this.popupshow = true
        this.isCLICK = true
      }
    },
    blacknext() {
      this.$router.replace('/home')
    },
    jumpPage(path) {
      this.$router.replace(path)
    },
    async getPaymenList() {
      const { data } = await getPaymentRecordList({
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        order_type: 'outsourcing',
        supplier_id: 0,
        start_date: null,
        end_date: null,
        _: new Date().getTime(),
      })
      const { paymentO, paymentM } = data
      console.log(paymentO, paymentM)
      this.ExamineList.map((item) => {
        if (item.title == '委外付款') {
          item.nums = paymentO
        } else if (item.title == '采购付款') {
          item.nums = paymentM
        }
      })
    },
    async getSettlementRecord() {
      const { data } = await getSettlementRecordList({
        token: this.$store.state.token,
        page: 1,
        offset: 20,
        order_type: 'contract',
        distributor_id: 0,
        start_date: null,
        end_date: null,
        _: new Date().getTime(),
      })
      const { settlementC, settlementF, settlementO } = data
      console.log(settlementC, settlementF, settlementO)
      this.ExamineList.map((item) => {
        if (item.title == '合同收款') {
          item.nums = settlementC
        } else if (item.title == '流水收款') {
          item.nums = settlementF
        } else if (item.title == '代工收款') {
          item.nums = settlementO
        }
      })
    },
  },
}
</script>
    
<style scoped lang="scss">
#homeManu {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #000;
    background-color: #fff;
    border: none;
    box-shadow: none;
    z-index: 10;
    .left {
      margin-left: 1.071429rem;
    }
    /deep/.center {
      flex: 1;
    }
    .center {
      margin-right: 12px;
      font-size: 1.285714rem;

      /deep/.van-cell {
        background-color: #f2f2f2;
        border-radius: 0.357143rem;
        overflow: hidden;
        padding: 0.214286rem 1.142857rem;
      }
    }
  }
  .scroll-wrapper {
    position: absolute;
    left: 0;
    top: 5.428571rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    padding: 0.714286rem;

    .abilitys {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: left;
      align-items: center;
      padding: 0 0.714286rem;
      .titleName {
        color: #000;
        font-size: 1.142857rem;
      }
      .abilitys_item {
        width: 100%;
        padding: 0.357143rem;
        .abilitys_item_list {
          float: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 1;
          width: 20%;
          margin-bottom: 0.714286rem;
          padding-top: 0.714286rem;
          overflow: hidden;
          position: relative;
          color: rgba(0, 0, 0, 0.65);
          .nums {
            width: 1.428571rem;
            height: 1.428571rem;
            text-align: center;
            line-height: 1.428571rem;
            font-size: 1rem;
            color: #f6f6f6;
            background-color: #fc5c65;
            border-radius: 50%;
            position: absolute;
            top: 0;
            right: 0.5rem;
          }

          .icons {
            font-size: 2rem;
            height: 2.5rem;
            width: 2.5rem;
          }
          span {
            margin-top: 0.142857rem;
            font-size: 0.857143rem;
          }
        }
      }
    }
  }
  .van-popup {
    display: flex;
    justify-content: center;
    align-items: center;

    .text_rap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .text {
        font-size: 1.571429rem;
        border: 1px dashed #4293c8;
        color: #4293c8;
        padding: 0.428571rem 4.285714rem;
        border-radius: 0.357143rem;
      }
    }
  }
}
</style>
