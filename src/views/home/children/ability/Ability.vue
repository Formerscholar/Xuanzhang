<template>
  <div class="ability">
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
</template>
    
<script>
export default {
  name: 'Ability',
  data() {
    return {
      abilityList: [
        {
          icon_Url: '#icon-Glink',
          title: '流水发货',
          path: '/Ship',
        },
        {
          icon_Url: '#icon-wodeshenpi',
          title: '新建合同',
          path: '/create-contract',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-29',
          title: '发起委外',
          path: '/outsource',
        },
        {
          icon_Url: '#icon-appointment',
          title: '合同发货',
          path: '/ContractDelivery',
        },
        {
          icon_Url: '#icon-renlikaoqin',
          title: '任务管理',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-25',
          title: '合同收货',
        },
        {
          icon_Url: '#icon-baogao',
          title: '流水计划',
          path: '/addbill',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-31',
          title: '统计报表',
        },
        {
          icon_Url: '#icon-jiadaxiuguanlixitong',
          title: '售后',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-16',
          title: '提现操作',
        },

        {
          icon_Url: '#icon-gongchengjiansheanquanpaicha',
          title: '盘库',
        },
        {
          icon_Url: '#icon-xiangmurenwu',
          title: '领料',
        },
        {
          icon_Url: '#icon-renlikaoqin',
          title: '退料',
        },
        {
          icon_Url: '#icon-jinrongleiicontubiao-17',
          title: '报销',
        },
        {
          icon_Url: '#icon-product-cate',
          title: '全部',
          path: '/homeManu',
        },
      ],
    }
  },
  components: {},
  methods: {
    jumpPage(path) {
      this.$router.replace(path)
    },
  },
}
</script>
    
<style lang="scss">
.ability {
  border-bottom: 0.214286rem solid #f5f5f5;
  width: 100%;
  padding: 0.357143rem;
  padding-top: 1.428571rem;
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
      margin-bottom: 0.714286rem;
      overflow: hidden;

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
</style>
