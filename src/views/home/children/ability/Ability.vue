<template>
  <div class="ability">
    <ul class="ability_item">
      <li v-for="(item,index) in abilityList" :key="index">
        <div @click="jumpPage(item.path)" class="ability_item_list">
          <i :class="`icons iconfont ${item.icon_Url}`" :style="{color:item.color}"></i>
          <span>{{item.title}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
    
<script>
export default {
  name: 'Ability',
  data() {
    return {
      abilityList: [
        {
          icon_Url: 'icon-zhaogongshichang',
          title: '计件考核',
          color: '#ff7f12'
        },
        {
          icon_Url: 'icon-tuikuanshouhou',
          title: '提现操作'
        },
        {
          icon_Url: 'icon-ziyuan142',
          title: '检验考核',
          color: '#ff5b2b'
        },
        {
          icon_Url: 'icon-daifahuo',
          title: '收货质检'
        },
        {
          icon_Url: 'icon-lvyoumenpiao',
          title: '开据发票',
          color: '#ff7f12'
        },
        {
          icon_Url: 'icon-wochuangjiande1',
          title: '客户管理',
          color: '#038900',
          path: '/client'
        },
        {
          icon_Url: 'icon-ziyuan174',
          title: '委外入库',
          color: '#038900',
          path: '/deal/outsourcing'
        },
        {
          icon_Url: 'icon-daishouhuo',
          title: '代工发货',
          path: '/oem'
        },
        {
          icon_Url: 'icon-ziyuan140',
          title: '流水发货',
          path: '/Ship'
        },
        {
          icon_Url: 'icon-zonghebaobiao-01',
          title: '流水计划'
        },
        {
          icon_Url: 'icon-ziyuan138',
          title: '新增流水',
          path: '/addbill'
        },
        {
          icon_Url: 'icon-shujuxiazai-01',
          title: '合同收货'
        },
        {
          icon_Url: 'icon-ziyuan140',
          title: '任务管理',
          color: '#ff7f12'
        },
        {
          icon_Url: 'icon-ziyuan146',
          title: '统计报表'
        },
        // {
        //   icon_Url: 'icon-kefu',
        //   title: '售后'
        // },
        // {
        //   icon_Url: 'icon-ziyuan138',
        //   title: '新建合同',
        //   path: '/create-contract'
        // },
        // {
        //   icon_Url: 'icon-ziyuan138',
        //   title: '发起委外',
        //   path: '/outsource'
        // },
        // {
        //   icon_Url: 'icon-ziyuan140',
        //   title: '合同发货',
        //   path: '/ContractDelivery'
        // },
        // {
        //   icon_Url: 'icon-ziyuan140',
        //   title: '来料发货',
        //   path: '/IncomingDelivery'
        // },
        // {
        //   icon_Url: 'icon-shujuxiazai-01',
        //   title: '委外收货',
        //   path: '/Outsourc/outsourcing'
        // },
        // {
        //   icon_Url: 'icon-ziyuan138',
        //   title: '生产任务',
        //   path: '/LargeScreen'
        // },
        {
          icon_Url: 'icon-tixing',
          title: '全部',
          color: '#b2bec3',
          path: '/homeManu'
        }
      ]
    }
  },
  components: {},
  methods: {
    jumpPage(path) {
      this.$router.replace(path)
    }
  }
}
</script>
    
<style lang="scss">
.ability {
  border-bottom: 3px solid #f5f5f5;
  width: 100%;
  padding: 0.357143rem;
  display: flex;
  flex-wrap: wrap;
  background-color: #f5f5f5;
  justify-content: left;
  align-items: center;

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
        color: #2a88ff;
        height: 3rem;
        width: 3rem;
        line-height: 3rem;
        text-align: center;
      }
      span {
        margin-top: 0.428571rem;
        font-size: 0.857143rem;
      }
    }
  }
}
</style>
