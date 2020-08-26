<template>
  <div id="homeManu">
    <navbar class="p_root_box bg-primary">
      <div class="left" slot="left" @click="blacknext">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="center" slot="center">
        <span>我的应用</span>
      </div>
      <div slot="right"></div>
    </navbar>
    <div class="ability">
      <span class="titleName">全部应用</span>
      <ul class="ability_item">
        <li v-for="(item,index) in abilityList" :key="index">
          <div @click="jumpPage(item.path)" class="ability_item_list">
            <svg class="icon icons" aria-hidden="true">
              <use :xlink:href="item.icon_Url" />
            </svg>
            <span>{{item.title}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      abilityList: [
        {
          icon_Url: '#icon-8shipinhuiyi',
          title: '委外入库',
          path: '/deal/outsourcing',
        },
        {
          icon_Url: 'icon-daishouhuo',
          title: '代工发货',
          path: '/oem',
        },
        {
          icon_Url: 'icon-ziyuan140',
          title: '流水发货',
          path: '/Ship',
        },

        {
          icon_Url: 'icon-ziyuan138',
          title: '新增流水',
          path: '/addbill',
        },

        {
          icon_Url: 'icon-ziyuan138',
          title: '新建合同',
          path: '/create-contract',
        },
        {
          icon_Url: 'icon-ziyuan138',
          title: '发起委外',
          path: '/outsource',
        },
        {
          icon_Url: 'icon-ziyuan140',
          title: '合同发货',
          path: '/ContractDelivery',
        },
        {
          icon_Url: 'icon-ziyuan140',
          title: '来料发货',
          path: '/IncomingDelivery',
        },
        {
          icon_Url: 'icon-shujuxiazai-01',
          title: '委外收货',
          path: '/Outsourc/outsourcing',
        },
        {
          icon_Url: 'icon-ziyuan138',
          title: '生产任务',
          path: '/LargeScreen',
        },

        {
          icon_Url: 'icon-ziyuan140',
          title: '任务管理',
        },
        {
          icon_Url: 'icon-shujuxiazai-01',
          title: '合同收货',
        },
        {
          icon_Url: 'icon-zonghebaobiao-01',
          title: '流水计划',
        },
        {
          icon_Url: 'icon-ziyuan146',
          title: '统计报表',
        },
        {
          icon_Url: 'icon-kefu',
          title: '售后',
        },
        {
          icon_Url: 'icon-zhaogongshichang',
          title: '计件考核',
        },
        {
          icon_Url: 'icon-tuikuanshouhou',
          title: '提现操作',
        },
        {
          icon_Url: 'icon-ziyuan142',
          title: '检验考核',
        },
        {
          icon_Url: 'icon-daifahuo',
          title: '收货质检',
        },
        {
          icon_Url: 'icon-ziyuan140',
          title: '盘库',
        },
        {
          icon_Url: 'icon-ziyuan140',
          title: '领料',
        },
        {
          icon_Url: 'icon-ziyuan140',
          title: '退料',
        },
        // {
        //   icon_Url: 'icon-lvyoumenpiao',
        //   title: '开据发票',
        // },
      ],
    }
  },
  methods: {
    blacknext() {
      this.$router.replace('/home')
    },
    jumpPage(path) {
      this.$router.replace(path)
    },
  },
}
</script>
    
<style scoped lang="scss">
#homeManu {
  padding-top: 5.428571rem;
  .p_root_box {
    color: #fff;
    border: none;
    box-shadow: none;
    z-index: 10;
    .left {
      margin-left: 1.071429rem;
    }
    .center {
      margin-left: -2.071429rem;
      font-size: 1.285714rem;
    }
  }
  .ability {
    border-bottom: 3px solid #f5f5f5;
    width: 100%;
    padding: 0.357143rem;
    display: flex;
    flex-wrap: wrap;
    background-color: #f5f5f5;
    justify-content: left;
    align-items: center;
    .titleName {
      margin-left: 0.714286rem;
      font-weight: 700;
      font-size: 1.142857rem;
    }
    .ability_item {
      width: 100%;
      padding: 0.357143rem;
      .ability_item_list {
        float: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        width: 20%;
        margin-bottom: 0.357143rem;
        overflow: hidden;

        .icons {
          font-size: 2rem;
          height: 3rem;
          width: 3rem;
        }
        span {
          margin-top: 0.428571rem;
          font-size: 0.857143rem;
        }
      }
    }
  }
}
</style>
