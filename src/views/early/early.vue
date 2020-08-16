<template>
  <div id="early">
    <navbar class="p_root_box">
      <div class="left" slot="left" @click="blackhome">
        <i class="el-icon-back"></i>
      </div>
      <div class="center" slot="center">
        <span>预警系统</span>
      </div>
      <div class="right" slot="right"></div>
    </navbar>

    <scroll class="scroll-wrapper" :probeType="3">
      <div class="content">
        <el-card class="box-card" v-for="(item,index) in listItem " :key="index">
          <div class="box-content">
            <div class="item-logo">
              <img :src="bestURL+'/view/image/'+item.logo" alt="logo" />
              <div class="item-title">{{item.title}}</div>
            </div>
            <div class="item-content">
              <span>
                {{item.right_text}}:
                <em>{{item.right_content}}</em>
              </span>
            </div>
          </div>
        </el-card>
      </div>
    </scroll>
  </div>
</template>
    
<script>
import { bestURL } from '@/network/baseURL'

export default {
  data() {
    return {
      bestURL: '',
      listItem: [
        {
          title: '仓库预警',
          logo: 'storeWarn.png',
          right_text: '预警信息',
          right_content: 0,
        },
        {
          title: '买价上浮',
          logo: 'buyPriceAdd.png',
          right_text: '未读信息',
          right_content: 0,
        },
        {
          title: '付款超标',
          logo: 'payOver.png',
          right_text: '超标信息',
          right_content: 0,
        },
        {
          title: '备用金',
          logo: 'standbyMoney.png',
          right_text: '溢出信息',
          right_content: 0,
        },
        {
          title: '超额发货',
          logo: 'overDeliver.png',
          right_text: '超额信息',
          right_content: 0,
        },
        {
          title: '提前支取',
          logo: 'aheadDraw.png',
          right_text: '超额信息',
          right_content: 0,
        },
        {
          title: '任务超时',
          logo: 'taskOvertime.png',
          right_text: '超时信息',
          right_content: 0,
        },
      ],
    }
  },

  activated() {
    this.bestURL = bestURL
  },
  deactivated() {},
  methods: {
    blackhome() {
      this.$router.go(-1)
    },
  },
}
</script>
    
<style scoped lang="scss">
#early {
  padding-top: 5.428571rem;
  height: calc(100vh - 5.428571rem);
  .p_root_box {
    .left {
      margin-left: 1.071429rem;
      i {
        font-size: 1.571429rem;
      }
    }
    .center {
      span {
        font-size: 1.571429rem;
      }
    }
    .right {
      margin-right: 1.071429rem;
      .newbtn {
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
    .content {
      .box-card {
        margin-bottom: 0.357143rem;
        .box-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item-logo {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img {
              width: 2.857143rem;
              height: 2.857143rem;
            }
            .item-title {
              margin-top: 0.357143rem;
            }
          }
          .item-content {
            span {
              em {
              }
            }
          }
        }
      }
    }
  }
}
</style>
