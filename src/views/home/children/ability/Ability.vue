<template>
  <div class="ability">
    <!-- 行 -->
    <div class="ability_item" v-for="(item,index) in abilityLists" :key="index">
      <!-- 列 -->
      <div
        class="ability_item_list"
        v-for="(item1,index1) in item.children"
        :key="index1"
        @click="jumpPage(item1.path)"
      >
        <i :class="`icons iconfont ${item1.icon_Url}`" :style="{color:item1.color}"></i>
        <span>{{item1.title}}</span>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'Ability',
  data() {
    return {
      abilityLists: [
        {
          children: [
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
            }
          ]
        },
        {
          children: [
            {
              icon_Url: 'icon-wochuangjiande1',
              title: '客户管理',
              color: '#038900'
            },
            {
              icon_Url: 'icon-ziyuan174',
              title: '委外入库',
              color: '#038900'
            },
            {
              icon_Url: 'icon-daishouhuo',
              title: '代工发货'
            },
            {
              icon_Url: 'icon-ziyuan140',
              title: '流水发货',
              path: '/Shipment'
            },
            {
              icon_Url: 'icon-zonghebaobiao-01',
              title: '流水计划'
            }
          ]
        },
        {
          children: [
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
            {
              icon_Url: 'icon-kefu',
              title: '售后'
            }
          ]
        },
        {
          children: [
            {
              icon_Url: 'icon-ziyuan138',
              title: '新建合同',
              path: '/create-contract'
            },
            {
              icon_Url: 'icon-ziyuan138',
              title: '发起委外',
              path: '/outsource'
            },
            {
              icon_Url: 'icon-ziyuan140',
              title: '合同发货',
              path: '/ContractDelivery'
            },
            {
              icon_Url: 'icon-ziyuan140',
              title: '来料发货',
              path: '/IncomingDelivery'
            },
            {
              icon_Url: 'icon-shujuxiazai-01',
              title: '委外收货'
            }
          ]
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
    margin: 0.428571rem;
    width: 100%;
    padding: 0.357143rem;
    .ability_item_list {
      width: 20%;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
      float: left;
      .icons {
        font-size: 2rem;
        color: #2a88ff;
      }
      span {
        margin-top: 0.428571rem;
        font-size: 0.857143rem;
      }
    }
  }
}
</style>
